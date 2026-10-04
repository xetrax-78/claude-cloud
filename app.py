"""
=============================================================================
INGÉFINDER FRANCOPHONIE - APPLICATION STREAMLIT DE MATCHING & RECHERCHE
=============================================================================
Auteur : Senior Software & Data Engineer
Description : Interface interactive pour orienter les étudiants vers leur école 
              d'ingénieurs idéale dans l'espace francophone (France CTI, Suisse,
              Belgique, Canada / Québec).

Lancement :
  streamlit run app.py
=============================================================================
"""

import os
import sqlite3
from typing import Dict, List, Optional, Tuple
import pandas as pd
import streamlit as st

# Configuration de la page
st.set_page_config(
    page_title="IngéFinder Francophonie | Écoles d'Ingénieurs",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="expanded",
)

DB_PATH = "ingenieurs_francophonie.db"

# ---------------------------------------------------------------------------
# CHARGEMENT ET REQUÊTES SQL
# ---------------------------------------------------------------------------
@st.cache_data(ttl=600)
def load_all_schools_data() -> Tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame, pd.DataFrame]:
    """Charge les tables principales depuis SQLite avec fallback gracieux."""
    if not os.path.exists(DB_PATH):
        # Exécuter scraper.py si la base n'existe pas encore
        try:
            import subprocess
            subprocess.run(["python3", "scraper.py"], check=True, capture_output=True)
        except Exception:
            pass

    if os.path.exists(DB_PATH):
        conn = sqlite3.connect(DB_PATH)
        df_ecoles = pd.read_sql_query("SELECT * FROM ecoles", conn)
        df_specialites = pd.read_sql_query("SELECT * FROM specialites", conn)
        df_voies = pd.read_sql_query("SELECT * FROM voies_admission", conn)
        df_classements = pd.read_sql_query("SELECT * FROM classements", conn)
        conn.close()
        return df_ecoles, df_specialites, df_voies, df_classements
    else:
        # Fallback de données statiques de démonstration
        st.warning("Base SQLite non trouvée. Veuillez exécuter 'python3 scraper.py' pour l'initialiser.")
        return pd.DataFrame(), pd.DataFrame(), pd.DataFrame(), pd.DataFrame()


