// ========================
// 0. LOADER ANIMÉ
// ========================
(function () {
document.body.classList.add('loading');

const fill     = document.getElementById('loaderFill');
const pctEl    = document.getElementById('loaderPct');
const statusEl = document.getElementById('loaderStatus');
const loader   = document.getElementById('page-loader');

const steps = [
    { at: 10,  label: 'Chargement des ressources...' },
    { at: 30,  label: 'Mise en place de l\'interface...' },
    { at: 55,  label: 'Compilation des projets...' },
    { at: 75,  label: 'Optimisation des assets...' },
    { at: 90,  label: 'Dernieres verifications...' },
    { at: 100, label: 'Pret !' },
];

let current = 0;
let stepIdx = 0;

const iv = setInterval(function () {
    var speed = current < 70 ? (Math.random() * 3 + 1.5) : (Math.random() * 1.2 + 0.4);
    current = Math.min(current + speed, 100);

    fill.style.width = current + '%';
    pctEl.textContent = Math.floor(current) + '%';

    if (stepIdx < steps.length && current >= steps[stepIdx].at) {
    statusEl.textContent = steps[stepIdx].label;
    stepIdx++;
    }

    if (current >= 100) {
    clearInterval(iv);
    setTimeout(function () {
        loader.classList.add('loaded');
        document.body.classList.remove('loading');
    }, 380);
    }
}, 55);
})();

// ========================
// 1. REVEAL ANIMATION (au scroll)
// ========================
const revEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
entries.forEach(e => {
    if (e.isIntersecting) {
    e.target.classList.add('visible');
    io.unobserve(e.target);
    }
});
}, { threshold: 0.12 });
revEls.forEach(el => io.observe(el));

// ========================
// 2. NAV COMPACT ON SCROLL
// ========================
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
nav.style.padding = window.scrollY > 50 ? '0.8rem 3.5rem' : '1.2rem 3.5rem';
});


// ========================
// 3. CURSEUR CUSTOM + COMPTEURS + CV RAPIDE
// ========================
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
if (cursorDot && cursorRing && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
let mx = window.innerWidth / 2, my = window.innerHeight / 2;
let rx = mx, ry = my;
window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursorDot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
});
function animateCursor(){
    rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
    cursorRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();
document.querySelectorAll('a, button, input, textarea, select, .proj-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('is-hover'));
});
}

const meterEls = document.querySelectorAll('.skill-meters');
const meterIo = new IntersectionObserver(entries => {
entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    entry.target.querySelectorAll('.skill-value').forEach(el => {
    const target = Number(el.dataset.target || 0); let value = 0;
    const timer = setInterval(() => {
        value += Math.max(1, Math.ceil(target / 38));
        if (value >= target) { value = target; clearInterval(timer); }
        el.textContent = value + '%';
    }, 28);
    });
    meterIo.unobserve(entry.target);
});
}, { threshold: 0.25 });
meterEls.forEach(el => meterIo.observe(el));

document.getElementById('quickCvBtn')?.addEventListener('click', () => {
document.body.classList.add('print-mode');
window.print();
setTimeout(() => document.body.classList.remove('print-mode'), 500);
});

// ========================
// 4. SÉLECTEUR DE THÈMES
// ========================
const themeSelect = document.getElementById('themeSelect');
const themeClasses = ['theme-light', 'theme-dark', 'theme-neon', 'theme-forest', 'theme-sunset', 'theme-ocean', 'dark'];

function applyTheme(themeName) {
const theme = ['light', 'dark', 'neon', 'forest', 'sunset', 'ocean'].includes(themeName) ? themeName : 'light';
document.body.classList.remove(...themeClasses);
document.body.classList.add(`theme-${theme}`);

// Compatibilité avec les règles historiques du portfolio.
if (theme === 'dark') document.body.classList.add('dark');

localStorage.setItem('portfolio-theme', theme);
localStorage.setItem('theme', theme); // garde l'ancien stockage compatible
if (themeSelect) themeSelect.value = theme;
}

const savedPortfolioTheme = localStorage.getItem('portfolio-theme') || localStorage.getItem('theme');
if (savedPortfolioTheme) {
applyTheme(savedPortfolioTheme);
} else {
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(prefersDark ? 'dark' : 'light');
}

themeSelect?.addEventListener('change', (e) => applyTheme(e.target.value));