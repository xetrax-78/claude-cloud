import React from 'react';
import { SlidersHorizontal, Check, ExternalLink, Plus, Search } from 'lucide-react';
import { Ecole } from '../../types';
import { FRENCH_REGIONS, ADMISSION_TRACKS } from './constants';
import type { BoussoleSectionProps } from './types';

export function MulticriteriaSection({ s, onSelectSchool }: BoussoleSectionProps) {
  const { parcoursupWishlist, profil, setProfil, selectedRegion, setSelectedRegion, selectedConcours, setSelectedConcours, minSalary, setMinSalary, alternance, setAlternance, budgetMax, setBudgetMax, quickKeyword, setQuickKeyword, handleToggleWishlist, matchingResults, applyPreset } = s;
  return (
    <div className="space-y-6">
      
      {/* Preset Buttons */}
      <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-700">Presets 1-Clic :</span>
        <button onClick={() => applyPreset('ia_data')} className="px-2.5 py-1 text-xs bg-white hover:bg-slate-50 text-slate-800 rounded-md border border-slate-200 font-medium">🤖 IA & Data</button>
        <button onClick={() => applyPreset('aero')} className="px-2.5 py-1 text-xs bg-white hover:bg-slate-50 text-slate-800 rounded-md border border-slate-200 font-medium">🚀 Aéronautique</button>
        <button onClick={() => applyPreset('btp')} className="px-2.5 py-1 text-xs bg-white hover:bg-slate-50 text-slate-800 rounded-md border border-slate-200 font-medium">🏗️ BTP & Ville</button>
        <button onClick={() => applyPreset('cyber')} className="px-2.5 py-1 text-xs bg-white hover:bg-slate-50 text-slate-800 rounded-md border border-slate-200 font-medium">🛡️ Cybersécurité</button>
        <button onClick={() => applyPreset('public_free')} className="px-2.5 py-1 text-xs bg-white hover:bg-slate-50 text-slate-800 rounded-md border border-slate-200 font-medium">💰 Publiques &lt;1000€</button>
        <button onClick={() => applyPreset('alternance')} className="px-2.5 py-1 text-xs bg-white hover:bg-slate-50 text-slate-800 rounded-md border border-slate-200 font-medium">💼 Alternance</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Filters */}
        <aside aria-label="Critères de recherche" className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
              <span>Critères de Filtrage</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">{matchingResults.length} résultats</span>
          </div>

          {/* Profil */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Niveau d'entrée :</label>
            <select
              aria-label="Niveau d'entrée"
              value={profil}
              onChange={e => setProfil(e.target.value as any)}
              className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
            >
              <option value="Post-bac">Post-bac (Parcoursup)</option>
              <option value="Prépa CPGE">Prépa CPGE (Concours SCEI)</option>
              <option value="Admissions Parallèles (BUT/BTS/Licence)">Admissions Parallèles (Titre)</option>
              <option value="Tous">Tous profils</option>
            </select>
          </div>

          {/* Région */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Région :</label>
            <select
              aria-label="Région"
              value={selectedRegion}
              onChange={e => setSelectedRegion(e.target.value)}
              className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
            >
              {FRENCH_REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {/* Concours */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Concours :</label>
            <select
              aria-label="Concours"
              value={selectedConcours}
              onChange={e => setSelectedConcours(e.target.value)}
              className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
            >
              {ADMISSION_TRACKS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Salaire min */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Salaire minimum sortie :</label>
            <div className="grid grid-cols-4 gap-1">
              {[0, 42, 45, 50].map(s => (
                <button
                  key={s}
                  onClick={() => setMinSalary(s)}
                  className={`py-1 text-xs font-medium rounded-md border ${
                    minSalary === s ? 'bg-slate-900 text-white border-slate-900 font-bold' : 'bg-white text-slate-600'
                  }`}
                >
                  {s === 0 ? 'Indiff.' : `≥${s}k€`}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700">Frais scolarité max :</span>
              <span className="font-mono font-bold">{budgetMax >= 15000 ? 'Illimité' : `${budgetMax}€/an`}</span>
            </div>
            <input
              type="range"
              min={0}
              max={15000}
              step={500}
              value={budgetMax}
              onChange={e => setBudgetMax(Number(e.target.value))}
              className="w-full accent-slate-900"
            />
          </div>

          {/* Alternance */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Alternance :</label>
            <div className="grid grid-cols-3 gap-1">
              {(['Indifférent', 'Souhaitée', 'Obligatoire'] as const).map(opt => (
                <button
                  key={opt}
                  onClick={() => setAlternance(opt)}
                  className={`py-1 text-xs rounded-md border font-medium ${
                    alternance === opt ? 'bg-slate-900 text-white' : 'bg-white text-slate-600'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Results Grid */}
        <section aria-label="Résultats de la recherche multicritère" className="lg:col-span-8 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Recherche textuelle instantanée (école, ville, spécialité)..."
              value={quickKeyword}
              onChange={e => setQuickKeyword(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg shadow-2xs focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <div className="space-y-3">
            {matchingResults.map((item, idx) => {
              const { ecole, scoreMatch, pointsForts } = item;
              const carteUrl = ecole.parcoursup_url || `https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte`;
              const isWishlisted = parcoursupWishlist.includes(ecole.id);

              return (
                <div key={ecole.id} className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-slate-300 transition-all hover:shadow-xs">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <span className="font-semibold text-slate-800">{ecole.pays}</span>
                      {ecole.region && <span>· {ecole.region}</span>}
                      <span>· {ecole.ville_principale}</span>
                      <span>· {ecole.statut_juridique}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-slate-100 px-1.5 py-0.5 rounded">#{idx + 1}</span>
                      <h4 
                        onClick={() => onSelectSchool(ecole)}
                        className="font-bold text-base text-slate-900 hover:text-indigo-600 cursor-pointer"
                      >
                        {ecole.nom_officiel} ({ecole.sigle})
                      </h4>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-1">{ecole.description}</p>

                    <div className="flex flex-wrap gap-2 text-xs pt-1">
                      <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {ecole.insertion?.salaire_moyen_embauche} k€/an
                      </span>
                      <span className="font-mono font-bold text-slate-700 bg-slate-50 px-2 py-0.5 rounded">
                        {ecole.frais_scolarite_annuels === 0 ? 'Gratuit' : `${ecole.frais_scolarite_annuels}€`}
                      </span>
                      <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        Accès: {ecole.admissions[0]?.taux_acces ? `${ecole.admissions[0].taux_acces}%` : 'Concours'}
                      </span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 sm:min-w-[130px]">
                    <span className="font-mono text-xl font-bold text-indigo-600">{scoreMatch}%</span>
                    <div className="flex gap-1.5 w-full">
                      <a
                        href={carteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded border border-indigo-200"
                        title="Carte Parcoursup"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleToggleWishlist(ecole.id)}
                        className={`p-1.5 text-xs rounded border transition-colors ${
                          isWishlisted ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-white text-slate-600'
                        }`}
                        title="Ajouter aux 10 vœux"
                      >
                        {isWishlisted ? <Check className="w-3.5 h-3.5 text-rose-600" /> : <Plus className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => onSelectSchool(ecole)}
                        className="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 rounded"
                      >
                        Fiche
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
