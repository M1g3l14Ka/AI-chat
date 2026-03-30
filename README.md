# AI Voice Assistant

## **Live** [https://lite-chat.michaelkasion.ru/](https://lite-chat.michaelkasion.ru/)

# Hi there 👋
Interactive web application that allows users to communicate with an AI via text or voice. Built as a full-stack project to demonstrate modern web development practices.

##  Features
- **Smart Chat Interface:** Real-time text interaction with AI.
- **Voice Input:** Native voice-to-text integration using the Web Speech API.
- **Robust UX:** Clean, minimalist dark-themed interface, loading states, and error handling.
- **Full-Stack Architecture:** Separated client-server logic for secure API communication.

## 🛠️ Tools & Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS.
- **Backend:** Node.js, Express.js.
- **AI Integration:** Google Generative AI (Gemini API).
- **Web API:** Web Speech API for real-time transcription.

## 🗂️ Structure
- `/client`: Frontend application built with React & Vite.
- `/server`: Backend API proxy handling AI requests and environment variables.

## 🤔 What I Learned
- **Web Speech API:** Implemented native browser-based voice recognition without heavy third-party dependencies.
- **Full-stack Communication:** Configured CORS and Proxy to facilitate seamless communication between React frontend and Express backend.
- **AI Integration:** Successfully integrated Gemini API, handled stream responses and error states.
- **Environment Security:** Secured API keys using `.env` files and `dotenv`.
- **UI/UX:** Designed a responsive, modern interface using Tailwind CSS.

## Future Improvements
- **Chat History:** Persistent storage of conversations.
- **Voice Response:** Integrating Text-to-Speech (TTS) for AI replies.
- **Deployment:** CI/CD pipeline setup for automated deployment.

## 🛜 How to Run Locally

### Option 1: Install all dependencies at once
```bash
npm run install-all
```

### Option 2: Manual setup
1. Clone the repository and navigate to the project folder.
2. **Setup Server:**
   - Go to `server` folder: `cd server`
   - Run `npm install`
   - Create `.env` file with `API_KEY=your_key_here`
   - Run `npm run dev`
3. **Setup Client:**
   - Go to `client` folder: `cd client`
   - Run `npm install`
   - Run `npm run dev`
4. Access the app at `http://localhost:5173`

### Quick Start (from root)
```bash
# Terminal 1 - Start server
npm run dev:server

# Terminal 2 - Start client
npm run dev:client
```

## 🚀 Deploy to Vercel

### Server Deployment
1. Go to [Vercel](https://vercel.com)
2. Import your repository
3. Set **Root Directory** to `server`
4. Add environment variable: `API_KEY` (get it from [Google AI Studio](https://aistudio.google.com/app/apikey))
5. Deploy

### Client Deployment
1. Go to [Vercel](https://vercel.com)
2. Import your repository
3. Set **Root Directory** to `client`
4. Add environment variable: `VITE_API_URL` = your deployed server URL (e.g., `https://your-server.vercel.app`)
5. Deploy

> **Note:** For production, update the API endpoint in `client/src/App.tsx` to use the deployed server URL instead of relative `/api/chat`.

## 📄 License
ISC
