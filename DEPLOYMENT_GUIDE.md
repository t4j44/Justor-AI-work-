# 🚀 Complete Deployment Guide for Justor AI

## Overview
This guide will walk you through deploying your Justor AI application to Vercel and connecting your custom domain (justorai.com).

---

## 📋 Prerequisites Checklist

Before deploying, ensure you have:
- ✅ GitHub account
- ✅ Vercel account (sign up at vercel.com)
- ✅ Namecheap account with justorai.com domain
- ✅ Supabase account (for authentication and database)
- ✅ Groq API key (for AI responses)
- ✅ Dify account (optional, for document analysis)

---

## Part 1: Setup Your API Keys

### 1.1 Supabase Setup (FREE)

1. **Go to** https://supabase.com
2. **Click** "Start your project" → Sign up with GitHub
3. **Create New Project:**
   - Project Name: `justor-ai`
   - Database Password: (create a strong password and save it!)
   - Region: Choose closest to Bangladesh (Singapore recommended)
   - Click "Create new project" (wait 2-3 minutes)

4. **Get Your API Keys:**
   - Go to Settings → API
   - Copy these two values:
     - `Project URL` → This is your `VITE_SUPABASE_URL`
     - `anon public` key → This is your `VITE_SUPABASE_ANON_KEY`

