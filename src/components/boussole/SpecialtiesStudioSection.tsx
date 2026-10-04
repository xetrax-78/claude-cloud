import React from 'react';
import { AlertCircle, Check, ExternalLink, School, Plus, Search, Briefcase, Building2, Cpu, Code2 } from 'lucide-react';
import { Ecole } from '../../types';
import { NON_COMMUNIQUE } from '../SourceTag';
import { ALL_DOMAINS } from './constants';
import type { BoussoleSectionProps } from './types';

export function SpecialtiesStudioSection({ s, onSelectSchool }: BoussoleSectionProps) {
  const { selectedDomain, setSelectedDomain, specialtyKeyword, setSpecialtyKeyword, comparedSpecialtySchoolIds, parcoursupWishlist, handleToggleWishlist, specialtiesInDomain } = s;
  return (
    <div className="space-y-6">
      
      {/* Domain Picker Ribbon */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-600" />
              <span>Choisissez une grande filière technologique pour explorer ses cursus :</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Visualisez les compétences, les entreprises qui recrutent, les salaires d'embauche et les débouchés réels.
            </p>
          </div>

          {/* Search input in domain */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filtrer métier, module, entreprise..."
              value={specialtyKeyword}
              onChange={e => setSpecialtyKeyword(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>
        </div>

        {/* Domain Badges */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
          {ALL_DOMAINS.map(d => (
            <button
              key={d}
              onClick={() => setSelectedDomain(d)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                selectedDomain === d
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{d}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Specialty Dossiers List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>Cursus répertoriés en « {selectedDomain} »</span>
            <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              {specialtiesInDomain.length} filières habilitées
            </span>
          </h3>
        </div>

        {specialtiesInDomain.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-slate-200">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-sm text-slate-600">Aucune spécialité ne correspond au mot-clé dans ce domaine.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {specialtiesInDomain.map(({ ecole, specialite }) => {
              const carteUrl = ecole.parcoursup_url || `https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte`;
              const isWishlisted = parcoursupWishlist.includes(ecole.id);
              const isCompared = comparedSpecialtySchoolIds.includes(ecole.id);
              const sal = specialite.salaire_moyen_specialite || ecole.insertion?.salaire_moyen_embauche || null;

              return (
                <article
                  key={specialite.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-300 transition-all hover:shadow-xs space-y-4"
                >
                  <div className="space-y-3">
                    {/* School and Location Banner */}
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-slate-900">{ecole.nom_officiel}</span>
                        <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-1 py-0.2 rounded text-[10px]">
                          {ecole.sigle}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{ecole.region || ecole.pays}</span>
                      </div>
                      <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {specialite.type_cursus}
                      </span>
                    </div>

                    {/* Specialty Title */}
                    <div>
                      <h4 
                        onClick={() => onSelectSchool(ecole)}
                        className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer"
                      >
                        {specialite.intitule_specialite}
                      </h4>
                      <span className="text-xs text-slate-500 font-medium">
                        {specialite.diplome_delivre} ({specialite.duree_annees} ans - 300 ECTS)
                      </span>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center text-xs">
                      <div>
                        <span className="block text-[10px] text-slate-400 font-medium">Salaire filière</span>
                        <strong className="font-mono text-sm font-bold text-emerald-700">
                          {sal != null ? `${sal} k€/an` : NON_COMMUNIQUE}
                        </strong>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 font-medium">Insertion 6 mois</span>
                        <strong className="font-mono text-sm font-bold text-slate-900">
                          {specialite.taux_insertion_specialite != null ? `${specialite.taux_insertion_specialite}%` : NON_COMMUNIQUE}
                        </strong>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 font-medium">Frais annuels</span>
                        <strong className="font-mono text-sm font-bold text-slate-900">
                          {ecole.frais_scolarite_annuels === 0 ? 'Gratuit' : `${ecole.frais_scolarite_annuels.toLocaleString('fr-FR')}€`}
                        </strong>
                      </div>
                    </div>

                    {/* Débouchés Métiers */}
                    {specialite.debouches_metiers && specialite.debouches_metiers.length > 0 && (
                      <div>
                        <span className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                          <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                          <span>Débouchés métiers préparés :</span>
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {specialite.debouches_metiers.map((m, mi) => (
                            <span 
                              key={mi} 
                              className="text-[10px] px-2 py-0.5 rounded bg-slate-50 text-slate-700 border border-slate-200 font-medium"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Modules phares */}
                    {specialite.modules_phares && specialite.modules_phares.length > 0 && (
                      <div>
                        <span className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                          <Code2 className="w-3.5 h-3.5 text-slate-500" />
                          <span>Modules de cours phares :</span>
                        </span>
                        <p className="text-[11px] text-slate-600 leading-snug">
                          {specialite.modules_phares.join(' · ')}
                        </p>
                      </div>
                    )}

                    {/* Recruteurs & Chaires d'entreprises */}
                    {specialite.partenaires_entreprises && specialite.partenaires_entreprises.length > 0 && (
                      <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                        <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-slate-400" />
                          <span>Recruteurs & Chaires d'excellence :</span>
                        </span>
                        <span className="text-[11px] font-semibold text-slate-800">
                          {specialite.partenaires_entreprises.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <a
                      href={carteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-indigo-700 hover:underline flex items-center gap-1"
                      title="Voir la fiche officielle sur la carte Parcoursup"
                    >
                      <span>Carte Parcoursup</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleToggleWishlist(ecole.id)}
                        className={`text-xs px-2.5 py-1 rounded border transition-colors flex items-center gap-1 ${
                          isWishlisted
                            ? 'bg-rose-50 border-rose-200 text-rose-800 font-semibold'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {isWishlisted ? <Check className="w-3 h-3 text-rose-600" /> : <Plus className="w-3 h-3" />}
                        <span>{isWishlisted ? 'Vœu ajouté' : '+ 10 Vœux'}</span>
                      </button>

                      <button
                        onClick={() => onSelectSchool(ecole)}
                        className="text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded transition-colors"
                      >
                        Dossier CTI
                      </button>
                    </div>
                  </div>

                </article>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
