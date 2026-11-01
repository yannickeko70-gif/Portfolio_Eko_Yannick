import { useLang } from '../hooks/useLang.js';

export default function LangSwitch({ className = '' }) {
  const [lang, setLang] = useLang();

  return (
    <div className={`langswitch ${className}`} role="group" aria-label="Choisir la langue / Choose language">
      {['fr', 'en'].map((key) => (
        <button
          key={key}
          type="button"
          aria-pressed={lang === key}
          title={key === 'fr' ? 'Français' : 'English'}
          onClick={() => setLang(key)}
        >
          {key.toUpperCase()}
        </button>
      ))}
    </div>
  );
}