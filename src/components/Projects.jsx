import { useEffect, useState } from 'react';
import { Icon } from './Icons.jsx';
import localProjects from '../data/projects.js';
import { normalize, safeUrl } from '../data/normalize.js';
import { apiFetch, API_READY, trackEvent } from '../api.js';
import { useReveal } from '../hooks/useReveal.js';
import { useLang } from '../hooks/useLang.js';
import { STRINGS, pick } from '../i18n/translations.js';

function ProjectCard({ p, index, featured, lang, tr }) {
  const [ref, shown] = useReveal();
  const [imgFailed, setImgFailed] = useState(false);

  const live = safeUrl(p.live);
  const repo = safeUrl(p.repo);
  const main = live || repo;

  const showImage = p.image && !imgFailed;
  const shotClass = 'shot' + (showImage ? '' : ' shot-empty');
  const track = () => trackEvent('project', p.title);

  const inner = showImage ? (
    <img
      src={p.image}
      alt={`Capture d'écran du projet ${p.title}`}
      width="1920"
      height="1080"
      loading="lazy"
      onError={() => setImgFailed(true)}
    />
  ) : (
    <span>{p.title}</span>
  );

  const badge =
    p.status === 'en_cours' ? (
      <span className="badge" data-state="wip">{tr.badgeWip}</span>
    ) : live ? (
      <span className="badge" data-state="live">{tr.badgeLive}</span>
    ) : null;

  return (
    <article
      ref={ref}
      className={`project reveal${featured ? ' is-featured' : ''}${shown ? ' is-in' : ''}`}
      style={{ '--d': `${featured ? 0 : (index % 2) * 90}ms` }}
    >
      {main ? (
        <a
          className={shotClass}
          href={main}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${p.title} : ${live ? tr.openLiveAria : tr.openRepoAria}`}
          onClick={track}
        >
          {inner}
        </a>
      ) : (
        <div className={shotClass}>{inner}</div>
      )}

      <div className="project-body">
        <div className="project-head"><h3>{p.title}</h3>{badge}</div>
        <p className="desc">{pick(lang, p.description, p.description_en)}</p>
        <ul className="chips">
          {p.stack.map((s) => <li key={s}>{s}</li>)}
        </ul>
        <div className="project-links">
          {live && (
            <a className="project-link" href={live} target="_blank" rel="noopener noreferrer" onClick={track}>
              {tr.viewLiveProject} <Icon name="arrow" size={14} />
            </a>
          )}
          {repo && (
            <a className="project-link" href={repo} target="_blank" rel="noopener noreferrer" onClick={track}>
              {tr.viewRepo} <Icon name="arrow" size={14} />
            </a>
          )}
          {!live && !repo && <span className="project-link is-missing">{tr.linkSoon}</span>}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState(() => localProjects.map(normalize));
  const [current, setCurrent] = useState('all');
  const [lang] = useLang();
  const tr = STRINGS[lang];

  const FILTERS = ['all', 'web', 'mobile', 'desktop', 'gaming'].map((k) => [k, tr.filters[k]]);

  useEffect(() => {
    if (!API_READY) return;
    let cancelled = false;

    (async () => {
      try {
        const data = await apiFetch('/public/projects');
        if (cancelled || !Array.isArray(data) || data.length === 0) return;
        const fresh = data.map(normalize);
        setProjects((prev) => (JSON.stringify(prev) === JSON.stringify(fresh) ? prev : fresh));
      } catch (err) {
        console.warn('[portfolio] API indisponible, projets locaux conservés.', err.message);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  const countOf = (key) =>
    key === 'all' ? projects.length : projects.filter((p) => p.category.includes(key)).length;

  const list = current === 'all' ? projects : projects.filter((p) => p.category.includes(current));

  return (
    <section className="section" id="projets">
      <div className="wrap">
        <h2>{tr.projectsTitle}</h2>
        <p className="section-intro">{tr.projectsIntro}</p>

        <div className="filters" role="group" aria-label="Filtrer les projets">
          {FILTERS.map(([key, label]) => (
            <button key={key} type="button" aria-pressed={current === key} onClick={() => setCurrent(key)}>
              {label} <span className="count">{countOf(key)}</span>
            </button>
          ))}
        </div>

        <div className="projects" aria-live="polite">
          {list.length ? (
            list.map((p, i) => (
              <ProjectCard
                key={`${current}-${p.title}`}
                p={p}
                index={i}
                featured={current === 'all' && i === 0}
                lang={lang}
                tr={tr}
              />
            ))
          ) : (
            <div className="empty">
              <span className="ico-box">
                <svg className="i" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12h-6l-2 3h-4l-2-3H2" />
                  <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                </svg>
              </span>
              <h3>{tr.noProjectsInCategory}</h3>
              <p>{tr.noProjectsText}</p>
              <button className="btn btn-sm" type="button" onClick={() => setCurrent('all')}>
                {tr.viewAllProjects}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}