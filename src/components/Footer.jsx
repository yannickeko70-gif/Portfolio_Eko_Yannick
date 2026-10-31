import { useProfile } from '../hooks/useProfile.js';

export default function Footer() {
  const p = useProfile();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <p>© {new Date().getFullYear()} {p.first_name} {p.last_name}</p>
        <nav aria-label="Liens externes">
          {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
          {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          <a href={`mailto:${p.email}`}>Email</a>
        </nav>
      </div>
    </footer>
  );
}
