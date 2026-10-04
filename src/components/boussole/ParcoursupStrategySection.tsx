import React from 'react';
import { Target, Check, ExternalLink, Plus, Trash2, Share2, Printer, Info } from 'lucide-react';
import { Ecole } from '../../types';
import { printWishlist } from '../../utils/wishlist';
import type { BoussoleSectionProps } from './types';

export function ParcoursupStrategySection({ s, onSelectSchool }: BoussoleSectionProps) {
  const { parcoursupWishlist, candidateAcademicLevel, setCandidateAcademicLevel, copyToast, profil, handleToggleWishlist, selectivityTiers, wishlistAnalysis, copyWishlistPlan } = s;
  return (
    <div className="space-y-6">
      
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-rose-500" />
              <h2 className="text-base font-bold text-slate-900">
                Construire et équilibrer ma liste de vœux Parcoursup
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Composez votre liste de 10 sous-vœux et simulez vos chances selon vos notes au lycée.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 bg-slate-900 text-white rounded-lg">
              {wishlistAnalysis.total} / 10 Vœux
            </span>
            {wishlistAnalysis.total > 0 && (
              <button
                onClick={copyWishlistPlan}
                className="px-3 py-1 text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg border border-indigo-200 flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copyToast ? 'Copié !' : 'Copier la liste'}</span>
              </button>
            )}
            {wishlistAnalysis.total > 0 && (
              <button
                onClick={() => printWishlist(wishlistAnalysis)}
                className="px-3 py-1 text-xs font-semibold bg-white text-slate-700 hover:bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>PDF / Imprimer</span>
              </button>
            )}
          </div>
        </div>

        {/* Candidate Level Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
          <div>
            <span className="text-xs font-bold text-slate-800 block">Votre profil académique prévisionnel :</span>
            <span className="text-[11px] text-slate-500">Ajuste l'évaluation du risque sur les vœux</span>
          </div>
          <div className="flex items-center gap-1.5">
            {[
              { id: 'tb', label: 'Mention Très Bien (> 16/20)' },
              { id: 'b', label: 'Mention Bien (14-16/20)' },
              { id: 'ab', label: 'Mention Assez Bien (12-14/20)' }
            ].map(lvl => (
              <button
                key={lvl.id}
                onClick={() => setCandidateAcademicLevel(lvl.id as any)}
                className={`px-3 py-1 text-xs rounded-md border font-semibold transition-colors ${
                  candidateAcademicLevel === lvl.id
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Diagnostic Message */}
        <div className={`p-4 rounded-xl border text-xs leading-relaxed flex items-center gap-3 ${wishlistAnalysis.statusColor}`}>
          <Info className="w-5 h-5 shrink-0" />
          <div className="flex-1">
            <div className="font-bold text-sm mb-0.5">
              Indice de Sécurité de votre liste : {wishlistAnalysis.scoreSecurite}%
            </div>
            <div>{wishlistAnalysis.diagnostic}</div>
          </div>
        </div>

        {/* Gauge */}
        <div>
          <div className="flex justify-between text-xs text-slate-600 mb-1.5 font-medium">
            <span className="flex items-center gap-1 text-rose-700 font-bold">
              🌟 Ambitieux (&lt; 15%) : {wishlistAnalysis.ambitieux}
            </span>
            <span className="flex items-center gap-1 text-amber-700 font-bold">
              🎯 Cibles (15-32%) : {wishlistAnalysis.cibles}
            </span>
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              🛡️ Sécurité (&gt; 32%) : {wishlistAnalysis.securite}
            </span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
            <div 
              className="bg-rose-500 h-full transition-all duration-300"
              style={{ width: `${wishlistAnalysis.total > 0 ? (wishlistAnalysis.ambitieux / wishlistAnalysis.total) * 100 : 0}%` }}
            />
            <div 
              className="bg-amber-400 h-full transition-all duration-300"
              style={{ width: `${wishlistAnalysis.total > 0 ? (wishlistAnalysis.cibles / wishlistAnalysis.total) * 100 : 0}%` }}
            />
            <div 
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${wishlistAnalysis.total > 0 ? (wishlistAnalysis.securite / wishlistAnalysis.total) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Selected Wishlist Schools Cards */}
        {wishlistAnalysis.total > 0 && (
          <div>
            <span className="text-xs font-semibold text-slate-700 block mb-2">
              Vos 10 vœux sélectionnés avec accès Carte Parcoursup :
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {wishlistAnalysis.schools.map((ecole) => {
                const psup = ecole.admissions.find(a => a.source === 'Parcoursup') || ecole.admissions[0];
                const taux = psup?.taux_acces;
                const carteUrl = ecole.parcoursup_url || `https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte`;

                return (
                  <div 
                    key={ecole.id} 
                    className="p-3 rounded-lg border border-slate-200 bg-slate-50/75 flex items-center justify-between text-xs"
                  >
                    <div className="truncate mr-2">
                      <strong 
                        onClick={() => onSelectSchool(ecole)}
                        className="font-bold text-slate-900 hover:text-indigo-600 cursor-pointer truncate block"
                      >
                        {ecole.nom_officiel} ({ecole.sigle})
                      </strong>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span className="font-mono font-bold text-indigo-700">Taux : {taux != null ? `${taux}%` : 'n.c.'}</span>
                        <span>·</span>
                        <a 
                          href={carteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline font-bold flex items-center gap-0.5"
                        >
                          <span>Carte</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </span>
                    </div>

                    <button
                      onClick={() => handleToggleWishlist(ecole.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                      title="Supprimer du panier"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Grouped Selectivity Tiers */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-6">
        <h3 className="text-sm font-bold text-slate-900">
          Ajouter des vœux par niveau de sélectivité :
        </h3>

        <div className="space-y-6">
          {selectivityTiers.map(tier => (
            <div key={tier.category} className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/75">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-xs font-bold rounded border ${tier.badgeColor}`}>
                    {tier.category.toUpperCase()}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">
                    {tier.title} ({tier.schools.length} écoles)
                  </h4>
                </div>
                <span className="text-[11px] text-slate-500">
                  {tier.description}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 p-4">
                {tier.schools.map(({ ecole, tauxAcces, mentionTB, salaire, concoursNom }) => {
                  const isWishlisted = parcoursupWishlist.includes(ecole.id);
                  const carteUrl = ecole.parcoursup_url || `https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte`;

                  return (
                    <div 
                      key={ecole.id} 
                      className="p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white transition-all hover:shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                          <span>{ecole.region || ecole.pays} · {ecole.ville_principale}</span>
                          <span className="font-semibold text-slate-700">{ecole.statut_juridique}</span>
                        </div>

                        <div 
                          onClick={() => onSelectSchool(ecole)}
                          className="font-bold text-sm text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer mb-1.5"
                        >
                          {ecole.nom_officiel} ({ecole.sigle})
                        </div>

                        <span className="block text-[11px] text-slate-500 line-clamp-1 mb-2">
                          {concoursNom}
                        </span>

                        <div className="grid grid-cols-2 gap-2 text-xs py-1.5 border-y border-slate-100">
                          <div>
                            <span className="block text-[10px] text-slate-400">Taux d'accès</span>
                            <strong className="font-mono text-sm font-bold text-slate-900">
                              {tauxAcces ? `${tauxAcces}%` : 'Concours'}
                            </strong>
                          </div>
                          <div>
                            <span className="block text-[10px] text-slate-400">Salaire embauche</span>
                            <strong className="font-mono text-sm font-bold text-emerald-700">
                              {salaire} k€
                            </strong>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                        <a
                          href={carteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-indigo-700 hover:underline flex items-center gap-0.5"
                        >
                          <span>Carte Parcoursup</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        <button
                          onClick={() => handleToggleWishlist(ecole.id)}
                          className={`text-xs px-2.5 py-1 rounded border transition-colors flex items-center gap-1 ${
                            isWishlisted
                              ? 'bg-rose-50 border-rose-200 text-rose-800 font-semibold'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {isWishlisted ? <Check className="w-3 h-3 text-rose-600" /> : <Plus className="w-3 h-3" />}
                          <span>{isWishlisted ? 'Vœu ajouté' : 'Ajouter vœu'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
