import { Ecole, MatchingPreferences, ScoredEcole } from '../types';

export function runMatchingAlgorithm(
  schools: Ecole[],
  preferences: MatchingPreferences
): ScoredEcole[] {
  // Trouver les min / max pour la normalisation
  let maxSalaire = 0;
  let minSalaire = 100;
  for (const s of schools) {
    const sal = s.insertion?.salaire_moyen_embauche || 45;
    if (sal > maxSalaire) maxSalaire = sal;
    if (sal < minSalaire) minSalaire = sal;
  }
  if (maxSalaire === 0) maxSalaire = 60;
  if (minSalaire === 100) minSalaire = 40;

  const results: ScoredEcole[] = [];

  for (const ecole of schools) {
    const pointsForts: string[] = [];
    const pointsVigilance: string[] = [];

    // 1. Filtre pays et statut
    const paysOk = !preferences.pays || preferences.pays.length === 0 || preferences.pays.includes(ecole.pays);
    const statutOk = !preferences.statuts || preferences.statuts.length === 0 || preferences.statuts.includes(ecole.statut_juridique);
    if (!paysOk || !statutOk) {
      continue;
    }

    // 2. Filtre Région géographique
    if (preferences.region && preferences.region !== 'Toutes') {
      const targetReg = preferences.region.toLowerCase();
      const inRegion = (ecole.region && ecole.region.toLowerCase().includes(targetReg)) ||
        ecole.campus.some(c => c.ville.toLowerCase().includes(targetReg) || c.nom_campus.toLowerCase().includes(targetReg));
      if (!inRegion) {
        continue;
      }
      pointsForts.push(`Implantation ciblée en région ${ecole.region || ecole.ville_principale}`);
    }

    // 3. Filtre Concours spécifique
    if (preferences.concoursFiltre && preferences.concoursFiltre !== 'Tous') {
      const cFilter = preferences.concoursFiltre.toLowerCase();
      const matchConcours = ecole.admissions.some(a => 
        a.nom_filiere_concours.toLowerCase().includes(cFilter) ||
        a.source.toLowerCase().includes(cFilter)
      );
      if (!matchConcours) {
        continue;
      }
      pointsForts.push(`Admissible via ${preferences.concoursFiltre}`);
    }

    // 4. Filtre Salaire minimum
    if (preferences.salaireMin && preferences.salaireMin > 0) {
      const currentSal = ecole.insertion?.salaire_moyen_embauche || 40;
      if (currentSal < preferences.salaireMin) {
        continue;
      }
    }

    // 5. Filtre Sélectivité maximale (taux d'accès)
    if (preferences.tauxAccesMax && preferences.tauxAccesMax > 0) {
      const psup = ecole.admissions.find(a => a.source === 'Parcoursup') || ecole.admissions[0];
      const tauxAcc = psup?.taux_acces ?? 50;
      if (tauxAcc > preferences.tauxAccesMax) {
        continue;
      }
    }

    // 6. Vérification Voie d'admission selon le profil
    let admissibleVoie = true;
    if (preferences.profil !== 'Tous') {
      const matchAdm = ecole.admissions.some(a => {
        if (preferences.profil === 'Post-bac') return a.source === 'Parcoursup' || ecole.type_recrutement === 'post_bac';
        if (preferences.profil === 'Prépa CPGE') return a.source === 'CPGE (SCEI / Concours Commun)' || a.source === 'Concours CPGE (SCEI)' || ecole.type_recrutement === 'post_prepa';
        if (preferences.profil === 'Admissions Parallèles (BUT/BTS/Licence)') return a.source === 'Admissions Parallèles (Titre)' || a.source === 'Admission sur Titres Universitaires (AST)' || a.source === 'Admission sur Titre (AST)';
        return true;
      });

      if (!matchAdm) {
        admissibleVoie = false;
        pointsVigilance.push(`Aucun concours direct répertorié pour le profil « ${preferences.profil} »`);
      } else {
        const adm = ecole.admissions.find(a => {
          if (preferences.profil === 'Post-bac') return a.source === 'Parcoursup' || ecole.type_recrutement === 'post_bac';
          if (preferences.profil === 'Prépa CPGE') return a.source === 'CPGE (SCEI / Concours Commun)' || a.source === 'Concours CPGE (SCEI)' || ecole.type_recrutement === 'post_prepa';
          return true;
        }) || ecole.admissions[0];

        if (adm) {
          pointsForts.push(`Admission adaptée : ${adm.nom_filiere_concours} (${adm.capacite} places)`);
        }
      }
    }

    // 7. Adéquation Domaines
    const ecoleDomaines = ecole.specialites.map(s => s.domaine);
    const matchedDomaines = preferences.domaines.filter(d => ecoleDomaines.includes(d));
    let scoreDomaine = 1.0;
    if (preferences.domaines.length > 0) {
      scoreDomaine = matchedDomaines.length / preferences.domaines.length;
      if (matchedDomaines.length > 0) {
        pointsForts.push(`${matchedDomaines.length} spécialité(s) cible(s) : ${matchedDomaines.join(', ')}`);
      } else {
        pointsVigilance.push(`Aucune filière directe dans vos domaines prioritaires`);
      }
    }

    // 8. Alternance
    const aAlternance = ecole.specialites.some(s => s.type_cursus.includes('Alternance'));
    let bonusAlternance = 1.0;
    if (preferences.alternance === 'Obligatoire') {
      if (!aAlternance) {
        bonusAlternance = 0.2;
        pointsVigilance.push(`Pas de filière en apprentissage / alternance`);
      } else {
        bonusAlternance = 1.15;
        pointsForts.push(`Contrats d'apprentissage rémunérés possibles`);
      }
    } else if (preferences.alternance === 'Souhaitée') {
      bonusAlternance = aAlternance ? 1.1 : 0.95;
      if (aAlternance) pointsForts.push(`Possibilité de cursus en alternance`);
    }

    // 9. Métriques de performance et classements
    const salaire = ecole.insertion?.salaire_moyen_embauche || 45.0;
    const insertion = ecole.insertion?.taux_emploi_6_mois || 96.0;

    const rangs = ecole.classements.map(c => c.rang_general).filter((r): r is number => r !== undefined);
    const meilleurRang = rangs.length > 0 ? Math.min(...rangs) : 40;

    // Normalisation sous-scores [0.0 - 1.0]
    const scorePrestige = Math.max(0.15, 1.0 - (meilleurRang - 1) / 55);
    const scoreSalaire = Math.min(1.0, Math.max(0.1, (salaire - minSalaire) / (maxSalaire - minSalaire + 0.01)));
    const scoreInsertion = Math.min(1.0, Math.max(0.5, (insertion - 90) / 10));

    // Budget & Frais
    let scoreBudget = 1.0;
    const frais = ecole.frais_scolarite_annuels;
    if (frais <= preferences.budgetMax) {
      scoreBudget = 1.0 - (frais / Math.max(preferences.budgetMax, 1000)) * 0.35;
      if (frais === 0) {
        pointsForts.push(`Gratuité des frais de scolarité (statut militaire/boursier)`);
      } else if (frais <= 1000) {
        pointsForts.push(`Frais universitaires réduits : ${frais} €/an`);
      }
    } else {
      const depassement = frais - preferences.budgetMax;
      scoreBudget = Math.max(0.05, 0.65 - (depassement / 8000));
      pointsVigilance.push(`Dépasse votre budget de ${depassement.toLocaleString('fr-FR')} €/an`);
    }

    if (salaire >= 50) {
      pointsForts.push(`Salaire moyen d'embauche élevé : ${salaire.toFixed(1)} k€/an`);
    }
    if (ecole.habilitation_cti) {
      pointsForts.push(`Habilitation CTI & Grade de Master international`);
    }

    // Indicateurs Parcoursup
    const psup = ecole.admissions.find(a => a.source === 'Parcoursup');
    if (psup && psup.taux_acces) {
      pointsForts.push(`Taux d'accès Parcoursup : ${psup.taux_acces}% (${psup.nb_voeux} vœux)`);
    }

    // Pondération globale
    const totalPoids = preferences.poidsPrestige + preferences.poidsSalaire + preferences.poidsBudget + preferences.poidsInsertion;
    const normPoids = totalPoids > 0 ? totalPoids : 1;

    const baseScore = (
      (scorePrestige * preferences.poidsPrestige) +
      (scoreSalaire * preferences.poidsSalaire) +
      (scoreBudget * preferences.poidsBudget) +
      (scoreInsertion * preferences.poidsInsertion)
    ) / normPoids;

    const domainMultiplier = preferences.domaines.length > 0 ? (0.4 + 0.6 * scoreDomaine) : 1.0;
    const voieMultiplier = admissibleVoie ? 1.0 : 0.6;

    const composite = baseScore * domainMultiplier * bonusAlternance * voieMultiplier;
    const scoreFinal = Math.min(100, Math.max(12, Math.round(composite * 1000) / 10));

    results.push({
      ecole,
      scoreMatch: scoreFinal,
      scorePrestige: Math.round(scorePrestige * 100),
      scoreSalaire: Math.round(scoreSalaire * 100),
      scoreBudget: Math.round(scoreBudget * 100),
      scoreInsertion: Math.round(scoreInsertion * 100),
      scoreDomaine: Math.round(scoreDomaine * 100),
      bonusAlternance,
      pointsForts,
      pointsVigilance,
      admissible: admissibleVoie && (preferences.alternance !== 'Obligatoire' || aAlternance)
    });
  }

  return results.sort((a, b) => b.scoreMatch - a.scoreMatch);
}

