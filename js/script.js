(() => {
  'use strict';

  // ---------- Thèmes ----------
  const THEMES = ['noir', 'blanc', 'beige'];
  const COLORS = { noir: '#0d0d0d', blanc: '#ffffff', beige: '#e9e0cf' };
  const root = document.documentElement;
  const buttons = document.querySelectorAll('[data-theme-btn]');
  const metaColor = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme, save) {
    if (!THEMES.includes(theme)) theme = 'noir';
    root.dataset.theme = theme;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.themeBtn === theme)));
    if (metaColor) metaColor.setAttribute('content', COLORS[theme]);
    if (save) {
      try { localStorage.setItem('theme', theme); } catch (e) {}
    }
  }

  applyTheme(root.dataset.theme, false);
  buttons.forEach((b) => b.addEventListener('click', () => applyTheme(b.dataset.themeBtn, true)));

  // ---------- Menu : section en cours ----------
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  const sections = new Map();
  navLinks.forEach((a) => {
    const section = document.querySelector(a.getAttribute('href'));
    if (section) sections.set(section, a);
  });

  if ('IntersectionObserver' in window && sections.size) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((l) => l.removeAttribute('aria-current'));
          sections.get(entry.target).setAttribute('aria-current', 'true');
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((_, section) => spy.observe(section));
  }

  // ---------- Projets ----------
  const esc = (v) =>
    String(v ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  // N'autorise que les liens http(s)
  const safeUrl = (u) => (/^https?:\/\//i.test(u || '') ? u : '');

  const ARROW =
    '<svg class="ico" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';

  function renderProject(p) {
    const live = safeUrl(p.live);
    const repo = safeUrl(p.repo);
    // La photo ouvre le site en ligne s'il existe, sinon le dépôt GitHub
    const main = live || repo;
    const mainLabel = live ? 'ouvrir le projet en ligne' : 'ouvrir le dépôt GitHub';
    const cls = 'shot' + (p.image ? '' : ' shot-empty');

    const inner = p.image
      ? `<img src="${esc(p.image)}" alt="Capture d'écran du projet ${esc(p.title)}" width="1920" height="1080" loading="lazy">`
      : `<span>${esc(p.title)}</span>`;

    const shot = main
      ? `<a class="${cls}" href="${esc(main)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(p.title)} : ${mainLabel}">${inner}</a>`
      : `<div class="${cls}">${inner}</div>`;

    const badge = p.status === 'en_cours' ? '<span class="badge">En cours</span>' : '';
    const stack = (p.stack || []).map((s) => `<li>${esc(s)}</li>`).join('');

    const links = [];
    if (live) links.push(`<a class="project-link" href="${esc(live)}" target="_blank" rel="noopener noreferrer">Voir le projet en ligne ${ARROW}</a>`);
    if (repo) links.push(`<a class="project-link" href="${esc(repo)}" target="_blank" rel="noopener noreferrer">Voir le code sur GitHub ${ARROW}</a>`);
    if (!links.length) links.push('<span class="project-link is-missing">Lien bientôt disponible</span>');

    return `
      <article class="project">
        ${shot}
        <div class="project-body">
          <div class="project-head"><h3>${esc(p.title)}</h3>${badge}</div>
          <p class="desc">${esc(p.description)}</p>
          <ul class="chips">${stack}</ul>
          <div class="project-links">${links.join('')}</div>
        </div>
      </article>`;
  }

  const grid = document.getElementById('projects-grid');
  if (grid && Array.isArray(window.PROJECTS)) {
    grid.innerHTML = window.PROJECTS.map(renderProject).join('');
  }

  // ---------- Formulaire de contact ----------
  // L'envoi réel (email + back office) est branché à l'étape suivante.
  const CONTACT_ENDPOINT = '/api/contact';
  const form = document.getElementById('contact-form');

  if (form) {
    const status = document.getElementById('contact-status');
    const submit = form.querySelector('button[type="submit"]');
    const say = (message, state) => {
      status.textContent = message;
      status.dataset.state = state || '';
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      say('Envoi en cours…');
      submit.disabled = true;

      try {
        const res = await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.message || "Le message n'a pas pu être envoyé.");
        form.reset();
        say('Message envoyé. Je te réponds rapidement.', 'success');
      } catch (err) {
        const reason = err instanceof TypeError ? 'Impossible de joindre le serveur.' : err.message;
        say(`${reason} Tu peux aussi écrire à yannickeko70@gmail.com.`, 'error');
      } finally {
        submit.disabled = false;
      }
    });
  }
})();