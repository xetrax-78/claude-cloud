---
name: verifier-site
description: Vérifie IngéFinder avant commit — typecheck, build, puis contrôle navigateur (routes hash, lien direct vers une fiche, bouton Retour, persistance du comparateur, débordement mobile 390 px, erreurs console). À lancer après toute modification du front.
---

# Vérifier le site

1. `npm install` (sans `--legacy-peer-deps` : doit passer proprement)
2. `npm run lint && npm run build`
3. `npx vite preview --port 4174 &` (ne pas tuer avec `pkill -f "vite preview"` depuis la même commande shell : le motif matche le shell lui-même)
4. Depuis un dossier temporaire : `node <repo>/.claude/skills/verifier-site/check.cjs` (Playwright global, Chromium dans `/opt/pw-browsers`)

## Attendu
- `hero loaded true`
- `detail hash #/ecole/<id>`, `after back #/repertoire`, `deeplink h1` = nom de l'école, page 404 « Établissement introuvable »
- `compare after reload` conserve le compteur
- `mobile … [390, …]` sur toutes les routes (les éléments listés à l'intérieur d'un conteneur `overflow-x-auto` sont normaux)
- `ERRS []` (les erreurs Google Fonts / certificat dues au proxy sont filtrées)

Captures dans `shots2/` : les regarder (Read) pour la nav mobile en bas d'écran et le hero.
