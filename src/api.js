// ---------- API du back office ----------
// En local, l'API tourne sur le port 5000. En ligne, elle est sur Render.
// Pour changer l'adresse sans toucher au code : variable VITE_API_URL.
const LOCAL = ['localhost', '127.0.0.1'].includes(location.hostname);

export const API_URL =
  import.meta.env.VITE_API_URL ||
  (LOCAL ? 'http://localhost:5000/api' : 'https://backoffice-portfolio-admin-backend.vercel.app/api');

export const API_READY = !API_URL.includes('VOTRE-API');

export async function apiFetch(path, options = {}, timeout = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(API_URL + path, { ...options, signal: controller.signal });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || 'Erreur serveur.');
    return data;
  } finally {
    clearTimeout(timer);
  }
}

// ---------- Comptage des visites (une fois par session) ----------
export function trackVisit() {
  if (!API_READY) return;
  try {
    // Pour ne pas compter tes propres visites : localStorage.setItem('no-stats', '1')
    if (localStorage.getItem('no-stats') === '1') return;
    if (sessionStorage.getItem('visit-counted')) return;
    sessionStorage.setItem('visit-counted', '1');
  } catch (e) {}

  fetch(`${API_URL}/public/view`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ referrer: document.referrer }),
    keepalive: true,
  }).catch(() => {});
}

// ---------- Événements : section vue, projet ouvert, CV téléchargé ----------
export function trackEvent(type, label = '') {
  if (!API_READY) return;
  try {
    if (localStorage.getItem('no-stats') === '1') return;
  } catch (e) {}

  fetch(`${API_URL}/public/event`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, label }),
    keepalive: true,
  }).catch(() => {});
}
