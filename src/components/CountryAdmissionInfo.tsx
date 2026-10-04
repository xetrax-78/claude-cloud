import React from 'react';
import { Globe, ExternalLink } from 'lucide-react';
import { Ecole, Pays } from '../types';

/**
 * Vocabulaire et voies d'admission propres à chaque pays (hors France), en termes généraux :
 * aucun seuil chiffré, les conditions exactes renvoient vers l'établissement.
 */
const INFOS: Partial<Record<Pays, { titre: string; points: string[]; lien?: { label: string; href: string } }>> = {
  Canada: {
    titre: 'Étudier l’ingénierie au Québec',
    points: [
      'Pas de Parcoursup : la candidature se fait directement auprès de l’université.',
      'Les candidats québécois sont admis avec un DEC (diplôme d’études collégiales) obtenu au cégep ; les candidats français avec le baccalauréat, selon les conditions de l’établissement.',
      'Le diplôme est un baccalauréat en génie (premier cycle universitaire, en général 4 ans).',
      'Au Québec, le titre d’ingénieur est réservé aux membres de l’Ordre des ingénieurs du Québec (OIQ).',
    ],
    lien: { label: 'Ordre des ingénieurs du Québec', href: 'https://www.oiq.qc.ca' },
  },
  Belgique: {
    titre: 'Étudier l’ingénierie en Belgique (Fédération Wallonie-Bruxelles)',
    points: [
      'Pas de Parcoursup : l’inscription se fait directement auprès de l’université ou de la haute école.',
      'Ingénieur civil (université) : bachelier puis master ; l’accès au bachelier passe par un examen spécial d’admission en mathématiques.',
      'Ingénieur industriel : formation en haute école, également en bachelier puis master.',
    ],
  },
  Suisse: {
    titre: 'Étudier l’ingénierie en Suisse romande',
    points: [
      'Pas de Parcoursup : la candidature se fait directement auprès de l’école.',
      'Écoles polytechniques fédérales (EPF) : bachelor puis master ; admission sur maturité suisse ou diplôme étranger équivalent, selon les conditions publiées par l’école.',
      'Hautes écoles spécialisées (HES) : bachelor orienté pratique, accessible notamment avec une maturité professionnelle.',
    ],
  },
};

export const CountryAdmissionInfo: React.FC<{ ecole: Ecole }> = ({ ecole }) => {
  const info = INFOS[ecole.pays];
  if (!info) return null;
  return (
    <section aria-labelledby="admission-pays" className="bg-blue-50/60 border border-blue-200/70 rounded-xl p-5 space-y-3">
      <h2 id="admission-pays" className="text-sm font-bold text-slate-900 flex items-center gap-2">
        <Globe className="w-4 h-4 text-blue-700" aria-hidden="true" />
        {info.titre}
      </h2>
      <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed">
        {info.points.map(p => <li key={p}>{p}</li>)}
      </ul>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold">
        <a href={ecole.site_web} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-800 hover:underline">
          Conditions d’admission sur le site de l’établissement <ExternalLink className="w-3 h-3" aria-hidden="true" />
        </a>
        {info.lien && (
          <a href={info.lien.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-800 hover:underline">
            {info.lien.label} <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        )}
      </div>
    </section>
  );
};
