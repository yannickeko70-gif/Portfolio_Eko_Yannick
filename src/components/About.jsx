import { useProfile } from '../hooks/useProfile.js';

export default function About() {
  const p = useProfile();

  const facts = [
    ['Localisation', p.location],
    ['Études', p.studies],
    ['Langues', p.languages],
    ["Centres d'intérêt", p.interests],
  ].filter(([, value]) => value);

  // Une ligne vide dans le texte du back office = nouveau paragraphe
  const paragraphs = p.about.split(/\n{2,}/).filter((t) => t.trim());

  return (
    <section className="section alt" id="apropos">
      <div className="wrap split">
        <h2>À propos</h2>
        <div className="about">
          {paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
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
