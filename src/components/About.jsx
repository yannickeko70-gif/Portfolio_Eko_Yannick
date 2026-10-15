import { FACTS } from '../data/content.js';

export default function About() {
  return (
    <section className="section alt" id="apropos">
      <div className="wrap split">
        <h2>À propos</h2>
        <div className="about">
          <p>
            Titulaire d'un DEC canadien en Programmation et applications mobiles, je poursuis un
            Bachelor Bac+3 en développement web FullStack. J'aime concevoir des interfaces claires
            et construire des applications complètes, de la maquette jusqu'au déploiement. Je
            souhaite aussi développer mes compétences en intelligence artificielle pour créer des
            solutions numériques intelligentes.
          </p>
          <dl className="facts">
            {FACTS.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
