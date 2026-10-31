import { useEffect, useState } from 'react';
import { Icon } from './Icons.jsx';
import { apiFetch, API_READY } from '../api.js';

// Valeurs de secours : affichées si l'API est lente ou éteinte.
const FALLBACK = [
  {
    id: 'claude-101',
    title: 'Claude 101',
    issuer: 'Claude Academy (Anthropic)',
    date: '2026',
    image: '/img/badge-claude-101.png',
    url: 'https://academy.claude.com/verify/ec56426ad6523dd8cd13574120efe3ab',
    description:
      "Certification couvrant les fondamentaux de Claude : prompting, cas d'usage, bonnes pratiques et sécurité.",
  },
];

// Lien complet (Cloudinary) gardé tel quel ; sinon fichier du dossier public/img/
const imagePath = (src) => {
  const s = String(src || '').trim();
  if (!s) return '';
  if (/^https?:\/\//i.test(s)) return s;
  return '/img/' + s.split('/').pop();
};

const safeUrl = (u) => (/^https?:\/\//i.test(u || '') ? u : '');

export default function Certifications() {
  const [items, setItems] = useState(FALLBACK);

  useEffect(() => {
    if (!API_READY) return undefined;
    let cancelled = false;

    (async () => {
      try {
        const rows = await apiFetch('/public/certifications');
        if (cancelled || !Array.isArray(rows)) return;
        setItems(
          rows.map((r) => ({
            id: r.id,
            title: r.title,
            issuer: r.issuer || '',
            date: r.date_label || '',
            image: imagePath(r.image),
            url: safeUrl(r.url),
            description: r.description || '',
          }))
        );
      } catch (err) {
        console.warn('[portfolio] API indisponible, certifications locales conservées.', err.message);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return (
    <section className="section" id="certifications">
      <div className="wrap">
        <h2>Certifications</h2>

        <p className="section-intro">
          Formations et certifications obtenues en complément de mon cursus.
        </p>

        {items.length === 0 ? (
          <p className="muted">De nouvelles certifications arrivent bientôt.</p>
        ) : (
          <div className="certs">
            {items.map((c) => {
              const meta = [c.issuer, c.date].filter(Boolean).join(' · ');
              const badge = c.image && (
                <img src={c.image} alt={`Badge de certification ${c.title}`} loading="lazy" />
              );

              return (
                <article className="cert-card" key={c.id ?? c.title}>
                  {badge && (
                    c.url ? (
                      <a
                        className="cert-badge"
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Voir le badge ${c.title}`}
                      >
                        {badge}
                      </a>
                    ) : (
                      <div className="cert-badge">{badge}</div>
                    )
                  )}

                  <div className="cert-body">
                    <h3>{c.title}</h3>
                    {meta && <p className="cert-meta">{meta}</p>}
                    {c.description && <p className="cert-desc">{c.description}</p>}

                    {c.url && (
                      <a className="project-link" href={c.url} target="_blank" rel="noopener noreferrer">
                        Vérifier la certification
                        <Icon name="arrow" size={14} />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
