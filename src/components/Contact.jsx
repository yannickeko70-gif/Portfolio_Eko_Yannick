import { useState } from 'react';
import { Icon } from './Icons.jsx';
import { useProfile, telHref, waHref, shortUrl } from '../hooks/useProfile.js';
import { apiFetch, API_READY } from '../api.js';
import { useLang } from '../hooks/useLang.js';
import { STRINGS } from '../i18n/translations.js';

export default function Contact() {
  const p = useProfile();
  const [lang] = useLang();
  const tr = STRINGS[lang];
  const [status, setStatus] = useState({ text: '', state: '' });
  const [sending, setSending] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget; // à garder avant le await
    if (!form.reportValidity()) return;

    setStatus({ text: tr.formSending, state: '' });
    setSending(true);
    // L'offre gratuite de l'hébergeur endort l'API : le premier envoi peut être long
    const slow = setTimeout(
      () => setStatus({ text: tr.formWaking, state: '' }),
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
      setStatus({ text: tr.formSuccess, state: 'success' });
    } catch (err) {
      const network = err instanceof TypeError || err.name === 'AbortError';
      const reason = network ? tr.formNetworkError : err.message;
      setStatus({ text: `${reason} ${tr.formAlsoWriteTo} ${p.email}.`, state: 'error' });
    } finally {
      clearTimeout(slow);
      setSending(false);
    }
  }

  return (
    <section className="section alt" id="contact">
      <div className="wrap">
        <h2>{tr.contactTitle}</h2>
        <p className="section-intro">
          {tr.contactIntro}
        </p>
        <div className="contact">
          <ul className="contact-list">
            <li><span>{tr.contactEmail}</span><a href={`mailto:${p.email}`}>{p.email}</a></li>
            {p.phone && (
              <li><span>{tr.contactPhone}</span><a href={telHref(p.phone)}>{p.phone}</a></li>
            )}
            {waHref(p) && (
              <li>
                <span>{tr.contactWhatsapp}</span>
                <a href={waHref(p)} target="_blank" rel="noopener noreferrer">
                  {p.whatsapp || p.phone} <Icon name="arrow" size={14} />
                </a>
              </li>
            )}
            {p.github && (
              <li>
                <span>{tr.contactGithub}</span>
                <a href={p.github} target="_blank" rel="noopener noreferrer">
                  {shortUrl(p.github)} <Icon name="arrow" size={14} />
                </a>
              </li>
            )}
            {p.linkedin && (
              <li>
                <span>{tr.contactLinkedin}</span>
                <a href={p.linkedin} target="_blank" rel="noopener noreferrer">
                  {shortUrl(p.linkedin)} <Icon name="arrow" size={14} />
                </a>
              </li>
            )}
            {p.location && <li><span>{tr.contactLocation}</span>{p.location}</li>}
          </ul>

          <form className="form panel" id="contact-form" method="post" onSubmit={onSubmit}>
            <div className="row">
              <div className="field">
                <label htmlFor="first_name">{tr.formFirstName}</label>
                <input id="first_name" name="first_name" type="text" autoComplete="given-name" required maxLength={80} />
              </div>
              <div className="field">
                <label htmlFor="last_name">{tr.formLastName}</label>
                <input id="last_name" name="last_name" type="text" autoComplete="family-name" required maxLength={80} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="email">{tr.formEmail}</label>
              <input id="email" name="email" type="email" autoComplete="email" required maxLength={150} />
            </div>
            <div className="field">
              <label htmlFor="subject">{tr.formSubject}</label>
              <select id="subject" name="subject" required defaultValue="">
                <option value="">{tr.formChooseSubject}</option>
                {tr.subjects.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">{tr.formMessage}</label>
              <textarea id="message" name="message" required maxLength={3000} />
            </div>
            <div className="hp" aria-hidden="true">
              <label>{tr.formDoNotFill}<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
            <button className="btn btn-solid" type="submit" disabled={sending}>
              {sending ? tr.formSending : tr.formSubmit}
            </button>
            <p className="form-status" id="contact-status" role="status" aria-live="polite" data-state={status.state}>
              {status.text}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}