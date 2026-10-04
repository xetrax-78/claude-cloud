# IngéFinder Francophonie

SPA React 19 + Vite 8 + Tailwind 4 (front), scripts Python stdlib (données), pipeline Python/SQLite. Textes en français.

## Commandes
- `npm run lint`, `npm test` (Vitest + unittest Python, dont `src/data/validate.ts` sur toutes les données), `npm run build` (vite + `scripts/prerender.ts`) avant tout commit.
- Tests navigateur : `scripts/e2e.cjs` (`npm run e2e` contre `vite preview`), aussi en CI. Mode d'emploi : skill `.claude/skills/verifier-site/`.
- Données : `npm run data:parcoursup` (open data MESR), `npm run data:pipeline` (SQLite → JSON), `npm run data:index`.

## Architecture front
- `src/App.tsx` : routage par chemin (`src/utils/router.ts`, History API + interception des clics sur `<a>`), vues et données chargées à la demande.
- Filtres du répertoire dans l'URL via `useSearchParamState` (q, region, statut, domaine, modele, filiere, internat, tri, vue).
- Cartes du répertoire : lien étiré (`after:absolute after:inset-0`) sur le titre ; boutons internes en `relative z-10`.
- Recherche globale : `SearchDialog` (`<dialog>` natif, Ctrl/Cmd+K ou « / »), `searchSchools()` testé.
- `ErrorBoundary` : recharge une fois si un chunk JS a disparu après une mise en ligne.
- `BASE_PATH` (vite `base` + prerender) pour un sous-dossier ; CI et GitHub Pages dans `.github/workflows/`.
- Routes : `/`, `/repertoire/?type=prepas`, `/ecole/<id>/`, `/comparateur/?ecoles=a,b&prepas=c` (lien partagé, relu puis nettoyé), `/analytique/`. Anciens `#/…` migrés.
- `scripts/prerender.ts` : une page HTML par route dans `dist/` (meta, OG, JSON-LD, résumé sans JS), sitemap si `SITE_URL`.
- Données : `src/data/index.ts` = base (`establishmentEnrichment.ts`) + `applyUpdates()` des JSON `src/data/updates/`.
- Persistance localStorage (`usePersistentState`, clés `ingefinder.*`) : comparateur, vœux, thème.
- Boussole : `SpecialtiesAndCompassView.tsx` (en-tête + navigation) + `boussole/` (hook `useBoussoleState`, une section par fichier, `constants.ts`).
- `src/utils/similarity.ts` (établissements proches, « Comparer avec… »), `src/utils/csv.ts` (export comparateur), `CountryAdmissionInfo` (BE/CH/QC, faits généraux sans chiffres).
- Comparateur mobile : classes `compare-scroll` / `compare-table` dans `index.css` (1re colonne figée, défilement aimanté).
- PWA : `public/manifest.webmanifest` (chemins relatifs), `public/sw.js` (pages réseau d'abord, assets cache d'abord), enregistré dans `main.tsx` en prod. Audience : Plausible si `VITE_PLAUSIBLE_DOMAIN`.
- `src/utils/wishlist.ts` : classement des vœux (`classifyWish` → null si ni taux ni rang), analyse, impression PDF. `src/components/CampusMap.tsx` : Leaflet (lazy).
- `src/components/SourceTag.tsx` : « Source : … année » + liens ; `NON_COMMUNIQUE` pour les données absentes.
- Thème sombre : `src/theme-dark.css` inverse la palette Tailwind sous `:root.dark` (aucune classe `dark:` dans les composants). Bootstrap anti-flash dans `index.html`, toggle dans `TopBar` (`src/utils/theme.ts`).
- `TopBar` : nav mobile en bas, hors du header (le backdrop-blur casse `position: fixed`).

## Règles
- Jamais de valeur par défaut inventée (`|| 45`, `* 1.12`…) : afficher `NON_COMMUNIQUE`. Dans le matching, un critère inconnu est exclu de la moyenne pondérée et signalé.
- Jamais « certifié / officiel » sans source + année affichées.
- Pas de compteurs codés en dur.
- Mobile 390 px : aucun débordement horizontal.
- Ne pas appliquer Plus Jakarta Sans : ses espaces trop étroits collent les mots.
- Contraste : slate-400/500 redéfinis dans `src/index.css` (clair) et `theme-dark.css` (sombre) ; texte ≥ 12 px sur mobile.
- Lighthouse (scratchpad) : `CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome npx lighthouse@12 <url> --chrome-flags="--headless=new --no-sandbox"`. Dernier relevé : perf 95–99, a11y/BP/SEO 100.

## Python
- `scripts/update_parcoursup.py` (+ `scripts/tests/`), `scripts/export_pipeline.py` : stdlib uniquement, lisent `data/etablissements_index.json`.
- `pipeline.py` → `fetcher.py`, `parsers/*`, `entity_resolution.py`, `database.py`/`schema.sql`. `app.py` = Streamlit.
