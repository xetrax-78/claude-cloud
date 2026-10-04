# IngéFinder Francophonie

Plateforme d'orientation vers les écoles d'ingénieurs (France, Suisse, Belgique, Québec) et les prépas scientifiques CPGE : répertoire avec carte des campus, fiches détaillées, comparateur partageable, liste de vœux Parcoursup exportable en PDF, recherche multicritère, thème clair/sombre.

## Front (React + Vite + Tailwind)

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # vérification TypeScript
npm test         # tests front (Vitest) + scripts Python (unittest)
npm run build    # dist/ : SPA + une page HTML pré-rendue par route
```

### Déploiement

`dist/` se sert tel quel sur n'importe quel hébergeur statique. Chaque route (`/`, `/repertoire/`, `/comparateur/`, `/analytique/`, `/ecole/<id>/`) existe en HTML pré-rendu (titre, description, Open Graph, JSON-LD) : aucune règle de réécriture n'est nécessaire, et `404.html` couvre les adresses inconnues.

Pour le référencement, indiquez l'adresse publique au build :

```bash
SITE_URL=https://mon-domaine.fr npm run build   # ajoute canonical, sitemap.xml et robots.txt
```

Les anciens liens `#/…` sont redirigés automatiquement.

## Données

Le jeu de base est dans `src/data/` (TypeScript). Les mises à jour générées par les scripts Python sont dans `src/data/updates/*.json` et sont fusionnées par-dessus au chargement (`src/data/applyUpdates.ts`) : une valeur plus récente remplace la plus ancienne.

Chaque chiffre affiche sa source et son année ; une donnée absente est indiquée « Non communiqué » (aucune valeur par défaut inventée).

### Mettre à jour les statistiques Parcoursup

```bash
npm run data:parcoursup
```

Télécharge le jeu open data officiel `fr-esr-parcoursup` (data.enseignementsup-recherche.gouv.fr, dernière session publiée), rapproche les formations des établissements du site (nom + ville) et écrit `src/data/updates/parcoursup.json`.

- Rapport de correspondance : `data/rapport_parcoursup.md` (à relire, surtout les scores < 0,8)
- Corrections manuelles : `data/parcoursup_overrides.json` → `{ "id-etablissement": "cod_aff_form" }` pour forcer une formation, `null` pour ignorer
- Session précise : `python3 scripts/update_parcoursup.py --dataset fr-esr-parcoursup_2024`

### Exporter le pipeline Python

```bash
python3 pipeline.py        # remplit ingenieurs_francophonie.db (SQLite)
npm run data:pipeline      # → src/data/updates/pipeline.json (classements, insertion, campus)
```

`pipeline.py` collecte et dédoublonne les données (`fetcher.py`, `parsers/`, `entity_resolution.py`, `schema.sql`) ; `app.py` est une interface Streamlit d'exploration de la base.
