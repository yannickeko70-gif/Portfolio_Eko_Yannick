import { useState } from 'react';
import { Icon } from './Icons.jsx';
import { LINKS, SUBJECTS } from '../data/content.js';
import { apiFetch, API_READY } from '../api.js';

export default function Contact() {
  const [status, setStatus] = useState({ text: '', state: '' });
  const [sending, setSending] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget; // à garder avant le await
    if (!form.reportValidity()) return;

    setStatus({ text: 'Envoi en cours…', state: '' });
    setSending(true);
    // L'offre gratuite de l'hébergeur endort l'API : le premier envoi peut être long
    const slow = setTimeout(
      () => setStatus({ text: 'Le serveur se réveille, encore quelques secondes…', state: '' }),
      5000
    );

    try {
      if (!API_READY) throw new TypeError('API non configurée');
      await apiFetch(
        '/public/contact',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        },
        45000
      );
      form.reset();
      setStatus({ text: 'Message envoyé. Je te réponds rapidement.', state: 'success' });
    } catch (err) {
      const network = err instanceof TypeError || err.name === 'AbortError';
      const reason = network ? 'Impossible de joindre le serveur.' : err.message;
      setStatus({ text: `${reason} Tu peux aussi écrire à ${LINKS.email}.`, state: 'error' });
    } finally {
      clearTimeout(slow);
      setSending(false);
    }
  }

  return (
    <section className="section alt" id="contact">
      <div className="wrap">
        <h2>Contact</h2>
        <p className="section-intro">
          Un projet, un stage ou une question ? Écris-moi, je réponds rapidement.
        </p>
        <div className="contact">
          <ul className="contact-list">
            <li><span>Email</span><a href={`mailto:${LINKS.email}`}>{LINKS.email}</a></li>
            <li><span>Téléphone</span><a href="tel:+237655504397">+237 655 50 43 97</a></li>
            <li>
              <span>WhatsApp</span>
              <a href="https://wa.me/237655504397" target="_blank" rel="noopener noreferrer">
                +237 655 50 43 97 <Icon name="arrow" size={14} />
              </a>
            </li>
            <li>
              <span>GitHub</span>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
                github.com/yannickeko70-gif <Icon name="arrow" size={14} />
              </a>
            </li>
            <li>
              <span>LinkedIn</span>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                linkedin.com/in/yannick-eko-3a2152409 <Icon name="arrow" size={14} />
              </a>
            </li>
            <li><span>Localisation</span>Douala, Cameroun</li>
          </ul>

          <form className="form panel" id="contact-form" method="post" onSubmit={onSubmit}>
            <div className="row">
              <div className="field">
                <label htmlFor="first_name">Prénom</label>
                <input id="first_name" name="first_name" type="text" autoComplete="given-name" required maxLength={80} />
              </div>
              <div className="field">
                <label htmlFor="last_name">Nom</label>
                <input id="last_name" name="last_name" type="text" autoComplete="family-name" required maxLength={80} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" required maxLength={150} />
            </div>
            <div className="field">
              <label htmlFor="subject">Objet</label>
              <select id="subject" name="subject" required defaultValue="">
                <option value="">Choisir un objet</option>
                {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required maxLength={3000} />
            </div>
            <div className="hp" aria-hidden="true">
              <label>Ne pas remplir<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
            <button className="btn btn-solid" type="submit" disabled={sending}>Envoyer le message</button>
            <p className="form-status" id="contact-status" role="status" aria-live="polite" data-state={status.state}>
              {status.text}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
