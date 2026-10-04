import { useMemo, useState } from 'react';
import { usePersistentState } from '../../utils/usePersistentState';
import { analyzeWishlist } from '../../utils/wishlist';
import { Ecole, MatchingPreferences, ProfilCandidat, DomaineIngenierie, Pays, Statut, ScoredEcole, SpecialiteDiplome } from '../../types';
import { runMatchingAlgorithm, getSpecialtyRankings, getSelectivityTiers } from '../../utils/matchingEngine';
import { StudioSection } from './constants';

/**
 * État et calculs de la Boussole, partagés par ses 5 sections. Vit dans le composant parent :
 * changer de section conserve les filtres, la liste de vœux et le comparateur de filières.
 */
export function useBoussoleState(schools: Ecole[]) {
  const engineeringSchools = useMemo(() => schools.filter(s => s.type_etablissement !== 'prepa_cpge'), [schools]);
  const totalSpecialties = useMemo(() => engineeringSchools.reduce((n, s) => n + s.specialites.length, 0), [engineeringSchools]);

  // Navigation entre modules
  const [activeSection, setActiveSection] = useState<StudioSection>('specialties_studio');

  // Spécialité actuellement sélectionnée pour exploration
  const [selectedDomain, setSelectedDomain] = useState<DomaineIngenierie>('Intelligence Artificielle & Data');
  const [specialtyKeyword, setSpecialtyKeyword] = useState<string>('');

  // Comparateur spécifique de spécialités entre 2-4 écoles
  const [comparedSpecialtySchoolIds, setComparedSpecialtySchoolIds] = useState<string[]>([
    'polytechnique-fra',
    'centralesupelec-fra',
    'telecom-paris-fra'
  ]);

  // Panier de 10 vœux Parcoursup & Audit d'admissibilité
  const [parcoursupWishlist, setParcoursupWishlist] = usePersistentState<string[]>('ingefinder.voeux', []);
  const [candidateAcademicLevel, setCandidateAcademicLevel] = useState<'tb' | 'b' | 'ab'>('tb');
  const [copyToast, setCopyToast] = useState(false);

  // Moteur de recherche multicritère state
  const [profil, setProfil] = useState<ProfilCandidat | 'Tous'>('Post-bac');
  const [selectedCriteriaDomains, setSelectedCriteriaDomains] = useState<DomaineIngenierie[]>([
    'Intelligence Artificielle & Data',
    'Informatique & Logiciel'
  ]);
  const [selectedRegion, setSelectedRegion] = useState<string>('Toutes');
  const [selectedConcours, setSelectedConcours] = useState<string>('Tous');
  const [selectivityThreshold, setSelectivityThreshold] = useState<number>(0);
  const [minSalary, setMinSalary] = useState<number>(0);
  const [alternance, setAlternance] = useState<'Indifférent' | 'Souhaitée' | 'Obligatoire'>('Indifférent');
  const [budgetMax, setBudgetMax] = useState<number>(10000);
  const [selectedPays, setSelectedPays] = useState<Pays[]>(['France', 'Suisse', 'Belgique', 'Canada']);
  const [selectedStatuts, setSelectedStatuts] = useState<Statut[]>(['Public', 'Privé', 'EESPIG', 'Consulaire']);
  const [quickKeyword, setQuickKeyword] = useState<string>('');

  // Poids des critères
  const [poidsPrestige, setPoidsPrestige] = useState<number>(1.5);
  const [poidsSalaire, setPoidsSalaire] = useState<number>(1.3);
  const [poidsBudget, setPoidsBudget] = useState<number>(1.0);
  const [poidsInsertion, setPoidsInsertion] = useState<number>(1.0);
  const [showAdvancedWeights, setShowAdvancedWeights] = useState<boolean>(false);

  // Palmarès state
  const [specialtySortBy, setSpecialtySortBy] = useState<'rank' | 'salary' | 'selectivity' | 'note'>('rank');

  // Gestion du panier de 10 vœux
  const handleToggleWishlist = (ecoleId: string) => {
    if (parcoursupWishlist.includes(ecoleId)) {
      setParcoursupWishlist(parcoursupWishlist.filter(id => id !== ecoleId));
    } else {
      if (parcoursupWishlist.length < 10) {
        setParcoursupWishlist([...parcoursupWishlist, ecoleId]);
      }
    }
  };

  // Gestion des écoles comparées pour les spécialités
  const handleToggleSpecialtyCompare = (schoolId: string) => {
    if (comparedSpecialtySchoolIds.includes(schoolId)) {
      if (comparedSpecialtySchoolIds.length > 1) {
        setComparedSpecialtySchoolIds(comparedSpecialtySchoolIds.filter(id => id !== schoolId));
      }
    } else {
      if (comparedSpecialtySchoolIds.length < 4) {
        setComparedSpecialtySchoolIds([...comparedSpecialtySchoolIds, schoolId]);
      }
    }
  };

  // Liste de toutes les spécialités correspondant au domaine sélectionné
  const specialtiesInDomain = useMemo(() => {
    const list: { ecole: Ecole; specialite: SpecialiteDiplome }[] = [];
    schools.forEach(ecole => {
      ecole.specialites.forEach(sp => {
        if (sp.domaine === selectedDomain) {
          if (specialtyKeyword.trim()) {
            const q = specialtyKeyword.toLowerCase();
            const inTitle = sp.intitule_specialite.toLowerCase().includes(q);
            const inSchool = ecole.nom_officiel.toLowerCase().includes(q) || ecole.sigle.toLowerCase().includes(q);
            const inDebouches = sp.debouches_metiers?.some(d => d.toLowerCase().includes(q));
            const inModules = sp.modules_phares?.some(m => m.toLowerCase().includes(q));
            const inPartners = sp.partenaires_entreprises?.some(p => p.toLowerCase().includes(q));
            if (!inTitle && !inSchool && !inDebouches && !inModules && !inPartners) return;
          }
          list.push({ ecole, specialite: sp });
        }
      });
    });
    return list.sort((a, b) => {
      // Salaire inconnu trié en dernier
      const salA = a.specialite.salaire_moyen_specialite || a.ecole.insertion?.salaire_moyen_embauche || 0;
      const salB = b.specialite.salaire_moyen_specialite || b.ecole.insertion?.salaire_moyen_embauche || 0;
      return salB - salA;
    });
  }, [schools, selectedDomain, specialtyKeyword]);

  // Exécution du moteur de matching multicritère
  const matchingResults: ScoredEcole[] = useMemo(() => {
    let effectiveSchools = [...schools];

    if (quickKeyword.trim()) {
      const q = quickKeyword.toLowerCase();
      effectiveSchools = effectiveSchools.filter(s => 
        s.nom_officiel.toLowerCase().includes(q) ||
        s.sigle.toLowerCase().includes(q) ||
        s.ville_principale.toLowerCase().includes(q) ||
        (s.region && s.region.toLowerCase().includes(q)) ||
        s.specialites.some(sp => sp.intitule_specialite.toLowerCase().includes(q) || sp.domaine.toLowerCase().includes(q))
      );
    }

    const prefs: MatchingPreferences = {
      profil,
      domaines: selectedCriteriaDomains,
      alternance,
      budgetMax,
      pays: selectedPays,
      statuts: selectedStatuts,
      region: selectedRegion !== 'Toutes' ? selectedRegion : undefined,
      concoursFiltre: selectedConcours !== 'Tous' ? selectedConcours : undefined,
      salaireMin: minSalary > 0 ? minSalary : undefined,
      tauxAccesMax: selectivityThreshold > 0 ? selectivityThreshold : undefined,
      poidsPrestige,
      poidsSalaire,
      poidsBudget,
      poidsInsertion
    };
    return runMatchingAlgorithm(effectiveSchools, prefs);
  }, [
    schools, quickKeyword, profil, selectedCriteriaDomains, selectedRegion,
    selectedConcours, minSalary, selectivityThreshold, alternance, budgetMax,
    selectedPays, selectedStatuts, poidsPrestige, poidsSalaire,
    poidsBudget, poidsInsertion
  ]);

  // Exécution des classements officiels par spécialité
  const specialtyRankings = useMemo(() => {
    const list = getSpecialtyRankings(schools, selectedDomain);
    return list.sort((a, b) => {
      if (specialtySortBy === 'rank') return a.rank - b.rank;
      if (specialtySortBy === 'salary') return (b.salaireSortie ?? 0) - (a.salaireSortie ?? 0);
      if (specialtySortBy === 'selectivity') return (a.tauxAccesPsup || 99) - (b.tauxAccesPsup || 99);
      if (specialtySortBy === 'note') return b.noteGlobale - a.noteGlobale;
      return a.rank - b.rank;
    });
  }, [schools, selectedDomain, specialtySortBy]);

  // Exécution du simulateur de sélectivité Parcoursup
  const selectivityTiers = useMemo(() => {
    return getSelectivityTiers(schools);
  }, [schools]);

  // Analyse de l'équilibre de la liste de vœux (logique dans utils/wishlist.ts)
  const wishlistAnalysis = useMemo(() => analyzeWishlist(schools, parcoursupWishlist), [schools, parcoursupWishlist]);

  const applyPreset = (presetName: string) => {
    setQuickKeyword('');
    switch (presetName) {
      case 'ia_data':
        setProfil('Tous');
        setSelectedCriteriaDomains(['Intelligence Artificielle & Data', 'Informatique & Logiciel']);
        setMinSalary(46);
        setBudgetMax(12000);
        setSelectedRegion('Toutes');
        break;
      case 'aero':
        setProfil('Tous');
        setSelectedCriteriaDomains(['Aéronautique & Spatial', 'Automobile & Transports']);
        setMinSalary(44);
        setSelectedRegion('Toutes');
        break;
      case 'btp':
        setProfil('Tous');
        setSelectedCriteriaDomains(['Génie Civil & BTP', 'Énergie & Environnement']);
        setSelectedRegion('Toutes');
        break;
      case 'cyber':
        setProfil('Tous');
        setSelectedCriteriaDomains(['Cybersécurité', 'Informatique & Logiciel', 'Télécommunications & Réseaux']);
        setMinSalary(45);
        setSelectedRegion('Toutes');
        break;
      case 'public_free':
        setProfil('Tous');
        setBudgetMax(1000);
        setSelectedStatuts(['Public']);
        setSelectedPays(['France']);
        setSelectedRegion('Toutes');
        break;
      case 'alternance':
        setAlternance('Obligatoire');
        setSelectedRegion('Toutes');
        break;
      default:
        break;
    }
  };

  const copyWishlistPlan = () => {
    const text = wishlistAnalysis.schools.map((s, i) => {
      const psup = s.admissions.find(a => a.source === 'Parcoursup') || s.admissions[0];
      return `${i + 1}. ${s.nom_officiel} (${s.sigle}) - ${s.ville_principale} - Taux d'accès: ${psup?.taux_acces != null ? `${psup.taux_acces}%` : 'sur concours'} - Carte: ${s.parcoursup_url || 'https://dossier.parcoursup.fr/Candidat/carte'}`;
    }).join('\n');
    navigator.clipboard.writeText(`=== MON PLAN DE 10 VŒUX PARCOURSUP (INGÉFINDER) ===\n\n${text}\n\nIndice de Sécurité: ${wishlistAnalysis.scoreSecurite}%\nDiagnostic: ${wishlistAnalysis.diagnostic}`);
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 3000);
  };

  return {
    engineeringSchools,
    totalSpecialties,
    activeSection,
    setActiveSection,
    selectedDomain,
    setSelectedDomain,
    specialtyKeyword,
    setSpecialtyKeyword,
    comparedSpecialtySchoolIds,
    setComparedSpecialtySchoolIds,
    parcoursupWishlist,
    setParcoursupWishlist,
    candidateAcademicLevel,
    setCandidateAcademicLevel,
    copyToast,
    setCopyToast,
    profil,
    setProfil,
    selectedCriteriaDomains,
    setSelectedCriteriaDomains,
    selectedRegion,
    setSelectedRegion,
    selectedConcours,
    setSelectedConcours,
    selectivityThreshold,
    setSelectivityThreshold,
    minSalary,
    setMinSalary,
    alternance,
    setAlternance,
    budgetMax,
    setBudgetMax,
    selectedPays,
    setSelectedPays,
    selectedStatuts,
    setSelectedStatuts,
    quickKeyword,
    setQuickKeyword,
    poidsPrestige,
    setPoidsPrestige,
    poidsSalaire,
    setPoidsSalaire,
    poidsBudget,
    setPoidsBudget,
    poidsInsertion,
    setPoidsInsertion,
    showAdvancedWeights,
    setShowAdvancedWeights,
    specialtySortBy,
    setSpecialtySortBy,
    handleToggleWishlist,
    handleToggleSpecialtyCompare,
    specialtiesInDomain,
    matchingResults,
    specialtyRankings,
    selectivityTiers,
    wishlistAnalysis,
    applyPreset,
    copyWishlistPlan,
  };
}

export type BoussoleState = ReturnType<typeof useBoussoleState>;
