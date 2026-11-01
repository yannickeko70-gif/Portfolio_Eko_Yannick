import { Icon } from './Icons.jsx';
import { useLang } from '../hooks/useLang.js';
import { STRINGS } from '../i18n/translations.js';

export default function Goals() {
  const [lang] = useLang();
  const tr = STRINGS[lang];

  return (
    <section className="section" id="objectifs">
      <div className="wrap">
        <h2>{tr.goalsTitle}</h2>
        <p className="vision">{tr.goalsVision}</p>

        <ol className="roadmap">
          {tr.roadmap.map((s, i) => (
            <li className={`step ${['is-done', 'is-current', 'is-next'][i]}`} key={s.title}>
              <div className="step-card">
                <p className="step-when">{s.when}</p>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="features features-3 goals">
          {tr.goals.map((g, i) => (
            <article className="feature" key={g.title}>
              <span className="ico-box"><Icon name={['cpu', 'sparkles', 'bulb'][i]} size={22} /></span>
              <h3>{g.title}</h3>
              <p>{g.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}