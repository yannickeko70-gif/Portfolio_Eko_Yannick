import { Icon } from './Icons.jsx';
import { useProfile, photoSrc, cvHref } from '../hooks/useProfile.js';
import { trackEvent } from '../api.js';
import { useLang } from '../hooks/useLang.js';
import { STRINGS, pick } from '../i18n/translations.js';

export default function Hero() {
  const p = useProfile();
  const [lang] = useLang();
  const tr = STRINGS[lang];
  const role = pick(lang, p.role, p.role_en);
  const lead = pick(lang, p.lead, p.lead_en);
  const availability = pick(lang, p.availability, p.availability_en);

  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-text">
          {availability && <p className="status">{availability}</p>}
          <h1><span>{p.first_name}</span> <span>{p.last_name}</span></h1>
          <p className="role">{role}</p>
          <p className="lead">{lead}</p>
          <div className="actions">
            <a className="btn btn-solid" href="#projets">{tr.heroViewProjects}</a>
            <a
              className="btn"
              href={cvHref(p)}
              download
              onClick={() => trackEvent('cv', 'cv')}
            >
              {tr.heroDownloadCv}
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
            <li><a href={`mailto:${p.email}`}>{tr.heroEmail}</a></li>
          </ul>
        </div>
        <figure className="portrait">
          <img src={photoSrc(p)} alt={`Portrait de ${p.first_name} ${p.last_name}`} width="1023" height="1537" />
        </figure>
      </div>
    </section>
  );
}
