import { useEffect, useState } from 'react';
import { Icon } from './Icons.jsx';
import { EDUCATION } from '../data/content.js';
import { apiFetch, API_READY } from '../api.js';

const STATUS_UI = {
  en_cours: { badge: 'En cours', current: true },
  diplome: { badge: 'Diplômé', done: true },
  aucun: {},
};

export default function Education() {
  const [items, setItems] = useState(EDUCATION);

  useEffect(() => {
    if (!API_READY) return;
    let cancelled = false;

    (async () => {
      try {
        const rows = await apiFetch('/public/education');
        if (cancelled || !Array.isArray(rows) || rows.length === 0) return;

        setItems(
          rows.map((r) => ({
            id: r.id,
            when: r.period,
            title: r.title,
            school: r.school || '',
            ...(STATUS_UI[r.status] || {}),
          }))
        );
      } catch (err) {
        console.warn('[portfolio] API indisponible, formation locale conservée.', err.message);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return (
    <section className="section alt" id="formation">
      <div className="wrap split">
        <h2>Formation</h2>
        <ol className="timeline">
          {items.map((e) => (
            <li key={e.id ?? e.title} className={e.current ? 'is-current' : undefined}>
              <div className="edu-top">
                <p className="when">{e.when}</p>
                {e.badge && (
                  <span className={`edu-badge${e.done ? ' edu-badge-done' : ''}`}>{e.badge}</span>
                )}
              </div>
              <h3>{e.title}</h3>
              {e.school && <p className="edu-school"><Icon name="cap" size={16} />{e.school}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}