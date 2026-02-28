# 🤖 Dify Setup Guide - Free Tier

## What is Dify?

Dify is an AI workflow platform that helps you create custom AI applications. For Justor AI, we use it for advanced document analysis.

---

## Free Tier Benefits

✅ **200 message credits per month** (resets monthly)
✅ **Document upload and analysis**
✅ **Custom AI workflows**
✅ **API access**
✅ **No credit card required!**

**Note:** The free tier is perfect for starting out. You can upgrade later if needed.

---

## Alternative: Skip Dify Entirely

**Good News:** Your app works perfectly fine without Dify! 

If you skip Dify:
- ✅ Basic chat still works (using Groq)
- ✅ All features functional
- ❌ Advanced document analysis won't work
- ❌ Specialized legal workflows won't be available

**To skip Dify:** Just don't add the Dify environment variables. The app will automatically use Groq for everything.

---

## Option 1: Setup Dify (Recommended)

### Step 1: Create Account (2 minutes)

1. Go to https://dify.ai
2. Click "Get Started for Free"
3. Sign up with:
   - Google (recommended)
   - GitHub
   - Or email

4. Verify your email
5. You're in! 🎉

### Step 2: Create Document Reviewer Workflow (5 minutes)

1. **Click** "Create" button
2. **Select** "Chatbot" application type
3. **Configure:**
   ```
   Name: Justor Document Reviewer
   Description: Legal document analysis for Bangladeshi law
   Icon: 📄 (choose any icon you like)
   ```

4. **Click** "Create"

5. **Model Configuration:**
   - Model Provider: OpenAI
   - Model: gpt-3.5-turbo (free tier)
   - Temperature: 0.3 (more precise)
   - Max Tokens: 2000

6. **Prompt Template:**
   ```
   You are an expert legal document reviewer specializing in Bangladeshi law.
   
   Your role:
   - Analyze legal documents for compliance with Bangladesh laws
   - Identify potential risks and issues
   - Provide clear, actionable recommendations
   - Explain complex legal terms in simple language
   
   When reviewing documents:
   1. Identify the type of document
   2. Check for legal compliance
   3. Highlight any red flags or concerns
   4. Suggest improvements or corrections
   5. Provide relevant legal citations from Bangladesh law
   
   Always be thorough, accurate, and professional.
   ```

7. **Click** "Publish" (top right)

8. **Get API Key:**
   - Click "API Access" in left sidebar
   - Click "Create API Key"
   - Name it "Production"
   - **Copy the key** → This is `VITE_DIFY_REVIEWER_API_KEY`
   - ⚠️ Save it immediately!

### Step 3: Create General Legal Assistant (5 minutes)

1. **Click** "Create" button again
2. **Select** "Chatbot"
3. **Configure:**
   ```
   Name: Justor Legal Assistant
   Description: General legal Q&A for Bangladeshi law
   Icon: ⚖️
   ```

4. **Model Configuration:**
   - Model Provider: OpenAI
   - Model: gpt-3.5-turbo
   - Temperature: 0.5 (balanced)
   - Max Tokens: 2000

5. **Prompt Template:**
   ```
   You are Justor AI, a helpful legal assistant specializing in Bangladeshi law.
   
   Your mission:
   - Provide clear, accurate information about Bangladesh's legal system
   - Answer questions about laws, rights, and legal procedures
   - Explain legal concepts in simple, understandable language
   - Guide users on appropriate next steps
   - Always mention when professional legal advice is needed
   
   Guidelines:
   1. Be accurate and cite specific laws when possible
   2. Use simple language, avoid excessive legal jargon
   3. Be empathetic and supportive
   4. Clarify when something requires a lawyer
   5. Provide actionable guidance
   
   Remember: You provide information and guidance, NOT legal advice.
   Always recommend consulting a qualified lawyer for specific legal matters.
   ```

6. **Click** "Publish"

7. **Get API Key:**
   - Click "API Access"
   - Click "Create API Key"
   - Name it "Production"
   - **Copy the key** → This is `VITE_DIFY_GENERAL_API_KEY`