5. **Setup Authentication:**
   - Go to Authentication → Providers
   - Enable Email provider (already enabled by default)
   - Enable Google OAuth:
     - Click on Google
     - Toggle "Enable Google provider"
     - Follow Google OAuth setup (we'll configure this later)

6. **Create Database Tables:**
   - Go to SQL Editor
   - Click "New query"
   - Paste the SQL from `database-schema.sql` (I'll create this file next)
   - Click "Run"

### 1.2 Groq API Key (FREE)

1. **Go to** https://console.groq.com
2. **Sign up** with Google or GitHub
3. **Navigate to** API Keys section
4. **Click** "Create API Key"
5. **Name it** "Justor AI Production"
6. **Copy the key** → This is your `VITE_GROQ_API_KEY`
   - ⚠️ IMPORTANT: Save this immediately, you can't see it again!

### 1.3 Dify Setup (FREE - Optional but Recommended)

**Free Tier Includes:**
- 200 message credits per month
- Document analysis
- Workflow automation

**Setup Steps:**

1. **Go to** https://dify.ai
2. **Click** "Get Started for Free"
3. **Sign up** with GitHub or Google
4. **Create Two Workflows:**

#### Workflow 1: Document Reviewer
- Click "Create" → "Chatbot"
- Name: "Justor Document Reviewer"
- Description: "Analyzes legal documents"
- Model: Choose GPT-3.5-turbo (free tier)
- Instructions: "You are a legal document reviewer for Bangladeshi law. Analyze documents for compliance, risks, and provide recommendations."
- Click "Publish"
- Go to "API Access" → Copy the API key → This is your `VITE_DIFY_REVIEWER_API_KEY`

#### Workflow 2: General Legal Assistant
- Click "Create" → "Chatbot"
- Name: "Justor Legal Assistant"
- Description: "Answers legal questions"
- Model: Choose GPT-3.5-turbo (free tier)
- Instructions: "You are a legal assistant for Bangladeshi law. Provide clear, accurate answers about Bangladesh's legal system."
- Click "Publish"
- Go to "API Access" → Copy the API key → This is your `VITE_DIFY_GENERAL_API_KEY`

**💡 Note:** If you skip Dify, the app will work fine with Groq only!

---

## Part 2: Push Your Code to GitHub

### 2.1 Create `.env.local` File (DO NOT COMMIT THIS!)

Create a file named `.env.local` in your project root with your keys:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Groq AI Configuration
VITE_GROQ_API_KEY=your_groq_api_key_here

# Dify Configuration (Optional)
VITE_DIFY_REVIEWER_API_KEY=your_dify_reviewer_api_key_here
VITE_DIFY_GENERAL_API_KEY=your_dify_general_api_key_here
```

### 2.2 Verify `.gitignore` Has These Entries

Your `.gitignore` should already include:
```
.env.local
.env
.env*.local
node_modules/
dist/
```

### 2.3 Commit and Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Ready for production deployment"

# Create repository on GitHub (go to github.com/new)
# Then link and push:
git remote add origin https://github.com/YOUR_USERNAME/Justor-AI-work-.git
git branch -M main
git push -u origin main
```

---

## Part 3: Deploy to Vercel

### 3.1 Initial Deployment

1. **Go to** https://vercel.com
2. **Sign up** with GitHub (recommended)
3. **Click** "Add New" → "Project"
4. **Import your GitHub repository** "Justor-AI-work-"
5. **Configure Project:**
   - Framework Preset: Vite
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. **Add Environment Variables:**
   Click "Environment Variables" and add ALL your keys from `.env.local`:
   
   ```
   VITE_SUPABASE_URL = your_value_here
   VITE_SUPABASE_ANON_KEY = your_value_here
   VITE_GROQ_API_KEY = your_value_here
   VITE_DIFY_REVIEWER_API_KEY = your_value_here (optional)
   VITE_DIFY_GENERAL_API_KEY = your_value_here (optional)
   ```

7. **Click** "Deploy"
   - Wait 2-3 minutes for deployment
   - You'll get a URL like: `https://justor-ai-work.vercel.app`

### 3.2 Test Your Deployment

1. Open the Vercel URL
2. Test the landing page
3. Try signing up/logging in
4. Ask a legal question
5. Check if everything works!

---

## Part 4: Connect Your Custom Domain (justorai.com)

### 4.1 Add Domain in Vercel

1. In your Vercel project, go to **Settings** → **Domains**
2. **Add Domain:** Type `justorai.com`
3. **Click** "Add"
4. Vercel will show you DNS records to configure

### 4.2 Configure DNS in Namecheap

1. **Login to** Namecheap
2. **Go to** Domain List → justorai.com → "Manage"
3. **Click** "Advanced DNS" tab
4. **Delete** any existing A or CNAME records for @ and www

5. **Add New Records:**

   **Record 1 (Root Domain):**
   - Type: `A Record`
   - Host: `@`
   - Value: `76.76.21.21`
   - TTL: Automatic

   **Record 2 (WWW Subdomain):**
   - Type: `CNAME Record`
   - Host: `www`
   - Value: `cname.vercel-dns.com.`
   - TTL: Automatic

6. **Click** "Save All Changes"

### 4.3 Wait for DNS Propagation

- DNS changes take 5 minutes to 48 hours
- Usually works in 15-30 minutes
- Check status: https://www.whatsmydns.net

### 4.4 Enable HTTPS in Vercel

1. Once DNS is verified, Vercel automatically provisions SSL
2. Check Settings → Domains
3. Your domain should show a green "Valid Configuration" status
4. HTTPS is automatically enabled!

---

## Part 5: Configure Supabase for Production

### 5.1 Add Production URL to Supabase

1. Go to your Supabase project
2. **Authentication** → **URL Configuration**
3. **Add Redirect URLs:**
   ```
   https://justorai.com/*
   https://www.justorai.com/*
   https://justorai.com/auth/callback
   ```

4. **Site URL:** Set to `https://justorai.com`

### 5.2 Setup Google OAuth (Optional)

1. Go to https://console.cloud.google.com
2. Create a new project: "Justor AI"
3. Enable Google+ API
4. Create OAuth credentials
5. Add authorized URLs:
   - `https://justorai.com`
   - Your Supabase project URL
6. Copy Client ID and Secret to Supabase

---

## Part 6: Post-Deployment Checklist

### Test Everything:

✅ **Landing Page:**
- [ ] Loads correctly
- [ ] Purple theme visible
- [ ] Cursor-responsive background works
- [ ] All buttons functional
- [ ] Social media links work

✅ **Authentication:**
- [ ] Sign up works
- [ ] Sign in works
- [ ] Email confirmation works
- [ ] Password reset works

✅ **Chat Application:**
- [ ] Can ask questions
- [ ] AI responds correctly
- [ ] Can create new chats
- [ ] Chat history saves
- [ ] Document upload works

✅ **About Page:**
- [ ] Contact section loads
- [ ] Email link works
- [ ] WhatsApp link works
- [ ] Upcoming features visible
- [ ] All animations work

✅ **SEO & Performance:**
- [ ] Add favicon (create one at favicon.io)
- [ ] Add meta description
- [ ] Test on mobile devices
- [ ] Check loading speed

---

## 🎯 Quick Command Reference

### Local Development:
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Update Deployment:
```bash
git add .
git commit -m "Your update message"
git push origin main
# Vercel auto-deploys on push!
```

---

## 🆘 Troubleshooting

### Issue: "API Error 401 - Unauthorized"
**Solution:** Check your environment variables in Vercel are correct

### Issue: "Database connection failed"
**Solution:** Run the SQL schema in Supabase SQL Editor

### Issue: "Domain not working"
**Solution:** 
1. Check DNS settings in Namecheap
2. Wait 30 minutes for propagation
3. Clear browser cache

### Issue: "Build failed on Vercel"
**Solution:**
1. Check build logs
2. Make sure all dependencies are in package.json
3. Try `npm install` and `npm run build` locally first

### Issue: "Chat not saving"
**Solution:** Database tables not created - run SQL schema

---

## 📞 Need Help?

If you encounter any issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all API keys are correct
4. Test each service independently

---

## 🎉 Congratulations!

Once everything is deployed and working:
1. Your app is live at https://justorai.com
2. SSL is enabled (secure)
3. Auto-deploys on git push
4. Free hosting with Vercel
5. Professional custom domain

**You did it! 🚀**
