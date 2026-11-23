import { useEffect, useMemo, useState } from 'react';
import { Icon } from './Icons.jsx';
import { SKILLS, SKILL_CATEGORIES } from '../data/content.js';
import { apiFetch, API_READY } from '../api.js';
import { useLang } from '../hooks/useLang.js';
import { STRINGS } from '../i18n/translations.js';

const FALLBACK_GROUPS = SKILLS
  .filter((group) => group.items.length > 0)
  .map((group) => ({ ...group, title: group.key }));

function groupSkills(rows) {
  return SKILL_CATEGORIES.map((category) => ({
    key: category.key,
    icon: category.icon,
    title: category.key,
    items: rows.filter((skill) => skill.category === category.key).map((skill) => skill.name),
  })).filter((group) => group.items.length > 0);
}

export default function Skills() {
  const [groups, setGroups] = useState(FALLBACK_GROUPS);
  const [current, setCurrent] = useState('all');
  const [lang] = useLang();
  const tr = STRINGS[lang];

  useEffect(() => {
    if (!API_READY) return;
    let cancelled = false;

    const loadSkills = async () => {
      try {
        const rows = await apiFetch('/public/skills', { cache: 'no-store' });
        if (!cancelled && Array.isArray(rows)) setGroups(groupSkills(rows));
      } catch (err) {
        console.warn('[portfolio] API compétences indisponible, contenu précédent conservé.', err.message);
      }
    };

    loadSkills();
    const interval = window.setInterval(loadSkills, 30_000);
    const refreshOnReturn = () => {
      if (document.visibilityState === 'visible') loadSkills();
    };
    document.addEventListener('visibilitychange', refreshOnReturn);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', refreshOnReturn);
    };
  }, []);

  const counts = useMemo(() => Object.fromEntries(
    groups.map((group) => [group.key, group.items.length])
  ), [groups]);
  const visibleGroups = current === 'all' ? groups : groups.filter((group) => group.key === current);

  return (
    <section className="section alt" id="competences">
      <div className="wrap">
        <h2>{tr.skillsTitle}</h2>
        <p className="section-intro">{tr.skillsIntro}</p>

        <div className="filters skill-filters" role="group" aria-label={tr.filterSkills}>
          <button type="button" aria-pressed={current === 'all'} onClick={() => setCurrent('all')}>
            {tr.allSkills} <span className="count">{groups.reduce((sum, group) => sum + group.items.length, 0)}</span>
          </button>
          {SKILL_CATEGORIES.filter((category) => counts[category.key]).map((category) => (
            <button
              key={category.key}
              type="button"
              aria-pressed={current === category.key}
              onClick={() => setCurrent(category.key)}
            >
              {tr.skillCategories[category.key] || category.title}
              <span className="count">{counts[category.key]}</span>
            </button>
          ))}
        </div>

        <div className="skills" aria-live="polite">
          {visibleGroups.length ? visibleGroups.map((s) => (
            <article className="skill-card" key={s.key}>
              <div className="skill-head">
                <span className="ico-box ico-sm"><Icon name={s.icon} size={18} /></span>
                <h3>{tr.skillCategories[s.key] || s.title}</h3>
              </div>
              <ul className="chips">
                {s.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          )) : (
            <div className="empty skill-empty">
              <h3>{tr.noSkillsInCategory}</h3>
              {current !== 'all' && (
                <button className="btn btn-sm" type="button" onClick={() => setCurrent('all')}>
                  {tr.viewAllSkills}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
