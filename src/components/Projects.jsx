import { useEffect, useState } from 'react';
import { Icon } from './Icons.jsx';
import localProjects from '../data/projects.js';
import { normalize, safeUrl } from '../data/normalize.js';
import { apiFetch, API_READY, trackEvent } from '../api.js';
import { useReveal } from '../hooks/useReveal.js';

const FILTERS = [
  ['all', 'Tous'],
  ['web', 'Web'],
  ['mobile', 'Mobile'],
  ['desktop', 'Desktop'],
  ['gaming', 'Gaming'],
];

function ProjectCard({ p, index, featured }) {
  const [ref, shown] = useReveal();
  const [imgFailed, setImgFailed] = useState(false);

  const live = safeUrl(p.live);
  const repo = safeUrl(p.repo);
  // La photo ouvre le site en ligne s'il existe, sinon le dépôt GitHub
  const main = live || repo;
  const mainLabel = live ? 'ouvrir le projet en ligne' : 'ouvrir le dépôt GitHub';

  const showImage = p.image && !imgFailed;
  const shotClass = 'shot' + (showImage ? '' : ' shot-empty');
  const track = () => trackEvent('project', p.title);

  // Image introuvable : on affiche le nom du projet au lieu d'une image cassée
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
      <span className="badge" data-state="wip">En cours</span>
    ) : live ? (
      <span className="badge" data-state="live">En ligne</span>
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
          aria-label={`${p.title} : ${mainLabel}`}
          onClick={track}
        >
          {inner}
        </a>
      ) : (
        <div className={shotClass}>{inner}</div>
      )}

      <div className="project-body">
        <div className="project-head"><h3>{p.title}</h3>{badge}</div>
        <p className="desc">{p.description}</p>
        <ul className="chips">
          {p.stack.map((s) => <li key={s}>{s}</li>)}
        </ul>
        <div className="project-links">
          {live && (
            <a className="project-link" href={live} target="_blank" rel="noopener noreferrer" onClick={track}>
              Voir le projet en ligne <Icon name="arrow" size={14} />
            </a>
          )}
          {repo && (
            <a className="project-link" href={repo} target="_blank" rel="noopener noreferrer" onClick={track}>
              Voir le code sur GitHub <Icon name="arrow" size={14} />
            </a>
          )}
          {!live && !repo && <span className="project-link is-missing">Lien bientôt disponible</span>}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  // Affichage immédiat avec projects.js ; l'API du back office prend le relais ensuite
  const [projects, setProjects] = useState(() => localProjects.map(normalize));
  const [current, setCurrent] = useState('all');

  useEffect(() => {
    if (!API_READY) return;
    let cancelled = false;

    (async () => {
      try {
        const data = await apiFetch('/public/projects');
        if (cancelled || !Array.isArray(data) || data.length === 0) return;
        const fresh = data.map(normalize);
        // On ne remplace que si la liste est différente
        setProjects((prev) => (JSON.stringify(prev) === JSON.stringify(fresh) ? prev : fresh));
      } catch (err) {
        // API éteinte ou lente : on garde projects.js
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
        <h2>Projets</h2>
        <p className="section-intro">
          Une sélection de projets académiques et personnels : applications web, outils desktop et jeux vidéo.
        </p>

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
              // La clé change avec le filtre : les cartes réapparaissent à chaque changement
              <ProjectCard
                key={`${current}-${p.title}`}
                p={p}
                index={i}
                featured={current === 'all' && i === 0}
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
              <h3>Aucun projet dans cette catégorie pour le moment</h3>
              <p>Je travaille dessus. En attendant, tu peux parcourir tous mes projets.</p>
              <button className="btn btn-sm" type="button" onClick={() => setCurrent('all')}>
                Voir tous les projets
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
