# Lite Chat with AI - Deployment Guide

## Structure

This is a monorepo with:
- `/client` - Vite + React frontend
- `/api` - Vercel Serverless Functions (backend API)

## Local Development

### 1. Install dependencies

```bash
# Root (for API)
npm install

# Client
cd client
npm install
```

### 2. Set up environment variables

Create `.env` in the root directory:

```
API_KEY=your_google_ai_api_key_here
```

Get your API key from: https://aistudio.google.com/app/apikey

### 3. Run

```bash
# Terminal 1 - API (root)
npm run dev

# Terminal 2 - Client
cd client
npm run dev
```

The client will proxy API requests to the server automatically.

## Vercel Deployment

### Single Project Deployment

1. Push code to GitHub

2. In Vercel Dashboard:
   - **Add New Project**
   - Import your GitHub repo `lite-chat-with-ai`
   - **Root Directory**: Leave empty (use root)
   - **Framework Preset**: Vite
   - Add Environment Variable: `API_KEY` = your Google AI key

3. Deploy!

The API will be available at: `https://your-project.vercel.app/api/chat`

### Environment Variables in Vercel

In Vercel Dashboard → Project Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `API_KEY` | Your Google Generative AI key |

## Troubleshooting

### 405 Method Not Allowed
- Make sure you're sending POST requests to `/api/chat`

### AI Error
- Check if `API_KEY` is set correctly in Vercel
- Verify the API key is valid at https://aistudio.google.com/app/apikey

### Build Fails
- Make sure root `package.json` exists with `@google/generative-ai` dependency
