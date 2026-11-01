import { useEffect, useRef, useState } from 'react';
import { THEMES, useTheme } from '../hooks/useTheme.js';
import { useLang } from '../hooks/useLang.js';
import { STRINGS } from '../i18n/translations.js';
import { useProfile, initials } from '../hooks/useProfile.js';
import LangSwitch from './LangSwitch.jsx';

const NAV_IDS = ['apropos', 'competences', 'projets', 'formation', 'certifications', 'objectifs'];

export default function Header({ active }) {
  const [theme, setTheme] = useTheme();
  const [lang] = useLang();
  const tr = STRINGS[lang];
  const profile = useProfile();
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const burgerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); burgerRef.current?.focus(); }
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
          <span className="mark" aria-hidden="true">{initials(profile)}</span>{profile.first_name} {profile.last_name}
        </a>

        <nav className="nav" aria-label="Navigation principale">
          {NAV_IDS.map((id) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? 'true' : undefined}>{tr.nav[id]}</a>
          ))}
        </nav>

        <div className="themes" role="group" aria-label="Choisir un thème">
          {THEMES.map(({ key, label }) => (
            <button key={key} type="button" aria-pressed={theme === key} title={`Thème ${label.toLowerCase()}`} onClick={() => setTheme(key)}>
              <span className={`sw sw-${key}`} />
              <span className="sr">{label}</span>
            </button>
          ))}
        </div>

        <LangSwitch />

        <a className="btn btn-sm cta" href="#contact">{tr.contactCta}</a>

        <button
          ref={burgerRef} className="burger" type="button"
          aria-expanded={open} aria-controls="menu"
          aria-label={open ? tr.closeMenu : tr.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className="menu" id="menu" hidden={!open} onClick={(e) => { if (e.target.closest('a')) setOpen(false); }}>
        <div className="wrap menu-inner">
          <nav className="menu-nav" aria-label="Menu mobile">
            {NAV_IDS.map((id) => (
              <a key={id} href={`#${id}`} aria-current={active === id ? 'true' : undefined}>{tr.nav[id]}</a>
            ))}
          </nav>
          <a className="btn btn-solid" href="#contact">{tr.contactCta}</a>
          <div role="group" aria-labelledby="menu-theme-label">
            <p className="menu-label" id="menu-theme-label">{tr.themeLabel}</p>
            <div className="menu-theme-list">
              {THEMES.map(({ key, label }) => (
                <button key={key} type="button" aria-pressed={theme === key} onClick={() => setTheme(key)}>
                  <span className={`sw sw-${key}`} />{label}
                </button>
              ))}
            </div>
          </div>
          <div className="menu-lang-list">
            <LangSwitch />
          </div>
        </div>
      </div>
    </header>
  );
}