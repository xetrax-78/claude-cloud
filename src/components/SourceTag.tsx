import React from 'react';
import { ExternalLink } from 'lucide-react';

// Liens vers l'origine de chaque type de donnée (page d'accueil du média quand le palmarès exact n'est pas connu)
export const SOURCE_URLS: Record<string, string> = {
  Parcoursup: 'https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-parcoursup/',
  'CPGE (SCEI / Concours Commun)': 'https://www.scei-concours.fr',
  'Concours CPGE (SCEI)': 'https://www.scei-concours.fr',
  'Le Figaro Étudiant': 'https://etudiant.lefigaro.fr',
  "L'Étudiant": 'https://www.letudiant.fr',
  "L'Usine Nouvelle": 'https://www.usinenouvelle.com',
  'QS World University Rankings': 'https://www.topuniversities.com',
  'Times Higher Education (THE)': 'https://www.timeshighereducation.com',
};

interface SourceTagProps {
  label: string;
  year?: number | string;
  url?: string;
  className?: string;
}

export const SourceTag: React.FC<SourceTagProps> = ({ label, year, url, className = '' }) => {
  const href = url ?? SOURCE_URLS[label];
  const text = `${label}${year ? ` ${year}` : ''}`;
  return (
    <span className={`block text-[10px] text-slate-400 ${className}`}>
      Source :{' '}
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted hover:text-slate-600">
          {text}
          <ExternalLink className="inline w-2.5 h-2.5 ml-0.5 -mt-0.5" aria-hidden="true" />
        </a>
      ) : (
        text
      )}
    </span>
  );
};

export const NON_COMMUNIQUE = 'Non communiqué';
