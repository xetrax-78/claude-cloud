import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
const KEY = 'ingefinder.theme';

const systemTheme = (): Theme => (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

function storedTheme(): Theme | null {
  try {
    const t = localStorage.getItem(KEY);
    return t === 'dark' || t === 'light' ? t : null;
  } catch {
    return null;
  }
}

// Thème clair/sombre : suit le système tant que l'utilisateur n'a pas choisi
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => storedTheme() ?? systemTheme());

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => { if (!storedTheme()) setTheme(systemTheme()); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(KEY, next); } catch { /* préférence non conservée */ }
    setTheme(next);
  };

  return { theme, toggle };
}