export interface SpecialtyRankedEntry {
  ecole: Ecole;
  rank: number;
  noteGlobale: number;
  domaineName: string;
  salaireSortie: number;
  tauxAccesPsup?: number;
  specialiteOfferte: string;
  sourceClassement: string;
  mentionTB?: number;
}

export function getSpecialtyRankings(
  schools: Ecole[],
  selectedDomain: string
): SpecialtyRankedEntry[] {
  // 1. Filtrer les écoles ayant au moins une spécialité ou un classement dans ce domaine
  const candidates: { 
    ecole: Ecole; 
    specRank?: number; 
    note: number; 
    specTitle: string;
    source: string;
    mentionTB?: number;
  }[] = [];

  for (const ecole of schools) {
    // Vérifier si un classement officiel média correspond
    const clFig = ecole.classements.find(c => 
      c.source_media === "Le Figaro Étudiant" && 
      c.domaine_specialite && 
      (c.domaine_specialite.toLowerCase().includes(selectedDomain.toLowerCase()) || 
       selectedDomain.toLowerCase().includes(c.domaine_specialite.toLowerCase()))
    );

    const clEtud = ecole.classements.find(c => c.source_media === "L'Étudiant");

    // Vérifier les spécialités de l'école
    const matchingSpec = ecole.specialites.find(s => 
      s.domaine.toLowerCase().includes(selectedDomain.toLowerCase()) ||
      selectedDomain.toLowerCase().includes(s.domaine.toLowerCase())
    );

    const psup = ecole.admissions.find(a => a.source === 'Parcoursup') || ecole.admissions[0];

    if (clFig || matchingSpec) {
      let note = clFig?.note_globale;
      if (!note) {
        if (clFig?.rang_par_specialite) {
          note = Math.max(14.0, 19.5 - (clFig.rang_par_specialite - 1) * 0.4);
        } else if (clEtud?.note_globale) {
          note = Math.round((clEtud.note_globale / 5) * 10) / 10;
        } else {
          note = 16.0;
        }
      }

      candidates.push({
        ecole,
        specRank: clFig?.rang_par_specialite,
        note,
        specTitle: matchingSpec?.intitule_specialite || ecole.specialites[0]?.intitule_specialite || "Cursus Ingénieur",
        source: clFig ? "Le Figaro Étudiant" : "L'Étudiant",
        mentionTB: psup?.pct_mention_tb
      });
    }
  }

  // 2. Trier par rang de spécialité s'il existe, sinon par note puis salaire
  candidates.sort((a, b) => {
    if (a.specRank !== undefined && b.specRank !== undefined) {
      return a.specRank - b.specRank;
    }
    if (a.specRank !== undefined) return -1;
    if (b.specRank !== undefined) return 1;
    return b.note - a.note;
  });

  return candidates.map((c, idx) => ({
    ecole: c.ecole,
    rank: c.specRank || (idx + 1),
    noteGlobale: Math.round(c.note * 10) / 10,
    domaineName: selectedDomain,
    salaireSortie: c.ecole.insertion?.salaire_moyen_embauche || 45.0,
    tauxAccesPsup: c.ecole.admissions.find(a => a.source === 'Parcoursup')?.taux_acces,
    specialiteOfferte: c.specTitle,
    sourceClassement: c.source,
    mentionTB: c.mentionTB
  }));
}

