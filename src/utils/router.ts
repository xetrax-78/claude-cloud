import { useEffect, useState } from 'react';
import type { ActiveTab } from '../components/TopBar';

// Routage par hash (#/repertoire, #/ecole/<id>…) : liens partageables et bouton Retour
// fonctionnels, sans configuration serveur.
export interface Route {
  tab: ActiveTab;
  schoolId?: string;
}

const TAB_PATHS: Record<ActiveTab, string> = {
  boussole: '',
  explorer: 'repertoire',
  comparator: 'comparateur',
  analytics: 'analytique',
};

export const tabHref = (tab: ActiveTab) => `#/${TAB_PATHS[tab]}`;
export const schoolHref = (id: string) => `#/ecole/${encodeURIComponent(id)}`;

export function parseHash(hash: string): Route {
  const [first, second] = hash.replace(/^#\/?/, '').split('/');
  if (first === 'ecole' && second) return { tab: 'explorer', schoolId: decodeURIComponent(second) };
  const tab = (Object.keys(TAB_PATHS) as ActiveTab[]).find(t => TAB_PATHS[t] === first);
  return { tab: tab ?? 'boussole' };
}

export function navigate(href: string) {
  if (window.location.hash !== href) window.location.hash = href;
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}
