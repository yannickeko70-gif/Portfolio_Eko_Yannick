import { Icon } from './Icons.jsx';
import { SKILLS } from '../data/content.js';

export default function Skills() {
  return (
    <section className="section alt" id="competences">
      <div className="wrap">
        <h2>Compétences</h2>
        <p className="section-intro">
          Les langages, frameworks et outils que j'utilise pour concevoir et livrer mes projets.
        </p>
        <div className="skills">
          {SKILLS.map((s) => (
            <article className="skill-card" key={s.title}>
              <div className="skill-head">
                <span className="ico-box ico-sm"><Icon name={s.icon} size={18} /></span>
                <h3>{s.title}</h3>
                {s.ai && <span className="tag-ai">Avec l'IA</span>}
              </div>
              <ul className="chips">
                {s.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
