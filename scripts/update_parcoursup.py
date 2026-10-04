#!/usr/bin/env python3
"""
Met à jour les statistiques Parcoursup du site depuis l'open data officiel du MESR.

  npm run data:parcoursup                       # dernière session publiée
  python3 scripts/update_parcoursup.py --dataset fr-esr-parcoursup_2024
  python3 scripts/update_parcoursup.py --input export.json   # fichier déjà téléchargé

Sorties :
  src/data/updates/parcoursup.json   lu par le front (fusionné au jeu de base)
  data/rapport_parcoursup.md         correspondances trouvées / douteuses / manquantes

Corrections manuelles : data/parcoursup_overrides.json
  { "<id établissement>": "<cod_aff_form>" }  pour forcer une formation
  { "<id établissement>": null }               pour ignorer l'établissement

Uniquement la bibliothèque standard (pas de pip install).
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import unicodedata
import urllib.parse
import urllib.request
from dataclasses import dataclass
from datetime import datetime, timezone
from difflib import SequenceMatcher
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent.parent
INDEX_FILE = ROOT / "data" / "etablissements_index.json"
OVERRIDES_FILE = ROOT / "data" / "parcoursup_overrides.json"
OUTPUT_FILE = ROOT / "src" / "data" / "updates" / "parcoursup.json"
REPORT_FILE = ROOT / "data" / "rapport_parcoursup.md"

API = "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets"
FIELDS = [
    "session", "cod_aff_form", "g_ea_lib_vx", "ville_etab", "fili", "form_lib_voe_acc",
    "fil_lib_voe_acc", "lib_for_voe_ins", "capa_fin", "voe_tot", "taux_acces_ens",
    "pct_tb", "pct_bours", "ran_grp1", "lien_form_psup",
]
SCIENTIFIC_CPGE = ("MPSI", "PCSI", "PTSI", "MP2I", "MPI", "BCPST", "TSI", "TPC")
STOPWORDS = {
    "de", "du", "des", "la", "le", "les", "l", "d", "et", "en", "a", "au", "aux",
    "lycee", "general", "technologique", "polyvalent", "prive", "public", "ecole",
    "institut", "national", "nationale", "superieur", "superieure", "ingenieur", "ingenieurs",
}
MIN_SCORE = 0.62  # en dessous : non retenu, listé dans le rapport


def norm(text: str | None) -> str:
    text = unicodedata.normalize("NFKD", text or "").encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", " ", text).strip()


def tokens(text: str | None) -> set[str]:
    return {t for t in norm(text).split() if t not in STOPWORDS and len(t) > 1}


def to_float(value: Any) -> float | None:
    try:
        return None if value in (None, "") else float(value)
    except (TypeError, ValueError):
        return None


# ---------------------------------------------------------------------------
# Téléchargement
# ---------------------------------------------------------------------------
def fetch_dataset(dataset: str) -> list[dict[str, Any]]:
    params = urllib.parse.urlencode({"select": ",".join(FIELDS)})
    url = f"{API}/{dataset}/exports/json?{params}"
    print(f"Téléchargement : {url}")
    req = urllib.request.Request(url, headers={"User-Agent": "IngeFinder/1.0 (mise a jour open data)"})
    with urllib.request.urlopen(req, timeout=180) as resp:
        return json.load(resp)


def keep_row(row: dict[str, Any]) -> bool:
    fili = norm(row.get("fili"))
    return "ing" in fili or fili == "cpge"


# ---------------------------------------------------------------------------
# Correspondance établissement du site ↔ formations Parcoursup
# ---------------------------------------------------------------------------
@dataclass
class Match:
    etab: dict[str, Any]
    rows: list[dict[str, Any]]
    score: float


def name_score(etab: dict[str, Any], row: dict[str, Any]) -> float:
    lib = row.get("g_ea_lib_vx") or ""
    a, b = tokens(etab["nom_officiel"]), tokens(lib)
    overlap = len(a & b) / max(1, min(len(a), len(b))) if a and b else 0.0
    ratio = SequenceMatcher(None, " ".join(sorted(a)), " ".join(sorted(b))).ratio()
    score = max(overlap, ratio)
    sigle = norm(etab.get("sigle"))
    if sigle and len(sigle) > 1 and re.search(rf"\b{re.escape(sigle)}\b", norm(lib)):
        score = max(score, 0.9)
    return score


def city_ok(etab: dict[str, Any], row: dict[str, Any]) -> bool:
    ville = norm(row.get("ville_etab"))
    return any(norm(v) and (norm(v) in ville or ville in norm(v)) for v in etab["villes"])


def is_candidate(etab: dict[str, Any]) -> bool:
    return etab["pays"] == "France" and (
        etab["type"] == "prepa" or etab.get("parcoursup_filiere") or etab.get("recrutement") == "post_bac"
    )


def find_matches(index: list[dict[str, Any]], rows: list[dict[str, Any]], overrides: dict[str, str | None]):
    by_code = {str(r.get("cod_aff_form")): r for r in rows}
    matches: list[Match] = []
    unmatched: list[tuple[dict[str, Any], float, str]] = []

    for etab in filter(is_candidate, index):
        if etab["id"] in overrides:
            code = overrides[etab["id"]]
            if code is None:
                continue
            if str(code) in by_code:
                matches.append(Match(etab, [by_code[str(code)]], 1.0))
            else:
                unmatched.append((etab, 0.0, f"code forcé {code} absent du jeu de données"))
            continue

        want_cpge = etab["type"] == "prepa"
        pool = [r for r in rows if (norm(r.get("fili")) == "cpge") == want_cpge and city_ok(etab, r)]
        if want_cpge:
            pool = [r for r in pool if any(f in (r.get("fil_lib_voe_acc") or "").upper() for f in SCIENTIFIC_CPGE)]
        scored = sorted(((name_score(etab, r), r) for r in pool), key=lambda x: x[0], reverse=True)
        if not scored or scored[0][0] < MIN_SCORE:
            best = scored[0] if scored else (0.0, {})
            unmatched.append((etab, best[0], best[1].get("g_ea_lib_vx", "aucune formation dans la même ville")))
            continue
        top_score, top = scored[0]
        same_etab = [r for s, r in scored if r.get("g_ea_lib_vx") == top.get("g_ea_lib_vx")]
        matches.append(Match(etab, same_etab, top_score))

    return matches, unmatched


# ---------------------------------------------------------------------------
# Agrégation au format du front
# ---------------------------------------------------------------------------
def weighted(rows: list[dict[str, Any]], field: str, weight: str = "capa_fin") -> float | None:
    pairs = [(to_float(r.get(field)), to_float(r.get(weight)) or 0) for r in rows]
    pairs = [(v, w) for v, w in pairs if v is not None and w > 0]
    total = sum(w for _, w in pairs)
    return round(sum(v * w for v, w in pairs) / total, 1) if total else None


def build_entry(match: Match) -> dict[str, Any]:
    rows = match.rows
    etab = match.etab
    if etab["type"] == "prepa":
        # Toutes les filières scientifiques du lycée : capacités et vœux additionnés, taux pondérés
        filieres = sorted({(r.get("fil_lib_voe_acc") or "").strip() for r in rows})
        label = f"CPGE {' / '.join(f for f in filieres if f)}"
        main = max(rows, key=lambda r: to_float(r.get("capa_fin")) or 0)
    else:
        # Formation principale : celle qui reçoit le plus de candidatures
        main = max(rows, key=lambda r: to_float(r.get("voe_tot")) or 0)
        rows = [main]
        label = main.get("lib_for_voe_ins") or main.get("form_lib_voe_acc") or "Formation Parcoursup"

    capacite = int(sum(to_float(r.get("capa_fin")) or 0 for r in rows))
    entry = {
        "session": int(main.get("session")),
        "nom_filiere_concours": label,
        "capacite": capacite,
        "nb_voeux": int(sum(to_float(r.get("voe_tot")) or 0 for r in rows)),
        "taux_acces": weighted(rows, "taux_acces_ens"),
        "rang_dernier_appele": int(to_float(main.get("ran_grp1"))) if to_float(main.get("ran_grp1")) else None,
        "pct_mention_tb": weighted(rows, "pct_tb"),
        "pct_boursiers": weighted(rows, "pct_bours"),
        "code_formation": str(main.get("cod_aff_form") or ""),
        "url": main.get("lien_form_psup") or None,
    }
    return {k: v for k, v in entry.items() if v not in (None, "")}


def write_report(matches: list[Match], unmatched, session: int | str, dataset: str) -> None:
    lines = [
        f"# Rapport de mise à jour Parcoursup — session {session}",
        "",
        f"Jeu de données : `{dataset}` · généré le {datetime.now(timezone.utc):%Y-%m-%d %H:%M} UTC",
        "",
        f"## Retenus ({len(matches)})",
        "",
        "Vérifiez surtout les scores < 0,8. Corrigez via `data/parcoursup_overrides.json`.",
        "",
        "| Score | Établissement du site | Formation(s) Parcoursup | Ville |",
        "|---|---|---|---|",
    ]
    for m in sorted(matches, key=lambda m: m.score):
        lines.append(f"| {m.score:.2f} | {m.etab['nom_officiel']} (`{m.etab['id']}`) | {m.rows[0].get('g_ea_lib_vx')} ({len(m.rows)}) | {m.rows[0].get('ville_etab')} |")
    lines += ["", f"## Non trouvés ({len(unmatched)})", "", "| Meilleur score | Établissement du site | Meilleur candidat |", "|---|---|---|"]
    for etab, score, candidate in sorted(unmatched, key=lambda u: -u[1]):
        lines.append(f"| {score:.2f} | {etab['nom_officiel']} (`{etab['id']}`) | {candidate} |")
    REPORT_FILE.parent.mkdir(parents=True, exist_ok=True)
    REPORT_FILE.write_text("\n".join(lines) + "\n", encoding="utf-8")


def run(rows: list[dict[str, Any]], dataset: str, dry_run: bool = False) -> dict[str, Any]:
    index = json.loads(INDEX_FILE.read_text(encoding="utf-8"))
    overrides = json.loads(OVERRIDES_FILE.read_text(encoding="utf-8")) if OVERRIDES_FILE.exists() else {}
    rows = [r for r in rows if keep_row(r)]
    sessions = sorted({int(r["session"]) for r in rows if r.get("session")})
    if not sessions:
        sys.exit("Aucune formation d'ingénieur ou CPGE dans le jeu de données.")
    latest = sessions[-1]
    rows = [r for r in rows if int(r.get("session") or 0) == latest]

    matches, unmatched = find_matches(index, rows, overrides)
    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "dataset": dataset,
        "entries": {m.etab["id"]: build_entry(m) for m in sorted(matches, key=lambda m: m.etab["id"])},
    }
    write_report(matches, unmatched, latest, dataset)
    if not dry_run:
        OUTPUT_FILE.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Session {latest} : {len(matches)} établissements mis à jour, {len(unmatched)} non trouvés → {REPORT_FILE}")
    return payload


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--dataset", default="fr-esr-parcoursup", help="identifiant du jeu de données MESR (défaut : dernière session)")
    parser.add_argument("--input", type=Path, help="fichier JSON déjà téléchargé (export du jeu de données)")
    parser.add_argument("--dry-run", action="store_true", help="écrit seulement le rapport")
    args = parser.parse_args()

    if not INDEX_FILE.exists():
        sys.exit("data/etablissements_index.json manquant : lancez d'abord `npm run data:index`.")
    rows = json.loads(args.input.read_text(encoding="utf-8")) if args.input else fetch_dataset(args.dataset)
    run(rows, args.dataset, args.dry_run)


if __name__ == "__main__":
    main()
