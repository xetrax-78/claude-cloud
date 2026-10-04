"""python3 -m unittest discover -s scripts/tests"""

import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
import update_parcoursup as up  # noqa: E402

ROWS = [
    # INSA Lyon : deux formations, la plus demandée doit être retenue
    {"session": 2026, "cod_aff_form": "101", "g_ea_lib_vx": "INSA Lyon", "ville_etab": "Villeurbanne", "fili": "Ecole d'Ingénieur",
     "lib_for_voe_ins": "Formation d'ingénieur Bac + 5 - bac général", "capa_fin": 800, "voe_tot": 20000, "taux_acces_ens": 22,
     "pct_tb": 70, "pct_bours": 15, "ran_grp1": 5000, "lien_form_psup": "https://dossier.parcoursup.fr/x?g_ta_cod=101"},
    {"session": 2026, "cod_aff_form": "102", "g_ea_lib_vx": "INSA Lyon", "ville_etab": "Villeurbanne", "fili": "Ecole d'Ingénieur",
     "lib_for_voe_ins": "Filière bilingue", "capa_fin": 40, "voe_tot": 3000, "taux_acces_ens": 8},
    # Lycée JB Say : MPSI + PCSI agrégées, la classe littéraire ignorée
    {"session": 2026, "cod_aff_form": "201", "g_ea_lib_vx": "Lycée Jean-Baptiste Say", "ville_etab": "Paris 16e  Arrondissement", "fili": "CPGE",
     "fil_lib_voe_acc": "MPSI", "capa_fin": 48, "voe_tot": 4000, "taux_acces_ens": 20, "pct_tb": 80, "pct_bours": 10},
    {"session": 2026, "cod_aff_form": "202", "g_ea_lib_vx": "Lycée Jean-Baptiste Say", "ville_etab": "Paris 16e  Arrondissement", "fili": "CPGE",
     "fil_lib_voe_acc": "PCSI", "capa_fin": 48, "voe_tot": 3000, "taux_acces_ens": 30, "pct_tb": 60, "pct_bours": 20},
    {"session": 2026, "cod_aff_form": "203", "g_ea_lib_vx": "Lycée Jean-Baptiste Say", "ville_etab": "Paris 16e  Arrondissement", "fili": "CPGE",
     "fil_lib_voe_acc": "Lettres", "capa_fin": 30, "voe_tot": 900, "taux_acces_ens": 40},
    # Bruit : autre filière et ancienne session
    {"session": 2026, "cod_aff_form": "301", "g_ea_lib_vx": "IUT Lyon 1", "ville_etab": "Villeurbanne", "fili": "BUT", "capa_fin": 50, "voe_tot": 900},
    {"session": 2025, "cod_aff_form": "100", "g_ea_lib_vx": "INSA Lyon", "ville_etab": "Villeurbanne", "fili": "Ecole d'Ingénieur", "capa_fin": 1, "voe_tot": 99999},
]


class UpdateParcoursupTest(unittest.TestCase):
    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp())
        self._orig = (up.OUTPUT_FILE, up.REPORT_FILE, up.OVERRIDES_FILE)
        up.OUTPUT_FILE = self.tmp / "parcoursup.json"
        up.REPORT_FILE = self.tmp / "rapport.md"
        up.OVERRIDES_FILE = self.tmp / "overrides.json"

    def tearDown(self):
        up.OUTPUT_FILE, up.REPORT_FILE, up.OVERRIDES_FILE = self._orig

    def test_latest_session_and_main_formation(self):
        entries = up.run(ROWS, "fr-esr-parcoursup")["entries"]
        insa = entries["insa-lyon-fra"]
        self.assertEqual(insa["session"], 2026)
        self.assertEqual(insa["code_formation"], "101")
        self.assertEqual(insa["capacite"], 800)
        self.assertEqual(insa["taux_acces"], 22)
        self.assertTrue(insa["url"].endswith("101"))

    def test_prepa_aggregates_scientific_classes_only(self):
        say = up.run(ROWS, "fr-esr-parcoursup")["entries"]["jean-baptiste-say-paris-fra"]
        self.assertEqual(say["capacite"], 96)
        self.assertEqual(say["nb_voeux"], 7000)
        self.assertEqual(say["taux_acces"], 25.0)
        self.assertIn("MPSI", say["nom_filiere_concours"])
        self.assertNotIn("Lettres", say["nom_filiere_concours"])

    def test_overrides_force_and_skip(self):
        up.OVERRIDES_FILE.write_text(json.dumps({"insa-lyon-fra": "102", "jean-baptiste-say-paris-fra": None}))
        entries = up.run(ROWS, "fr-esr-parcoursup")["entries"]
        self.assertEqual(entries["insa-lyon-fra"]["code_formation"], "102")
        self.assertNotIn("jean-baptiste-say-paris-fra", entries)

    def test_report_written(self):
        up.run(ROWS, "fr-esr-parcoursup")
        report = up.REPORT_FILE.read_text(encoding="utf-8")
        self.assertIn("session 2026", report)
        self.assertIn("Non trouvés", report)


if __name__ == "__main__":
    unittest.main()
