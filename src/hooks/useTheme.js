import { useCallback, useEffect, useState } from 'react';

export const THEMES = [
  { key: 'noir', label: 'Noir' },
  { key: 'blanc', label: 'Blanc' },
  { key: 'beige', label: 'Beige' },
];
const COLORS = { noir: '#0d0d0d', blanc: '#ffffff', beige: '#e9e0cf' };

// Le thème initial est posé par le script de index.html (aucun flash au chargement)
export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    const t = document.documentElement.dataset.theme;
    return t in COLORS ? t : 'noir';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', COLORS[theme]);
  }, [theme]);

  const setTheme = useCallback((t) => {
    if (!(t in COLORS)) return;
    setThemeState(t);
    try { localStorage.setItem('theme', t); } catch (e) {}
  }, []);

  return [theme, setTheme];
}
