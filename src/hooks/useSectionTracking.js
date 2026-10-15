import { useEffect } from 'react';
import { trackEvent } from '../api.js';

// Envoie une statistique la première fois que chaque section est vue
export function useSectionTracking(ids) {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const seen = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || seen.has(entry.target.id)) return;
          seen.add(entry.target.id);
          trackEvent('section', entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
}