export interface SelectivityGroup {
  category: 'Ambitieux' | 'Cible' | 'Sécurité';
  title: string;
  badgeColor: string;
  description: string;
  schools: { 
    ecole: Ecole; 
    tauxAcces?: number; 
    voeux?: number; 
    mentionTB?: number; 
    salaire: number;
    concoursNom: string;
  }[];
}

export function getSelectivityTiers(schools: Ecole[]): SelectivityGroup[] {
  const ambitieux: SelectivityGroup['schools'] = [];
  const cible: SelectivityGroup['schools'] = [];
  const securite: SelectivityGroup['schools'] = [];

  for (const ecole of schools) {
    const psup = ecole.admissions.find(a => a.source === 'Parcoursup') || ecole.admissions[0];
    const taux = psup?.taux_acces || 25;
    const salaire = ecole.insertion?.salaire_moyen_embauche || 45;

    const item = {
      ecole,
      tauxAcces: psup?.taux_acces,
      voeux: psup?.nb_voeux,
      mentionTB: psup?.pct_mention_tb,
      salaire,
      concoursNom: psup?.nom_filiere_concours || 'Admission Titre / Concours'
    };

    if (taux <= 15 || (ecole.classements[0]?.rang_general && ecole.classements[0].rang_general <= 8)) {
      ambitieux.push(item);
    } else if (taux <= 32 || (ecole.classements[0]?.rang_general && ecole.classements[0].rang_general <= 28)) {
      cible.push(item);
    } else {
      securite.push(item);
    }
  }

  return [
    {
      category: 'Ambitieux',
      title: 'Vœux Ambitieux / Très Haute Sélectivité',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      description: 'Taux d’accès < 15% ou Top 10 national. Mention Très Bien (> 16/20) ou rang de concours de premier plan exigés.',
      schools: ambitieux.sort((a, b) => (a.tauxAcces || 99) - (b.tauxAcces || 99))
    },
    {
      category: 'Cible',
      title: 'Vœux Réalistes / En Cible',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      description: 'Taux d’accès entre 15% et 32%. Candidatures solides avec mentions Bien ou très bons dossiers de prépa/IUT.',
      schools: cible.sort((a, b) => (a.tauxAcces || 99) - (b.tauxAcces || 99))
    },
    {
      category: 'Sécurité',
      title: 'Vœux de Sécurité & Forte Capacité',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description: 'Taux d’accès > 32% ou concours à grande capacité d’accueil (Concours Avenir, Puissance Alpha, Geipi Polytech, Advance, universités).',
      schools: securite.sort((a, b) => (a.tauxAcces || 99) - (b.tauxAcces || 99))
    }
  ];
}
