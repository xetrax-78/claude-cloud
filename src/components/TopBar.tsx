import React from 'react';
import { Compass, GraduationCap, Scale, BarChart3, LucideIcon } from 'lucide-react';
import { tabHref } from '../utils/router';

export type ActiveTab = 'boussole' | 'explorer' | 'comparator' | 'analytics';

interface TopBarProps {
  activeTab: ActiveTab;
  selectedSchoolsCount: number;
  totalEstablishments?: number;
}

const NAV_ITEMS: { tab: ActiveTab; label: string; shortLabel: string; icon: LucideIcon }[] = [
  { tab: 'boussole', label: 'Boussole & Spécialités', shortLabel: 'Boussole', icon: Compass },
  { tab: 'explorer', label: 'Répertoire', shortLabel: 'Répertoire', icon: GraduationCap },
  { tab: 'comparator', label: 'Comparateur', shortLabel: 'Comparer', icon: Scale },
  { tab: 'analytics', label: 'Analytique', shortLabel: 'Stats', icon: BarChart3 },
];

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  selectedSchoolsCount,
  totalEstablishments,
}) => {
  const badge = (tab: ActiveTab) => {
    if (tab === 'explorer' && totalEstablishments) {
      return <span className="text-[11px] font-mono text-slate-400">{totalEstablishments}</span>;
    }
    if (tab === 'comparator' && selectedSchoolsCount > 0) {
      return (
        <span className="text-[11px] font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded">
          {selectedSchoolsCount}
        </span>
      );
    }
    return null;
  };

  return (
    <>
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Wordmark */}
        <a href={tabHref('boussole')} className="flex items-center gap-2.5 text-left group" aria-label="IngéFinder — accueil">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs tracking-tight transition-transform group-hover:scale-105">
            IF
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
            IngéFinder
          </span>
        </a>

        {/* Navigation desktop */}
        <nav aria-label="Navigation principale" className="hidden sm:flex items-center gap-2">
          {NAV_ITEMS.map(({ tab, label, icon: Icon }) => (
            <a
              key={tab}
              href={tabHref(tab)}
              aria-current={activeTab === tab ? 'page' : undefined}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${tab === 'boussole' ? 'text-indigo-600' : 'text-slate-500'}`} aria-hidden="true" />
              <span>{label}</span>
              {badge(tab)}
            </a>
          ))}
        </nav>
      </div>
    </header>

      {/* Navigation mobile : barre d'onglets fixée en bas (hors du header, dont le backdrop-blur casserait le position: fixed) */}
      <nav
        aria-label="Navigation principale"
        className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 grid grid-cols-4 pb-[env(safe-area-inset-bottom)]"
      >
        {NAV_ITEMS.map(({ tab, shortLabel, icon: Icon }) => (
          <a
            key={tab}
            href={tabHref(tab)}
            aria-current={activeTab === tab ? 'page' : undefined}
            className={`relative flex flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium ${
              activeTab === tab ? 'text-indigo-700 font-semibold' : 'text-slate-500'
            }`}
          >
            <Icon className="w-5 h-5" aria-hidden="true" />
            <span>{shortLabel}</span>
            {tab === 'comparator' && selectedSchoolsCount > 0 && (
              <span className="absolute top-1 right-[calc(50%-1.25rem)] min-w-4 h-4 px-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold leading-4 text-center">
                {selectedSchoolsCount}
              </span>
            )}
          </a>
        ))}
      </nav>
    </>
  );
};
