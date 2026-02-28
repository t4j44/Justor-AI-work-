# 🚀 Quick Setup Instructions for Justor AI

## Your Project is Running! 🎉

The development server is now running at: **http://localhost:5173/**

## ⚠️ Important: Configure API Keys

Your application needs API keys to work properly. Follow these steps:

### Step 1: Supabase Configuration (Required)

1. **Visit:** https://supabase.com
2. **Create account** and **new project**
3. **Get your credentials:**
   - Go to: Project Settings → API
   - Copy: **Project URL** and **anon/public key**
4. **Open:** `.env.local` file in your project
5. **Replace:**
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_actual_key_here
   ```

6. **Set up database:**
   - Go to SQL Editor in Supabase
   - Copy the SQL from `README.md` (section "Supabase Setup")
   - Run it to create tables

### Step 2: Groq API Configuration (Required)

1. **Visit:** https://console.groq.com
2. **Sign up/Login**
3. **Create API Key** in the API Keys section
4. **Add to `.env.local`:**
   ```
   VITE_GROQ_API_KEY=your_groq_key_here
   ```

### Step 3: Dify API Configuration (Optional)

For advanced document analysis features:

1. **Visit:** https://dify.ai
2. **Create two apps:** General Assistant & Document Reviewer
3. **Get API keys** for both
4. **Add to `.env.local`:**
   ```
   VITE_DIFY_REVIEWER_API_KEY=your_key_here
   VITE_DIFY_GENERAL_API_KEY=your_key_here
   ```

## 🔄 After Updating .env.local

**Important:** You must restart the dev server after changing `.env.local`:

1. **Stop the server:** Press `Ctrl+C` in the terminal
2. **Restart:** Run `npm run dev` again
3. **Refresh:** Reload your browser

## 🎨 What's Been Improved

✅ **Enhanced Landing Page**
   - Added testimonials section with user reviews
   - Animated statistics counters
   - More engaging call-to-action sections
   - Smooth fade-in animations

✅ **Better Visual Design**
   - Modern gradient effects
   - Smooth hover animations on buttons and links
   - Improved color scheme with better contrast
   - Professional loading indicators

✅ **Improved User Experience**
   - Loading spinners when sending messages
   - Loading state for document uploads
   - Better error handling and messages
   - Responsive design improvements

✅ **Code Quality**
   - Better organized structure
   - Comprehensive documentation
   - Environment variable template
   - Detailed setup instructions

## 📱 Features Available

- ✨ **Guest Mode:** Try without signing up (data saved locally)
- 🔐 **User Accounts:** Sign up to save chats across devices
- 🌐 **Bilingual:** Switch between English and Bengali
- 📄 **Document Analysis:** Upload legal documents for AI analysis
- 🎤 **Voice Input:** Ask questions using your microphone
- 🔊 **Text-to-Speech:** Listen to AI responses
- 🌙 **Dark Mode:** Toggle dark/light theme
- 💬 **Chat History:** Save and manage conversations

## 🐛 Troubleshooting

**Issue:** Application shows errors
- **Solution:** Make sure all API keys are configured in `.env.local`

**Issue:** Changes not appearing
- **Solution:** Clear browser cache or hard refresh (Ctrl+Shift+R)

**Issue:** "Supabase URL must be defined" error
- **Solution:** Configure Supabase credentials in `.env.local`

**Issue:** Authentication not working
- **Solution:** Check Supabase setup and enable Google OAuth if needed

## 📚 Full Documentation

For detailed instructions, see **README.md** in the project root.

## 🎯 Next Steps

1. **Configure API keys** in `.env.local`
2. **Restart the server** after configuration
3. **Test the application** at http://localhost:5173/
4. **Sign up** to save your data to the cloud
5. **Try document upload** feature with a PDF
6. **Switch languages** to test Bengali support
7. **Toggle dark mode** to see the theme

## 💡 Tips

- Start in **Guest Mode** to try features without signing up
- Use **suggested queries** on the home screen for quick tests
- The **role selector** changes how AI responds (General Public, Law Student, Legal Professional)
- **Upload documents** for specialized legal document analysis
- **Voice features** work best in Chrome browser

---

Enjoy using Justor AI! 🏛️✨
