import React from 'react';
import { 
  ArrowLeft, ExternalLink, ShieldCheck, MapPin, Award, BookOpen,
  Building2, CheckCircle2, Target, TrendingUp, Briefcase, 
  Check, Plus, BarChart3, BedDouble, Compass, Globe, ChevronRight
} from 'lucide-react';
import { Ecole, ClassementMedia } from '../types';
import { SourceTag, SOURCE_URLS, NON_COMMUNIQUE } from './SourceTag';
import { explorerHref, tabHref } from '../utils/router';

interface SchoolDetailPageProps {
  ecole: Ecole;
  onBack: () => void;
  onToggleCompare: (ecole: Ecole) => void;
  isCompared: boolean;
  onSelectOtherSchool?: (ecole: Ecole) => void;
  allSchools: Ecole[];
}

export const SchoolDetailPage: React.FC<SchoolDetailPageProps> = ({
  ecole,
  onBack,
  onToggleCompare,
  isCompared,
  onSelectOtherSchool,
  allSchools
}) => {
  const isPrepa = ecole.type_etablissement === 'prepa_cpge';
  const isPostPrepa = !isPrepa && ecole.type_recrutement === 'post_prepa';
  const isInternational = !isPrepa && (ecole.type_recrutement === 'international' || ecole.pays !== 'France');
  const isPostBac = !isPrepa && !isPostPrepa && !isInternational;

  // Primary admission for the statistical gauge
  const primaryAdmission = isPrepa
    ? (ecole.admissions?.find(a => a.source === 'Parcoursup') || ecole.admissions?.[0])
    : isPostPrepa
      ? (ecole.admissions?.find(a => a.source.toLowerCase().includes('cpge') || a.nom_filiere_concours?.toLowerCase().includes('concours') || a.source.toLowerCase().includes('scei')) || ecole.admissions?.[0])
      : (ecole.admissions?.find(a => a.source === 'Parcoursup') || ecole.admissions?.[0]);

  // Répartition type par modèle de recrutement (ordre de grandeur, identique pour toutes les écoles du même modèle)
  const admissionPaths = isPostPrepa ? [
    { 
      label: 'Concours Nationaux CPGE (MP, PC, PSI, PT, MPI, BCPST)', 
      pct: 82, 
      desc: 'Concours d\'élite après 2 ans de classes préparatoires scientifiques (X-ENS, Mines-Ponts, CentraleSupélec, CCINP, Banque PT)' 
    },
    { 
      label: 'Admissions sur Titres Universitaires (AST Licence L3 & BUT)', 
      pct: 12, 
      desc: 'Voie universitaire sélective sur dossier scolaire, épreuves écrites scientifiques et oraux (titulaires de L3 Maths, Physique, Mécanique ou Info)' 
    },
    { 
      label: 'Filière Internationale & Doubles Diplômes', 
      pct: 6, 
      desc: 'Étudiants des universités partenaires mondiales d\'excellence (MIT, Imperial College, EPFL, McGill, Polytechnique Montréal)' 
    }
  ] : isPostBac ? [
    { 
      label: 'Cycle Préparatoire Intégré Post-Bac (Parcoursup)', 
      pct: 75, 
      desc: 'Recrutement direct des bacheliers généraux sur dossier scolaire et concours commun (Groupe INSA, Réseau UT, Geipi Polytech, Advance, Avenir, Puissance Alpha)' 
    },
    { 
      label: 'Admissions Passerelles Bac+2 (CPGE, BUT, BTS, Licence L2)', 
      pct: 15, 
      desc: 'Entrée directe en 1re année du cycle ingénieur (Bac+3) pour étudiants de CPGE ou diplômés de BUT/BTS scientifiques' 
    },
    { 
      label: 'Filière Apprentissage / Alternance (FISA)', 
      pct: 10, 
      desc: 'Cursus ingénieur sous statut de salarié apprenti en entreprise partenaire, avec prise en charge intégrale des frais de scolarité et rémunération mensuelle' 
    }
  ] : [
    { 
      label: 'Admission Directe Post-Secondaire / Maturité / DEC', 
      pct: 80, 
      desc: 'Recrutement sur critères académiques internationaux (Moyenne générale au Baccalauréat > 16/20 pour l\'EPFL, DEC technique pour l\'ÉTS, dossier pour PolyMTL)' 
    },
    { 
      label: 'Passerelles Universitaires & Mobilité Internationale', 
      pct: 20, 
      desc: 'Admissions au niveau Bac+2 ou Bac+3 sur équivalences de crédits ECTS et accords inter-universitaires' 
    }
  ];

  // Similar establishments within the exact same category
  const similarSchools = allSchools
    .filter(s => s.id !== ecole.id && (isPrepa ? s.type_etablissement === 'prepa_cpge' : s.type_etablissement !== 'prepa_cpge'))
    .slice(0, 3);

  // Helper to format scores strictly according to official media scales
  const formatMediaScore = (cl: ClassementMedia) => {
    if (cl.source_media.includes('QS') || cl.source_media.includes('Shanghai')) {
      return cl.rang_general ? `Top #${cl.rang_general} Mondial` : 'Classé Mondial';
    }
    if (!cl.note_globale) return '—';
    if (cl.source_media === 'Le Figaro Étudiant') {
      return `${cl.note_globale} / 20`;
    }
    if (cl.source_media === "L'Étudiant") {
      return `${cl.note_globale} / 120 pts`;
    }
    if (cl.source_media === "L'Usine Nouvelle") {
      return `${cl.note_globale} / 100`;
    }
    return `${cl.note_globale}`;
  };

  const formatRankingTitle = (cl: ClassementMedia) => {
    if (cl.domaine_specialite) {
      return `Classement Thématique : ${cl.domaine_specialite}`;
    }
    if (cl.rang_post_bac) {
      return 'Palmarès presse — écoles post-bac';
    }
    if (cl.rang_post_prepa || isPostPrepa) {
      return 'Palmarès presse — écoles post-prépa';
    }
    if (cl.source_media.includes('QS') || cl.source_media.includes('Shanghai')) {
      return 'Palmarès Universitaire Mondial';
    }
    return 'Palmarès Général National';
  };

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      
      {/* 1. Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        {/* Fil d'Ariane */}
        <nav aria-label="Fil d'Ariane" className="min-w-0">
          <ol className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-slate-500">
            <li><a href={tabHref('boussole')} className="hover:text-slate-900">Accueil</a></li>
            <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5 text-slate-300" /></li>
            <li>
              <a
                href={explorerHref(isPrepa ? 'prepas' : 'ecoles')}
                onClick={(e) => { e.preventDefault(); onBack(); }}
                className="inline-flex items-center gap-1 font-semibold text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                {isPrepa ? 'Prépas CPGE' : "Écoles d'ingénieurs"}
              </a>
            </li>
            <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5 text-slate-300" /></li>
            <li aria-current="page" className="text-slate-900 font-semibold truncate max-w-[14rem]">{ecole.sigle || ecole.nom_officiel}</li>
          </ol>
        </nav>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onToggleCompare(ecole)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              isCompared
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-semibold'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {isCompared ? <Check className="w-3.5 h-3.5 text-indigo-600" /> : <Plus className="w-3.5 h-3.5" />}
            <span>{isCompared ? 'En sélection' : 'Comparer'}</span>
          </button>

          {/* Official Admissions Portal Button */}
          {isPostPrepa ? (
            <a
              href="https://www.scei-concours.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
              title="Portail officiel des concours d'ingénieurs post-prépa"
            >
              <span>Portail Concours SCEI</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          ) : isPostBac && ecole.parcoursup_url ? (
            <a
              href={ecole.parcoursup_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
            >
              <span>Portail Parcoursup</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          ) : isPrepa && ecole.parcoursup_url ? (
            <a
              href={ecole.parcoursup_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
            >
              <span>Parcoursup CPGE</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          ) : null}

          <a
            href={ecole.site_web}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <span>Site officiel</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 2. Hero Profile */}
      <section className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-2xs space-y-4">
        
        {/* Category & Status Meta Line */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
            isPrepa 
              ? 'bg-amber-50 text-amber-800 border border-amber-200/60'
              : isPostPrepa
              ? 'bg-indigo-50 text-indigo-800 border border-indigo-200/60'
              : isPostBac
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
              : 'bg-blue-50 text-blue-800 border border-blue-200/60'
          }`}>
            {(isPrepa ? 'Classe Préparatoire CPGE' : isPostPrepa ? 'Grande École Post-Prépa' : isPostBac ? 'École Post-Bac' : 'Université Internationale')
              + (!isInternational && ecole.classements?.[0]?.rang_general ? ` · #${ecole.classements[0].rang_general} (${ecole.classements[0].source_media} ${ecole.classements[0].annee})` : '')}
          </span>
          <span aria-hidden="true">·</span>
          <span>{ecole.region || ecole.pays}</span>
          <span aria-hidden="true">·</span>
          <span>{ecole.ville_principale}</span>
          <span aria-hidden="true">·</span>
          <span className="font-medium text-slate-700">{ecole.statut_juridique}</span>
          {ecole.banque_concours && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-indigo-700 bg-slate-100 px-2 py-0.5 rounded">
                {ecole.banque_concours}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <div className="flex items-baseline gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {ecole.nom_officiel}
          </h1>
          {ecole.sigle && (
            <span className="font-mono text-sm font-bold text-slate-400">
              ({ecole.sigle})
            </span>
          )}
        </div>

        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          {ecole.description}
        </p>

        {/* Key Figures Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="block text-[10px] text-slate-400 font-medium">Scolarité annuelle</span>
            <strong className="font-mono text-base font-bold text-slate-900">
              {ecole.frais_scolarite_annuels === 0 ? 'Gratuit (0€)' : `${ecole.frais_scolarite_annuels.toLocaleString('fr-FR')} €/an`}
            </strong>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="block text-[10px] text-slate-400 font-medium">
              {isPrepa ? 'Hébergement' : 'Salaire brut embauche'}
            </span>
            <strong className="font-mono text-base font-bold text-slate-900">
              {isPrepa 
                ? (ecole.internat_disponible ? (ecole.prix_internat_annuel ? `Internat (${ecole.prix_internat_annuel}€)` : 'Internat') : 'Sans internat') 
                : `${ecole.insertion.salaire_moyen_embauche} k€`}
            </strong>
            {!isPrepa && <SourceTag label={ecole.insertion.source ?? 'Enquête insertion, promo'} year={ecole.insertion.annee_promo} url={ecole.insertion.source_url} />}
          </div>

          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="block text-[10px] text-slate-400 font-medium">
              {isPrepa ? 'Sélectivité Parcoursup' : isPostPrepa ? 'Sélectivité Concours CPGE' : 'Sélectivité Parcoursup'}
            </span>
            <strong className="font-mono text-base font-bold text-indigo-700">
              {primaryAdmission?.taux_acces != null ? `${primaryAdmission.taux_acces}%` : NON_COMMUNIQUE}
            </strong>
            {primaryAdmission && <SourceTag label={primaryAdmission.source} year={primaryAdmission.annee} url={primaryAdmission.source_url} />}
          </div>

          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="block text-[10px] text-slate-400 font-medium">
              {isPrepa ? 'Intégration Top Écoles' : 'Taux d\'emploi à 6 mois'}
            </span>
            <strong className="font-mono text-base font-bold text-slate-900">
              {isPrepa 
                ? (ecole.prepa_stats?.[0]?.taux_integration_top_ecoles != null ? `${ecole.prepa_stats[0].taux_integration_top_ecoles}%` : NON_COMMUNIQUE)
                : `${ecole.insertion.taux_emploi_6_mois}%`}
            </strong>
            {!isPrepa && <SourceTag label={ecole.insertion.source ?? 'Enquête insertion, promo'} year={ecole.insertion.annee_promo} url={ecole.insertion.source_url} />}
          </div>
        </div>

      </section>

      {/* 3. Diagrammes & Statistiques */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-indigo-600" />
          <span>Statistiques & voies d'accès</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Diagramme 1 : Sélectivité Concours ou Parcoursup */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-100">
              <div className="min-w-0">
                <h3 className="text-xs font-bold text-slate-900">
                  {isPrepa
                    ? 'Sélectivité & Vœux Parcoursup' 
                    : isPostPrepa 
                    ? 'Sélectivité Concours CPGE' 
                    : isInternational
                    ? 'Sélectivité Académique Internationale'
                    : 'Sélectivité Parcoursup (Cycle Intégré)'}
                </h3>
                <p className="text-[11px] text-slate-500 truncate max-w-[280px]">
                  {primaryAdmission?.nom_filiere_concours || ecole.banque_concours || 'Session officielle'}
                </p>
              </div>
              <span className="shrink-0 text-right">
                <span className="block font-mono text-xs font-bold text-indigo-700">
                  {primaryAdmission ? `Session ${primaryAdmission.annee}` : 'Session non communiquée'}
                </span>
                {primaryAdmission && <SourceTag label={primaryAdmission.source} url={primaryAdmission.source_url} />}
              </span>
            </div>

            {/* Jauge Taux d'accès */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">
                  {isPostPrepa ? 'Taux d\'admission concours :' : 'Taux d\'accès Parcoursup :'}
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {primaryAdmission?.taux_acces != null ? `${primaryAdmission.taux_acces}%` : NON_COMMUNIQUE}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    primaryAdmission?.taux_acces == null
                      ? 'bg-slate-300'
                      : primaryAdmission.taux_acces < 15 
                      ? 'bg-rose-500' 
                      : primaryAdmission.taux_acces < 30 
                      ? 'bg-amber-400' 
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(primaryAdmission?.taux_acces == null ? 0 : 5, primaryAdmission?.taux_acces ?? 0))}%` }}
                />
              </div>
            </div>

            {/* Chiffres clés */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <span className="block text-[10px] text-slate-400">Capacité de la promotion</span>
                <strong className="font-mono text-sm font-bold text-slate-900">{primaryAdmission?.capacite ? `${primaryAdmission.capacite} places` : NON_COMMUNIQUE}</strong>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <span className="block text-[10px] text-slate-400">
                  {isPostPrepa ? 'Candidats au concours' : 'Candidatures reçues'}
                </span>
                <strong className="font-mono text-sm font-bold text-indigo-700">
                  {primaryAdmission?.nb_voeux ? `${primaryAdmission.nb_voeux.toLocaleString('fr-FR')} ${isPostPrepa ? 'inscrits' : 'vœux'}` : NON_COMMUNIQUE}
                </strong>
              </div>
            </div>

            {/* Mentions & profil académique */}
            <div className="space-y-1 text-xs pt-1 border-t border-slate-100">
              <div className="flex justify-between text-slate-600">
                <span>Admis Mention Très Bien au Bac :</span>
                <strong className="font-mono font-bold text-slate-900">{primaryAdmission?.pct_mention_tb != null ? `${primaryAdmission.pct_mention_tb}%` : NON_COMMUNIQUE}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Part d'étudiants boursiers :</span>
                <strong className="font-mono font-bold text-slate-900">{primaryAdmission?.pct_boursiers != null ? `${primaryAdmission.pct_boursiers}%` : NON_COMMUNIQUE}</strong>
              </div>
            </div>
          </div>

          {/* Diagramme 2 : Intégration par filière (Prépas) OU Répartition des Voies d'Accès (Écoles) */}
          {isPrepa ? (
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Intégration Grandes Écoles par Filière CPGE</h3>
                  <p className="text-[11px] text-slate-500">Concours Polytechnique (X), Mines-Ponts, Centrale, Arts et Métiers</p>
                </div>
                <span className="text-xs text-slate-400 font-mono">SCEI</span>
              </div>

              <div className="space-y-3 pt-1">
                {(ecole.prepa_stats || []).map((stat) => (
                  <div key={stat.filiere} className="p-3 bg-slate-50 rounded-lg space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900">Filière {stat.filiere}</span>
                        {stat.rang_national_filiere && (
                          <span className="font-mono text-[10px] font-bold text-amber-800 bg-amber-100/70 px-1.5 py-0.2 rounded">
                            #{stat.rang_national_filiere} National
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-slate-400 text-[11px]">{stat.effectif} élèves</span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between text-slate-600 text-[11px]">
                        <span>Top Écoles (X, Mines, Centrale, Arts et Métiers) :</span>
                        <strong className="font-mono text-emerald-700 font-bold">{stat.taux_integration_top_ecoles}%</strong>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${Math.min(100, stat.taux_integration_top_ecoles)}%` }} />
                      </div>

                      <div className="flex justify-between text-slate-600 text-[11px]">
                        <span>Polytechnique (X) & ENS :</span>
                        <strong className="font-mono text-indigo-700 font-bold">{stat.taux_integration_x_ens}%</strong>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${Math.min(100, stat.taux_integration_x_ens * 2)}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-xs font-bold text-slate-900">
                    {isPostPrepa ? 'Diagramme des Voies d\'Accès au Cycle Ingénieur' : 'Diagramme des Voies de Recrutement'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {isPostPrepa 
                      ? 'Admissions Post-Prépa (CPGE) et Passerelles Universitaires AST' 
                      : isInternational
                      ? 'Admissions internationales et mobilité'
                      : 'Cycle préparatoire intégré et passerelles Bac+2'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Répartition type pour ce modèle de recrutement, non spécifique à l'établissement.</p>
                </div>
                <span className="text-xs text-slate-400 font-mono">Indicatif</span>
              </div>

              {/* Stacked bar */}
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                {admissionPaths.map((p, idx) => {
                  const colors = ['bg-indigo-600', 'bg-emerald-500', 'bg-amber-500'];
                  return (
                    <div 
                      key={idx} 
                      className={`${colors[idx % colors.length]} h-full`}
                      style={{ width: `${p.pct}%` }}
                      title={`${p.label}: ${p.pct}%`}
                    />
                  );
                })}
              </div>

              <div className="space-y-2 text-xs">
                {admissionPaths.map((p, idx) => {
                  const dotColors = ['bg-indigo-600', 'bg-emerald-500', 'bg-amber-500'];
                  return (
                    <div key={idx} className="p-2.5 bg-slate-50 rounded-lg flex items-start justify-between gap-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${dotColors[idx % dotColors.length]}`} />
                          <span className="font-bold text-slate-900">{p.label}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug pl-4">{p.desc}</p>
                      </div>
                      <span className="font-mono font-bold text-slate-900 shrink-0 text-right">{p.pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 4. Rémunérations & Insertion CGE (Pour les écoles) */}
      {!isPrepa && (
        <section className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                <span>Rémunérations & insertion (promotion {ecole.insertion.annee_promo})</span>
              </h2>
            </div>
            <SourceTag label={ecole.insertion.source ?? 'Enquête insertion, promo'} year={ecole.insertion.annee_promo} url={ecole.insertion.source_url} className="text-[11px]" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="block text-[10px] text-slate-400">Salaire brut moyen débutant</span>
              <strong className="font-mono text-base font-bold text-slate-900">{ecole.insertion.salaire_moyen_embauche} k€/an</strong>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="block text-[10px] text-slate-400">Salaire avec primes</span>
              <strong className="font-mono text-base font-bold text-emerald-700">
                {ecole.insertion.salaire_avec_primes ? `${ecole.insertion.salaire_avec_primes} k€` : NON_COMMUNIQUE}
              </strong>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="block text-[10px] text-slate-400">Salaire après 3 ans d'expérience</span>
              <strong className="font-mono text-base font-bold text-slate-900">
                {ecole.insertion.salaire_3_ans ? `${ecole.insertion.salaire_3_ans} k€` : NON_COMMUNIQUE}
              </strong>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="block text-[10px] text-slate-400">Délai moyen de recherche</span>
              <strong className="font-mono text-base font-bold text-indigo-700">
                {ecole.insertion.duree_moyenne_recherche_mois ? `${ecole.insertion.duree_moyenne_recherche_mois} mois` : NON_COMMUNIQUE}
              </strong>
            </div>
          </div>
        </section>
      )}

      {/* 5. Classements presse */}
      <section className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Classements presse</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Barèmes publiés par chaque magazine : Le Figaro Étudiant (sur 20) · L'Étudiant (sur 120 points) · L'Usine Nouvelle (sur 100 points)
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-[11px]">
                <th className="py-2.5 px-3 font-semibold">Organisme / Média</th>
                <th className="py-2.5 px-3 font-semibold">Année</th>
                <th className="py-2.5 px-3 font-semibold">Typologie de Palmarès</th>
                <th className="py-2.5 px-3 text-center font-semibold">Rang National</th>
                <th className="py-2.5 px-3 text-right font-semibold">Score & barème</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ecole.classements.map((cl) => (
                <tr key={cl.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-slate-900">
                    <a href={cl.source_url ?? SOURCE_URLS[cl.source_media]} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {cl.source_media}
                    </a>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-400">{cl.annee}</td>
                  <td className="py-2.5 px-3 text-slate-700 font-medium">
                    {formatRankingTitle(cl)}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-xs">
                      {cl.rang_par_specialite ? `#${cl.rang_par_specialite}` : (cl.rang_general ? `#${cl.rang_general}` : 'Classé')}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                    {formatMediaScore(cl)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Spécialités & Formations */}
      <section className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
          <span>Filières, Cursus & Débouchés ({ecole.specialites.length})</span>
        </h2>

        <div className="space-y-3">
          {ecole.specialites.map((sp) => (
            <div key={sp.id} className="p-4 rounded-lg bg-slate-50/70 border border-slate-100 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-0.5">
                    <span className="font-semibold text-indigo-700">{sp.domaine}</span>
                    <span aria-hidden="true">·</span>
                    <span>{sp.type_cursus}</span>
                    <span aria-hidden="true">·</span>
                    <span>{sp.duree_annees} ans</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{sp.intitule_specialite}</h3>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-xs font-bold text-slate-900">
                    {sp.salaire_moyen_specialite} k€ débutant
                  </span>
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {sp.taux_insertion_specialite}% embauche
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-600 pt-1">
                <span className="font-medium text-slate-700">Compétences clés : </span>
                <span>{sp.competences_cles}</span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {(sp.debouches_metiers || []).map((metier, idx) => (
                  <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                    {metier}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Établissements Similaires */}
      {similarSchools.length > 0 && onSelectOtherSchool && (
        <section className="bg-slate-100/60 p-5 rounded-xl border border-slate-200 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {isPrepa ? 'Autres Prépas CPGE Comparables' : 'Autres Grandes Écoles Comparables'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {similarSchools.map((s) => (
              <div 
                key={s.id} 
                onClick={() => onSelectOtherSchool(s)}
                className="p-3.5 bg-white rounded-lg border border-slate-200 hover:border-indigo-400 hover:shadow-xs transition-all cursor-pointer space-y-1.5"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{s.ville_principale}</span>
                  <span className="font-bold text-indigo-700">{s.sigle}</span>
                </div>
                <h3 className="font-bold text-xs text-slate-900 line-clamp-1">{s.nom_officiel}</h3>
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-50">
                  <span className="text-slate-500">
                    {isPrepa 
                      ? (s.prepa_stats?.[0]?.taux_integration_top_ecoles != null ? `${s.prepa_stats[0].taux_integration_top_ecoles}% Top Écoles` : '') 
                      : `${s.insertion.salaire_moyen_embauche} k€`}
                  </span>
                  <span className="font-semibold text-indigo-600 hover:underline">Voir la fiche &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
