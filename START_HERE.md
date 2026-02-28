# 🚀 START HERE - Deploy Justor AI in 2 Hours

## Welcome! 👋

You're about to deploy your Justor AI application to the world! This guide will take you from your local code to a live website at **justorai.com** in about 2 hours.

**Never deployed before? No problem!** Follow these steps exactly, and you'll be fine.

---

## 📚 What You Need to Read

I've created several guides for you. Here's the order to read them:

### 1. **This File (START_HERE.md)** ← You are here! 
Quick overview and what to do first

### 2. **PRE_DEPLOYMENT_CHECKLIST.md**
Simple checklist to make sure you have everything

### 3. **DEPLOYMENT_GUIDE.md**
Complete step-by-step deployment instructions (the main guide!)

### 4. **DIFY_SETUP_GUIDE.md**
Optional: Only if you want document analysis features

### 5. **database-schema.sql**
SQL code to run in Supabase (instructions in DEPLOYMENT_GUIDE.md)

---

## ⚡ Quick Start (Do This First!)

### Step 1: Create Your Accounts (10 minutes)

Create FREE accounts on these platforms:

1. **GitHub** (https://github.com/join)
   - Where your code will live
   - Free forever

2. **Vercel** (https://vercel.com/signup)
   - Where your site will be hosted
   - Free for personal projects
   - Sign up with GitHub (easiest!)

3. **Supabase** (https://supabase.com)
   - Your database and authentication
   - Free tier: 500MB database, 50,000 users
   - Sign up with GitHub

4. **Groq** (https://console.groq.com)
   - AI responses for your app
   - Very generous free tier
   - Sign up with GitHub or Google

5. **(Optional) Dify** (https://dify.ai)
   - Advanced document analysis
   - 200 messages/month free
   - Can skip for now!

### Step 2: Get Your API Keys (15 minutes)

After creating accounts, you need to get API keys:

**Supabase:**
- Settings → API → Copy "Project URL" and "anon public" key

**Groq:**
- API Keys → Create API Key → Copy it immediately!

**Dify (optional):**
- See DIFY_SETUP_GUIDE.md

### Step 3: Create `.env.local` File (5 minutes)

In your project folder, create a file named `.env.local` and add:

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Groq
VITE_GROQ_API_KEY=your_groq_api_key_here

# Dify (optional - can leave empty)
VITE_DIFY_REVIEWER_API_KEY=
VITE_DIFY_GENERAL_API_KEY=
```

**Replace** `your_...` with your actual keys!

### Step 4: Test Locally (5 minutes)

```bash
# Install dependencies (if you haven't)
npm install

# Start the development server
npm run dev
```

Visit http://localhost:5174 and make sure everything works!

### Step 5: Setup Database (5 minutes)

1. Go to Supabase → SQL Editor
2. Open the file `database-schema.sql` 
3. Copy ALL the SQL code
4. Paste in Supabase SQL Editor
5. Click "Run"
6. You should see: "Database schema created successfully! ✅"

### Step 6: Push to GitHub (10 minutes)

```bash
# Make sure you're in your project folder
cd "e:\Justor own work\Justor-AI-work-"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Create a new repository on GitHub first!
# Go to: https://github.com/new
# Name it: Justor-AI-work-
# Don't initialize with README (your code has everything)
# Click "Create repository"

# Then connect and push (replace YOUR_USERNAME):
git remote add origin https://github.com/YOUR_USERNAME/Justor-AI-work-.git
git branch -M main
git push -u origin main
```

### Step 7: Deploy to Vercel (15 minutes)

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your "Justor-AI-work-" repository
4. Configure:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add Environment Variables:
   - Copy all values from your `.env.local`
   - Add them one by one in Vercel
6. Click "Deploy"
7. Wait 2-3 minutes
8. Your site is live! 🎉

### Step 8: Connect Your Domain (20 minutes)

1. In Vercel: Settings → Domains → Add "justorai.com"
2. Vercel will show DNS records
3. Login to Namecheap
4. Go to justorai.com → Advanced DNS
5. Add these records:
   ```
   A Record:     @ → 76.76.21.21
   CNAME Record: www → cname.vercel-dns.com.
   ```
6. Save and wait 15-30 minutes
7. Your site will be live at https://justorai.com! 🌐

### Step 9: Final Configuration (10 minutes)

1. **Supabase:** Add production URLs
   - Authentication → URL Configuration
   - Add: `https://justorai.com/*`
   - Site URL: `https://justorai.com`

2. **Test Everything:**
   - Visit https://justorai.com
   - Sign up with a test account
   - Try asking a legal question
   - Check all pages work

### Step 10: Celebrate! 🎉

**You did it!** Your app is live!

---

## 🆘 If Something Goes Wrong

### "Build failed on Vercel"
1. Check the build logs in Vercel
2. Make sure all environment variables are added
3. Try running `npm run build` locally first

### "Can't connect to database"
- Did you run the SQL schema in Supabase?
- Are your Supabase keys correct in Vercel?

### "AI not responding"
- Check your Groq API key is correct
- Verify it's added in Vercel environment variables

### "Domain not working"
- Wait 30 minutes (DNS takes time)
- Check DNS settings in Namecheap
- Clear your browser cache

### Still stuck?
Read the full **DEPLOYMENT_GUIDE.md** for detailed troubleshooting!

---

## 📖 Full Documentation

- **DEPLOYMENT_GUIDE.md** - Complete deployment instructions
- **DIFY_SETUP_GUIDE.md** - Optional Dify configuration  
- **PRE_DEPLOYMENT_CHECKLIST.md** - Deployment checklist
- **database-schema.sql** - Database setup
- **API_KEYS_GUIDE.md** - Detailed API key instructions
- **README.md** - Project overview

---

## ⏱️ Time Breakdown

- Create accounts: 10 minutes
- Get API keys: 15 minutes
- Setup locally: 10 minutes
- GitHub push: 10 minutes
- Vercel deployment: 15 minutes
- Domain configuration: 20 minutes
- Final testing: 15 minutes

**Total: ~2 hours** (first time)

**Future updates: 2 minutes!** (just git push)

---

## 💡 Pro Tips

1. **Save your API keys somewhere safe** (use a password manager!)
2. **Never commit `.env.local`** (it's already in .gitignore)
3. **Test locally before deploying** (saves time debugging)
4. **Vercel auto-deploys** (just push to GitHub to update)
5. **Start without Dify** (add it later if needed)

---

## 🎯 Your Mission

1. ✅ Read this file (you're doing it!)
2. ✅ Open **DEPLOYMENT_GUIDE.md**
3. ✅ Follow it step by step
4. ✅ Deploy your app
5. ✅ Share justorai.com with the world! 🌍

---

## 🚀 Ready? Let's Go!

Open **DEPLOYMENT_GUIDE.md** and let's deploy your app!

**Good luck - you've got this! 💪**
