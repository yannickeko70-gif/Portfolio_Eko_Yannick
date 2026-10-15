import { Icon } from './Icons.jsx';
import { GOALS, ROADMAP } from '../data/content.js';

export default function Goals() {
  return (
    <section className="section" id="objectifs">
      <div className="wrap">
        <h2>Objectifs</h2>
        <p className="vision">
          Mon ambition : devenir expert et ingénieur en intelligence artificielle, spécialisé en
          Machine Learning ou en IA générative, pour concevoir des solutions numériques intelligentes.
        </p>

        <ol className="roadmap">
          {ROADMAP.map((s) => (
            <li className={`step ${s.state}`} key={s.title}>
              <div className="step-card">
                <p className="step-when">{s.when}</p>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="features features-3 goals">
          {GOALS.map((g) => (
            <article className="feature" key={g.title}>
              <span className="ico-box"><Icon name={g.icon} size={22} /></span>
              <h3>{g.title}</h3>
              <p>{g.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
