# Personal AI Chat App

A full-stack chat application with a modern React UI and an Express backend powered by Google Gemini.

## Live Demo

Check out the live demo here: [https://personal-ai-chat-app-seven.vercel.app/](https://personal-ai-chat-app-seven.vercel.app/)

## Overview

This project lets you:

- Type a prompt in a chat-style interface
- Send the prompt to a Node.js API
- Generate an AI response using `gemini-2.5-flash`
- Render formatted output in the UI with Markdown support

## Tech Stack

### Client

- React 19 + Vite
- Tailwind CSS 4 (via Vite plugin)
- Axios
- react-markdown

### Server

- Node.js + Express
- CORS
- dotenv
- @google/generative-ai

## Project Structure

```text
chatApp/
	client/
		src/
			App.jsx
			App.css
			index.css
			Loading.jsx
		package.json
	server/
		index.js
		package.json
	README.md
```

## Prerequisites

- Node.js 18+
- npm
- A Google AI API key

## Setup

### 1. Clone and open project

```bash
git clone <https://github.com/codemanav16/Personal-AI-Chat-App>
cd chatApp
```

### 2. Install dependencies

Install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies:

```bash
cd ../client
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `server` folder:

```env
KEY=your_google_ai_api_key
PORT=8000
```

Notes:

- `KEY` is required for Gemini requests.
- `PORT` is optional. Defaults to `8000`.

## Run the App

Use two terminals.

### Terminal 1: Start backend

```bash
cd server
npm start
```

Backend runs on `http://localhost:8000` by default.

### Terminal 2: Start frontend

```bash
cd client
npm run dev
```

Frontend runs on `http://localhost:5173` (or next available Vite port).

## API

### POST `/ask`

Request body:

```json
{
	"question": "Write a friendly welcome message for a new customer"
}
```

Success response shape:

```json
{
	"_status": true,
	"_message": "Content Found..",
	"finalData": "...AI response text...",
	"_finalData": "...AI response text..."
}
```

Fallback response (if generation fails) returns readable text in `finalData`.

## Available Scripts

### Client (`client/package.json`)

- `npm run dev` - Start Vite dev server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Server (`server/package.json`)

- `npm start` - Start backend using nodemon

## Troubleshooting

### `npm start` or `npm run dev` fails

- Make sure you are running commands from the correct folder:
	- backend commands from `server`
	- frontend commands from `client`
- Ensure `npm install` was run in both folders.

### API key errors or empty responses

- Verify `server/.env` exists and contains a valid `KEY`.
- Restart backend after editing `.env`.

### CORS or network error in browser

- Confirm backend is running on `http://localhost:8000`.
- Confirm frontend is sending requests to the same backend URL.

## Security Notes

- Never commit `.env` files.
- Keep your Gemini API key private.

## Future Improvements

- Add conversation history persistence
- Add stream responses for token-by-token output
- Add input validation and rate limiting
- Add Docker setup for one-command local start
