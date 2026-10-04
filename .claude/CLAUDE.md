# IngéFinder Francophonie

SPA React 19 + Vite 8 + Tailwind 4 (front) et pipeline Python/SQLite (données). Textes en français.

## Commandes
- `npm install` puis `npm run lint` (tsc) et `npm run build` avant tout commit.
- Vérif visuelle : skill `.claude/skills/verifier-site/`.

## Architecture front
- `src/App.tsx` : routage par hash (`src/utils/router.ts`), chargement différé des vues et des données (`import('./data')`).
- Listes comparateur / vœux persistées via `src/utils/usePersistentState.ts` (clés `ingefinder.*`).
- `src/components/TopBar.tsx` : nav desktop + barre d'onglets mobile (hors du header, sinon le backdrop-blur casse `position: fixed`).
- Données : `src/data/schoolsData.ts` (écoles), `prepasData.ts`, `establishmentEnrichment.ts` (fusion → `ALL_ESTABLISHMENTS`). Types : `src/types/index.ts`.

## Règles
- Ne jamais afficher « certifié / officiel / vérifié » sans source + année affichées.
- Pas de compteurs codés en dur : les dériver des données.
- Mobile 390 px : aucun débordement horizontal.

## Python (non branché au front)
`pipeline.py` → `fetcher.py`, `parsers/*`, `entity_resolution.py`, `database.py`/`schema.sql` (SQLite). `app.py` = Streamlit.
