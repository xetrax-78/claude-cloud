import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { Ecole } from '../types';
import { navigate, schoolHref } from '../utils/router';

interface SearchDialogProps {
  schools: Ecole[] | null;
  open: boolean;
  onClose: () => void;
}

const fold = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// Classement simple : sigle exact > début du nom/sigle > contient
export function searchSchools(schools: Ecole[], query: string, limit = 8): Ecole[] {
  const q = fold(query.trim());
  if (!q) return [];
  const scored: { e: Ecole; score: number }[] = [];
  for (const e of schools) {
    const nom = fold(e.nom_officiel);
    const sigle = fold(e.sigle ?? '');
    const villes = fold([e.ville_principale, ...e.campus.map(c => c.ville)].join(' '));
    const score =
      sigle === q ? 0
      : sigle.startsWith(q) || nom.startsWith(q) ? 1
      : nom.split(/[\s'-]+/).some(w => w.startsWith(q)) ? 2
      : nom.includes(q) || sigle.includes(q) ? 3
      : villes.includes(q) ? 4
      : -1;
    if (score >= 0) scored.push({ e, score });
  }
  return scored.sort((a, b) => a.score - b.score || a.e.nom_officiel.localeCompare(b.e.nom_officiel, 'fr')).slice(0, limit).map(x => x.e);
}

export const SearchDialog: React.FC<SearchDialogProps> = ({ schools, open, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setQuery('');
      setActive(0);
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const results = useMemo(() => (schools ? searchSchools(schools, query) : []), [schools, query]);

  const go = (e: Ecole) => {
    onClose();
    navigate(schoolHref(e.id));
  };

  const onKeyDown = (ev: React.KeyboardEvent) => {
    if (ev.key === 'ArrowDown') { ev.preventDefault(); setActive(i => Math.min(i + 1, results.length - 1)); }
    else if (ev.key === 'ArrowUp') { ev.preventDefault(); setActive(i => Math.max(i - 1, 0)); }
    else if (ev.key === 'Enter' && results[active]) { ev.preventDefault(); go(results[active]); }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => { if (e.target === dialogRef.current) onClose(); }}
      aria-label="Rechercher un établissement"
      className="m-0 mx-auto mt-[10vh] w-[calc(100%-2rem)] max-w-xl rounded-xl border border-slate-200 bg-white p-0 text-slate-900 shadow-xl backdrop:bg-slate-900/40"
    >
      <div className="flex items-center gap-2 border-b border-slate-200 px-4">
        <Search className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
        <input
          autoFocus
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActive(0); }}
          onKeyDown={onKeyDown}
          placeholder="École, prépa, sigle ou ville…"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls="search-results"
          aria-activedescendant={results[active] ? `search-${results[active].id}` : undefined}
          className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-400"
        />
        <kbd className="hidden sm:inline text-[10px] font-mono text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">Échap</kbd>
      </div>

      <ul id="search-results" role="listbox" className="max-h-[50vh] overflow-y-auto p-1.5">
        {!schools && <li className="px-3 py-6 text-center text-sm text-slate-500">Chargement…</li>}
        {schools && query.trim() && results.length === 0 && (
          <li className="px-3 py-6 text-center text-sm text-slate-500">Aucun résultat pour « {query} ».</li>
        )}
        {results.map((e, i) => (
          <li key={e.id} id={`search-${e.id}`} role="option" aria-selected={i === active}>
            <a
              href={schoolHref(e.id)}
              onClick={(ev) => { ev.preventDefault(); go(e); }}
              onMouseEnter={() => setActive(i)}
              className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm ${i === active ? 'bg-slate-100' : ''}`}
            >
              <span className="min-w-0">
                <span className="block font-semibold truncate">{e.nom_officiel}</span>
                <span className="block text-xs text-slate-500 truncate">{e.sigle ? `${e.sigle} · ` : ''}{e.ville_principale} ({e.pays})</span>
              </span>
              <span className={`shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                e.type_etablissement === 'prepa_cpge' ? 'bg-amber-50 text-amber-800' : 'bg-indigo-50 text-indigo-800'
              }`}>
                {e.type_etablissement === 'prepa_cpge' ? 'Prépa' : 'École'}
              </span>
            </a>
          </li>
        ))}
        {!query.trim() && schools && (
          <li className="px-3 py-6 text-center text-xs text-slate-500">
            Tapez un nom, un sigle (INSA, UTC, X…) ou une ville. ↑ ↓ pour naviguer, Entrée pour ouvrir.
          </li>
        )}
      </ul>
    </dialog>
  );
};
