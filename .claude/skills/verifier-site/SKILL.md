---
name: verifier-site
description: Vérifie IngéFinder avant commit — typecheck, tests (Vitest + Python, dont validation des données), build + pré-rendu, puis tests navigateur stricts (scripts/e2e.cjs : modules Boussole, routes, filtres URL, recherche Ctrl+K, comparer avec, CSV, lien partagé, carte, PWA, thème, mobile/tablette, erreurs console). À lancer après toute modification du front.
---

# Vérifier le site

1. `npm install` (doit passer sans `--legacy-peer-deps`)
2. `npm run lint && npm test && npm run build`
3. `npx vite preview --port 4175 &` (ne pas lancer `pkill -f "vite preview"` dans la même commande : le motif tue le shell lui-même ; changer de port si besoin)
4. Depuis le scratchpad : `BASE=http://localhost:4175/ node <repo>/scripts/e2e.cjs`

Le script sort en erreur au moindre écart (✗) et finit par « Tout est vert. ». Il tourne aussi dans la CI (`.github/workflows/ci.yml`, captures en artefact en cas d'échec). Ici, Chromium est pris dans `/opt/pw-browsers` ; ailleurs, `npx playwright install chromium`.

Captures dans `shots/` : les regarder (Read), surtout mobile (nav en bas, comparateur glissant), mode sombre et fiche école.
