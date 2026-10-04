import { useEffect, useState } from 'react';
import type { ActiveTab } from '../components/TopBar';

// Routage par chemin (/repertoire, /ecole/<id>…) avec l'History API.
// Chaque route est pré-rendue en HTML statique au build (scripts/prerender.ts) :
// pas besoin de règle de réécriture côté hébergeur.
export type ExplorerType = 'ecoles' | 'prepas';

export interface Route {
  tab: ActiveTab;
  schoolId?: string;
  explorerType: ExplorerType;
  params: URLSearchParams;
}

const TAB_PATHS: Record<ActiveTab, string> = {
  boussole: '',
  explorer: 'repertoire',
  comparator: 'comparateur',
  analytics: 'analytique',
};

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export const tabHref = (tab: ActiveTab, query = '') =>
  `${BASE}/${TAB_PATHS[tab]}${TAB_PATHS[tab] ? '/' : ''}${query ? `?${query}` : ''}`;
export const schoolHref = (id: string) => `${BASE}/ecole/${encodeURIComponent(id)}/`;
export const explorerHref = (type: ExplorerType) => tabHref('explorer', type === 'prepas' ? 'type=prepas' : '');

export function parseLocation(pathname: string, search: string): Route {
  const params = new URLSearchParams(search);
  const explorerType: ExplorerType = params.get('type') === 'prepas' ? 'prepas' : 'ecoles';
  const [first, second] = pathname.slice(BASE.length).replace(/^\/+/, '').split('/');
  if (first === 'ecole' && second) {
    return { tab: 'explorer', schoolId: decodeURIComponent(second), explorerType, params };
  }
  const tab = (Object.keys(TAB_PATHS) as ActiveTab[]).find(t => TAB_PATHS[t] === (first ?? ''));
  return { tab: tab ?? 'boussole', explorerType, params };
}

const ROUTE_EVENT = 'ingefinder:navigate';

export function navigate(href: string, { replace = false } = {}) {
  const url = new URL(href, window.location.href);
  if (url.pathname + url.search === window.location.pathname + window.location.search) return;
  history[replace ? 'replaceState' : 'pushState'](null, '', url.pathname + url.search);
  window.dispatchEvent(new Event(ROUTE_EVENT));
  if (!replace) window.scrollTo({ top: 0 });
}

// Anciens liens en #/… (première version) → chemin équivalent
function migrateLegacyHash() {
  const { hash } = window.location;
  if (!hash.startsWith('#/')) return;
  const [path, query = ''] = hash.slice(1).split('?');
  const legacy: Record<string, string> = { '/repertoire': '/repertoire/', '/comparateur': '/comparateur/', '/analytique': '/analytique/' };
  const target = path.startsWith('/ecole/') ? `${path.replace(/\/?$/, '/')}` : legacy[path] ?? '/';
  history.replaceState(null, '', `${BASE}${target}${query ? `?${query}` : ''}`);
}

// Intercepte les clics sur les liens internes pour éviter un rechargement complet
function onDocumentClick(e: MouseEvent) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = (e.target as HTMLElement).closest('a');
  if (!a || a.target || a.hasAttribute('download')) return;
  const url = new URL(a.href, window.location.href);
  if (url.origin !== window.location.origin || (BASE && !url.pathname.startsWith(BASE))) return;
  if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) return;
  e.preventDefault();
  navigate(url.pathname + url.search);
}

export function useRoute(): Route {
  const read = () => parseLocation(window.location.pathname, window.location.search);
  const [route, setRoute] = useState<Route>(() => {
    migrateLegacyHash();
    return read();
  });

  useEffect(() => {
    const update = () => setRoute(read());
    window.addEventListener('popstate', update);
    window.addEventListener(ROUTE_EVENT, update);
    document.addEventListener('click', onDocumentClick);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener(ROUTE_EVENT, update);
      document.removeEventListener('click', onDocumentClick);
    };
  }, []);

  return route;
}

/**
 * État synchronisé avec un paramètre d'URL (?q=…), en replaceState : partageable,
 * restauré au retour arrière, sans polluer l'historique. Absent de l'URL quand égal au défaut.
 */
export function useSearchParamState<T extends string | boolean>(key: string, defaultValue: T) {
  const read = (): T => {
    const raw = new URLSearchParams(window.location.search).get(key);
    if (raw === null) return defaultValue;
    return (typeof defaultValue === 'boolean' ? raw === '1' : raw) as T;
  };
  const [value, setValue] = useState<T>(read);

  const update = (next: T) => {
    setValue(next);
    const params = new URLSearchParams(window.location.search);
    if (next === defaultValue || next === '') params.delete(key);
    else params.set(key, typeof next === 'boolean' ? '1' : String(next));
    const qs = params.toString();
    history.replaceState(history.state, '', `${window.location.pathname}${qs ? `?${qs}` : ''}`);
  };

  return [value, update] as const;
}
