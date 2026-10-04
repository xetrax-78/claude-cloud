"""
Package des parsers spécialisés par source de données éducatives.
"""
from .parcoursup_parser import ParcoursupParser
from .letudiant_parser import LEtudiantParser
from .figaro_parser import FigaroParser
from .usinenouvelle_parser import UsineNouvelleParser
from .opendata_parser import OpenDataParser

__all__ = [
    "ParcoursupParser",
    "LEtudiantParser",
    "FigaroParser",
    "UsineNouvelleParser",
    "OpenDataParser",
]
