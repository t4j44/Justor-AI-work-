# ✅ Pre-Deployment Checklist

## Before You Deploy - Complete These Steps:

### 1. API Keys Setup (30 minutes)
- [ ] Create Supabase account and project
- [ ] Copy Supabase URL and anon key
- [ ] Create Groq account and get API key
- [ ] (Optional) Setup Dify workflows and get API keys
- [ ] Create `.env.local` file with all keys
- [ ] Test locally: `npm run dev`

### 2. Database Setup (5 minutes)
- [ ] Open Supabase SQL Editor
- [ ] Copy content from `database-schema.sql`
- [ ] Run the SQL script
- [ ] Verify tables created: profiles, chats, messages

### 3. GitHub Repository (10 minutes)
- [ ] Create GitHub account (if needed)
- [ ] Create new repository: Justor-AI-work-
- [ ] Verify `.gitignore` excludes `.env.local`
- [ ] Commit all code: `git add . && git commit -m "Initial commit"`
- [ ] Push to GitHub: `git push origin main`

### 4. Vercel Deployment (10 minutes)
- [ ] Create Vercel account (use GitHub login)
- [ ] Import your GitHub repository
- [ ] Add all environment variables from `.env.local`
- [ ] Deploy and wait for completion
- [ ] Test the deployed site

### 5. Domain Configuration (15 minutes)
- [ ] Add `justorai.com` in Vercel Settings → Domains
- [ ] Login to Namecheap
- [ ] Update DNS records (A and CNAME)
- [ ] Wait 15-30 minutes for DNS propagation
- [ ] Verify domain is working with HTTPS

### 6. Supabase Production URLs (5 minutes)
- [ ] Add production URLs to Supabase Auth settings
- [ ] Add `https://justorai.com/*` as redirect URL
- [ ] Set Site URL to `https://justorai.com`

### 7. Final Testing (15 minutes)
- [ ] Test landing page on desktop
- [ ] Test landing page on mobile
- [ ] Sign up with new account
- [ ] Verify email confirmation works
- [ ] Test chat functionality
- [ ] Test document upload (if using Dify)
- [ ] Check all navigation links
- [ ] Test social media links
- [ ] Verify contact section works
- [ ] Check About page loads correctly

---

## Quick Command Reference

```bash
# Test locally
npm install
npm run dev

# Build for production (test before deploying)
npm run build
npm run preview

# Deploy to GitHub
git add .
git commit -m "Production ready"
git push origin main

# Vercel auto-deploys after push!
```

---

## Important Files

- `DEPLOYMENT_GUIDE.md` - Complete step-by-step instructions
- `database-schema.sql` - SQL to run in Supabase
- `.env.local.example` - Template for your environment variables
- `.gitignore` - Ensures sensitive files aren't uploaded

---

## Time Estimate

- **First-time deployment:** 1.5 - 2 hours
- **Updates after initial deployment:** 2 minutes (just git push!)

---

## Need Help?

1. Read `DEPLOYMENT_GUIDE.md` for detailed instructions
2. Check each service's documentation:
   - Vercel: https://vercel.com/docs
   - Supabase: https://supabase.com/docs
   - Groq: https://console.groq.com/docs
3. Verify all API keys are correct
4. Check browser console for errors

---

## 🎉 You're Ready!

Follow the checklist step by step, and you'll have your app live on justorai.com in about 2 hours!

**Good luck! 🚀**
