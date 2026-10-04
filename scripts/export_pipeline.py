#!/usr/bin/env python3
"""
Exporte la base SQLite du pipeline (pipeline.py → ingenieurs_francophonie.db) vers le front.

  python3 pipeline.py                 # remplit la base
  npm run data:pipeline               # → src/data/updates/pipeline.json

Seuls les établissements connus du site (data/etablissements_index.json) sont exportés.
Le front ne garde une valeur du pipeline que si elle est au moins aussi récente que la sienne.
"""

from __future__ import annotations

import argparse
import json
import sqlite3
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent.parent
INDEX_FILE = ROOT / "data" / "etablissements_index.json"
OUTPUT_FILE = ROOT / "src" / "data" / "updates" / "pipeline.json"
DEFAULT_DB = ROOT / "ingenieurs_francophonie.db"


def parse_json(value: Any) -> Any:
    if not isinstance(value, str):
        return value
    try:
        return json.loads(value)
    except json.JSONDecodeError:
        return value


def clean(row: sqlite3.Row, drop: tuple[str, ...] = ("ecole_id", "created_at", "updated_at")) -> dict[str, Any]:
    return {k: parse_json(row[k]) for k in row.keys() if k not in drop and row[k] is not None}


def export(db_path: Path) -> dict[str, Any]:
    known = {e["id"] for e in json.loads(INDEX_FILE.read_text(encoding="utf-8"))}
    con = sqlite3.connect(db_path)
    con.row_factory = sqlite3.Row
    ecoles: dict[str, dict[str, Any]] = {}
    unknown: set[str] = set()

    def bucket(ecole_id: str) -> dict[str, Any] | None:
        if ecole_id not in known:
            unknown.add(ecole_id)
            return None
        return ecoles.setdefault(ecole_id, {})

    for row in con.execute("SELECT * FROM classements ORDER BY annee"):
        if (b := bucket(row["ecole_id"])) is not None:
            b.setdefault("classements", []).append(clean(row))

    # Dernière promotion connue par école
    for row in con.execute("SELECT * FROM insertion_professionnelle ORDER BY annee_promo"):
        if (b := bucket(row["ecole_id"])) is not None:
            b["insertion"] = clean(row)

    for row in con.execute("SELECT * FROM campus"):
        if (b := bucket(row["ecole_id"])) is not None:
            campus = clean(row)
            campus["est_siege_principal"] = bool(campus.get("est_siege_principal"))
            if "code_postal" in campus:
                campus["code_postal"] = str(campus["code_postal"])
            b.setdefault("campus", []).append(campus)

    con.close()
    if unknown:
        print(f"Ignorés (absents du site) : {', '.join(sorted(unknown))}", file=sys.stderr)
    return {"generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"), "ecoles": dict(sorted(ecoles.items()))}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--db", type=Path, default=DEFAULT_DB)
    args = parser.parse_args()
    if not args.db.exists():
        sys.exit(f"{args.db} introuvable : lancez d'abord `python3 pipeline.py`.")
    if not INDEX_FILE.exists():
        sys.exit("data/etablissements_index.json manquant : lancez d'abord `npm run data:index`.")
    payload = export(args.db)
    OUTPUT_FILE.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{len(payload['ecoles'])} établissements exportés → {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
