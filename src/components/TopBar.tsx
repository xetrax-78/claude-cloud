import React from 'react';
import { Compass, GraduationCap, Scale, BarChart3 } from 'lucide-react';

export type ActiveTab = 'boussole' | 'explorer' | 'comparator' | 'analytics';

interface TopBarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedSchoolsCount: number;
  onOpenQuickMatch?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  setActiveTab,
  selectedSchoolsCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Wordmark */}
        <button
          onClick={() => setActiveTab('boussole')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs tracking-tight transition-transform group-hover:scale-105">
            IF
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
            IngéFinder
          </span>
        </button>

        {/* Clean Minimalist Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('boussole')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'boussole'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Compass className="w-4 h-4 text-indigo-600" />
            <span>Boussole & Spécialités</span>
          </button>

          <button
            onClick={() => setActiveTab('explorer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'explorer'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-slate-500" />
            <span>Répertoire</span>
            <span className="text-[11px] font-mono text-slate-400">119</span>
          </button>

          <button
            onClick={() => setActiveTab('comparator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'comparator'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Scale className="w-4 h-4 text-slate-500" />
            <span>Comparateur</span>
            {selectedSchoolsCount > 0 && (
              <span className="text-[11px] font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded">
                {selectedSchoolsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'analytics'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-slate-500" />
            <span>Analytique</span>
          </button>
        </nav>

      </div>
    </header>
  );
};
