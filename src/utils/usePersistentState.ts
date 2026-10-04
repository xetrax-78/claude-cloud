import { useEffect, useState } from 'react';

// useState sauvegardé dans localStorage (ignoré silencieusement si le stockage est indisponible)
export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw !== null ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // stockage plein ou bloqué (navigation privée) : on garde l'état en mémoire
    }
  }, [key, value]);

  return [value, setValue] as const;
}
