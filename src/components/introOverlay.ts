// src/components/introOverlay.ts
// Fullscreen WEBP frame‑sequence intro overlay.
// Auto‑discovers frames via Vite import.meta.glob, sorts by index.
// Plays FAST (~1.4 s total), shows Enter button, then fades out.
// Runs once per browser session (sessionStorage flag).

// Dynamically discover all .webp frames in public/intro/sequence/ at build time
const frameModules = import.meta.glob<string>(
  '/public/intro/sequence/frame_*.webp',
  { eager: true, query: '?url', import: 'default' }
);

// Sort by extracted numeric index (frame_00, frame_01, …)
const FRAME_URLS: string[] = Object.entries(frameModules)
  .map(([path, url]) => {
    const match = path.match(/frame_(\d+)/);
    return { index: match ? parseInt(match[1], 10) : 0, url };
  })
  .sort((a, b) => a.index - b.index)
  .map((entry) => entry.url);

const TOTAL_FRAMES = FRAME_URLS.length;

const SESSION_KEY = 'justor_intro_seen';

/** If the intro was already viewed this session, returns false immediately. */
export function shouldShowIntro(): boolean {
  return !sessionStorage.getItem(SESSION_KEY);
}

/**
 * Mount the intro overlay to document.body.
 * Resolves once the user clicks Enter and the fade‑out finishes.
 */
export function mountIntroOverlay(): Promise<void> {
  return new Promise((resolve) => {
    /* ── DOM skeleton ─────────────────────────────────── */
    const overlay = document.createElement('div');
    overlay.id = 'intro-overlay';

    const canvas = document.createElement('canvas');
    canvas.id = 'intro-canvas';
    overlay.appendChild(canvas);

    // Loading ring (visible while preloading first batch)
    const loader = document.createElement('div');
    loader.id = 'intro-loader';
    loader.innerHTML = '<div class="intro-spinner"></div>';
    overlay.appendChild(loader);

    // Enter button (hidden until animation finishes)
    const enterBtn = document.createElement('button');
    enterBtn.id = 'intro-enter-btn';
    enterBtn.textContent = 'Enter';
    enterBtn.style.opacity = '0';
    enterBtn.style.pointerEvents = 'none';
    overlay.appendChild(enterBtn);

    // Skip button (top‑right, always visible)
    const skipBtn = document.createElement('button');
    skipBtn.id = 'intro-skip-btn';
    skipBtn.textContent = 'Skip';
    overlay.appendChild(skipBtn);

    document.body.appendChild(overlay);

    // Lock scroll
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    /* ── Frame loading ────────────────────────────────── */
    const frames: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loadedCount = 0;
    const PRELOAD_BATCH = 12; // load first 12 before starting playback

    const loadFrame = (i: number): Promise<void> =>
      new Promise((res) => {
        const img = new Image();
        img.decoding = 'async';
        img.src = FRAME_URLS[i];
        img.onload = () => {
          frames[i] = img;
          loadedCount++;
          res();
        };
        img.onerror = () => {
          // Create a blank placeholder so playback doesn't break
          frames[i] = img;
          loadedCount++;
          res();
        };
      });

    /* ── Canvas rendering ─────────────────────────────── */
    const ctx = canvas.getContext('2d')!;
    let currentFrame = 0;
    let playing = false;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re‑draw current frame after resize
      if (frames[currentFrame]) drawFrame(frames[currentFrame]);
    };
    window.addEventListener('resize', resize);
    resize();

    function drawFrame(img: HTMLImageElement) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Cover‑fit: fill the viewport while maintaining aspect ratio
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = canvas.width / canvas.height;
      let dw: number, dh: number, dx: number, dy: number;
      if (canvasRatio > imgRatio) {
        dw = canvas.width;
        dh = canvas.width / imgRatio;
        dx = 0;
        dy = (canvas.height - dh) / 2;
      } else {
        dh = canvas.height;
        dw = canvas.height * imgRatio;
        dy = 0;
        dx = (canvas.width - dw) / 2;
      }
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    /* ── Playback loop (FAST — target ≈1.4 s total, adaptive to frame count) */
    const TARGET_DURATION = 1400; // ms total playback
    const FRAME_DELAY = Math.max(16, Math.round(TARGET_DURATION / TOTAL_FRAMES));

    function play() {
      playing = true;
      loader.style.display = 'none';
      let lastTime = 0;

      const tick = (timestamp: number) => {
        if (!playing) return;
        if (!lastTime) lastTime = timestamp;
        const elapsed = timestamp - lastTime;

        if (elapsed >= FRAME_DELAY) {
          lastTime = timestamp;
          if (frames[currentFrame]) drawFrame(frames[currentFrame]);
          currentFrame++;

          // Show enter button during last ~10 frames
          if (currentFrame >= TOTAL_FRAMES - 10) {
            showEnterButton();
          }

          if (currentFrame >= TOTAL_FRAMES) {
            playing = false;
            showEnterButton();
            return;
          }
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }

    function showEnterButton() {
      enterBtn.style.opacity = '1';
      enterBtn.style.pointerEvents = 'auto';
    }

    /* ── Dismiss logic ────────────────────────────────── */
    function dismiss() {
      sessionStorage.setItem(SESSION_KEY, '1');
      overlay.classList.add('intro-fade-out');
      overlay.addEventListener('transitionend', () => {
        overlay.remove();
        window.removeEventListener('resize', resize);
        // Restore scroll
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        resolve();
      });
    }

    enterBtn.addEventListener('click', dismiss);
    skipBtn.addEventListener('click', dismiss);

    /* ── Kick off loading ─────────────────────────────── */
    // Phase 1 — preload first batch
    const firstBatch = Array.from({ length: PRELOAD_BATCH }, (_, i) => loadFrame(i));
    Promise.all(firstBatch).then(() => {
      play();
      // Phase 2 — load the rest in the background
      for (let i = PRELOAD_BATCH; i < TOTAL_FRAMES; i++) {
        loadFrame(i);
      }
    });
  });
}
