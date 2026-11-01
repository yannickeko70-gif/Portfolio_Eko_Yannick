import { useEffect, useState } from 'react';
import { Icon } from './Icons.jsx';
import { EDUCATION } from '../data/content.js';
import { apiFetch, API_READY } from '../api.js';
import { useLang } from '../hooks/useLang.js';
import { STRINGS, pick } from '../i18n/translations.js';

export default function Education() {
  const [items, setItems] = useState(EDUCATION.map((e) => ({ ...e, _raw: true })));
  const [lang] = useLang();
  const tr = STRINGS[lang];
  const STATUS_UI = {
    en_cours: { badge: tr.badgeInProgress, current: true },
    diplome: { badge: tr.badgeGraduated, done: true },
    aucun: {},
  };

  useEffect(() => {
    if (!API_READY) return;
    let cancelled = false;
    (async () => {
      try {
        const rows = await apiFetch('/public/education');
        if (cancelled || !Array.isArray(rows) || rows.length === 0) return;
        setItems(rows);
      } catch (err) {
        console.warn('[portfolio] API indisponible, formation locale conservée.', err.message);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="section alt" id="formation">
      <div className="wrap split">
        <h2>{tr.educationTitle}</h2>
        <ol className="timeline">
          {items.map((r) => {
            const when = r._raw ? r.when : pick(lang, r.period, r.period_en);
            const title = r._raw ? r.title : pick(lang, r.title, r.title_en);
            const school = r._raw ? r.school : pick(lang, r.school, r.school_en);
            const ui = r._raw ? r : (STATUS_UI[r.status] || {});
            return (
              <li key={r.id ?? title} className={ui.current ? 'is-current' : undefined}>
                <div className="edu-top">
                  <p className="when">{when}</p>
                  {ui.badge && <span className={`edu-badge${ui.done ? ' edu-badge-done' : ''}`}>{ui.badge}</span>}
                </div>
                <h3>{title}</h3>
                {school && <p className="edu-school"><Icon name="cap" size={16} />{school}</p>}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}