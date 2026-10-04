import React from 'react';
import heroImage from '../assets/images/hero-campus.webp';
import heroImageSmall from '../assets/images/hero-campus-768.webp';
import { CheckCircle2, Trophy, Target, Compass, BookOpen, Scale } from 'lucide-react';
import { Ecole } from '../types';
import { useBoussoleState } from './boussole/useBoussoleState';
import { SpecialtiesStudioSection } from './boussole/SpecialtiesStudioSection';
import { SpecialtiesCompareSection } from './boussole/SpecialtiesCompareSection';
import { ParcoursupStrategySection } from './boussole/ParcoursupStrategySection';
import { MulticriteriaSection } from './boussole/MulticriteriaSection';
import { RankingsSection } from './boussole/RankingsSection';

interface SpecialtiesAndCompassViewProps {
  schools: Ecole[];
  onSelectSchool: (ecole: Ecole) => void;
  onToggleCompare: (ecole: Ecole) => void;
  comparedSchoolIds: string[];
}

// Boussole : en-tête, navigation entre les 5 modules ; chaque module vit dans ./boussole/
export const SpecialtiesAndCompassView: React.FC<SpecialtiesAndCompassViewProps> = ({
  schools,
  onSelectSchool,
  onToggleCompare,
  comparedSchoolIds,
}) => {
  const s = useBoussoleState(schools);
  const { engineeringSchools, totalSpecialties, activeSection, setActiveSection, parcoursupWishlist } = s;
  const sectionProps = { s, schools, onSelectSchool, onToggleCompare, comparedSchoolIds };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Studio Header Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
          <div className="lg:col-span-7 p-6 sm:p-10 z-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
              <span className="font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 font-bold">
                BOUSSOLE D'ORIENTATION
              </span>
              <span>{totalSpecialties} spécialités · {engineeringSchools.length} écoles d'ingénieurs</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 max-w-xl text-balance">
              Trouvez votre école d'ingénieurs et préparez vos vœux.
            </h1>
            
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-lg leading-relaxed">
              Comparez les <strong>débouchés</strong>, les <strong>salaires par spécialité</strong> et les <strong>entreprises partenaires</strong>, puis construisez une liste de 10 vœux Parcoursup équilibrée.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {totalSpecialties} cursus & fiches métiers
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Chaires & recruteurs partenaires
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Analyse de vos vœux Parcoursup
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 h-64 lg:h-full relative overflow-hidden bg-slate-100">
            <img 
              src={heroImage}
              srcSet={`${heroImageSmall} 768w, ${heroImage} 1376w`}
              sizes="(min-width: 1024px) 42vw, 100vw"
              width={1376}
              height={768}
              fetchPriority="high"
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-white lg:via-transparent lg:to-transparent" />
          </div>
        </div>
      </section>

      {/* Navigation entre les 5 modules */}
      <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveSection('specialties_studio')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
              activeSection === 'specialties_studio'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Spécialités & débouchés</span>
          </button>

          <button
            onClick={() => setActiveSection('specialties_compare')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
              activeSection === 'specialties_compare'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>Comparer des filières</span>
          </button>

          <button
            onClick={() => setActiveSection('parcoursup_strategy')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors relative ${
              activeSection === 'parcoursup_strategy'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Target className="w-4 h-4 text-rose-500" />
            <span>Mes vœux Parcoursup</span>
            <span className="font-mono text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-bold">
              {parcoursupWishlist.length}/10
            </span>
          </button>

          <button
            onClick={() => setActiveSection('multicriteria_engine')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
              activeSection === 'multicriteria_engine'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-500" />
            <span>Recherche multicritère</span>
          </button>

          <button
            onClick={() => setActiveSection('rankings_table')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
              activeSection === 'rankings_table'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Palmarès par spécialité</span>
          </button>
        </div>

        <span className="text-xs text-slate-500 font-mono hidden xl:inline px-3 font-semibold">
          {totalSpecialties} cursus
        </span>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1 : STUDIO DES SPÉCIALITÉS & DÉBOUCHÉS MÉTIERS                      */}
      {/* ========================================================================= */}
      {activeSection === 'specialties_studio' && <SpecialtiesStudioSection {...sectionProps} />}

      {/* ========================================================================= */}
      {/* SECTION 2 : COMPARATEUR SPÉCIFIQUE DE FILIÈRES                             */}
      {/* ========================================================================= */}
      {activeSection === 'specialties_compare' && <SpecialtiesCompareSection {...sectionProps} />}

      {/* ========================================================================= */}
      {/* SECTION 3 : STRATÉGIE PARCOURSUP & AUDIT PRÉDICTIF (10 VŒUX)               */}
      {/* ========================================================================= */}
      {activeSection === 'parcoursup_strategy' && <ParcoursupStrategySection {...sectionProps} />}

      {/* ========================================================================= */}
      {/* SECTION 4 : RECHERCHE MULTICRITÈRE                                          */}
      {/* ========================================================================= */}
      {activeSection === 'multicriteria_engine' && <MulticriteriaSection {...sectionProps} />}

      {/* ========================================================================= */}
      {/* SECTION 5 : PALMARÈS SPÉCIALITÉS (LE FIGARO / L'ÉTUDIANT)                  */}
      {/* ========================================================================= */}
      {activeSection === 'rankings_table' && <RankingsSection {...sectionProps} />}

    </div>
  );
};
