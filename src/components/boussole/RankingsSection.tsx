import React from 'react';
import { Trophy, Check, ExternalLink, Plus } from 'lucide-react';
import { Ecole, Statut } from '../../types';
import { ALL_DOMAINS } from './constants';
import type { BoussoleSectionProps } from './types';

export function RankingsSection({ s, onSelectSchool }: BoussoleSectionProps) {
  const { selectedDomain, setSelectedDomain, parcoursupWishlist, specialtySortBy, setSpecialtySortBy, handleToggleWishlist, specialtyRankings } = s;
  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Palmarès par spécialité — Le Figaro Étudiant & L'Étudiant</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Évaluation académique, proximité avec les entreprises et sélectivité réelle.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Trier par :</span>
            <select
              aria-label="Trier par"
              value={specialtySortBy}
              onChange={e => setSpecialtySortBy(e.target.value as any)}
              className="text-xs p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
            >
              <option value="rank">Rang dans la filière</option>
              <option value="salary">Salaire de sortie (k€)</option>
              <option value="selectivity">Sélectivité Parcoursup</option>
              <option value="note">Note /20</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
          {ALL_DOMAINS.map(dom => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                selectedDomain === dom
                  ? 'bg-slate-900 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{dom}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100/75 text-slate-700 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Rang</th>
                <th className="py-3 px-4">Établissement</th>
                <th className="py-3 px-4">Région / Ville</th>
                <th className="py-3 px-4">Statut</th>
                <th className="py-3 px-4">Filière spécifique</th>
                <th className="py-3 px-4 text-right">Note Figaro</th>
                <th className="py-3 px-4 text-right">Salaire sortie</th>
                <th className="py-3 px-4 text-right">Accès Parcoursup</th>
                <th className="py-3 px-4 text-center">Carte Parcoursup</th>
                <th className="py-3 px-4 text-center">10 Vœux</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {specialtyRankings.map((item, idx) => {
                const isWishlisted = parcoursupWishlist.includes(item.ecole.id);
                const carteUrl = item.ecole.parcoursup_url || `https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte`;

                return (
                  <tr key={item.ecole.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md font-mono font-bold text-xs ${
                        idx === 0 
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : idx === 1
                          ? 'bg-slate-200 text-slate-800'
                          : idx === 2
                          ? 'bg-amber-50 text-amber-900 border border-amber-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        #{item.rank}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div 
                        onClick={() => onSelectSchool(item.ecole)}
                        className="font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer"
                      >
                        {item.ecole.nom_officiel}
                      </div>
                      <span className="font-mono text-[10px] text-slate-500 font-semibold bg-slate-100 px-1 py-0.2 rounded">
                        {item.ecole.sigle}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-700">{item.ecole.region || item.ecole.pays}</span>
                      <span className="block text-[11px] text-slate-400">{item.ecole.ville_principale}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-50 text-slate-700 border border-slate-200">
                        {item.ecole.statut_juridique}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[11px] text-slate-600 line-clamp-1 max-w-[200px]" title={item.specialiteOfferte}>
                        {item.specialiteOfferte}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                      {item.noteGlobale}/20
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        {item.salaireSortie != null ? `${item.salaireSortie} k€` : 'n.c.'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-indigo-700">
                      {item.tauxAccesPsup ? `${item.tauxAccesPsup}%` : 'Concours'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <a
                        href={carteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-indigo-700 font-bold hover:underline"
                        title="Ouvrir sur la carte Parcoursup"
                      >
                        <span>Carte</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleWishlist(item.ecole.id)}
                        className={`p-1.5 rounded transition-colors ${
                          isWishlisted
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        title={isWishlisted ? "Retirer des 10 vœux" : "Ajouter aux 10 vœux"}
                      >
                        {isWishlisted ? <Check className="w-3.5 h-3.5 text-rose-600" /> : <Plus className="w-3.5 h-3.5" />}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
