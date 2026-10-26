
import { Icon } from './Icons.jsx';

const CERTIFICATIONS = [
  {
    title: 'Claude 101',
    issuer: 'Claude Academy (Anthropic)',
    date: '2026',
    image: '/img/badge-claude-101.png',
    url: 'https://academy.claude.com/verify/ec56426ad6523dd8cd13574120efe3ab',
    description:
      "Certification couvrant les fondamentaux de Claude : prompting, cas d'usage, bonnes pratiques et sécurité.",
  },
];

export default function Certifications() {
  return (
    <section className="section" id="certifications">
      <div className="wrap">
        <h2>Certifications</h2>

        <p className="section-intro">
          Formations et certifications obtenues en complément de mon cursus.
        </p>

        <div className="certs">
          {CERTIFICATIONS.map((c) => (
            <article className="cert-card" key={c.title}>

              <a
                className="cert-badge"
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Voir le badge ${c.title}`}
              >
                <img
                  src={c.image}
                  alt={`Badge de certification ${c.title}`}
                  loading="lazy"
                />
              </a>

              <div className="cert-body">
                <h3>{c.title}</h3>

                <p className="cert-meta">
                  {c.issuer} · {c.date}
                </p>

                <p className="cert-desc">
                  {c.description}
                </p>

                <a
                  className="project-link"
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vérifier la certification
                  <Icon name="arrow" size={14} />
                </a>
              </div>

            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
