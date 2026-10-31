import { Icon } from './Icons.jsx';
import { useProfile, photoSrc, cvHref } from '../hooks/useProfile.js';
import { trackEvent } from '../api.js';

export default function Hero() {
  const p = useProfile();

  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-text">
          {p.availability && <p className="status">{p.availability}</p>}
          <h1><span>{p.first_name}</span> <span>{p.last_name}</span></h1>
          <p className="role">{p.role}</p>
          <p className="lead">{p.lead}</p>
          <div className="actions">
            <a className="btn btn-solid" href="#projets">Voir mes projets</a>
            <a
              className="btn"
              href={cvHref(p)}
              download
              onClick={() => trackEvent('cv', 'cv')}
            >
              Télécharger mon CV
            </a>
          </div>
          <ul className="hero-links">
            {p.github && (
              <li>
                <a href={p.github} target="_blank" rel="noopener noreferrer">
                  GitHub <Icon name="arrow" size={14} />
                </a>
              </li>
            )}
            {p.linkedin && (
              <li>
                <a href={p.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn <Icon name="arrow" size={14} />
                </a>
              </li>
            )}
            <li><a href={`mailto:${p.email}`}>Email</a></li>
          </ul>
        </div>
        <figure className="portrait">
          <img src={photoSrc(p)} alt={`Portrait de ${p.first_name} ${p.last_name}`} width="1023" height="1537" />
        </figure>
      </div>
    </section>
  );
}
