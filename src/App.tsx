import React, { useState } from 'react';
import { TopBar, ActiveTab } from './components/TopBar';
import { SpecialtiesAndCompassView } from './components/SpecialtiesAndCompassView';
import { ExplorerView } from './components/ExplorerView';
import { ComparatorView } from './components/ComparatorView';
import { AnalyticsView } from './components/AnalyticsView';
import { SchoolDetailPage } from './components/SchoolDetailPage';
import { ALL_ESTABLISHMENTS } from './data';
import { Ecole } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('boussole');
  const [selectedSchoolForPage, setSelectedSchoolForPage] = useState<Ecole | null>(null);

  // STRICT SEPARATION: Compared engineering schools vs compared CPGE prepas
  const [comparedSchoolIds, setComparedSchoolIds] = useState<string[]>([
    'polytechnique-fra',
    'centralesupelec-fra',
    'mines-paris-fra'
  ]);

  const [comparedPrepaIds, setComparedPrepaIds] = useState<string[]>([
    'jean-baptiste-say-paris-fra',
    'ginette-versailles-fra',
    'passy-buzenval-rueil-fra'
  ]);

  // Route to the appropriate compare list based on establishment type
  const handleToggleCompare = (ecole: Ecole) => {
    const isPrepa = ecole.type_etablissement === 'prepa_cpge';
    if (isPrepa) {
      if (comparedPrepaIds.includes(ecole.id)) {
        setComparedPrepaIds(comparedPrepaIds.filter(id => id !== ecole.id));
      } else {
        if (comparedPrepaIds.length < 4) {
          setComparedPrepaIds([...comparedPrepaIds, ecole.id]);
        }
      }
    } else {
      if (comparedSchoolIds.includes(ecole.id)) {
        setComparedSchoolIds(comparedSchoolIds.filter(id => id !== ecole.id));
      } else {
        if (comparedSchoolIds.length < 4) {
          setComparedSchoolIds([...comparedSchoolIds, ecole.id]);
        }
      }
    }
  };

  const handleSelectSchoolFromAnywhere = (ecole: Ecole) => {
    setSelectedSchoolForPage(ecole);
    setActiveTab('explorer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (tab !== 'explorer') {
      setSelectedSchoolForPage(null);
    }
  };

  const isCurrentPageCompared = selectedSchoolForPage
    ? (selectedSchoolForPage.type_etablissement === 'prepa_cpge'
        ? comparedPrepaIds.includes(selectedSchoolForPage.id)
        : comparedSchoolIds.includes(selectedSchoolForPage.id))
    : false;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* 1. Minimal Navigation Header */}
      <TopBar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        selectedSchoolsCount={comparedSchoolIds.length + comparedPrepaIds.length}
      />

      {/* 2. Main Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'boussole' && (
          <SpecialtiesAndCompassView
            schools={ALL_ESTABLISHMENTS}
            onSelectSchool={handleSelectSchoolFromAnywhere}
            onToggleCompare={handleToggleCompare}
            comparedSchoolIds={comparedSchoolIds}
          />
        )}

        {activeTab === 'explorer' && (
          selectedSchoolForPage ? (
            <SchoolDetailPage
              ecole={selectedSchoolForPage}
              onBack={() => {
                setSelectedSchoolForPage(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onToggleCompare={handleToggleCompare}
              isCompared={isCurrentPageCompared}
              onSelectOtherSchool={(s) => {
                setSelectedSchoolForPage(s);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              allSchools={ALL_ESTABLISHMENTS}
            />
          ) : (
            <ExplorerView
              schools={ALL_ESTABLISHMENTS}
              onSelectSchool={(s) => {
                setSelectedSchoolForPage(s);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onToggleCompare={handleToggleCompare}
              comparedSchoolIds={comparedSchoolIds}
              comparedPrepaIds={comparedPrepaIds}
              onGoToComparator={() => setActiveTab('comparator')}
            />
          )
        )}

        {activeTab === 'comparator' && (
          <ComparatorView
            schools={ALL_ESTABLISHMENTS}
            comparedSchoolIds={comparedSchoolIds}
            comparedPrepaIds={comparedPrepaIds}
            onToggleCompareSchool={(s) => handleToggleCompare(s)}
            onToggleComparePrepa={(p) => handleToggleCompare(p)}
            onClearCompareSchool={() => setComparedSchoolIds([])}
            onClearComparePrepa={() => setComparedPrepaIds([])}
            onSelectSchoolForPage={handleSelectSchoolFromAnywhere}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView
            schools={ALL_ESTABLISHMENTS}
            onSelectSchool={handleSelectSchoolFromAnywhere}
          />
        )}
      </main>

      {/* 3. Quiet Editorial Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-slate-900 tracking-tight">IngéFinder</span>
            <span aria-hidden="true">·</span>
            <span>Répertoire CTI & CPGE</span>
            <span aria-hidden="true">·</span>
            <span>Statistiques vérifiées Parcoursup & SCEI</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600 flex-wrap">
            <button 
              onClick={() => { setSelectedSchoolForPage(null); setActiveTab('explorer'); }}
              className="hover:text-slate-900 transition-colors"
            >
              Répertoire des Formations
            </button>
            <span aria-hidden="true">·</span>
            <button 
              onClick={() => setActiveTab('comparator')}
              className="hover:text-slate-900 transition-colors"
            >
              Comparateur
            </button>
            <span aria-hidden="true">·</span>
            <button 
              onClick={() => setActiveTab('boussole')}
              className="hover:text-slate-900 transition-colors"
            >
              Boussole
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
