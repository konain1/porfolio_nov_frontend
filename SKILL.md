---
name: portfolio-update
description: Step-by-step workflows for updating and upgrading Kaunain Kasab's MERN portfolio — content edits, new projects, new sections, API changes, email/CORS fixes, verification and deploy. Use for any change to this project.
---

# Portfolio update & upgrade guide

Facts about the project (URLs, files, decisions, history) are in [MEMORY.md](MEMORY.md). This file is the "how".

## Ground rules

1. **Content lives in one place:** `backend/src/seed/data.js`. Never hardcode profile text in components.
2. After editing `data.js`, **sync the offline copy**:
   ```bash
   { echo "// Bundled copy of backend/src/seed/data.js — shown while the API loads or if it is unreachable."; tail -n +3 backend/src/seed/data.js; } > frontend/src/data/fallback.js
   ```
3. **Secrets** (`MONGO_URI`, `ADMIN_KEY`, `BREVO_API_KEY`, `SMTP_PASS`) only go in `backend/.env` and Render → Environment. Never in git, the frontend, or chat.
4. **Ask before every commit/push.** Pushing to `main` deploys immediately (Render backend, Vercel frontend).
5. Commit style: `feat: …`, `fix: …`, `chore: …`, `docs: …`.
6. After any change, update the **History** / **Still to do** tables in `MEMORY.md`, then copy both docs to the other repo:
   ```bash
   cp backend/MEMORY.md backend/SKILL.md frontend/
   ```

## 1. Change content (text, skills, stats, experience, socials)

1. Edit `backend/src/seed/data.js`.
2. Sync `fallback.js` (rule 2).
3. Update the database: `cd backend && npm run seed`.
   - Seeds whatever `MONGO_URI` is in `backend/.env`. If that is the Atlas URI Render uses, the **live site updates right away**. Check before running.
   - Seed wipes and reloads profile/services/experience/skills/projects. **Contact messages are never touched.**
4. Push the **frontend** (so the offline copy matches) and the **backend** (so `data.js` in git matches the DB).

Icons: only the names listed in MEMORY.md work. For a new one, import it from `react-icons` in `frontend/src/icons.jsx` and add it to the right map.

## 2. Add a real project

Add an object to `projects` in `data.js`:

```js
{
  title: 'Project name',
  subtitle: 'E-commerce Store',          // short type label
  description: 'One or two sentences on what it does and the result.',
  category: 'web',                       // 'web' or 'mobile' (drives the filter tabs)
  tech: ['React', 'Node.js'],
  color: '#8b5cf6',                      // accent for the generated mockup
  image: '/projects/name.png',           // optional: file in frontend/public/projects/
  liveUrl: 'https://…',                  // optional
  githubUrl: 'https://github.com/…',     // optional
}
```

Then follow section 1. Screenshots: ~1200×750, compressed (WebP/PNG under ~300 KB).
Projects can also be managed through the admin API (`POST/PUT/DELETE /api/projects`), but the next `npm run seed` overwrites them, so prefer `data.js`.

## 3. Add a photo or CV

- Photo: `frontend/public/avatar.png`, then `profile.avatar: '/avatar.png'` in `data.js` (section 1).
- CV: replace `frontend/public/resume.pdf`, push frontend.

## 4. Add a new page section or UI feature

1. If it needs data: add the field/array to `data.js` and, if it is a new collection, a model in `backend/src/models/index.js`, insert it in `backend/src/seed/seed.js`, and return it from `backend/src/routes/portfolio.js`.
2. Create `frontend/src/components/NewSection.jsx`, following an existing one (e.g. `Services.jsx`): `<section id="…" className="section container">`, a `section-head reveal` heading block, and the `reveal` class on items for the scroll animation.
3. Render it in `frontend/src/App.jsx` and add a nav link in `Navbar.jsx` if it needs one.
4. Use the CSS variables from `src/index.css` (colors, radius, shadows), never hardcoded colors, so dark and light themes both work.
5. Check desktop, mobile (~375 px) and light theme.

## 5. Change the backend API

- New route: file in `backend/src/routes/`, mount in `backend/src/app.js` under `/api/...`.
- Admin-only routes: add the `requireAdmin` middleware (header `x-admin-key`).
- Public POST routes: add validation and a rate limiter like `routes/contact.js`.
- New frontend call: add a function in `frontend/src/api.js` using `request()`.

## 6. Frontend on a new domain (custom domain, Netlify, etc.)

The browser blocks the API with CORS until the domain is allowed. Either add it to `DEFAULT_ORIGINS` in `backend/src/app.js` and push, or add it to `CLIENT_URL` on Render (comma-separated, no trailing slash). Check:

```bash
curl -s -o /dev/null -D - -X OPTIONS -H "Origin: https://NEW-DOMAIN" -H "Access-Control-Request-Method: POST" -H "Access-Control-Request-Headers: content-type" https://my-portfolio-api-4k2d.onrender.com/api/contact | grep -i access-control-allow-origin
```

No `access-control-allow-origin` line = still blocked. The site shows "Couldn't reach the server" when this happens.

## 7. Email problems

1. `curl -s https://my-portfolio-api-4k2d.onrender.com/api/health` → `email` must be `brevo` on Render.
   - `smtp` on Render = `BREVO_API_KEY` missing (SMTP is blocked there). `off` = nothing configured.
2. Send a test (admin key from Render → Environment):
   ```bash
   curl -X POST -H "x-admin-key: ADMIN_KEY" https://my-portfolio-api-4k2d.onrender.com/api/contact/test-email
   ```
   Returns `{"ok":true}` or Brevo's exact error. Common ones: 401 = wrong/deleted key; sender not verified = verify `MAIL_FROM` in Brevo; unrecognised IP = turn off Brevo's authorized-IP restriction.
3. Arrived but in Spam → mark "Not spam". Lasting fix: custom domain authenticated in Brevo.
4. Messages are always in the DB regardless: `curl -H "x-admin-key: ADMIN_KEY" https://my-portfolio-api-4k2d.onrender.com/api/contact`.

## 8. Verify before pushing

```bash
cd backend && npm run dev            # API on :5050
cd frontend && npm run dev           # site on :5173
cd frontend && npm run build         # must build with no errors
```

Check: all sections render, theme toggle, mobile width, project filters, contact form (validation + success). Don't leave test messages in the DB (`DELETE /api/contact/:id`).

After pushing, confirm live:

```bash
curl -s https://my-portfolio-api-4k2d.onrender.com/api/health
curl -s -o /dev/null -w "%{http_code}\n" https://my-portfolio-api-4k2d.onrender.com/api/portfolio
```

Render takes ~1 min to deploy, Vercel ~30 s.

## Upgrade ideas (not done yet)

- Real projects with screenshots; LinkedIn/GitHub links; photo.
- Custom domain for the site and email (better deliverability, removes Brevo warnings).
- SEO: meta description, Open Graph image, `sitemap.xml`, `robots.txt`.
- Testimonials section (client quotes) — strong for freelance leads.
- Small admin page to read contact messages instead of curl.
- Analytics (Vercel Analytics or Plausible).