### Step 4: Test Your Workflows (3 minutes)

1. **Test Document Reviewer:**
   - Click on "Justor Document Reviewer"
   - Click "Preview" (play button icon)
   - Upload a sample document or ask: "Review this rental agreement"
   - Check if it responds appropriately

2. **Test General Assistant:**
   - Click on "Justor Legal Assistant"
   - Click "Preview"
   - Ask: "What are tenant rights in Bangladesh?"
   - Verify it gives good answers

3. ✅ If both work, you're done!

---

## Option 2: Use Only Groq (Simpler Setup)

### When to Use Groq Only:

- ✅ You want the simplest setup
- ✅ You don't need document analysis features
- ✅ You want to avoid managing multiple API keys
- ✅ You're just starting out

### Setup:

**In your `.env.local`, only add:**
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_GROQ_API_KEY=your_groq_key

# Leave Dify variables empty or don't add them
```

**That's it!** The app will automatically use Groq for all AI features.

---

## Comparing the Options

| Feature | With Dify | Without Dify |
|---------|-----------|--------------|
| Basic Chat | ✅ | ✅ |
| Fast Responses | ✅ | ✅ |
| Document Analysis | ✅ Advanced | ❌ |
| Custom Workflows | ✅ | ❌ |
| API Complexity | Medium | Simple |
| Setup Time | 15 min | 5 min |
| Free Messages/Month | 200 (Dify) + Unlimited (Groq) | Unlimited (Groq) |

---

## Managing Free Tier Limits

### Dify Free Tier Tips:

1. **200 messages/month** is the limit
2. Messages reset on the 1st of each month
3. Monitor usage in Dify dashboard
4. If you hit the limit, app falls back to Groq automatically!

### Groq Free Tier:

- **Much more generous limits**
- Typically 6000+ requests per day
- Very fast responses
- Perfect for your app

### Recommendation:

**Start with both Dify + Groq:**
- Use Dify for document analysis (when available)
- Use Groq for regular chat (unlimited)
- Best of both worlds!

---

## Adding API Keys to Your App

### Local Development:

Add to `.env.local`:
```env
VITE_DIFY_REVIEWER_API_KEY=your_key_here
VITE_DIFY_GENERAL_API_KEY=your_key_here
```

### Vercel Deployment:

1. Go to your project in Vercel
2. Settings → Environment Variables
3. Add each variable:
   - Name: `VITE_DIFY_REVIEWER_API_KEY`
   - Value: (paste your key)
   - Click "Add"
4. Repeat for general API key
5. Redeploy your app

---

## Troubleshooting

### Error: "Dify API rate limit exceeded"
**Solution:** You've used your 200 free messages. App will use Groq automatically.

### Error: "Invalid Dify API key"
**Solution:** 
1. Check you copied the key correctly
2. Make sure you created the API key in the right workflow
3. Verify no extra spaces in `.env.local`

### Workflow not responding correctly
**Solution:**
1. Check your prompt template
2. Verify model is set to gpt-3.5-turbo
3. Test in Dify preview first

---

## Future Upgrades

When your app grows:

### Dify Pro Plan ($20/month):
- 5000 messages/month
- Priority support
- Advanced features

### Dify Team Plan ($59/month):
- 15,000 messages/month
- Multiple team members
- Custom integrations

**But for now, FREE tier is perfect! 🎉**

---

## Quick Decision Guide

**Choose Dify + Groq if:**
- ✅ You want document analysis
- ✅ You want the full feature set
- ✅ 200 messages/month is enough for testing
- ✅ You can spend 15 extra minutes on setup

**Choose Groq Only if:**
- ✅ You want the simplest setup
- ✅ You don't need document features yet
- ✅ You want unlimited messages
- ✅ You're in a hurry to deploy

**My recommendation:** Start with Groq only, add Dify later when you need document features!

---

## Summary

1. **Free tier is generous** - 200 messages/month
2. **No credit card needed** - completely free
3. **Optional feature** - app works fine without it
4. **Easy to add later** - can set up anytime
5. **Automatic fallback** - uses Groq if Dify unavailable

**You're all set! 🚀**
