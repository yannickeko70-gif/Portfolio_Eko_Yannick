import { Icon } from './Icons.jsx';
import { EDUCATION } from '../data/content.js';

export default function Education() {
  return (
    <section className="section alt" id="formation">
      <div className="wrap split">
        <h2>Formation</h2>
        <ol className="timeline">
          {EDUCATION.map((e) => (
            <li key={e.title} className={e.current ? 'is-current' : undefined}>
              <div className="edu-top">
                <p className="when">{e.when}</p>
                {e.badge && (
                  <span className={`edu-badge${e.done ? ' edu-badge-done' : ''}`}>{e.badge}</span>
                )}
              </div>
              <h3>{e.title}</h3>
              <p className="edu-school"><Icon name="cap" size={16} />{e.school}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
