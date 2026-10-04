import React from 'react';
import { ExternalLink, School, Scale } from 'lucide-react';
import { DomaineIngenierie, Ecole } from '../../types';
import { NON_COMMUNIQUE } from '../SourceTag';
import { ALL_DOMAINS } from './constants';
import type { BoussoleSectionProps } from './types';

export function SpecialtiesCompareSection({ s, schools }: BoussoleSectionProps) {
  const { selectedDomain, setSelectedDomain, comparedSpecialtySchoolIds, handleToggleSpecialtyCompare } = s;
  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-600" />
              <span>Confrontation Côte-à-Côte des Cursus par Spécialité</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparez précisément les salaires, débouchés, syllabus et partenaires industriels pour un même domaine.
            </p>
          </div>

          {/* Domain Switcher */}
          <select
            aria-label="Domaine"
            value={selectedDomain}
            onChange={e => setSelectedDomain(e.target.value as DomaineIngenierie)}
            className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
          >
            {ALL_DOMAINS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* School toggles for comparison */}
        <div>
          <span className="text-xs font-semibold text-slate-700 block mb-2">
            Écoles sélectionnées pour ce comparatif (2 à 4 écoles) :
          </span>
          <div className="flex flex-wrap gap-1.5">
            {schools
              .filter(s => s.specialites.some(sp => sp.domaine === selectedDomain))
              .map(s => {
                const isSelected = comparedSpecialtySchoolIds.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => handleToggleSpecialtyCompare(s.id)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-colors flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-emerald-600' : 'bg-slate-300'}`} />
                    <span>{s.sigle} ({s.ville_principale})</span>
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100/75 text-slate-700 font-semibold">
                <th className="py-3 px-4 w-44">Critère de comparaison</th>
                {comparedSpecialtySchoolIds.map(sid => {
                  const ecole = schools.find(s => s.id === sid);
                  if (!ecole) return null;
                  return (
                    <th key={ecole.id} className="py-3 px-4 min-w-[240px]">
                      <div className="font-bold text-sm text-slate-900">{ecole.nom_officiel}</div>
                      <span className="font-mono text-xs text-indigo-700 font-semibold">
                        {ecole.sigle} · {ecole.region || ecole.pays}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {/* Cursus Intitulé */}
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600 bg-slate-50/50">Cursus & Diplôme</td>
                {comparedSpecialtySchoolIds.map(sid => {
                  const ecole = schools.find(s => s.id === sid);
                  const sp = ecole?.specialites.find(item => item.domaine === selectedDomain) || ecole?.specialites[0];
                  return (
                    <td key={sid} className="py-3 px-4 font-bold text-slate-900">
                      {sp?.intitule_specialite}
                      <span className="block text-[11px] font-normal text-slate-500 mt-0.5">
                        {sp?.type_cursus} ({sp?.duree_annees} ans)
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Rémunération Spécifique */}
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600 bg-slate-50/50">Salaire Spécialité</td>
                {comparedSpecialtySchoolIds.map(sid => {
                  const ecole = schools.find(s => s.id === sid);
                  const sp = ecole?.specialites.find(item => item.domaine === selectedDomain);
                  const sal = sp?.salaire_moyen_specialite || ecole?.insertion?.salaire_moyen_embauche || null;
                  return (
                    <td key={sid} className="py-3 px-4 font-mono font-bold text-sm text-emerald-700">
                      {sal != null ? `${sal} k€/an` : NON_COMMUNIQUE}
                    </td>
                  );
                })}
              </tr>

              {/* Débouchés Métiers */}
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600 bg-slate-50/50">Débouchés préparés</td>
                {comparedSpecialtySchoolIds.map(sid => {
                  const ecole = schools.find(s => s.id === sid);
                  const sp = ecole?.specialites.find(item => item.domaine === selectedDomain);
                  return (
                    <td key={sid} className="py-3 px-4">
                      <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-700">
                        {sp?.debouches_metiers?.map((d, i) => <li key={i}>{d}</li>)}
                      </ul>
                    </td>
                  );
                })}
              </tr>

              {/* Modules de cours phares */}
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600 bg-slate-50/50">Modules du syllabus</td>
                {comparedSpecialtySchoolIds.map(sid => {
                  const ecole = schools.find(s => s.id === sid);
                  const sp = ecole?.specialites.find(item => item.domaine === selectedDomain);
                  return (
                    <td key={sid} className="py-3 px-4 text-[11px] text-slate-600">
                      {sp?.modules_phares?.join(' · ') || sp?.competences_cles}
                    </td>
                  );
                })}
              </tr>

              {/* Partenaires Entreprises */}
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600 bg-slate-50/50">Recruteurs partenaires</td>
                {comparedSpecialtySchoolIds.map(sid => {
                  const ecole = schools.find(s => s.id === sid);
                  const sp = ecole?.specialites.find(item => item.domaine === selectedDomain);
                  return (
                    <td key={sid} className="py-3 px-4 font-medium text-slate-800 text-[11px]">
                      {sp?.partenaires_entreprises?.join(', ')}
                    </td>
                  );
                })}
              </tr>

              {/* Doubles Diplômes */}
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600 bg-slate-50/50">Doubles diplômes</td>
                {comparedSpecialtySchoolIds.map(sid => {
                  const ecole = schools.find(s => s.id === sid);
                  const sp = ecole?.specialites.find(item => item.domaine === selectedDomain);
                  return (
                    <td key={sid} className="py-3 px-4 text-[11px] text-indigo-800 font-medium">
                      {sp?.doubles_diplomes?.join(', ')}
                    </td>
                  );
                })}
              </tr>

              {/* Frais annuels */}
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600 bg-slate-50/50">Frais de scolarité</td>
                {comparedSpecialtySchoolIds.map(sid => {
                  const ecole = schools.find(s => s.id === sid);
                  return (
                    <td key={sid} className="py-3 px-4 font-mono font-bold text-slate-900">
                      {ecole?.frais_scolarite_annuels === 0 ? 'Gratuit (soldé)' : `${ecole?.frais_scolarite_annuels.toLocaleString('fr-FR')} €/an`}
                    </td>
                  );
                })}
              </tr>

              {/* Boutons d'action */}
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600 bg-slate-50/50">Accès direct</td>
                {comparedSpecialtySchoolIds.map(sid => {
                  const ecole = schools.find(s => s.id === sid);
                  if (!ecole) return null;
                  const carteUrl = ecole.parcoursup_url || `https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte`;
                  return (
                    <td key={sid} className="py-3 px-4">
                      <a
                        href={carteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-200"
                      >
                        <span>Carte Parcoursup</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
