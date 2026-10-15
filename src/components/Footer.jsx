import { LINKS } from '../data/content.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p>© 2026 Eko Yannick</p>
        <nav aria-label="Liens externes">
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={`mailto:${LINKS.email}`}>Email</a>
        </nav>
      </div>
    </footer>
  );
}
