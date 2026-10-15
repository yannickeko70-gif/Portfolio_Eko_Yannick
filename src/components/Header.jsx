import { useEffect, useRef, useState } from 'react';
import { NAV } from '../data/content.js';
import { THEMES, useTheme } from '../hooks/useTheme.js';

export default function Header({ active }) {
  const [theme, setTheme] = useTheme();
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const burgerRef = useRef(null);

  // Menu ouvert : Échap ou clic en dehors de l'en-tête le referme
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    const onClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [open]);

  // Repassage en grand écran : on referme
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 761px)');
    const onChange = (e) => { if (e.matches) setOpen(false); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="wrap bar">
        <a className="brand" href="#top">
          <span className="mark" aria-hidden="true">EY</span>Eko Yannick
        </a>

        <nav className="nav" aria-label="Navigation principale">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? 'true' : undefined}>{label}</a>
          ))}
        </nav>

        <div className="themes" role="group" aria-label="Choisir un thème">
          {THEMES.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              aria-pressed={theme === key}
              title={`Thème ${label.toLowerCase()}`}
              onClick={() => setTheme(key)}
            >
              <span className={`sw sw-${key}`} />
              <span className="sr">{label}</span>
            </button>
          ))}
        </div>

        <a className="btn btn-sm cta" href="#contact">Me contacter</a>

        <button
          ref={burgerRef}
          className="burger"
          type="button"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div
        className="menu"
        id="menu"
        hidden={!open}
        onClick={(e) => { if (e.target.closest('a')) setOpen(false); }}
      >
        <div className="wrap menu-inner">
          <nav className="menu-nav" aria-label="Menu mobile">
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} aria-current={active === id ? 'true' : undefined}>{label}</a>
            ))}
          </nav>
          <a className="btn btn-solid" href="#contact">Me contacter</a>
          <div role="group" aria-labelledby="menu-theme-label">
            <p className="menu-label" id="menu-theme-label">Thème</p>
            <div className="menu-theme-list">
              {THEMES.map(({ key, label }) => (
                <button key={key} type="button" aria-pressed={theme === key} onClick={() => setTheme(key)}>
                  <span className={`sw sw-${key}`} />{label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
