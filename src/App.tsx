import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { TopBar } from './components/TopBar';
import { Ecole } from './types';
import { usePersistentState } from './utils/usePersistentState';
import { explorerHref, navigate, schoolHref, tabHref, useRoute } from './utils/router';

// Chaque vue et le jeu de données sont chargés à la demande (bundle initial léger)
const SpecialtiesAndCompassView = lazy(() => import('./components/SpecialtiesAndCompassView').then(m => ({ default: m.SpecialtiesAndCompassView })));
const ExplorerView = lazy(() => import('./components/ExplorerView').then(m => ({ default: m.ExplorerView })));
const ComparatorView = lazy(() => import('./components/ComparatorView').then(m => ({ default: m.ComparatorView })));
const AnalyticsView = lazy(() => import('./components/AnalyticsView').then(m => ({ default: m.AnalyticsView })));
const SchoolDetailPage = lazy(() => import('./components/SchoolDetailPage').then(m => ({ default: m.SchoolDetailPage })));

const MAX_COMPARED = 4;

const Loading = () => (
  <div role="status" className="py-24 text-center text-sm text-slate-500">Chargement…</div>
);

export default function App() {
  const route = useRoute();
  const [schools, setSchools] = useState<Ecole[] | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    import('./data')
      .then(m => setSchools(m.ALL_ESTABLISHMENTS))
      .catch(() => setLoadError(true));
  }, []);

  // Écoles d'ingénieurs et prépas CPGE sont comparées séparément ; listes conservées entre les visites
  const [comparedSchoolIds, setComparedSchoolIds] = usePersistentState<string[]>('ingefinder.compare.ecoles', []);
  const [comparedPrepaIds, setComparedPrepaIds] = usePersistentState<string[]>('ingefinder.compare.prepas', []);

  // Lien de comparaison partagé : /comparateur/?ecoles=a,b&prepas=c remplace la sélection locale
  useEffect(() => {
    if (route.tab !== 'comparator' || !schools) return;
    const ids = (key: string) => (route.params.get(key) ?? '').split(',').filter(id => schools.some(s => s.id === id)).slice(0, MAX_COMPARED);
    if (!route.params.has('ecoles') && !route.params.has('prepas')) return;
    setComparedSchoolIds(ids('ecoles'));
    setComparedPrepaIds(ids('prepas'));
    navigate(tabHref('comparator'), { replace: true });
  }, [route, schools]);

  const selectedSchool = useMemo(
    () => (route.schoolId && schools ? schools.find(s => s.id === route.schoolId) ?? null : null),
    [route.schoolId, schools]
  );

  useEffect(() => {
    const titles = { boussole: 'Boussole', explorer: 'Répertoire', comparator: 'Comparateur', analytics: 'Analytique' };
    const page = selectedSchool ? `${selectedSchool.sigle || selectedSchool.nom_officiel}` : titles[route.tab];
    document.title = `${page} — IngéFinder`;
  }, [route.tab, selectedSchool]);

  const handleToggleCompare = (ecole: Ecole) => {
    const setIds = ecole.type_etablissement === 'prepa_cpge' ? setComparedPrepaIds : setComparedSchoolIds;
    setIds(ids =>
      ids.includes(ecole.id) ? ids.filter(id => id !== ecole.id)
      : ids.length < MAX_COMPARED ? [...ids, ecole.id]
      : ids
    );
  };

  const openSchool = (ecole: Ecole) => navigate(schoolHref(ecole.id));

  const isCurrentPageCompared = selectedSchool
    ? (selectedSchool.type_etablissement === 'prepa_cpge'
        ? comparedPrepaIds.includes(selectedSchool.id)
        : comparedSchoolIds.includes(selectedSchool.id))
    : false;

  const renderView = (data: Ecole[]) => {
    switch (route.tab) {
      case 'boussole':
        return (
          <SpecialtiesAndCompassView
            schools={data}
            onSelectSchool={openSchool}
            onToggleCompare={handleToggleCompare}
            comparedSchoolIds={comparedSchoolIds}
          />
        );
      case 'explorer':
        if (route.schoolId && !selectedSchool) {
          return (
            <div className="py-24 text-center space-y-3">
              <p className="text-slate-700 font-semibold">Établissement introuvable.</p>
              <a href={tabHref('explorer')} className="text-sm text-indigo-600 hover:underline">Retour au répertoire</a>
            </div>
          );
        }
        return selectedSchool ? (
          <SchoolDetailPage
            ecole={selectedSchool}
            onBack={() => navigate(explorerHref(selectedSchool.type_etablissement === 'prepa_cpge' ? 'prepas' : 'ecoles'))}
            onToggleCompare={handleToggleCompare}
            isCompared={isCurrentPageCompared}
            onSelectOtherSchool={openSchool}
            allSchools={data}
          />
        ) : (
          <ExplorerView
            type={route.explorerType}
            onTypeChange={(t) => navigate(explorerHref(t), { replace: true })}
            schools={data}
            onSelectSchool={openSchool}
            onToggleCompare={handleToggleCompare}
            comparedSchoolIds={comparedSchoolIds}
            comparedPrepaIds={comparedPrepaIds}
            onGoToComparator={() => navigate(tabHref('comparator'))}
          />
        );
      case 'comparator':
        return (
          <ComparatorView
            schools={data}
            comparedSchoolIds={comparedSchoolIds}
            comparedPrepaIds={comparedPrepaIds}
            onToggleCompareSchool={handleToggleCompare}
            onToggleComparePrepa={handleToggleCompare}
            onClearCompareSchool={() => setComparedSchoolIds([])}
            onClearComparePrepa={() => setComparedPrepaIds([])}
            onSelectSchoolForPage={openSchool}
          />
        );
      case 'analytics':
        return <AnalyticsView schools={data} onSelectSchool={openSchool} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <a href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }} className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:rounded focus:shadow">
        Aller au contenu
      </a>

      <TopBar
        activeTab={route.tab}
        selectedSchoolsCount={comparedSchoolIds.length + comparedPrepaIds.length}
        totalEstablishments={schools?.length}
      />

      <main id="main" tabIndex={-1} className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 outline-none">
        {loadError ? (
          <div role="alert" className="py-24 text-center text-sm text-rose-700">
            Impossible de charger les données. Rechargez la page.
          </div>
        ) : schools ? (
          <Suspense fallback={<Loading />}>{renderView(schools)}</Suspense>
        ) : (
          <Loading />
        )}
      </main>

      <footer className="mt-auto border-t border-slate-200 bg-white py-8 pb-24 sm:pb-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-900 tracking-tight">IngéFinder</span>
              <span aria-hidden="true">·</span>
              <span>Écoles d'ingénieurs & prépas CPGE</span>
            </div>

            <nav aria-label="Liens de bas de page" className="flex items-center gap-4 text-slate-600 flex-wrap">
              <a href={tabHref('explorer')} className="hover:text-slate-900 transition-colors">Répertoire des formations</a>
              <span aria-hidden="true">·</span>
              <a href={tabHref('comparator')} className="hover:text-slate-900 transition-colors">Comparateur</a>
              <span aria-hidden="true">·</span>
              <a href={tabHref('boussole')} className="hover:text-slate-900 transition-colors">Boussole</a>
            </nav>
          </div>

          <p className="text-[11px] leading-relaxed text-slate-400 text-center sm:text-left">
            Données indicatives (sessions 2024–2025) compilées à partir de Parcoursup, du SCEI, des enquêtes d'insertion
            et des palmarès presse (Le Figaro Étudiant, L'Étudiant, L'Usine Nouvelle). Vérifiez toujours les chiffres
            sur le site de l'établissement et sur Parcoursup avant de formuler vos vœux.
          </p>
        </div>
      </footer>
    </div>
  );
}
