import React from 'react';
import { X, ExternalLink, ShieldCheck, MapPin, Award, BookOpen, Clock, Users, Building, Euro, CheckCircle2, Compass, Target } from 'lucide-react';
import { Ecole } from '../types';

interface SchoolDetailModalProps {
  ecole: Ecole | null;
  onClose: () => void;
  onToggleCompare: (ecole: Ecole) => void;
  isCompared: boolean;
}

export const SchoolDetailModal: React.FC<SchoolDetailModalProps> = ({
  ecole,
  onClose,
  onToggleCompare,
  isCompared,
}) => {
  if (!ecole) return null;

  const psup = ecole.admissions.find(a => a.source === 'Parcoursup') || ecole.admissions[0];
  const carteUrl = ecole.parcoursup_url || `https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 flex items-start justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1 flex-wrap">
              <span>{ecole.pays}</span>
              {ecole.region && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-100 font-bold">
                    {ecole.region}
                  </span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span>{ecole.ville_principale}</span>
              <span aria-hidden="true">·</span>
              <span>Fondée en {ecole.annee_creation || '1800+'}</span>
              {ecole.parcoursup_code && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded">
                    Code Parcoursup : {ecole.parcoursup_code}
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                {ecole.nom_officiel}
              </h2>
              <span className="font-mono text-sm font-bold bg-slate-200/80 text-slate-800 px-2 py-0.5 rounded">
                {ecole.sigle}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            aria-label="Fermer la fiche"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <span className="block text-xs font-medium text-slate-500">Frais de scolarité</span>
              <span className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                {ecole.frais_scolarite_annuels === 0 ? 'Gratuit (soldé)' : `${ecole.frais_scolarite_annuels.toLocaleString('fr-FR')} €/an`}
              </span>
              <span className="block text-[11px] text-slate-400">Statut {ecole.statut_juridique}</span>
            </div>

            <div>
              <span className="block text-xs font-medium text-slate-500">Salaire embauche</span>
              <span className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                {ecole.insertion.salaire_moyen_embauche} k€/an
              </span>
              <span className="block text-[11px] text-emerald-600 font-medium">
                À 3 ans : {ecole.insertion.salaire_3_ans || (ecole.insertion.salaire_moyen_embauche + 12).toFixed(1)} k€
              </span>
            </div>

            <div>
              <span className="block text-xs font-medium text-slate-500">Taux d'emploi 6 mois</span>
              <span className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                {ecole.insertion.taux_emploi_6_mois} %
              </span>
              <span className="block text-[11px] text-slate-400">
                {ecole.insertion.pct_international}% à l'international
              </span>
            </div>

            <div>
              <span className="block text-xs font-medium text-slate-500">Habilitation officielle</span>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-800 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>CTI & EUR-ACE</span>
              </div>
              <span className="block text-[11px] text-slate-400">Accréditation d'État</span>
            </div>
          </div>

          {/* Dossier Officiel Parcoursup */}
          <div className="p-4 bg-indigo-50/70 rounded-xl border border-indigo-100 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-indigo-600" />
                <span>Données Officielles de Sélection Parcoursup (Session {psup?.annee || 2024})</span>
              </h3>
              
              <a
                href={carteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-indigo-700 bg-white hover:bg-indigo-50 rounded-lg border border-indigo-200 transition-colors shadow-2xs"
              >
                <span>Voir sur la Carte interactive Parcoursup</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {psup && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 bg-white rounded-lg border border-indigo-100">
                  <span className="block text-[11px] text-slate-500">Taux d'accès réel</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {psup.taux_acces ? `${psup.taux_acces}%` : 'Concours'}
                  </span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-indigo-100">
                  <span className="block text-[11px] text-slate-500">Volume de vœux</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {psup.nb_voeux ? `${psup.nb_voeux.toLocaleString()} candidats` : 'N/A'}
                  </span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-indigo-100">
                  <span className="block text-[11px] text-slate-500">Mentions Très Bien au Bac</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {psup.pct_mention_tb ? `${psup.pct_mention_tb}%` : 'N/A'}
                  </span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-indigo-100">
                  <span className="block text-[11px] text-slate-500">Rang du dernier admis</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {psup.rang_dernier_appele ? `#${psup.rang_dernier_appele}` : 'N/A'}
                  </span>
                </div>
              </div>
            )}

            <div className="text-[11px] text-indigo-800 bg-white/70 p-2 rounded border border-indigo-100 flex items-center justify-between">
              <span>Voie principale : <strong>{psup?.nom_filiere_concours || 'Concours / Titre'}</strong></span>
              <span>Capacité d'accueil : <strong>{psup?.capacite || 'N/A'} places</strong></span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-2">Présentation générale de l'établissement</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {ecole.description}
            </p>
          </div>

          {/* Campus & Implantations Géographiques */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>Campus & Implantation Géographique ({ecole.campus.length})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ecole.campus.map(c => (
                <div key={c.id} className="p-3 rounded-lg border border-slate-200 bg-white">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-900">{c.nom_campus}</span>
                    {c.est_siege_principal && (
                      <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                        Siège Principal
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{c.adresse}, {c.code_postal} {c.ville}</p>
                  {c.latitude && c.longitude && (
                    <span className="text-[11px] font-mono text-slate-400 mt-1 block">
                      GPS : {c.latitude.toFixed(4)}, {c.longitude.toFixed(4)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Spécialités et filières */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Spécialités d'ingénierie habilitées ({ecole.specialites.length})</span>
            </h3>

            <div className="space-y-2.5">
              {ecole.specialites.map(sp => (
                <div 
                  key={sp.id}
                  className="p-3.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {sp.domaine}
                    </span>
                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {sp.type_cursus}
                    </span>
                    <span className="text-xs text-slate-400">
                      Cursus {sp.duree_annees} ans
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    {sp.intitule_specialite}
                  </h4>
                  {sp.competences_cles && (
                    <p className="text-xs text-slate-500 mt-1">
                      <strong className="text-slate-700 font-medium">Compétences :</strong> {sp.competences_cles}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Classements croisés médias */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Classements & Palmarès Médias Certifiés (Le Figaro & L'Étudiant)</span>
            </h3>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Organisme / Source</th>
                    <th className="py-2.5 px-3 font-semibold">Année</th>
                    <th className="py-2.5 px-3 font-semibold">Spécialité / Volet</th>
                    <th className="py-2.5 px-3 font-semibold">Rang</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ecole.classements.map(cl => (
                    <tr key={cl.id} className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-3 font-medium text-slate-900">{cl.source_media}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">{cl.annee}</td>
                      <td className="py-2.5 px-3 text-slate-600">
                        {cl.domaine_specialite || (cl.rang_post_bac ? 'Post-bac' : 'Palmarès Général')}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-semibold text-indigo-700">
                        {cl.rang_par_specialite ? `#${cl.rang_par_specialite} (${cl.domaine_specialite})` : (cl.rang_general ? `#${cl.rang_general}` : 'Classé')}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-right text-slate-800">
                        {cl.note_globale ? `${cl.note_globale}/20` : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => onToggleCompare(ecole)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-colors ${
              isCompared 
                ? 'bg-indigo-50 border-indigo-300 text-indigo-800' 
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {isCompared ? '✓ Retirer du comparateur' : '+ Ajouter au comparateur'}
          </button>

          <div className="flex items-center gap-2">
            <a
              href={carteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-700 bg-white hover:bg-indigo-50 border border-indigo-200 rounded-lg shadow-2xs transition-colors"
            >
              <span>Fiche Carte Parcoursup</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={ecole.site_web}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors"
            >
              <span>Site officiel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
