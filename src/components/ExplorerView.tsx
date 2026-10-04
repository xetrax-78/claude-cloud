import React, { useState, useMemo } from 'react';
import { 
  Search, SlidersHorizontal, Check, Plus, 
  ExternalLink, BedDouble, ChevronRight, School, RotateCcw,
  GraduationCap, BookOpen
} from 'lucide-react';
import { Ecole, DomaineIngenierie, Statut } from '../types';

interface ExplorerViewProps {
  schools: Ecole[];
  onSelectSchool: (ecole: Ecole) => void;
  onToggleCompare: (ecole: Ecole) => void;
  comparedSchoolIds: string[];
  comparedPrepaIds?: string[];
  onGoToComparator?: (mode?: 'ecoles' | 'prepas') => void;
}

const ALL_DOMAINS: DomaineIngenierie[] = [
  'Informatique & Logiciel',
  'Cybersécurité',
  'Intelligence Artificielle & Data',
  'Aéronautique & Spatial',
  'Automobile & Transports',
  'Génie Civil & BTP',
  'Énergie & Environnement',
  'Biotechnologies & Santé',
  'Matériaux & Chimie',
  'Robotique & Mécatronique',
  'Électronique & Systèmes Embarqués',
  'Généraliste & Systèmes Complexes',
  'Mathématiques Financières & Modélisation',
  'Télécommunications & Réseaux'
];

const CPGE_FILIERES = [
  'Toutes les filières',
  'PTSI',
  'MPSI',
  'PCSI',
  'PSI',
  'MPI',
  'BCPST'
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
  'Bourgogne-Franche-Comté',
  'Centre-Val de Loire',
  'Provence-Alpes-Côte d\'Azur'
];

