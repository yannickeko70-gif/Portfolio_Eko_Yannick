import { Icon } from './Icons.jsx';
import { SERVICES } from '../data/content.js';

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <h2>Ce que je fais</h2>
        <p className="section-intro">
          Quatre domaines dans lesquels je conçois et je livre, de la maquette jusqu'au déploiement.
        </p>
        <div className="features features-4">
          {SERVICES.map((s) => (
            <article className="feature" key={s.title}>
              <span className="ico-box"><Icon name={s.icon} size={22} /></span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul className="mini">
                {s.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
