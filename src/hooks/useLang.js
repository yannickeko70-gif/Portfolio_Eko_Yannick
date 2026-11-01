import { useCallback, useSyncExternalStore } from 'react';

let lang = (() => {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'fr' || saved === 'en') return saved;
  } catch (e) {}
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'fr';
})();

const listeners = new Set();
document.documentElement.lang = lang;

function setLangValue(next) {
  if (next !== 'fr' && next !== 'en') return;
  lang = next;
  try { localStorage.setItem('lang', next); } catch (e) {}
  document.documentElement.lang = next;
  listeners.forEach((l) => l());
}

export function useLang() {
  const subscribe = useCallback((cb) => {
    listeners.add(cb);
    return () => listeners.delete(cb);
  }, []);
  const value = useSyncExternalStore(subscribe, () => lang);
  return [value, setLangValue];
}