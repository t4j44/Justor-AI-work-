// src/components/navbar.ts
import { supabase } from '../supabaseClient';
import { auth } from '../auth';
import { i18n } from '../i18n';

async function handleSignOut() {
    await supabase.auth.signOut();
}

// The 'currentPath' argument is still needed to decide if the hamburger menu should be shown.
export function renderNavbar(container: HTMLElement, currentPath: string) {
    const session = auth.getSession();
    
    const hasSidebar = ['/app', '/profile'].includes(currentPath);

    // Build mobile nav links based on auth state
    let mobileNavLinks = '';
    let desktopNavLinks = '';
    let desktopNavButtons = '';

    if (session) {
        desktopNavLinks = `
          <a href="/app" class="nav-link" data-link>${i18n.t('nav_myChats')}</a>
          <a href="/about" class="nav-link" data-link>${i18n.t('nav_about')}</a>
        `;
        desktopNavButtons = `
          <a href="/profile" class="nav-link" data-link>${i18n.t('nav_profile')}</a>
          <button id="sign-out-btn" class="nav-button nav-button-primary">${i18n.t('nav_signOut')}</button>
        `;
        mobileNavLinks = `
          <a href="/app" class="mobile-nav__link" data-link>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            ${i18n.t('nav_myChats')}
          </a>
          <a href="/about" class="mobile-nav__link" data-link>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            ${i18n.t('nav_about')}
          </a>
          <a href="/profile" class="mobile-nav__link" data-link>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            ${i18n.t('nav_profile')}
          </a>
          <div class="mobile-nav__divider"></div>
          <button id="mobile-sign-out-btn" class="mobile-nav__link mobile-nav__link--danger">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            ${i18n.t('nav_signOut')}
          </button>
        `;
    } else {
        desktopNavLinks = `
          <a href="/#features" class="nav-link">${i18n.t('nav_features')}</a>
          <a href="/about" class="nav-link" data-link>${i18n.t('nav_about')}</a>
        `;
        desktopNavButtons = `
          <a href="/login" class="nav-link" data-link>${i18n.t('nav_signIn')}</a>
          <a href="/login" class="nav-button nav-button-primary" data-link>${i18n.t('nav_signUp')}</a>
        `;
        mobileNavLinks = `
          <a href="/#features" class="mobile-nav__link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            ${i18n.t('nav_features')}
          </a>
          <a href="/about" class="mobile-nav__link" data-link>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            ${i18n.t('nav_about')}
          </a>
          <div class="mobile-nav__divider"></div>
          <a href="/login" class="mobile-nav__link" data-link>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
            ${i18n.t('nav_signIn')}
          </a>
          <a href="/login" class="mobile-nav__cta" data-link>
            ${i18n.t('nav_signUp')}
          </a>
        `;
    }

    const navHTML = `
      <nav class="navbar">
        <div class="navbar-left">
          ${hasSidebar ? `
            <button id="hamburger-menu" class="hamburger-sidebar-only" aria-label="Open sidebar">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          ` : ''}
          <a href="${session ? '/app' : '/'}" class="navbar-brand" data-link>
            <span>JustorAI</span>
          </a>
        </div>
        <div class="navbar-right">
          <div class="nav-links">${desktopNavLinks}</div>
          <div class="nav-buttons">${desktopNavButtons}</div>
        </div>
        <!-- Mobile nav toggle (visible only on mobile) -->
        <button id="mobile-nav-toggle" class="mobile-nav-toggle" aria-label="Open navigation menu">
          <svg class="mobile-nav-toggle__open" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          <svg class="mobile-nav-toggle__close" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </nav>
      <!-- Mobile navigation drawer -->
      <div id="mobile-nav-overlay" class="mobile-nav-overlay"></div>
      <div id="mobile-nav-drawer" class="mobile-nav-drawer">
        <div class="mobile-nav-drawer__content">
          ${mobileNavLinks}
        </div>
      </div>
    `;
    
    container.innerHTML = navHTML;
    
    // Sidebar hamburger (only on /app and /profile)
    document.getElementById('hamburger-menu')?.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('toggle-sidebar'));
    });
    
    // Sign-out (desktop)
    document.getElementById('sign-out-btn')?.addEventListener('click', handleSignOut);

    // Mobile nav drawer toggle
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const mobileOverlay = document.getElementById('mobile-nav-overlay');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');

    function closeMobileNav() {
        mobileDrawer?.classList.remove('is-open');
        mobileOverlay?.classList.remove('is-open');
        mobileToggle?.classList.remove('is-open');
        document.body.classList.remove('mobile-nav-open');
    }

    mobileToggle?.addEventListener('click', () => {
        const isOpen = mobileDrawer?.classList.contains('is-open');
        if (isOpen) {
            closeMobileNav();
        } else {
            mobileDrawer?.classList.add('is-open');
            mobileOverlay?.classList.add('is-open');
            mobileToggle?.classList.add('is-open');
            document.body.classList.add('mobile-nav-open');
        }
    });

    mobileOverlay?.addEventListener('click', closeMobileNav);

    // Close mobile nav when any link inside is clicked
    mobileDrawer?.querySelectorAll('.mobile-nav__link, .mobile-nav__cta').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    // Mobile sign-out
    document.getElementById('mobile-sign-out-btn')?.addEventListener('click', () => {
        closeMobileNav();
        handleSignOut();
    });
}