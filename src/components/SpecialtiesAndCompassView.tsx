import React, { useState, useMemo } from 'react';
import heroImage from '../assets/images/hero-campus.webp';
import { usePersistentState } from '../utils/usePersistentState';
import { analyzeWishlist, printWishlist } from '../utils/wishlist';
import { 
  Sparkles, SlidersHorizontal, CheckCircle2, AlertCircle, ArrowRight, 
  MapPin, ShieldCheck, GraduationCap, ChevronRight, Filter, RotateCcw,
  Trophy, Target, Compass, DollarSign, Zap, BookOpen, Award, TrendingUp,
  Check, ExternalLink, School, Plus, Trash2, Share2, Printer, Info, Search,
  Briefcase, Building2, Layers, Cpu, Code2, Globe2, BarChart2, Scale
} from 'lucide-react';
import { 
  Ecole, MatchingPreferences, ProfilCandidat, DomaineIngenierie, Pays, Statut, ScoredEcole, SpecialiteDiplome 
} from '../types';
import { 
  runMatchingAlgorithm, getSpecialtyRankings, getSelectivityTiers 
} from '../utils/matchingEngine';

interface SpecialtiesAndCompassViewProps {
  schools: Ecole[];
  onSelectSchool: (ecole: Ecole) => void;
  onToggleCompare: (ecole: Ecole) => void;
  comparedSchoolIds: string[];
}

type StudioSection = 'specialties_studio' | 'specialties_compare' | 'parcoursup_strategy' | 'multicriteria_engine' | 'rankings_table';

const ALL_DOMAINS: DomaineIngenierie[] = [
  'Informatique & Logiciel',
  'Intelligence Artificielle & Data',
  'Cybersécurité',
  'Aéronautique & Spatial',
  'Génie Civil & BTP',
  'Énergie & Environnement',
  'Matériaux & Chimie',
  'Robotique & Mécatronique',
  'Électronique & Systèmes Embarqués',
  'Mathématiques Financières & Modélisation',
  'Automobile & Transports',
  'Biotechnologies & Santé',
  'Télécommunications & Réseaux',
  'Généraliste & Systèmes Complexes'
];

const FRENCH_REGIONS = [
  'Toutes',
  'Île-de-France',
  'Auvergne-Rhône-Alpes',
  'Occitanie',
  'Bretagne',
  'Grand Est',
  'Normandie',
  'Nouvelle-Aquitaine',
  'Pays de la Loire',
  'Hauts-de-France',
  'Bourgogne-Franche-Comté'
];

const ADMISSION_TRACKS = [
  'Tous',
  'Concours Puissance Alpha',
  'Concours Avenir',
  'Concours Geipi Polytech',
  'Concours Advance',
  'Groupe INSA',
  'Groupe UT',
  'Concours Commun Mines-Télécom',
  'Concours Centrale-Supélec',
  'Concours CCINP',
  'Concours X'
];

