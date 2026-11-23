# Project memory — Kaunain Kasab portfolio

Facts, decisions and history for this project. Read this before changing anything.
How-to steps live in [SKILL.md](SKILL.md). Both files are kept identical in the backend and frontend repos.

## Owner

- **Kaunain Kasab**, Frontend Developer, Delhi, India
- Email `kaunainkasab@gmail.com`, phone `+91 80707 40009`, WhatsApp `https://wa.me/918070740009`
- Frontend Developer at **Proveway since January 2024** (not 2022; this was corrected once)
- Freelance developer with **Sun-Bean**
- MCA and BCA from **Lovely Professional University**
- Purpose of the site: win freelance work building **websites and mobile apps**

## Layout and hosting

```
portfolio/                 (local folder, NOT a git repo)
├── CLAUDE.md              loads MEMORY.md + SKILL.md for Claude
├── README.md              setup, email, API reference
├── backend/   → github.com/konain1/porfolio_nov            → Render
└── frontend/  → github.com/konain1/porfolio_nov_frontend   → Vercel
```

| Part | Live URL | Deploys |
| --- | --- | --- |
| Frontend | https://porfolionovfrontend.vercel.app | Vercel, on push to `main` |
| Backend API | https://my-portfolio-api-4k2d.onrender.com/api | Render, on push to `main` (~1 min) |
| Database | MongoDB Atlas (`kaunain_portfolio`) | — |

- Vercel also serves branch/deploy URLs like `porfolionovfrontend-git-main-<team>.vercel.app`.
- Render free plan sleeps after ~15 min idle; first request can take ~50 s. The frontend shows its bundled copy (`fallback.js`) meanwhile.

## Stack

- **Backend:** Node 18+, Express 4, Mongoose 8, helmet, cors, express-rate-limit, dotenv, Nodemailer. ESM (`"type": "module"`). Local port **5050** (5000 is taken by macOS AirPlay).
- **Frontend:** React 18, Vite 6, react-icons. Plain CSS with design tokens in `src/index.css`, dark (default) and light theme via `data-theme`. Local port 5173; Vite proxies `/api` → `localhost:5050`.

## Where things are

| What | File |
| --- | --- |
| All site content (profile, services, experience, skills, projects) | `backend/src/seed/data.js` |
| Offline copy of that content | `frontend/src/data/fallback.js` (same content, different 1-line header comment) |
| API base URL | `frontend/src/api.js` (`LIVE_API`; `VITE_API_URL` overrides; dev uses `/api`) |
| CORS allowlist | `backend/src/app.js` (`DEFAULT_ORIGINS` + `CLIENT_URL` + regex for Vercel deploy URLs) |
| Email sending (Brevo or SMTP) | `backend/src/config/mailer.js` |
| Alert + auto-reply email templates | `backend/src/services/contactEmails.js` |
| Contact route (validation, rate limit, honeypot, test-email) | `backend/src/routes/contact.js` |
| Mongoose models | `backend/src/models/index.js` |
| Icon name → icon maps | `frontend/src/icons.jsx` |
| Page sections | `frontend/src/components/*.jsx` (Navbar, Hero, About, Services, Journey, Skills, Projects, Contact, Footer) |
| CV for "Download CV" | `frontend/public/resume.pdf` |

Allowed icon names (anything else shows no icon unless added to `icons.jsx`):
- skills: `react javascript tailwind typescript nextjs reactnative node mongodb git figma`
- services: `web mobile design speed`
- experience: `work freelance education`
- socials: `linkedin github twitter instagram whatsapp` (empty string = hidden)

## Email (contact form)

- Every message is saved in MongoDB first, then two emails go out in the background:
  1. alert to `MAIL_TO` (Reply-To = visitor), 2. auto-reply to the visitor (`AUTO_REPLY=true`).
- Email failures are only logged; the form still succeeds.
- **Render free plan blocks SMTP ports**, so production uses the **Brevo HTTPS API** (`BREVO_API_KEY`, `MAIL_FROM`). Locally Gmail SMTP with an App Password works. If both are set, Brevo wins.
- Brevo account: sender must be verified (Settings → Senders, domains, IPs). API key is under SMTP & API → **API keys** tab (`xkeysib-…`), not the SMTP key. Don't enable Brevo's IP restriction (Render has no fixed IP).
- "Freemail domain" / DKIM warnings in Brevo are expected for an `@gmail.com` sender; emails may land in Spam at first. A custom domain would fix it.
- `GET /api/health` shows the active provider: `brevo` | `smtp` | `off`.

## Secrets (never commit, never paste in chat)

`MONGO_URI`, `ADMIN_KEY`, `BREVO_API_KEY`, `SMTP_PASS` live in `backend/.env` (gitignored) and in Render → Environment.
Frontend `.env.*` files are gitignored, so production config that must ship is hardcoded (`LIVE_API`).

## History

| Date | Change |
| --- | --- |
| Nov 2026 | Built MERN portfolio from a design screenshot (separate frontend/backend). |
| Nov 2026 | Nodemailer contact emails + auto-reply. |
| Nov 2026 | Career start corrected to Jan 2024. |
| Nov 2026 | Deployed: Render + Vercel. Fixed CORS (`DEFAULT_ORIGINS`) and hardcoded `LIVE_API` (`.env.production` was gitignored). |
| 2026-11-23 | Switched production email to Brevo API (Render blocks SMTP); added admin `POST /api/contact/test-email`. Verified working. |
| 2026-11-23 | CORS now also allows Vercel branch/deploy URLs. Contact form verified working end to end. |

## Still to do (content)

- Replace the 6 **sample projects** (ShopNest, Insightly, FitPulse, Wanderly, FoodieHub, Bloom Studio) with real work.
- Add LinkedIn / GitHub links (`profile.socials`).
- Add a photo (`frontend/public/avatar.png` + `profile.avatar`); currently a "KK" monogram.
- Check skill percentages and the `10+` Projects stat.
- Optional: custom domain (for the site and for email deliverability).
