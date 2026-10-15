// Met les projets (projects.js ou API) dans un format unique
const toList = (v) => [].concat(v || []).map((x) => String(x).trim()).filter(Boolean);

// Images : lien complet (Cloudinary) gardé tel quel ; sinon fichier du dossier public/img/
const imagePath = (src) => {
  const s = String(src || '').trim();
  if (!s) return '';
  if (/^https?:\/\//i.test(s)) return s;
  return '/img/' + s.split('/').pop();
};

export const normalize = (p) => ({
  title: String(p.title || ''),
  description: String(p.description || ''),
  category: toList(p.category).map((c) => c.toLowerCase()),
  stack: toList(p.stack),
  image: imagePath(p.image),
  live: String(p.live || ''),
  repo: String(p.repo || ''),
  status: p.status === 'en_cours' ? 'en_cours' : 'termine',
});

// N'autorise que les liens http(s)
export const safeUrl = (u) => (/^https?:\/\//i.test(u || '') ? u : '');