export const SpecialtiesAndCompassView: React.FC<SpecialtiesAndCompassViewProps> = ({
  schools,
  onSelectSchool,
  onToggleCompare,
  comparedSchoolIds,
}) => {
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
      const salA = a.specialite.salaire_moyen_specialite || a.ecole.insertion?.salaire_moyen_embauche || 45;
      const salB = b.specialite.salaire_moyen_specialite || b.ecole.insertion?.salaire_moyen_embauche || 45;
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
      if (specialtySortBy === 'salary') return b.salaireSortie - a.salaireSortie;
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

  return (
    <div className="space-y-8 pb-16">
      
      {/* Studio Header Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
          <div className="lg:col-span-7 p-6 sm:p-10 z-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
              <span className="font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 font-bold">
                BOUSSOLE D'ORIENTATION
              </span>
              <span>{totalSpecialties} spécialités · {engineeringSchools.length} écoles d'ingénieurs</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 max-w-xl text-balance">
              Trouvez votre école d'ingénieurs et préparez vos vœux.
            </h1>
            
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-lg leading-relaxed">
              Comparez les <strong>débouchés</strong>, les <strong>salaires par spécialité</strong> et les <strong>entreprises partenaires</strong>, puis construisez une liste de 10 vœux Parcoursup équilibrée.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {totalSpecialties} cursus & fiches métiers
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Chaires & recruteurs partenaires
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Analyse de vos vœux Parcoursup
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 h-64 lg:h-full relative overflow-hidden bg-slate-100">
            <img 
              src={heroImage}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-white lg:via-transparent lg:to-transparent" />
          </div>
        </div>
      </section>

      {/* Navigation entre les 5 modules */}
      <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveSection('specialties_studio')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
              activeSection === 'specialties_studio'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Spécialités & débouchés</span>
          </button>

          <button
            onClick={() => setActiveSection('specialties_compare')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
              activeSection === 'specialties_compare'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>Comparer des filières</span>
          </button>

          <button
            onClick={() => setActiveSection('parcoursup_strategy')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors relative ${
              activeSection === 'parcoursup_strategy'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Target className="w-4 h-4 text-rose-500" />
            <span>Mes vœux Parcoursup</span>
            <span className="font-mono text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-bold">
              {parcoursupWishlist.length}/10
            </span>
          </button>

          <button
            onClick={() => setActiveSection('multicriteria_engine')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
              activeSection === 'multicriteria_engine'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-500" />
            <span>Recherche multicritère</span>
          </button>

          <button
            onClick={() => setActiveSection('rankings_table')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
              activeSection === 'rankings_table'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Palmarès par spécialité</span>
          </button>
        </div>

        <span className="text-xs text-slate-500 font-mono hidden xl:inline px-3 font-semibold">
          {totalSpecialties} cursus
        </span>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1 : STUDIO DES SPÉCIALITÉS & DÉBOUCHÉS MÉTIERS                      */}
      {/* ========================================================================= */}
      {activeSection === 'specialties_studio' && (
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
                  const sal = specialite.salaire_moyen_specialite || ecole.insertion?.salaire_moyen_embauche || 45;

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
                              {sal} k€/an
                            </strong>
                          </div>
                          <div>
                            <span className="block text-[10px] text-slate-400 font-medium">Insertion 6 mois</span>
                            <strong className="font-mono text-sm font-bold text-slate-900">
                              {specialite.taux_insertion_specialite || 98.4}%
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
      )}

      {/* ========================================================================= */}
      {/* SECTION 2 : COMPARATEUR SPÉCIFIQUE DE FILIÈRES                             */}
      {/* ========================================================================= */}
      {activeSection === 'specialties_compare' && (
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
                      const sal = sp?.salaire_moyen_specialite || ecole?.insertion?.salaire_moyen_embauche || 45;
                      return (
                        <td key={sid} className="py-3 px-4 font-mono font-bold text-sm text-emerald-700">
                          {sal} k€/an
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
      )}

      {/* ========================================================================= */}
      {/* SECTION 3 : STRATÉGIE PARCOURSUP & AUDIT PRÉDICTIF (10 VŒUX)               */}
      {/* ========================================================================= */}
      {activeSection === 'parcoursup_strategy' && (
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
                    const taux = psup?.taux_acces ?? 25;
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
                            <span className="font-mono font-bold text-indigo-700">Taux : {taux}%</span>
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
      )}

      {/* ========================================================================= */}
      {/* SECTION 4 : RECHERCHE MULTICRITÈRE                                          */}
      {/* ========================================================================= */}
      {activeSection === 'multicriteria_engine' && (
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
            <aside className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-5">
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
            <main className="lg:col-span-8 space-y-4">
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
            </main>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 5 : PALMARÈS SPÉCIALITÉS (LE FIGARO / L'ÉTUDIANT)                  */}
      {/* ========================================================================= */}
      {activeSection === 'rankings_table' && (
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
                            {item.salaireSortie} k€
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
      )}

    </div>
  );
};
