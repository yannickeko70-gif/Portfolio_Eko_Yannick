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

  // ---------- Menu : section en cours (desktop + mobile) ----------
  const navLinks = document.querySelectorAll('.nav a[href^="#"], .menu-nav a[href^="#"]');
  const sections = new Map();
  navLinks.forEach((a) => {
    const section = document.querySelector(a.getAttribute('href'));
    if (!section) return;
    if (!sections.has(section)) sections.set(section, []);
    sections.get(section).push(a);
  });
  // Contact et « Ce que je fais » n'ont pas de lien dans le menu : on les suit quand même
  // pour désactiver l'ancien lien actif
  ['services', 'contact'].forEach((id) => {
    const s = document.getElementById(id);
    if (s && !sections.has(s)) sections.set(s, []);
  });

  if ('IntersectionObserver' in window && sections.size) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((l) => l.removeAttribute('aria-current'));
          sections.get(entry.target).forEach((l) => l.setAttribute('aria-current', 'true'));
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((_, section) => spy.observe(section));
  }

  // ---------- Menu burger ----------
  const burger = document.querySelector('.burger');
  const menu = document.getElementById('menu');
  if (burger && menu) {
    const setMenu = (open) => {
      menu.hidden = !open;
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    };
    burger.addEventListener('click', () => setMenu(menu.hidden));
    // Un clic sur un lien referme le menu
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    // Echap ou clic en dehors de l'en-tête
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.hidden) { setMenu(false); burger.focus(); }
    });
    document.addEventListener('click', (e) => {
      if (!menu.hidden && !e.target.closest('.site-header')) setMenu(false);
    });
    // Repassage en grand écran : on referme
    window.matchMedia('(min-width: 761px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
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

  const ARROW = '<svg class="i" width="14" height="14" aria-hidden="true"><use href="#i-arrow"/></svg>';

  const EMPTY = `
    <div class="empty">
      <span class="ico-box"><svg class="i" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg></span>
      <h3>Aucun projet dans cette catégorie pour le moment</h3>
      <p>Je travaille dessus. En attendant, tu peux parcourir tous mes projets.</p>
      <button class="btn btn-sm" type="button" data-filter-reset>Voir tous les projets</button>
    </div>`;

  const projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
  // category peut être une chaîne ('web') ou un tableau (['desktop', 'gaming'])
  const cats = (p) => [].concat(p.category || []).map((c) => String(c).toLowerCase());
  let current = 'all';

  function renderProject(p, i) {
    const featured = current === 'all' && i === 0;
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

    const badge =
      p.status === 'en_cours'
        ? '<span class="badge" data-state="wip">En cours</span>'
        : live
          ? '<span class="badge" data-state="live">En ligne</span>'
          : '';
    const stack = (p.stack || []).map((s) => `<li>${esc(s)}</li>`).join('');

    const links = [];
    if (live) links.push(`<a class="project-link" href="${esc(live)}" target="_blank" rel="noopener noreferrer">Voir le projet en ligne ${ARROW}</a>`);
    if (repo) links.push(`<a class="project-link" href="${esc(repo)}" target="_blank" rel="noopener noreferrer">Voir le code sur GitHub ${ARROW}</a>`);
    if (!links.length) links.push('<span class="project-link is-missing">Lien bientôt disponible</span>');

    return `
      <article class="project reveal${featured ? ' is-featured' : ''}" style="--d:${featured ? 0 : (i % 2) * 90}ms">
        ${shot}
        <div class="project-body">
          <div class="project-head"><h3>${esc(p.title)}</h3>${badge}</div>
          <p class="desc">${esc(p.description)}</p>
          <ul class="chips">${stack}</ul>
          <div class="project-links">${links.join('')}</div>
        </div>
      </article>`;
  }

  // ---------- Apparition des cartes (à chaque affichage de la grille) ----------
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
      )
    : null;

  const grid = document.getElementById('projects-grid');
  const filterBtns = document.querySelectorAll('[data-filter]');

  function renderGrid() {
    const list = current === 'all' ? projects : projects.filter((p) => cats(p).includes(current));
    grid.innerHTML = list.length ? list.map(renderProject).join('') : EMPTY;
    grid.querySelectorAll('.reveal').forEach((c) => (io ? io.observe(c) : c.classList.add('is-in')));
  }

  function setFilter(key) {
    current = key;
    filterBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === key)));
    renderGrid();
  }

  if (grid) {
    filterBtns.forEach((b) => {
      const key = b.dataset.filter;
      const n = key === 'all' ? projects.length : projects.filter((p) => cats(p).includes(key)).length;
      const count = b.querySelector('.count');
      if (count) count.textContent = n;
      b.addEventListener('click', () => setFilter(key));
    });
    grid.addEventListener('click', (e) => { if (e.target.closest('[data-filter-reset]')) setFilter('all'); });
    setFilter('all');
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