export const ExplorerView: React.FC<ExplorerViewProps> = ({
  schools,
  onSelectSchool,
  onToggleCompare,
  comparedSchoolIds,
  comparedPrepaIds = [],
}) => {
  // STRICT SEPARATION: Écoles vs Prépas (never mixed!)
  const [activeTab, setActiveTab] = useState<'ecoles' | 'prepas'>('ecoles');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('Toutes');
  const [selectedStatut, setSelectedStatut] = useState<Statut | 'Tous'>('Tous');
  
  // Specific filters for Écoles
  const [selectedDomain, setSelectedDomain] = useState<string>('Tous');
  const [selectedModel, setSelectedModel] = useState<'Tous' | 'post_prepa' | 'post_bac' | 'international'>('Tous');
  
  // Specific filters for Prépas
  const [selectedCpgeFiliere, setSelectedCpgeFiliere] = useState<string>('Toutes les filières');
  const [onlyInternat, setOnlyInternat] = useState(false);
  
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'rang' | 'performance' | 'frais' | 'selectivite'>('rang');

  const countEcoles = useMemo(() => schools.filter(s => s.type_etablissement !== 'prepa_cpge').length, [schools]);
  const countPrepas = useMemo(() => schools.filter(s => s.type_etablissement === 'prepa_cpge').length, [schools]);

  const hasActiveFilters = searchQuery.trim() !== '' || 
    selectedRegion !== 'Toutes' || 
    selectedStatut !== 'Tous' || 
    (activeTab === 'ecoles' && (selectedDomain !== 'Tous' || selectedModel !== 'Tous')) ||
    (activeTab === 'prepas' && (selectedCpgeFiliere !== 'Toutes les filières' || onlyInternat));

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedRegion('Toutes');
    setSelectedStatut('Tous');
    setSelectedDomain('Tous');
    setSelectedModel('Tous');
    setSelectedCpgeFiliere('Toutes les filières');
    setOnlyInternat(false);
    setSortBy('rang');
  };

  const filteredSchools = useMemo(() => {
    return schools.filter(ecole => {
      const isPrepa = ecole.type_etablissement === 'prepa_cpge';

      // 1. Strict separation: tab filter
      if (activeTab === 'ecoles' && isPrepa) return false;
      if (activeTab === 'prepas' && !isPrepa) return false;

      // 2. Region filter
      if (selectedRegion !== 'Toutes') {
        const inReg = (ecole.region && ecole.region.toLowerCase().includes(selectedRegion.toLowerCase())) ||
          ecole.campus?.some(c => c.ville.toLowerCase().includes(selectedRegion.toLowerCase()));
        if (!inReg) return false;
      }
      
      // 3. Statut juridique
      if (selectedStatut !== 'Tous' && ecole.statut_juridique !== selectedStatut) return false;

      // 4. Écoles-specific filters
      if (activeTab === 'ecoles') {
        if (selectedDomain !== 'Tous') {
          const hasDomain = ecole.specialites.some(s => s.domaine === selectedDomain);
          if (!hasDomain) return false;
        }

        if (selectedModel !== 'Tous') {
          if (ecole.type_recrutement !== selectedModel) return false;
        }
      }

      // 5. Prépas-specific filters
      if (activeTab === 'prepas') {
        if (onlyInternat && !ecole.internat_disponible) return false;

        if (selectedCpgeFiliere !== 'Toutes les filières') {
          const matchFiliereArray = ecole.filieres_cpge?.includes(selectedCpgeFiliere as any);
          const matchStat = ecole.prepa_stats?.some(ps => ps.filiere === selectedCpgeFiliere);
          const matchDesc = ecole.description.toUpperCase().includes(selectedCpgeFiliere);
          if (!matchFiliereArray && !matchStat && !matchDesc) return false;
        }
      }

      // 6. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inNom = ecole.nom_officiel.toLowerCase().includes(q);
        const inAcr = ecole.sigle.toLowerCase().includes(q);
        const inVille = ecole.ville_principale.toLowerCase().includes(q);
        const inRegion = ecole.region ? ecole.region.toLowerCase().includes(q) : false;
        const inDesc = ecole.description.toLowerCase().includes(q);
        const inSpecs = ecole.specialites.some(s => s.intitule_specialite.toLowerCase().includes(q) || s.domaine.toLowerCase().includes(q));
        const inPrepa = ecole.prepa_stats?.some(ps => ps.filiere.toLowerCase().includes(q));
        const inConcours = ecole.banque_concours ? ecole.banque_concours.toLowerCase().includes(q) : false;
        if (!inNom && !inAcr && !inVille && !inRegion && !inDesc && !inSpecs && !inPrepa && !inConcours) return false;
      }

      return true;
    }).sort((a, b) => {
      const isPrepa = activeTab === 'prepas';

      if (sortBy === 'rang') {
        const rangA = a.classements[0]?.rang_general || (isPrepa ? (a.prepa_stats?.[0]?.rang_national_filiere || 99) : 999);
        const rangB = b.classements[0]?.rang_general || (isPrepa ? (b.prepa_stats?.[0]?.rang_national_filiere || 99) : 999);
        return rangA - rangB;
      }
      if (sortBy === 'performance') {
        const valA = isPrepa 
          ? (a.prepa_stats?.[0]?.taux_integration_top_ecoles || 0) 
          : (a.insertion?.salaire_moyen_embauche || 0);
        const valB = isPrepa 
          ? (b.prepa_stats?.[0]?.taux_integration_top_ecoles || 0) 
          : (b.insertion?.salaire_moyen_embauche || 0);
        return valB - valA;
      }
      if (sortBy === 'frais') {
        return a.frais_scolarite_annuels - b.frais_scolarite_annuels;
      }
      if (sortBy === 'selectivite') {
        const tauxA = a.admissions[0]?.taux_acces || 50;
        const tauxB = b.admissions[0]?.taux_acces || 50;
        return tauxA - tauxB;
      }
      return 0;
    });
  }, [
    schools, activeTab, searchQuery, selectedRegion, selectedStatut,
    selectedDomain, selectedModel, selectedCpgeFiliere, onlyInternat, sortBy
  ]);

  return (
    <div className="space-y-6 pb-20 max-w-6xl mx-auto">
      
      {/* 1. Header & Dedicated Segmented Switcher (STRICT SEPARATION) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            {activeTab === 'ecoles' ? 'Grandes Écoles d\'Ingénieurs' : 'Classes Préparatoires aux Grandes Écoles (CPGE)'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {activeTab === 'ecoles'
              ? `${countEcoles} écoles d'ingénieurs en France, Suisse, Belgique et au Québec (post-prépa, post-bac et internationales).`
              : `${countPrepas} prépas scientifiques en France (PTSI, MPSI, PCSI, PSI, MPI, BCPST).`}
          </p>
        </div>

        {/* Big Clean Toggle (Strict separation) */}
        <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold shrink-0">
          <button
            onClick={() => { setActiveTab('ecoles'); resetAllFilters(); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'ecoles'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>Écoles d'Ingénieurs ({countEcoles})</span>
          </button>

          <button
            onClick={() => { setActiveTab('prepas'); resetAllFilters(); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'prepas'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>Prépas CPGE ({countPrepas})</span>
          </button>
        </div>
      </div>

      {/* 2. Streamlined Minimal Filter Bar */}
      <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        
        {/* Search input + main sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={activeTab === 'ecoles' 
                ? 'Rechercher une école, un sigle (X, Centrale, Mines, INSA, UTC...), une ville...' 
                : 'Rechercher un lycée (Say, Ginette, LLG, H4, Chaptal...), une ville...'}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                showFilters || hasActiveFilters
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filtres {hasActiveFilters ? 'actifs' : ''}</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none cursor-pointer"
            >
              <option value="rang">Tri : Palmarès presse</option>
              <option value="performance">
                {activeTab === 'ecoles' ? 'Tri : Salaire embauche' : 'Tri : Taux Top Écoles'}
              </option>
              <option value="selectivite">Tri : Sélectivité</option>
              <option value="frais">Tri : Frais annuels</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Bar */}
        {activeTab === 'ecoles' ? (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Modèle :</span>
            <div className="inline-flex flex-wrap gap-1.5 text-xs">
              {[
                { id: 'Tous', label: `Toutes (${countEcoles})` },
                { id: 'post_prepa', label: 'Post-Prépa (Concours CPGE)' },
                { id: 'post_bac', label: 'Post-Bac (Parcoursup)' },
                { id: 'international', label: 'International (EPFL, PolyMTL...)' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedModel(item.id as any)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    selectedModel === item.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Filière CPGE :</span>
            <div className="inline-flex flex-wrap gap-1.5 text-xs">
              {CPGE_FILIERES.map(filiere => (
                <button
                  key={filiere}
                  onClick={() => setSelectedCpgeFiliere(filiere)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    selectedCpgeFiliere === filiere
                      ? filiere === 'PTSI' ? 'bg-amber-600 text-white font-bold' : 'bg-slate-900 text-white'
                      : filiere === 'PTSI' ? 'bg-amber-50 text-amber-900 border border-amber-200/80 hover:bg-amber-100' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {filiere}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Collapsible Advanced Filters */}
        {showFilters && (
          <div className="pt-3 border-t border-slate-100 text-xs space-y-3">
            <div className="flex flex-wrap items-center gap-4">
              
              {activeTab === 'ecoles' && (
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500 font-medium">Spécialité CTI :</span>
                  <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className="py-1 px-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none cursor-pointer"
                  >
                    <option value="Tous">Toutes les spécialités</option>
                    {ALL_DOMAINS.map(dom => (
                      <option key={dom} value={dom}>{dom}</option>
                    ))}
                  </select>
                </div>
              )}

              {activeTab === 'prepas' && (
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium select-none">
                  <input
                    type="checkbox"
                    checked={onlyInternat}
                    onChange={(e) => setOnlyInternat(e.target.checked)}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-0"
                  />
                  <BedDouble className="w-3.5 h-3.5 text-slate-500" />
                  <span>Internat sur place obligatoire</span>
                </label>
              )}

              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Région :</span>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="py-1 px-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none cursor-pointer"
                >
                  {FRENCH_REGIONS.map(reg => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Statut :</span>
                <select
                  value={selectedStatut}
                  onChange={(e) => setSelectedStatut(e.target.value as any)}
                  className="py-1 px-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none cursor-pointer"
                >
                  <option value="Tous">Tous</option>
                  <option value="Public">Public (0€ scolarité)</option>
                  <option value="Privé">Privé</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="text-slate-400 hover:text-slate-700 transition-colors ml-auto flex items-center gap-1 text-[11px]"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Réinitialiser les filtres</span>
                </button>
              )}
            </div>
          </div>
        )}

      </section>

      {/* 3. Results Counter */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-0.5">
        <div>
          <span>{filteredSchools.length} {activeTab === 'ecoles' ? 'écoles d\'ingénieurs' : 'prépas CPGE'} trouvées</span>
          {activeTab === 'prepas' && selectedCpgeFiliere !== 'Toutes les filières' && (
            <span className="ml-1 text-slate-800 font-bold font-mono">
              · Filière {selectedCpgeFiliere}
            </span>
          )}
        </div>
        <span className="text-[11px] text-slate-400">Cliquez sur une carte pour ouvrir la fiche dédiée</span>
      </div>

      {/* 4. Minimalist Clean Cards Grid */}
      {filteredSchools.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-slate-200 space-y-3">
          <School className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-sm font-medium text-slate-600">Aucun établissement ne correspond à votre recherche.</p>
          <button
            onClick={resetAllFilters}
            className="text-xs font-semibold text-indigo-600 hover:underline"
          >
            Réinitialiser les critères
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSchools.map((ecole) => {
            const isPrepa = ecole.type_etablissement === 'prepa_cpge';
            const isCompared = isPrepa 
              ? comparedPrepaIds.includes(ecole.id)
              : comparedSchoolIds.includes(ecole.id);

            const isPostPrepa = !isPrepa && ecole.type_recrutement === 'post_prepa';
            const isInternational = !isPrepa && ecole.type_recrutement === 'international';
            const isPostBac = !isPrepa && !isPostPrepa && !isInternational;

            const primaryAdmission = ecole.admissions?.[0];
            const topPrepa = ecole.prepa_stats?.[0];
            const ptsiStat = ecole.prepa_stats?.find(ps => ps.filiere === 'PTSI');
            const sal = ecole.insertion?.salaire_moyen_embauche || 0;

            return (
              <div
                key={ecole.id}
                onClick={() => onSelectSchool(ecole)}
                className="bg-white rounded-xl border border-slate-200/90 hover:border-slate-400/80 transition-all p-5 flex flex-col justify-between cursor-pointer group hover:shadow-2xs"
              >
                <div className="space-y-3">
                  
                  {/* Category Meta & Compare Button */}
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <span className={`font-semibold px-1.5 py-0.2 rounded text-[10px] ${
                        isPrepa 
                          ? 'bg-amber-50 text-amber-900 border border-amber-200/50' 
                          : isPostPrepa 
                          ? 'bg-indigo-50 text-indigo-900 border border-indigo-200/50' 
                          : isInternational
                          ? 'bg-blue-50 text-blue-900 border border-blue-200/50'
                          : 'bg-emerald-50 text-emerald-900 border border-emerald-200/50'
                      }`}>
                        {isPrepa 
                          ? 'Prépa CPGE' 
                          : isPostPrepa 
                          ? 'Post-Prépa (CPGE)' 
                          : isInternational
                          ? 'International'
                          : 'Post-Bac'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{ecole.ville_principale}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleCompare(ecole);
                      }}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium border transition-colors ${
                        isCompared 
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold' 
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                      title={isCompared ? 'Retirer de la comparaison' : 'Ajouter au comparateur'}
                    >
                      {isCompared ? '✓ Comparé' : '+ Comparer'}
                    </button>
                  </div>

                  {/* Title & Sigle */}
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      {ecole.sigle && (
                        <span className="font-mono text-xs font-bold text-slate-900">
                          {ecole.sigle}
                        </span>
                      )}
                      {ecole.statut_juridique === 'Public' && (
                        <span className="text-[10px] text-emerald-700 font-medium">Public (0€)</span>
                      )}
                      {isPrepa && (
                        <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-1.5 py-0.2 rounded">
                          {selectedCpgeFiliere !== 'Toutes les filières'
                            ? `${selectedCpgeFiliere} #${ecole.prepa_stats?.find(s => s.filiere === selectedCpgeFiliere)?.rang_national_filiere || ecole.classements[0]?.rang_general}`
                            : `#${ecole.classements[0]?.rang_general} National`}
                        </span>
                      )}
                      {!isPrepa && ecole.classements[0]?.rang_general && (
                        <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-1.5 py-0.2 rounded">
                          #{ecole.classements[0].rang_general} National
                        </span>
                      )}
                    </div>

                    <h2 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {ecole.nom_officiel}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {ecole.description}
                  </p>

                  {/* Numeric Indicators (Distinct for Écoles vs Prépas) */}
                  {isPrepa ? (
                    <div className="grid grid-cols-3 gap-2 pt-2 pb-1 border-t border-slate-100 text-center">
                      <div>
                        <span className="block text-[10px] text-slate-400">Top Écoles</span>
                        <strong className="font-mono text-xs font-bold text-emerald-700">
                          {topPrepa?.taux_integration_top_ecoles || 40}%
                        </strong>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400">X & ENS</span>
                        <strong className="font-mono text-xs font-bold text-indigo-700">
                          {topPrepa?.taux_integration_x_ens || 10}%
                        </strong>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400">Sélectivité</span>
                        <strong className="font-mono text-xs font-bold text-slate-900">
                          {primaryAdmission?.taux_acces ? `${primaryAdmission.taux_acces}%` : 'Sélectif'}
                        </strong>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2 pt-2 pb-1 border-t border-slate-100 text-center">
                      <div>
                        <span className="block text-[10px] text-slate-400">Salaire sortie</span>
                        <strong className="font-mono text-xs font-bold text-emerald-700">
                          {sal.toFixed(1)} k€
                        </strong>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400">Insertion 6m</span>
                        <strong className="font-mono text-xs font-bold text-slate-900">
                          {ecole.insertion?.taux_emploi_6_mois || 98}%
                        </strong>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400">
                          {isPostPrepa ? 'Concours' : 'Accès Psup'}
                        </span>
                        <strong className="font-mono text-xs font-bold text-indigo-700">
                          {primaryAdmission?.taux_acces ? `${primaryAdmission.taux_acces}%` : 'Sélectif'}
                        </strong>
                      </div>
                    </div>
                  )}

                  {/* Filières / Disciplines list */}
                  <div className="text-[11px] text-slate-500 pt-0.5 truncate">
                    {isPrepa ? (
                      <span>Filières : {ecole.filieres_cpge?.join(', ') || ecole.prepa_stats?.map(ps => ps.filiere).join(', ')}</span>
                    ) : (
                      <span>
                        {ecole.banque_concours 
                          ? `${ecole.banque_concours}` 
                          : ecole.specialites.slice(0, 2).map(s => s.domaine).join(' · ')}
                      </span>
                    )}
                  </div>

                </div>

                {/* Minimal Card Footer */}
                <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">
                    {isPrepa 
                      ? (ecole.internat_disponible ? 'Internat disponible' : 'Sans internat') 
                      : (ecole.frais_scolarite_annuels === 0 ? 'Gratuit (0€)' : `${ecole.frais_scolarite_annuels.toLocaleString('fr-FR')} €/an`)}
                  </span>

                  <span className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors inline-flex items-center gap-0.5">
                    <span>Fiche détaillée</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
