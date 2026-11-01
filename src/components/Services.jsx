import { Icon } from './Icons.jsx';
import { SERVICES } from '../data/content.js';
import { useLang } from '../hooks/useLang.js';
import { STRINGS } from '../i18n/translations.js';

export default function Services() {
  const [lang] = useLang();
  const tr = STRINGS[lang];

  return (
    <section className="section" id="services">
      <div className="wrap">
        <h2>{tr.servicesTitle}</h2>
        <p className="section-intro">{tr.servicesIntro}</p>
        <div className="features features-4">
          {SERVICES.map((s, i) => (
            <article className="feature" key={s.title}>
              <span className="ico-box"><Icon name={s.icon} size={22} /></span>
              <h3>{tr.services[i].title}</h3>
              <p>{tr.services[i].text}</p>
              <ul className="mini">{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}