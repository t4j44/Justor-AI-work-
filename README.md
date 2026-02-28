# 🏛️ Justor AI - Your Intelligent Legal Assistant

![Justor AI Banner](public/assets/justor-ai-logo-transparent.png)

Justor AI is a modern, AI-powered legal assistant platform designed specifically for Bangladesh. Get instant legal guidance, analyze documents, and understand complex legal concepts in both English and Bengali.

## ✨ Features

- 🤖 **AI-Powered Legal Assistance** - Get instant answers to your legal questions
- 📄 **Document Analysis** - Upload and analyze legal documents with AI
- 🌐 **Bilingual Support** - Full support for English and Bengali
- 💬 **Smart Chat Interface** - Intuitive conversation-based interaction
- 🎯 **Role-Based Responses** - Tailored answers for general public, law students, and legal professionals
- 🔊 **Voice Interaction** - Ask questions and hear responses using speech
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🌙 **Dark Mode** - Easy on the eyes with beautiful dark theme
- 💾 **Chat History** - Save and manage your conversations
- 🔒 **Secure Authentication** - Powered by Supabase with Google OAuth support

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Supabase account
- A Groq API key
- Dify API keys (optional, for enhanced features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/t4j44/Justor-AI-work-.git
   cd Justor-AI-work-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the `.env.local.example` file to `.env.local`:
   ```bash
   copy .env.local.example .env.local
   ```
   
   Then edit `.env.local` with your actual API keys (see configuration section below).

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🔧 Configuration Guide

### 1. Supabase Setup

Supabase provides authentication and database services.

**Steps:**

1. Go to [https://supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Once created, go to **Project Settings** > **API**
4. Copy the following values:
   - **Project URL** → Use this for `VITE_SUPABASE_URL`
   - **anon/public key** → Use this for `VITE_SUPABASE_ANON_KEY`

5. Set up the database tables:
   - Go to **SQL Editor** in Supabase
   - Run the following SQL:

```sql
-- Create chats table
CREATE TABLE chats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  has_document BOOLEAN DEFAULT FALSE,
  dify_file_ids TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'ai')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_chats_user_id ON chats(user_id);
CREATE INDEX idx_messages_chat_id ON messages(chat_id);

-- Enable Row Level Security (RLS)
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own chats"
  ON chats FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own chats"
  ON chats FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chats"
  ON chats FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own chats"
  ON chats FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view messages from their chats"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM chats
      WHERE chats.id = messages.chat_id
      AND chats.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert messages to their chats"
  ON messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chats
      WHERE chats.id = messages.chat_id
      AND chats.user_id = auth.uid()
    )
  );
```

6. Enable Google OAuth (optional but recommended):
   - Go to **Authentication** > **Providers**
   - Enable **Google**
   - Follow the instructions to set up OAuth credentials from Google Cloud Console

### 2. Groq API Setup

Groq provides fast AI inference.

**Steps:**

1. Go to [https://console.groq.com](https://console.groq.com)
2. Sign up or log in
3. Navigate to **API Keys** section
4. Click **Create API Key**
5. Copy the generated key → Use this for `VITE_GROQ_API_KEY`

### 3. Dify API Setup (Optional)

Dify provides advanced AI workflows for document analysis and specialized legal assistance.

**Steps:**

1. Go to [https://dify.ai](https://dify.ai) or your self-hosted Dify instance
2. Create an account or log in
3. Create two applications:
   - **General Legal Assistant** - For general legal queries
   - **Document Reviewer** - For document analysis
4. For each application:
   - Go to **API Access**
   - Generate an API key
   - Copy the keys:
     - General Assistant key → `VITE_DIFY_GENERAL_API_KEY`
     - Document Reviewer key → `VITE_DIFY_REVIEWER_API_KEY`

**Note:** If you don't have Dify API keys, the application will fall back to using Groq for all queries.

### 4. Final .env.local Configuration

Your `.env.local` file should look like this:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_actual_supabase_anon_key_here

# Groq API Configuration
VITE_GROQ_API_KEY=your_actual_groq_api_key_here

# Dify API Configuration (Optional)
VITE_DIFY_REVIEWER_API_KEY=your_actual_dify_reviewer_key_here
VITE_DIFY_GENERAL_API_KEY=your_actual_dify_general_key_here
```

## 📦 Project Structure

```
Justor-AI-work-/
├── public/
│   └── assets/              # Static assets (logos, images)
├── src/
│   ├── components/
│   │   └── navbar.ts        # Navigation bar component
│   ├── locales/
│   │   └── translations.ts  # Bilingual translations
│   ├── pages/
│   │   ├── about.ts        # About page
│   │   ├── app.ts          # Main chat application
│   │   ├── landing.ts      # Landing page
│   │   ├── login.ts        # Authentication page
│   │   └── user-profile.ts # User profile page
│   ├── auth.ts             # Authentication logic
│   ├── counter.ts          # Counter utility
│   ├── i18n.ts             # Internationalization service
│   ├── main.ts             # Application entry point
│   ├── style.css           # Global styles
│   └── supabaseClient.ts   # Supabase client configuration
├── .env.local              # Environment variables (create this)
├── .env.local.example      # Environment variables template
├── .gitignore              # Git ignore rules
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vercel.json             # Vercel deployment config
└── README.md               # This file
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Build
npm run build        # Build for production (TypeScript compilation + Vite build)

# Preview
npm run preview      # Preview production build locally
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in **Settings** > **Environment Variables**
5. Deploy!

The `vercel.json` configuration file is already set up for proper routing.

### Other Platforms

You can deploy to any static hosting platform:
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

Just run `npm run build` and deploy the `dist` folder.

## 🎨 Tech Stack

- **Frontend Framework:** Vanilla TypeScript
- **Build Tool:** Vite
- **Styling:** Custom CSS with CSS Variables
- **Authentication:** Supabase Auth
- **Database:** Supabase PostgreSQL
- **AI Services:** Groq, Dify
- **Markdown Rendering:** Marked.js
- **Diagram Rendering:** Mermaid.js
- **Document Processing:** PDF.js, Tesseract.js

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Troubleshooting

### Common Issues

**Issue: "Supabase URL and Anon Key must be defined"**
- Solution: Make sure you've created `.env.local` and added your Supabase credentials

**Issue: API calls failing**
- Solution: Check that all API keys are correct and have proper permissions
- Verify your internet connection
- Check browser console for detailed error messages

**Issue: Dark mode not working**
- Solution: Clear browser cache and reload

**Issue: Voice features not working**
- Solution: Make sure you've granted microphone permissions in your browser
- Note: Voice features may not work in all browsers (works best in Chrome)

**Issue: Document upload failing**
- Solution: Check file size (must be under 10MB)
- Ensure Dify API keys are configured
- Check file format is supported

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Search existing [GitHub Issues](https://github.com/t4j44/Justor-AI-work-/issues)
3. Create a new issue with detailed information

## 🌟 Acknowledgments

- Powered by [Supabase](https://supabase.com)
- AI inference by [Groq](https://groq.com)
- Advanced workflows by [Dify](https://dify.ai)
- Icons from [Heroicons](https://heroicons.com)

---

Made with ❤️ for the people of Bangladesh
