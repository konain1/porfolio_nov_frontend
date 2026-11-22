# Portfolio Frontend

Modern, responsive portfolio website built with React 18 and Vite.

## Tech Stack
- **React 18**
- **Vite**
- **React Icons**
- Pure CSS with modern animations & responsive layouts

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Environment Variables (Optional)
Copy `.env.example` to `.env` if targeting an external production API:
```bash
cp .env.example .env
```
- In development, Vite automatically proxies `/api` requests to `http://localhost:5050`.
- In production, set `VITE_API_URL` to your hosted backend API URL (e.g., `https://api.yourdomain.com/api`).

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build for Production
```bash
npm run build
```
Preview production build:
```bash
npm run preview
```
