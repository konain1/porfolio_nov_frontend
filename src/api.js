const LIVE_API = 'https://my-portfolio-api-4k2d.onrender.com/api';

// Dev (`npm run dev`) → local backend via the Vite proxy. Production build → Render.
// VITE_API_URL overrides both if set.
const API = (import.meta.env.VITE_API_URL || (import.meta.env.PROD ? LIVE_API : '/api')).replace(/\/$/, '');

async function request(path, options = {}) {
  // Only send Content-Type when there is a body, so plain GETs skip the CORS preflight round trip.
  const headers = options.body ? { 'Content-Type': 'application/json' } : undefined;
  const res = await fetch(`${API}${path}`, { headers, ...options });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(body.message || `Request failed (${res.status})`);
    err.errors = body.errors;
    throw err;
  }
  return body;
}

export const getPortfolio = () => request('/portfolio');
export const sendMessage = (payload) => request('/contact', { method: 'POST', body: JSON.stringify(payload) });
