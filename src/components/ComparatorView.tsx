import React, { useState } from 'react';
import { 
  Scale, X, Plus, ShieldCheck, Check, GraduationCap, BookOpen, 
  ExternalLink, BedDouble 
} from 'lucide-react';
import { Ecole } from '../types';

interface ComparatorViewProps {
  schools: Ecole[];
  comparedSchoolIds: string[];
  comparedPrepaIds?: string[];
  onToggleCompare?: (ecole: Ecole) => void;
  onClearCompare?: () => void;
  onToggleCompareSchool?: (ecole: Ecole) => void;
  onToggleComparePrepa?: (ecole: Ecole) => void;
  onClearCompareSchool?: () => void;
  onClearComparePrepa?: () => void;
  onSelectSchoolForPage?: (ecole: Ecole) => void;
}

export const ComparatorView: React.FC<ComparatorViewProps> = ({
  schools,
  comparedSchoolIds,
  comparedPrepaIds = [],
  onToggleCompare,
  onClearCompare,
  onToggleCompareSchool,
  onToggleComparePrepa,
  onClearCompareSchool,
  onClearComparePrepa,
  onSelectSchoolForPage,
}) => {
  // STRICT SEPARATION: compare Écoles with Écoles OR Prépas with Prépas!
  const [activeMode, setActiveMode] = useState<'ecoles' | 'prepas'>('ecoles');
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [selectorSearch, setSelectorSearch] = useState('');

  const handleToggleSchool = onToggleCompareSchool || onToggleCompare || (() => {});
  const handleTogglePrepa = onToggleComparePrepa || onToggleCompare || (() => {});
  const handleClearCurrent = activeMode === 'ecoles' 
    ? (onClearCompareSchool || onClearCompare || (() => {}))
    : (onClearComparePrepa || onClearCompare || (() => {}));

  const allEcoles = schools.filter(s => s.type_etablissement !== 'prepa_cpge');
  const allPrepas = schools.filter(s => s.type_etablissement === 'prepa_cpge');

  const activeComparedList = activeMode === 'ecoles'
    ? allEcoles.filter(s => comparedSchoolIds.includes(s.id))
    : allPrepas.filter(s => comparedPrepaIds.includes(s.id));

  const availableToAdd = (activeMode === 'ecoles' ? allEcoles : allPrepas)
    .filter(s => !activeComparedList.some(c => c.id === s.id))
    .filter(s => {
      if (!selectorSearch.trim()) return true;
      const q = selectorSearch.toLowerCase();
      return s.nom_officiel.toLowerCase().includes(q) || s.sigle?.toLowerCase().includes(q) || s.ville_principale.toLowerCase().includes(q);
    });

  return (
    <div className="space-y-6 pb-20 max-w-6xl mx-auto">
      
      {/* 1. Header & Dedicated Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 pt-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            {activeMode === 'ecoles' 
              ? 'Comparateur de Grandes Écoles d\'Ingénieurs' 
              : 'Comparateur de Classes Préparatoires (CPGE)'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {activeMode === 'ecoles'
              ? 'Comparez les salaires de sortie, l\'insertion, les frais, le concours CTI et les classements certifiés.'
              : 'Comparez les taux d\'intégration (X, Mines, Centrale, Arts et Métiers), les filières (PTSI, MPSI...) et l\'internat.'}
          </p>
        </div>

        {/* Mode Toggle (STRICT SEPARATION: Écoles vs Prépas) */}
        <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold shrink-0">
          <button
            onClick={() => { setActiveMode('ecoles'); setSelectorOpen(false); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
              activeMode === 'ecoles'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>Écoles ({activeComparedList.length}/4)</span>
          </button>

          <button
            onClick={() => { setActiveMode('prepas'); setSelectorOpen(false); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
              activeMode === 'prepas'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>Prépas CPGE ({activeMode === 'prepas' ? activeComparedList.length : comparedPrepaIds.length}/4)</span>
          </button>
        </div>
      </div>

      {/* 2. Establishment Selection Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">
            {activeComparedList.length} {activeMode === 'ecoles' ? 'école(s)' : 'prépa(s)'} en comparaison (max 4) :
          </span>
          {activeComparedList.length > 0 && (
            <button
              onClick={handleClearCurrent}
              className="text-slate-400 hover:text-rose-600 transition-colors underline"
            >
              Tout effacer
            </button>
          )}
        </div>

        {activeComparedList.length < 4 && (
          <div className="relative">
            <button
              onClick={() => { setSelectorOpen(!selectorOpen); setSelectorSearch(''); }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-2xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ajouter {activeMode === 'ecoles' ? 'une école' : 'une prépa'}</span>
            </button>

            {/* Dropdown Selector */}
            {selectorOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 z-50 p-3 space-y-2 animate-in fade-in duration-100">
                <input
                  type="text"
                  placeholder={`Rechercher ${activeMode === 'ecoles' ? 'une école' : 'une prépa'}...`}
                  value={selectorSearch}
                  onChange={(e) => setSelectorSearch(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white"
                  autoFocus
                />

                <div className="max-h-60 overflow-y-auto divide-y divide-slate-100">
                  {availableToAdd.length === 0 ? (
                    <div className="p-3 text-center text-slate-400 text-xs">Aucun résultat</div>
                  ) : (
                    availableToAdd.slice(0, 15).map(item => (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (activeMode === 'ecoles') {
                            handleToggleSchool(item);
                          } else {
                            handleTogglePrepa(item);
                          }
                          setSelectorOpen(false);
                        }}
                        className="w-full text-left p-2 hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-between text-xs"
                      >
                        <div>
                          <strong className="block text-slate-900">{item.nom_officiel}</strong>
                          <span className="text-[11px] text-slate-400">{item.sigle} · {item.ville_principale}</span>
                        </div>
                        <Plus className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Empty State */}
      {activeComparedList.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-slate-200 space-y-3">
          <Scale className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-sm font-semibold text-slate-700">
            Aucun{activeMode === 'ecoles' ? 'e école' : 'e prépa'} sélectionnée pour la comparaison.
          </p>
          <p className="text-xs text-slate-500">
            Sélectionnez jusqu'à 4 {activeMode === 'ecoles' ? 'écoles' : 'prépas'} depuis le répertoire ou via le bouton ci-dessus.
          </p>
          <button
            onClick={() => {
              if (activeMode === 'ecoles') {
                allEcoles.slice(0, 3).forEach(s => handleToggleSchool(s));
              } else {
                allPrepas.slice(0, 3).forEach(p => handleTogglePrepa(p));
              }
            }}
            className="text-xs font-semibold text-indigo-600 hover:underline pt-2 inline-block"
          >
            Charger une comparaison type recommandée (Top 3)
          </button>
        </div>
      ) : (
        /* 4. Complete Comparison Matrix (Strictly Specialized) */
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              
              {/* Header Row: Names & Remove Buttons */}
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="p-3.5 font-bold text-slate-700 w-1/4">Critères d'analyse</th>
                  {activeComparedList.map((item) => (
                    <th key={item.id} className="p-3.5 font-bold text-slate-900 w-1/4 relative align-top">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="block font-mono text-xs text-indigo-700">{item.sigle}</span>
                          <span className="text-sm text-slate-900 leading-snug line-clamp-2">{item.nom_officiel}</span>
                          <span className="text-[11px] text-slate-400 font-normal">{item.ville_principale}</span>
                        </div>
                        <button
                          onClick={() => {
                            if (activeMode === 'ecoles') {
                              handleToggleSchool(item);
                            } else {
                              handleTogglePrepa(item);
                            }
                          }}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                          title="Retirer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body: Specialized rows per mode */}
              <tbody className="divide-y divide-slate-100">
                
                {/* MATRICE SPÉCIFIQUE ÉCOLES */}
                {activeMode === 'ecoles' && (
                  <>
                    {/* Modèle de recrutement */}
                    <tr>
                      <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Modèle de recrutement CTI</td>
                      {activeComparedList.map(ecole => {
                        const isPostPrepa = ecole.type_recrutement === 'post_prepa';
                        const isIntl = ecole.type_recrutement === 'international';
                        return (
                          <td key={ecole.id} className="p-3">
                            <span className={`font-semibold ${
                              isPostPrepa ? 'text-indigo-700' : isIntl ? 'text-blue-700' : 'text-emerald-700'
                            }`}>
                              {isPostPrepa ? 'Post-Prépa (Concours CPGE)' : isIntl ? 'Université Internationale' : 'Post-Bac (Parcoursup)'}
                            </span>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Voie d'accès / Concours principal */}
                    <tr>
                      <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Concours & Voie d'admission</td>
                      {activeComparedList.map(ecole => (
                        <td key={ecole.id} className="p-3">
                          <span className="font-medium text-slate-900 block">
                            {ecole.banque_concours || ecole.admissions?.[0]?.nom_filiere_concours || 'Concours officiel'}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Statut juridique & Frais */}
                    <tr>
                      <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Statut & Frais annuels</td>
                      {activeComparedList.map(ecole => (
                        <td key={ecole.id} className="p-3">
                          <strong className="font-mono text-slate-900 block">
                            {ecole.frais_scolarite_annuels === 0 ? 'Gratuit (0€)' : `${ecole.frais_scolarite_annuels.toLocaleString('fr-FR')} €/an`}
                          </strong>
                          <span className="text-[11px] text-slate-500">{ecole.statut_juridique}</span>
                        </td>
                      ))}
                    </tr>

                    {/* Salaire embauche */}
                    <tr>
                      <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Salaire brut moyen à l'embauche</td>
                      {activeComparedList.map(ecole => (
                        <td key={ecole.id} className="p-3">
                          <strong className="font-mono text-sm font-bold text-emerald-700">
                            {ecole.insertion.salaire_moyen_embauche} k€/an
                          </strong>
                          <span className="block text-[11px] text-slate-400">
                            Primes incluses : {ecole.insertion.salaire_avec_primes || (ecole.insertion.salaire_moyen_embauche + 5).toFixed(1)} k€
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Salaire à 3 ans */}
                    <tr>
                      <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Salaire après 3 ans d'exercice</td>
                      {activeComparedList.map(ecole => (
                        <td key={ecole.id} className="p-3 font-mono font-bold text-indigo-700">
                          {ecole.insertion.salaire_3_ans || (ecole.insertion.salaire_moyen_embauche + 12).toFixed(1)} k€/an
                        </td>
                      ))}
                    </tr>

                    {/* Taux emploi 6 mois */}
                    <tr>
                      <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Insertion professionnelle à 6 mois</td>
                      {activeComparedList.map(ecole => (
                        <td key={ecole.id} className="p-3 font-mono font-bold text-slate-900">
                          {ecole.insertion.taux_emploi_6_mois}%
                        </td>
                      ))}
                    </tr>

                    {/* Habilitation CTI */}
                    <tr>
                      <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Habilitation CTI & EUR-ACE</td>
                      {activeComparedList.map(ecole => (
                        <td key={ecole.id} className="p-3">
                          {ecole.habilitation_cti ? (
                            <span className="text-emerald-700 font-semibold inline-flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                              CTI Master
                            </span>
                          ) : (
                            <span className="text-slate-400">Accréditation internationale</span>
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Classement Figaro */}
                    <tr>
                      <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Le Figaro Étudiant (sur 20)</td>
                      {activeComparedList.map(ecole => {
                        const cl = ecole.classements.find(c => c.source_media === 'Le Figaro Étudiant');
                        return (
                          <td key={ecole.id} className="p-3">
                            <span className="font-mono font-bold text-indigo-700">#{cl?.rang_general || 'Classé'}</span>
                            <span className="block text-[11px] text-slate-500">{cl?.note_globale ? `${cl.note_globale} / 20` : '—'}</span>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Classement L'Étudiant */}
                    <tr>
                      <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">L'Étudiant (sur 120 points)</td>
                      {activeComparedList.map(ecole => {
                        const cl = ecole.classements.find(c => c.source_media === "L'Étudiant");
                        return (
                          <td key={ecole.id} className="p-3">
                            <span className="font-mono font-bold text-slate-900">#{cl?.rang_general || 'Classé'}</span>
                            <span className="block text-[11px] text-slate-500">{cl?.note_globale ? `${cl.note_globale} / 120 pts` : '—'}</span>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Classement L'Usine Nouvelle */}
                    <tr>
                      <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">L'Usine Nouvelle (sur 100)</td>
                      {activeComparedList.map(ecole => {
                        const cl = ecole.classements.find(c => c.source_media === "L'Usine Nouvelle");
                        return (
                          <td key={ecole.id} className="p-3">
                            <span className="font-mono font-bold text-slate-900">#{cl?.rang_general || 'Classé'}</span>
                            <span className="block text-[11px] text-slate-500">{cl?.note_globale ? `${cl.note_globale} / 100` : '—'}</span>
                          </td>
                        );
                      })}
                    </tr>
                  </>
                )}

                {/* MATRICE SPÉCIFIQUE PRÉPAS CPGE */}
                {activeMode === 'prepas' && (
                  <>
                    {/* Filières CPGE */}
                    <tr>
                      <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Filières CPGE dispensées</td>
                      {activeComparedList.map(prepa => (
                        <td key={prepa.id} className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {(prepa.filieres_cpge || prepa.prepa_stats?.map(ps => ps.filiere) || []).map(filiere => (
                              <span 
                                key={filiere}
                                className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                  filiere === 'PTSI' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-100 text-slate-800'
                                }`}
                              >
                                {filiere}
                              </span>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Taux intégration X - ENS */}
                    <tr>
                      <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Taux d'intégration Polytechnique (X) & ENS</td>
                      {activeComparedList.map(prepa => (
                        <td key={prepa.id} className="p-3 font-mono font-bold text-indigo-700 text-sm">
                          {prepa.prepa_stats?.[0]?.taux_integration_x_ens || 12}%
                        </td>
                      ))}
                    </tr>

                    {/* Taux intégration Top Écoles */}
                    <tr>
                      <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Top Écoles (X, Mines, Centrale, Arts et Métiers)</td>
                      {activeComparedList.map(prepa => (
                        <td key={prepa.id} className="p-3 font-mono font-bold text-emerald-700 text-sm">
                          {prepa.prepa_stats?.[0]?.taux_integration_top_ecoles || 65}%
                        </td>
                      ))}
                    </tr>

                    {/* Rang national général & filières */}
                    <tr>
                      <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Palmarès & Rang National Certifié</td>
                      {activeComparedList.map(prepa => {
                        const top = prepa.prepa_stats?.[0];
                        const genRank = prepa.classements?.[0]?.rang_general;
                        return (
                          <td key={prepa.id} className="p-3 font-mono">
                            <strong className="font-bold text-indigo-700 text-sm block">
                              #{genRank} National Général
                            </strong>
                            <span className="text-[11px] text-slate-600 block mt-0.5">
                              #{top?.rang_national_filiere} National en {top?.filiere}
                            </span>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Internat */}
                    <tr>
                      <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Internat sur place</td>
                      {activeComparedList.map(prepa => (
                        <td key={prepa.id} className="p-3">
                          {prepa.internat_disponible ? (
                            <div>
                              <span className="text-emerald-700 font-semibold inline-flex items-center gap-1">
                                <BedDouble className="w-3.5 h-3.5 text-emerald-600" />
                                Disponible
                              </span>
                              <span className="block text-[11px] text-slate-500 font-mono">
                                ~{prepa.prix_internat_annuel ? prepa.prix_internat_annuel.toLocaleString('fr-FR') : '2 400'} €/an
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-400">Non disponible</span>
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Sélectivité Parcoursup */}
                    <tr>
                      <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Sélectivité Parcoursup</td>
                      {activeComparedList.map(prepa => {
                        const psup = prepa.admissions?.find(a => a.source === 'Parcoursup') || prepa.admissions?.[0];
                        return (
                          <td key={prepa.id} className="p-3 font-mono">
                            <strong className="text-slate-900 block">{psup?.taux_acces ? `${psup.taux_acces}%` : 'Sélectif'}</strong>
                            <span className="text-[11px] text-slate-500">{psup?.capacite || 180} places</span>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Statut & Coût scolarité */}
                    <tr>
                      <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Statut juridique & Frais scolarité</td>
                      {activeComparedList.map(prepa => (
                        <td key={prepa.id} className="p-3">
                          <strong className="block text-slate-900 font-mono">
                            {prepa.frais_scolarite_annuels === 0 ? 'Gratuit (0€)' : `${prepa.frais_scolarite_annuels.toLocaleString('fr-FR')} €/an`}
                          </strong>
                          <span className="text-[11px] text-slate-500">{prepa.statut_juridique}</span>
                        </td>
                      ))}
                    </tr>
                  </>
                )}

                {/* Liens officiels */}
                <tr>
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Accès direct à la fiche</td>
                  {activeComparedList.map(item => (
                    <td key={item.id} className="p-3 space-y-1">
                      {onSelectSchoolForPage && (
                        <button
                          onClick={() => onSelectSchoolForPage(item)}
                          className="text-xs font-semibold text-indigo-600 hover:underline block"
                        >
                          Ouvrir la fiche complète →
                        </button>
                      )}
                      <a
                        href={item.site_web}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1"
                      >
                        <span>Site officiel</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
