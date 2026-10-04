---
name: verifier-site
description: Vérifie IngéFinder avant commit — typecheck, tests, build + pré-rendu, puis contrôle navigateur (routes, retour, lien direct, ancien lien #/, lien de comparaison partagé, carte, mode sombre, pré-rendu sans JS, débordement mobile 390 px, erreurs console). À lancer après toute modification du front.
---

# Vérifier le site

1. `npm install` (doit passer sans `--legacy-peer-deps`)
2. `npm run lint && npm test && npm run build`
3. `npx vite preview --port 4175 &` (ne pas lancer `pkill -f "vite preview"` dans la même commande : le motif tue le shell lui-même)
4. Depuis le scratchpad : `BASE=http://localhost:4175/ node <repo>/.claude/skills/verifier-site/check.cjs` (Playwright global, Chromium dans `/opt/pw-browsers`)

## Attendu
- `hero loaded true`, `detail /ecole/<id>/ sources ≥ 1`, `after back /repertoire/`, `prepa back /repertoire/?type=prepas`
- `filter url ?q=lyon` puis `filter restored lyon`, `keyboard card /ecole/…`, `search → /ecole/utc-compiegne-fra/ | dialog closed true`
- `tablet 768 768`
- `map markers` > 0 (les tuiles OSM peuvent rester grises si le réseau les bloque)
- `shared opens /comparateur/` avec le badge du comparateur rempli
- `legacy hash → /ecole/…`, `prerender h1` = nom de l'école, `jsonld 1`
- `dark class true` puis `dark persists true`
- `mobile … 390` sur toutes les routes
- `ERRS []`

Captures dans `shots/` : les regarder (Read), surtout la nav mobile, le mode sombre et la fiche école.
