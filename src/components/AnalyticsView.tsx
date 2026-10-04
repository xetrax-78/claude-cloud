import React, { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Briefcase, Award, Globe, Users } from 'lucide-react';
import { Ecole } from '../types';

interface AnalyticsViewProps {
  schools: Ecole[];
  onSelectSchool: (ecole: Ecole) => void;
}

const COUNTRY_COLORS: Record<string, string> = {
  France: '#3b82f6',   // Blue
  Suisse: '#ef4444',   // Red
  Belgique: '#f59e0b', // Amber
  Canada: '#10b981'    // Emerald
};

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  schools,
  onSelectSchool,
}) => {
  const [hoveredSchool, setHoveredSchool] = useState<Ecole | null>(null);

  // Statistiques globales
  // Statistiques d'insertion : écoles d'ingénieurs disposant de données uniquement (pas les prépas)
  const ecolesWithData = schools.filter(
    s => s.type_etablissement !== 'prepa_cpge' && s.insertion?.salaire_moyen_embauche && s.insertion?.taux_emploi_6_mois
  );
  const totalSchools = ecolesWithData.length;
  const avgSalaryOverall = (
    ecolesWithData.reduce((acc, s) => acc + s.insertion.salaire_moyen_embauche, 0) / Math.max(1, totalSchools)
  ).toFixed(1);

  const avgInsertionOverall = (
    ecolesWithData.reduce((acc, s) => acc + s.insertion.taux_emploi_6_mois, 0) / Math.max(1, totalSchools)
  ).toFixed(1);

  // Palmarès Top 5 Salaires
  const topSalaries = [...ecolesWithData].sort((a, b) => {
    const salA = a.insertion?.salaire_moyen_embauche || 0;
    const salB = b.insertion?.salaire_moyen_embauche || 0;
    return salB - salA;
  }).slice(0, 5);

  // Scatter plot geometry
  // X: Taux d'insertion (94% to 100%) -> SVG width 600
  // Y: Salaire moyen (40k€ to 100k€) -> SVG height 320
  const svgW = 600;
  const svgH = 320;
  const padL = 60;
  const padR = 40;
  const padT = 30;
  const padB = 40;

  const minX = 94.0;
  const maxX = 100.0;
  const minY = 40.0;
  const maxY = 100.0;

  const scaleX = (val: number) => padL + ((val - minX) / (maxX - minX)) * (svgW - padL - padR);
  const scaleY = (val: number) => svgH - padB - ((val - minY) / (maxY - minY)) * (svgH - padT - padB);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Overview Stat Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Écoles analysées</span>
          <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
            {totalSchools}
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">Avec données d'insertion · FR, CH, BE, QC</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Salaire moyen d'embauche</span>
          <span className="text-2xl font-bold font-mono text-indigo-700 tabular-nums">
            {avgSalaryOverall} k€
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">Brut annuel hors primes</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Taux d'insertion médian</span>
          <span className="text-2xl font-bold font-mono text-emerald-700 tabular-nums">
            {avgInsertionOverall} %
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">En poste à 6 mois</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Habilitations CTI / EUR-ACE</span>
          <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
            100 %
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">Reconnaissance de plein droit</span>
        </div>
      </div>

      {/* Scatter Plot : Salaire vs Taux d'insertion */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Distribution : Salaire de Sortie vs Insertion Professionnelle
            </h3>
            <p className="text-xs text-slate-500">
              Corrélation entre le taux d'insertion à 6 mois (%) et le salaire brut annuel de début de carrière (k€). Survolez un point pour voir le détail.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {Object.entries(COUNTRY_COLORS).map(([country, color]) => (
              <span key={country} className="flex items-center gap-1.5 font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                <span>{country}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="relative overflow-x-auto">
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-4xl mx-auto overflow-visible">
            
            {/* Grid horizontal lines (Salaires) */}
            {[40, 50, 60, 70, 80, 90, 100].map((sal) => {
              const y = scaleY(sal);
              return (
                <g key={sal}>
                  <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="#f1f5f9" strokeWidth="1" />
                  <text x={padL - 10} y={y + 4} textAnchor="end" className="text-[10px] font-mono fill-slate-400">
                    {sal} k€
                  </text>
                </g>
              );
            })}

            {/* Grid vertical lines (Insertion %) */}
            {[94, 95, 96, 97, 98, 99, 100].map((ins) => {
              const x = scaleX(ins);
              return (
                <g key={ins}>
                  <line x1={x} y1={padT} x2={x} y2={svgH - padB} stroke="#f1f5f9" strokeWidth="1" />
                  <text x={x} y={svgH - padB + 16} textAnchor="middle" className="text-[10px] font-mono fill-slate-400">
                    {ins} %
                  </text>
                </g>
              );
            })}

            {/* Scatter points for each school */}
            {ecolesWithData.map((ecole) => {
              const sal = ecole.insertion.salaire_moyen_embauche;
              const ins = ecole.insertion.taux_emploi_6_mois;
              const cx = scaleX(ins);
              const cy = scaleY(sal);
              const color = COUNTRY_COLORS[ecole.pays] || '#64748b';
              const isHovered = hoveredSchool?.id === ecole.id;

              return (
                <g key={ecole.id} className="cursor-pointer" onClick={() => onSelectSchool(ecole)}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 8 : 5.5}
                    fill={color}
                    fillOpacity={isHovered ? 0.95 : 0.75}
                    stroke="#ffffff"
                    strokeWidth={isHovered ? 2 : 1}
                    onMouseEnter={() => setHoveredSchool(ecole)}
                    onMouseLeave={() => setHoveredSchool(null)}
                    className="transition-all"
                  />
                  {/* Subtle Label on Top Tier */}
                  {(sal >= 54 || isHovered) && (
                    <text
                      x={cx}
                      y={cy - 9}
                      textAnchor="middle"
                      className="text-[9px] font-mono font-semibold fill-slate-700 pointer-events-none"
                    >
                      {ecole.sigle}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Axis labels */}
            <text x={svgW / 2} y={svgH - 6} textAnchor="middle" className="text-[11px] font-semibold fill-slate-500">
              Taux d'insertion professionnelle à 6 mois (%)
            </text>
            <text
              x={-svgH / 2}
              y={16}
              textAnchor="middle"
              transform="rotate(-90)"
              className="text-[11px] font-semibold fill-slate-500"
            >
              Salaire moyen brut d'embauche (k€/an)
            </text>
          </svg>

          {/* Hover Card */}
          {hoveredSchool && (
            <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex items-center justify-between">
              <div>
                <strong className="text-slate-900">{hoveredSchool.sigle}</strong> — {hoveredSchool.nom_officiel} ({hoveredSchool.ville_principale}, {hoveredSchool.pays})
              </div>
              <div className="font-mono text-slate-600">
                Salaire : <strong className="text-slate-900">{hoveredSchool.insertion?.salaire_moyen_embauche} k€</strong> · Insertion : <strong className="text-slate-900">{hoveredSchool.insertion?.taux_emploi_6_mois}%</strong> · Frais : <strong className="text-slate-900">{hoveredSchool.frais_scolarite_annuels}€</strong>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid 2: Frais de scolarité moyens & Leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Frais par Pays et statut */}
        <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Comparatif des Frais de Scolarité Moyens Annuels
          </h3>
          <p className="text-xs text-slate-500">
            Le modèle francophone se distingue par des droits de scolarité très faibles dans le public (frais d'inscription universitaires légaux ou statut civil soldé).
          </p>

          <div className="space-y-3.5 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>France (Universités de technologie / ENSAM / INSA)</span>
                <span className="font-mono tabular-nums text-slate-900">601 €/an</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '6%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Belgique (Minerval légal Fédération Wallonie-Bruxelles)</span>
                <span className="font-mono tabular-nums text-slate-900">835 €/an</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '8%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Suisse (EPFL / Haute École HES-SO)</span>
                <span className="font-mono tabular-nums text-slate-900">1 050 - 1 520 €/an</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '15%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>France (Grandes Écoles d'élite : Centrale, Mines, Ponts)</span>
                <span className="font-mono tabular-nums text-slate-900">3 200 - 3 850 €/an</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '35%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Canada / Québec (Polytechnique Montréal / ÉTS / Laval)</span>
                <span className="font-mono tabular-nums text-slate-900">5 800 - 6 200 €/an</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '60%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>France (Grandes écoles privées du numérique : EPITA...)</span>
                <span className="font-mono tabular-nums text-slate-900">10 900 €/an</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Top 5 Salaires à l'embauche */}
        <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Top 5 : Rémunérations Moyennes à la Sortie
          </h3>
          <p className="text-xs text-slate-500">
            Salaires déclarés par promotion (2024–2025) ; source et année détaillées sur chaque fiche.
          </p>

          <div className="divide-y divide-slate-100">
            {topSalaries.map((ecole, idx) => {
              const sal = ecole.insertion.salaire_moyen_embauche;
              const primes = ecole.insertion.salaire_avec_primes;

              return (
                <div 
                  key={ecole.id} 
                  className="py-3 flex items-center justify-between hover:bg-slate-50/70 px-2 rounded-lg cursor-pointer transition-colors"
                  onClick={() => onSelectSchool(ecole)}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 font-mono text-sm font-bold text-slate-400">
                      #{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                        {ecole.nom_officiel} ({ecole.sigle})
                      </h4>
                      <span className="text-[11px] text-slate-500">
                        {ecole.pays} · {ecole.ville_principale}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-sm font-bold text-slate-900 tabular-nums">
                      {sal} k€/an
                    </span>
                    {primes != null && (
                      <span className="block font-mono text-[10px] text-emerald-600 tabular-nums">
                        {primes} k€ avec primes
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
