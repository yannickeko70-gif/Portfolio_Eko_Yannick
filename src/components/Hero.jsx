import { Icon } from './Icons.jsx';
import { LINKS } from '../data/content.js';
import { trackEvent } from '../api.js';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-text">
          <p className="status">Disponible pour toute opportunité</p>
          <h1><span>Eko</span> <span>Yannick</span></h1>
          <p className="role">Concepteur / Développeur FullStack / Designeur UX/UI</p>
          <p className="lead">
            Étudiant en Bachelor Conception et Développement Web FullStack (CDWFS) à l'Institut
            Universitaire de la Côte, à Douala. Je conçois des applications web, des outils desktop
            et des jeux vidéo.
          </p>
          <div className="actions">
            <a className="btn btn-solid" href="#projets">Voir mes projets</a>
            <a
              className="btn"
              href="/doc/CV_-_Yannick_EKO.pdf"
              download
              onClick={() => trackEvent('cv', 'cv')}
            >
              Télécharger mon CV
            </a>
          </div>
          <ul className="hero-links">
            <li>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
                GitHub <Icon name="arrow" size={14} />
              </a>
            </li>
            <li>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <Icon name="arrow" size={14} />
              </a>
            </li>
            <li><a href={`mailto:${LINKS.email}`}>Email</a></li>
          </ul>
        </div>
        <figure className="portrait">
          <img src="/img/yannick_eko.PNG" alt="Portrait d'Eko Yannick" width="1023" height="1537" />
        </figure>
      </div>
    </section>
  );
}
