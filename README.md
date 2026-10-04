# IngéFinder Francophonie

Plateforme d'orientation vers les écoles d'ingénieurs (France, Suisse, Belgique, Québec) et les prépas scientifiques CPGE : répertoire, fiches détaillées, comparateur, analyse de vœux Parcoursup et recherche multicritère.

## Front (React + Vite + Tailwind)

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # vérification TypeScript
npm run build    # sortie dans dist/
```

Le site est une SPA statique : `dist/` peut être servi tel quel par n'importe quel hébergeur. Le routage utilise le hash (`#/repertoire`, `#/ecole/<id>`, `#/comparateur`, `#/analytique`), donc aucune règle de réécriture serveur n'est nécessaire.

Les données affichées sont dans `src/data/` (TypeScript, chargé à la demande).

## Pipeline de données (Python)

`pipeline.py` collecte les données (Parcoursup open data, palmarès presse) via `fetcher.py` et `parsers/`, les dédoublonne (`entity_resolution.py`) et les stocke en SQLite (`schema.sql`, `database.py`). `app.py` est une interface Streamlit d'exploration de cette base.

Le pipeline n'alimente pas encore le front : les deux jeux de données sont indépendants.
