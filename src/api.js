const API = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
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
