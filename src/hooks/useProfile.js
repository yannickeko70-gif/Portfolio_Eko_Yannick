import { useEffect, useState } from 'react';
import { apiFetch, API_READY, API_URL } from '../api.js';
import { LINKS } from '../data/content.js';

// Valeurs de secours : affichées tant que l'API n'a pas répondu (ou si elle est éteinte).
export const DEFAULT_PROFILE = {
  first_name: 'Eko',
  last_name: 'Yannick',
  role: 'Concepteur / Développeur FullStack / Designeur UX/UI',
  availability: 'Disponible pour toute opportunité',
  lead:
    "Étudiant en Bachelor Conception et Développement Web FullStack (CDWFS) à l'Institut Universitaire de la Côte, à Douala. Je conçois des applications web, des outils desktop et des jeux vidéo.",
  about:
    "Titulaire d'un DEC canadien en Programmation et applications mobiles, je poursuis un Bachelor Bac+3 en développement web FullStack. J'aime concevoir des interfaces claires et construire des applications complètes, de la maquette jusqu'au déploiement. Je souhaite aussi développer mes compétences en intelligence artificielle pour créer des solutions numériques intelligentes.",
  location: 'Douala, Cameroun',
  studies: 'Bachelor Bac+3 CDWFS',
  languages: 'Français, anglais',
  interests: "Football, basketball, natation, jeu vidéo",
  email: LINKS.email,
  phone: '+237 655 50 43 97',
  whatsapp: '',
  github: LINKS.github,
  linkedin: LINKS.linkedin,
  photo: '',
  has_cv: false,
  cv_updated_at: null,
};

export const FALLBACK_PHOTO = '/img/yannick_eko.PNG';
export const FALLBACK_CV = '/doc/CV EKO YANNICK.pdf';

// Ces champs ne peuvent pas rester vides : si l'API renvoie du vide, on garde le texte de secours.
const NEVER_EMPTY = ['first_name', 'last_name', 'role', 'lead', 'about', 'email'];

// Une seule requête pour toute la page, partagée par tous les composants.
let request = null;
function loadProfile() {
  if (!request) request = apiFetch('/public/profile').catch(() => null);
  return request;
}

function merge(api) {
  const next = { ...DEFAULT_PROFILE };
  Object.keys(DEFAULT_PROFILE).forEach((key) => {
    if (api[key] === undefined || api[key] === null) return;
    if (NEVER_EMPTY.includes(key) && !String(api[key]).trim()) return;
    next[key] = api[key];
  });
  return next;
}

export function useProfile() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);

  useEffect(() => {
    if (!API_READY) return undefined;
    let cancelled = false;
    loadProfile().then((data) => {
      if (!cancelled && data && typeof data === 'object') setProfile(merge(data));
    });
    return () => { cancelled = true; };
  }, []);

  return profile;
}

// ---------- Aides d'affichage ----------
export const photoSrc = (p) => p.photo || FALLBACK_PHOTO;

export const cvHref = (p) =>
  p.has_cv
    ? `${API_URL}/public/cv${p.cv_updated_at ? `?v=${encodeURIComponent(p.cv_updated_at)}` : ''}`
    : FALLBACK_CV;

export const initials = (p) =>
  `${(p.first_name || '?')[0]}${(p.last_name || '')[0] || ''}`.toUpperCase();

export const telHref = (phone) => `tel:${String(phone).replace(/[^\d+]/g, '')}`;

// Lien WhatsApp : chiffres uniquement ; un numéro camerounais à 9 chiffres reçoit l'indicatif 237.
export const waHref = (p) => {
  const digits = String(p.whatsapp || p.phone || '').replace(/\D/g, '');
  if (!digits) return '';
  return `https://wa.me/${digits.length === 9 ? `237${digits}` : digits}`;
};

export const shortUrl = (url) => String(url).replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, '');
