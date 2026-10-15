import { useEffect, useState } from 'react';
import { Icon } from './Icons.jsx';
import { SKILLS, SKILL_CATEGORIES } from '../data/content.js';
import { apiFetch, API_READY } from '../api.js';

export default function Skills() {
  const [groups, setGroups] = useState(SKILLS);

  useEffect(() => {
    if (!API_READY) return;
    let cancelled = false;

    (async () => {
      try {
        const rows = await apiFetch('/public/skills');
        if (cancelled || !Array.isArray(rows) || rows.length === 0) return;

        setGroups(
          SKILL_CATEGORIES.map((c) => ({
            icon: c.icon,
            title: c.title,
            ai: c.ai,
            items: rows.filter((r) => r.category === c.key).map((r) => r.name),
          })).filter((g) => g.items.length > 0)
        );
      } catch (err) {
        console.warn('[portfolio] API indisponible, compétences locales conservées.', err.message);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return (
    <section className="section alt" id="competences">
      <div className="wrap">
        <h2>Compétences</h2>
        <p className="section-intro">
          Les langages, frameworks et outils que j'utilise pour concevoir et livrer mes projets.
        </p>
        <div className="skills">
          {groups.map((s) => (
            <article className="skill-card" key={s.title}>
              <div className="skill-head">
                <span className="ico-box ico-sm"><Icon name={s.icon} size={18} /></span>
                <h3>{s.title}</h3>
                {s.ai && <span className="tag-ai">Avec l'IA</span>}
              </div>
              <ul className="chips">
                {s.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}