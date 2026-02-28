# 🔑 API Keys Configuration - Step by Step

## Current Status: ⚠️ NEEDS CONFIGURATION

Your app is running but needs API keys to work properly!

---

## 🎯 Required API Keys (2)

### 1️⃣ SUPABASE (Database & Authentication)

**What it does:** Stores your chats and handles user accounts

**How to get it:**

1. Open browser → https://supabase.com
2. Click "Start your project" → Sign up
3. Create new project:
   - Project name: `justor-ai` (or anything)
   - Database password: Choose strong password (save it!)
   - Region: Choose closest to you
   - Wait 2-3 minutes for setup

4. Once ready, click on your project
5. Left sidebar → "Settings" (gear icon) → "API"
6. You'll see:
   ```
   Project URL: https://xxxxx.supabase.co
   anon public key: eyJhbGciOi...very.long.key...
   ```

7. **Copy these** and paste in `.env.local`:
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...paste.your.key...
   ```

8. **Set up database tables:**
   - Left sidebar → SQL Editor
   - Copy SQL from `README.md` (search for "Create chats table")
   - Paste and click "Run"
   - You should see "Success" ✅

9. **(Optional) Enable Google Login:**
   - Left sidebar → Authentication → Providers
   - Find Google → Toggle ON
   - Follow their guide (needs Google Cloud Console setup)

---

### 2️⃣ GROQ (AI Responses)

**What it does:** Powers the AI responses

**How to get it:**

1. Open browser → https://console.groq.com
2. Click "Sign up" (or "Login" if you have account)
3. After login, look for "API Keys" in left menu
4. Click "Create API Key"
5. Give it a name: `justor-ai`
6. Click "Create"
7. **Copy the key immediately** (you can't see it again!)
8. Paste in `.env.local`:
   ```env
   VITE_GROQ_API_KEY=gsk_...paste.your.key...
   ```

---

## 🎁 Optional API Keys (Better Features)

### 3️⃣ DIFY (Document Analysis - Optional)

**What it does:** Advanced document analysis and specialized responses

**How to get it:**

1. Open browser → https://dify.ai
2. Sign up / Login
3. Click "Create new app" (twice - you need 2 apps)
   
   **First App:**
   - Name: "General Legal Assistant"
   - Type: Choose "Chatbot" or "Chat Assistant"
   - After creation → "API Access" → Copy API key
   - Paste in `.env.local` as `VITE_DIFY_GENERAL_API_KEY`

   **Second App:**
   - Name: "Document Reviewer"
   - Type: Choose "Chatbot" or "Chat Assistant"
   - After creation → "API Access" → Copy API key
   - Paste in `.env.local` as `VITE_DIFY_REVIEWER_API_KEY`

**Note:** If you skip this, the app will use Groq for everything (still works fine!)

---

## 📝 Your .env.local File Should Look Like:

```env
# Supabase - REQUIRED
VITE_SUPABASE_URL=https://abcdefgh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI...

# Groq - REQUIRED
VITE_GROQ_API_KEY=gsk_1234567890abcdefghijklmnopqrstuvwxyz

# Dify - OPTIONAL
VITE_DIFY_GENERAL_API_KEY=app-1234567890abcdef
VITE_DIFY_REVIEWER_API_KEY=app-0987654321fedcba
```

---

## 🔄 After Adding Keys

**IMPORTANT:** You must restart the development server!

1. Go to the terminal running `npm run dev`
2. Press `Ctrl + C` to stop
3. Run `npm run dev` again
4. Refresh your browser

---

## ✅ Checklist

Before testing your app, make sure:

- [ ] Created Supabase account
- [ ] Got Supabase URL and anon key
- [ ] Ran SQL script in Supabase SQL Editor
- [ ] Created Groq account
- [ ] Got Groq API key
- [ ] Added both keys to `.env.local`
- [ ] Restarted development server
- [ ] Refreshed browser

---

## 🧪 Test Your Setup

After configuring:

1. Open http://localhost:5173/
2. Click "Try as Guest" or "Sign Up"
3. Type a question like "What are my rights as a tenant?"
4. If you see AI response → ✅ SUCCESS!

---

## ❓ Troubleshooting

**Problem:** "Supabase URL must be defined"
- ✅ Check `.env.local` exists in project root
- ✅ Check keys start with `VITE_`
- ✅ Restart dev server

**Problem:** "API Error 401"
- ✅ Check API keys are correct (no extra spaces)
- ✅ Check you didn't accidentally delete part of the key

**Problem:** SQL script failed
- ✅ Make sure you copied the entire script
- ✅ Try running each CREATE TABLE separately

**Problem:** Can't sign up
- ✅ Check email confirmation in spam folder
- ✅ Check Supabase email templates are enabled

---

## 📧 Need Help?

1. Check `README.md` for detailed guide
2. Check `SETUP_GUIDE.md` for quick tips
3. Open GitHub issue with error details

---

## 💰 Costs?

- **Supabase:** Free tier (500MB database, 50,000 monthly active users)
- **Groq:** Free tier (generous limits for development)
- **Dify:** Free tier available

All are FREE for development and small projects! 🎉

---

## 🎓 Learning Resources

- [Supabase Docs](https://supabase.com/docs)
- [Groq Documentation](https://console.groq.com/docs)
- [Dify Documentation](https://docs.dify.ai/)

---

**Remember:** Never share your API keys publicly or commit them to Git!
The `.gitignore` file is already configured to protect your `.env.local` file.

Good luck! 🚀