# ---------------------------------------------------------------------------
# MOTEUR ALGORITHMIQUE DE MATCHING MULTICRITÈRE
# ---------------------------------------------------------------------------
def compute_match_scores(
    df_ecoles: pd.DataFrame,
    df_specialites: pd.DataFrame,
    df_voies: pd.DataFrame,
    df_classements: pd.DataFrame,
    profil_candidat: str,
    domaines_choisis: List[str],
    alternance_voulue: str,
    budget_max: int,
    pays_selectionnes: List[str],
    statuts_selectionnes: List[str],
    poids_prestige: float,
    poids_salaire: float,
    poids_budget: float,
    poids_insertion: float,
) -> pd.DataFrame:
    """
    Calcule un score d'adéquation composite normalisé (0 à 100) pour chaque école.
    Méthode multicritère pondérée avec filtres éliminatoires et bonus d'adéquation.
    """
    if df_ecoles.empty:
        return pd.DataFrame()

    results = []

    # Agrégation des classements récents
    cl_agg = df_classements.groupby("ecole_id").agg({
        "salaire_moyen_sortie": "mean",
        "taux_insertion_6m": "mean",
        "rang_general": "min"
    }).reset_index()

    df_merged = df_ecoles.merge(cl_agg, left_on="id", right_on="ecole_id", how="left")

    max_salaire = df_merged["salaire_moyen_sortie"].max() or 60.0
    min_salaire = df_merged["salaire_moyen_sortie"].min() or 40.0

    for _, row in df_merged.iterrows():
        ecole_id = row["id"]
        nom = row["nom"]
        acronyme = row["acronyme"]
        pays = row["pays"]
        frais = row["frais_scolarite_annuel"]
        statut = row["statut"]

        # 1. Filtre pays et statut
        if pays not in pays_selectionnes or statut not in statuts_selectionnes:
            continue

        # 2. Filtre et adéquation voie d'admission
        voies_ecole = df_voies[df_voies["ecole_id"] == ecole_id]
        profil_compatible = True
        if profil_candidat != "Tous profils":
            compatible = voies_ecole[voies_ecole["profil_candidat"] == profil_candidat]
            if compatible.empty:
                profil_compatible = False

        if not profil_compatible:
            continue

        # 3. Adéquation Domaine et Spécialités
        specs_ecole = df_specialites[df_specialites["ecole_id"] == ecole_id]
        domaines_ecole = specs_ecole["domaine"].tolist()
        
        matches_domaines = [d for d in domaines_choisis if d in domaines_ecole]
        if domaines_choisis and not matches_domaines:
            continue  # Éliminatoire si aucun des domaines souhaités n'est présent

        ratio_domaine = len(matches_domaines) / max(len(domaines_choisis), 1) if domaines_choisis else 1.0

        # 4. Adéquation Alternance
        alternance_dispo = (specs_ecole["alternance_disponible"] == 1).any()
        if alternance_voulue == "Obligatoire" and not alternance_dispo:
            continue
        alternance_bonus = 1.0 if (alternance_voulue == "Souhaitée" and alternance_dispo) else 0.8

        # 5. Normalisation des sous-scores (0.0 à 1.0)
        # Score Prestige (rang plus petit = meilleur)
        rang = row.get("rang_general")
        if pd.isna(rang) or rang is None:
            score_prestige = 0.5
        else:
            score_prestige = max(0.1, 1.0 - (rang / 50.0))

        # Score Salaire
        sal = row.get("salaire_moyen_sortie")
        if pd.isna(sal) or sal is None:
            score_sal = 0.5
        else:
            score_sal = max(0.0, min(1.0, (sal - min_salaire) / (max_salaire - min_salaire + 1e-5)))

        # Score Insertion
        ins = row.get("taux_insertion_6m")
        score_ins = (ins / 100.0) if pd.notna(ins) else 0.85

        # Score Budget (Frais <= Budget)
        if frais <= budget_max:
            score_cout = 1.0 - (frais / max(budget_max, 1)) * 0.4
        else:
            depassement = (frais - budget_max) / budget_max
            score_cout = max(0.05, 0.6 - min(depassement, 0.55))

        # Somme pondérée
        somme_poids = poids_prestige + poids_salaire + poids_budget + poids_insertion
        if somme_poids <= 0:
            somme_poids = 1.0

        score_composite = (
            (score_prestige * poids_prestige) +
            (score_sal * poids_salaire) +
            (score_cout * poids_budget) +
            (score_ins * poids_insertion)
        ) / somme_poids

        # Modulation par l'adéquation métier & alternance
        score_final = score_composite * (0.6 + 0.4 * ratio_domaine) * alternance_bonus
        score_pourcent = round(min(100.0, max(15.0, score_final * 100.0)), 1)

        results.append({
            "id": ecole_id,
            "Nom": nom,
            "Acronyme": acronyme,
            "Pays": pays,
            "Ville": row["ville"],
            "Statut": statut,
            "Frais (€/an)": frais,
            "Score Match (%)": score_pourcent,
            "Salaire Sortie (k€)": round(sal, 1) if pd.notna(sal) else 45.0,
            "Insertion 6m (%)": round(ins, 1) if pd.notna(ins) else 95.0,
            "Alternance": "Oui" if alternance_dispo else "Non",
            "Domaines": ", ".join(domaines_ecole[:3]),
            "Site Web": row["site_web"]
        })

    df_res = pd.DataFrame(results)
    if not df_res.empty:
        df_res = df_res.sort_values(by="Score Match (%)", ascending=False)
    return df_res


