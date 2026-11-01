import { useProfile } from '../hooks/useProfile.js';
import { useLang } from '../hooks/useLang.js';
import { STRINGS, pick } from '../i18n/translations.js';

export default function About() {
  const p = useProfile();
  const [lang] = useLang();
  const tr = STRINGS[lang];
  const about = pick(lang, p.about, p.about_en);

  const facts = [
    [tr.factLocation, p.location],
    [tr.factStudies, p.studies],
    [tr.factLanguages, p.languages],
    [tr.factInterests, p.interests],
  ].filter(([, value]) => value);

  const paragraphs = about.split(/\n{2,}/).filter((t) => t.trim());

  return (
    <section className="section alt" id="apropos">
      <div className="wrap split">
        <h2>{tr.aboutTitle}</h2>
        <div className="about">
          {paragraphs.map((text, i) => <p key={i}>{text}</p>)}
          {facts.length > 0 && (
            <dl className="facts">
              {facts.map(([label, value]) => (
                <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}