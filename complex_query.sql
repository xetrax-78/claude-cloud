-- ============================================================================
-- REQUÊTE ANALYTIQUE COMPLEXE : MULTI-SOURCES DATA RECONCILIATION
-- Objectif : TOP 10 des écoles d'ingénieurs en Informatique d'après Le Figaro,
--            croisé avec le taux d'accès Parcoursup et le salaire moyen à la
--            sortie selon L'Étudiant.
-- Sources croisées : Le Figaro (2025), Parcoursup (2024), L'Étudiant (2025)
-- ============================================================================

SELECT 
    cl_fig.rang_par_specialite AS rang_figaro_informatique,
    e.sigle AS ecole_sigle,
    e.nom_officiel AS ecole_nom,
    e.pays,
    e.ville_principale,
    e.statut_juridique,
    
    -- 1. Indicateurs Sélectivité Parcoursup
    COALESCE(adm.taux_acces, 
        ROUND((CAST(adm.capacite AS REAL) / NULLIF(adm.nb_voeux, 0)) * 100, 1)
    ) AS taux_acces_parcoursup_pct,
    adm.rang_dernier_appele AS rang_dernier_appele_parcoursup,
    adm.pct_mention_tb AS pct_admis_mention_tb,
    adm.nb_voeux AS volume_voeux_parcoursup,

    -- 2. Indicateurs Insertion Professionnelle & Salaires selon L'Étudiant
    ins.salaire_moyen_embauche AS salaire_embauche_k_euros,
    ins.salaire_3_ans AS salaire_3ans_k_euros,
    ins.taux_emploi_6_mois AS taux_insertion_6m_pct,
    ins.pct_international AS diplomes_etranger_pct,

    -- 3. Note globale attribuée par Le Figaro
    cl_fig.note_globale AS note_figaro_sur_20

FROM classements cl_fig
INNER JOIN ecoles e 
    ON cl_fig.ecole_id = e.id
LEFT JOIN admissions_stats adm 
    ON e.id = adm.ecole_id 
    AND adm.source = 'Parcoursup' 
    AND adm.annee = 2024
LEFT JOIN insertion_professionnelle ins 
    ON e.id = ins.ecole_id 
    AND ins.annee_promo = 2024

WHERE cl_fig.source_media = 'Le Figaro Étudiant'
  AND cl_fig.domaine_specialite = 'Informatique & Logiciel'
  AND cl_fig.annee = 2025

ORDER BY cl_fig.rang_par_specialite ASC
LIMIT 10;