# ---------------------------------------------------------------------------
# INTERFACE UTILISATEUR STREAMLIT
# ---------------------------------------------------------------------------
def main():
    st.title("🎓 IngéFinder Francophonie")
    st.caption("Moteur d'orientation multicritère, comparateur et base de données des écoles d'ingénieurs (France, Suisse, Belgique, Canada)")

    df_ecoles, df_specialites, df_voies, df_classements = load_all_schools_data()

    if df_ecoles.empty:
        st.error("Les données ne sont pas chargées. Veuillez lancer `python3 scraper.py` pour alimenter SQLite.")
        return

    # Barre latérale : Profil & Préférences
    st.sidebar.header("🎯 Votre Profil Académique")
    profil = st.sidebar.selectbox(
        "Niveau d'entrée cible :",
        ["Tous profils", "Post-bac", "Prépa CPGE", "Admissions Parallèles (BUT/BTS/Licence)", "Master / Double Diplôme International"],
        index=1
    )

    domaines_liste = [
        "Informatique & Logiciel",
        "Cybersécurité",
        "Intelligence Artificielle & Data",
        "Aéronautique & Spatial",
        "Automobile & Transports",
        "Génie Civil & BTP",
        "Énergie & Environnement",
        "Biotechnologies & Santé",
        "Matériaux & Chimie",
        "Robotique & Mécatronique",
        "Généraliste & Systèmes Complexes"
    ]
    domaines_choisis = st.sidebar.multiselect(
        "Domaines d'ingénierie prioritaires :",
        domaines_liste,
        default=["Informatique & Logiciel", "Intelligence Artificielle & Data"]
    )

    alternance = st.sidebar.radio("Cursus en alternance :", ["Indifférent", "Souhaitée", "Obligatoire"], index=0)
    budget = st.sidebar.slider("Frais de scolarité maximum annuels (€) :", min_value=0, max_value=15000, value=6000, step=500)

    st.sidebar.subheader("🌍 Périmètre Géographique")
    pays_filtre = st.sidebar.multiselect("Pays admissibles :", ["France", "Suisse", "Belgique", "Canada"], default=["France", "Suisse", "Belgique", "Canada"])
    statuts_filtre = st.sidebar.multiselect("Statut de l'établissement :", ["Public", "Privé"], default=["Public", "Privé"])

    st.sidebar.subheader("⚖️ Pondération de vos Priorités")
    w_prestige = st.sidebar.slider("Prestige / Classements :", 0.0, 3.0, 1.5, 0.2)
    w_salaire = st.sidebar.slider("Salaire de sortie :", 0.0, 3.0, 1.2, 0.2)
    w_budget = st.sidebar.slider("Frais réduits / Économie :", 0.0, 3.0, 1.0, 0.2)
    w_insertion = st.sidebar.slider("Facilité d'insertion pro :", 0.0, 3.0, 1.0, 0.2)

    # Onglets principaux
    tab1, tab2, tab3, tab4 = st.tabs([
        "🏆 Recommandations & Matching",
        "🔍 Explorateur Complet & Fiches",
        "📊 Comparateur & Graphiques",
        "🗄️ Architecture & Schéma SQL"
    ])

    # ONGLET 1 : MATCHING
    with tab1:
        st.subheader("🎯 Vos Meilleures Correspondances")
        df_matched = compute_match_scores(
            df_ecoles, df_specialites, df_voies, df_classements,
            profil, domaines_choisis, alternance, budget,
            pays_filtre, statuts_filtre,
            w_prestige, w_salaire, w_budget, w_insertion
        )

        if df_matched.empty:
            st.info("Aucun établissement ne correspond à l'ensemble de ces filtres stricts. Essayez d'augmenter le budget max ou d'élargir les pays.")
        else:
            col_m1, col_m2, col_m3 = st.columns(3)
            col_m1.metric("Écoles éligibles", f"{len(df_matched)} établissements")
            top_match = df_matched.iloc[0]
            col_m2.metric("Meilleur Match", f"{top_match['Acronyme']} ({top_match['Score Match (%)']}%)")
            col_m3.metric("Salaire Moyen Sortie (Top 1)", f"{top_match['Salaire Sortie (k€)']} k€")

            st.dataframe(
                df_matched[[
                    "Score Match (%)", "Acronyme", "Nom", "Pays", "Ville",
                    "Statut", "Frais (€/an)", "Salaire Sortie (k€)", "Alternance"
                ]],
                use_container_width=True,
                hide_index=True
            )

    # ONGLET 2 : EXPLORATEUR
    with tab2:
        st.subheader("🔍 Répertoire Francophone des Formations d'Ingénieurs")
        recherche = st.text_input("Rechercher par nom, ville ou mot-clé :", placeholder="ex: Lyon, Aérospatiale, EPFL...")
        
        df_display = df_ecoles.copy()
        if recherche:
            df_display = df_display[
                df_display["nom"].str.contains(recherche, case=False, na=False) |
                df_display["acronyme"].str.contains(recherche, case=False, na=False) |
                df_display["ville"].str.contains(recherche, case=False, na=False) |
                df_display["description_fr"].str.contains(recherche, case=False, na=False)
            ]

        for _, ecole in df_display.iterrows():
            with st.expander(f"📍 {ecole['acronyme']} — {ecole['nom']} ({ecole['ville']}, {ecole['pays']})"):
                c1, c2 = st.columns([2, 1])
                with c1:
                    st.write(f"**Statut :** {ecole['statut']} | **Frais :** {ecole['frais_scolarite_annuel']} €/an | **Habilité CTI :** {'Oui' if ecole['habilitation_cti'] else 'Non'}")
                    st.write(f"_{ecole['description_fr']}_")
                    st.markdown(f"[🌐 Consulter le site officiel]({ecole['site_web']})")
                with c2:
                    st.write("**Spécialités phares :**")
                    specs = df_specialites[df_specialites["ecole_id"] == ecole["id"]]
                    for _, s in specs.iterrows():
                        alt_badge = " [Alternance]" if s["alternance_disponible"] else ""
                        st.caption(f"• **{s['domaine']}** : {s['intitule_diplome']}{alt_badge}")

    # ONGLET 3 : COMPARATEUR & GRAPHIQUES
    with tab3:
        st.subheader("📊 Analyse Comparative des Établissements")
        choix_ecoles = st.multiselect(
            "Sélectionnez jusqu'à 4 établissements à confronter :",
            options=df_ecoles["acronyme"].tolist(),
            default=df_ecoles["acronyme"].tolist()[:3] if len(df_ecoles) >= 3 else []
        )

        if choix_ecoles:
            df_comp = df_ecoles[df_ecoles["acronyme"].isin(choix_ecoles)]
            cl_comp = df_classements[df_classements["ecole_id"].isin(df_comp["id"])].groupby("ecole_id").mean(numeric_only=True).reset_index()
            df_comp_merged = df_comp.merge(cl_comp, left_on="id", right_on="ecole_id", how="left")

            st.write("### Tableau Comparatif")
            st.dataframe(
                df_comp_merged[[
                    "acronyme", "nom", "pays", "ville", "statut", "frais_scolarite_annuel",
                    "salaire_moyen_sortie", "taux_insertion_6m"
                ]].rename(columns={
                    "acronyme": "Acronyme", "nom": "Nom", "pays": "Pays",
                    "frais_scolarite_annuel": "Frais (€)", "salaire_moyen_sortie": "Salaire (k€)",
                    "taux_insertion_6m": "Taux Insertion (%)"
                }),
                use_container_width=True,
                hide_index=True
            )

    # ONGLET 4 : ARCHITECTURE & SQL
    with tab4:
        st.subheader("🗄️ Architecture de Données & Modèle Relationnel")
        st.write("Ce système repose sur une base relationnelle conforme CTI normalisée en 3e forme normale (3NF).")
        if os.path.exists("schema.sql"):
            with open("schema.sql", "r", encoding="utf-8") as f:
                st.code(f.read(), language="sql")


if __name__ == "__main__":
    main()
