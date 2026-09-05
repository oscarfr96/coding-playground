"""Acceso a los datos de la Fórmula 1.

Es la única parte del proyecto que habla con FastF1. El resto pide 
carreras y recibe tablas, sin saber de dónde salen.
"""

import fastf1

from config import activar_cache

# Lo que necesitamos de cada piloto en cada carrera.
COLUMNAS = ["Abbreviation", "TeamName", "GridPosition", "Position", "Status"]


def calendario(anio):
    """Calendario de una temporada, sin los tests de pretemporada."""
    activar_cache()
    eventos = fastf1.get_event_schedule(anio)
    return eventos[eventos["RoundNumber"] > 0]


def resultados_carrera(anio, ronda):
    """Resultados de una carrera: quién salió dónde y quién acabó dónde.

    `ronda` admite el número (16) o el nombre del circuito ("Monza").
    """
    activar_cache()
    sesion = fastf1.get_session(anio, ronda, "R")
    sesion.load(laps=False, telemetry=False, weather=False, messages=False)
    # Con .copy() evitamos que el DataFrame devuelto esté vinculado a la sesión de FastF1.
    return sesion.results[COLUMNAS].copy()


if __name__ == "__main__":
    # La última carrera disputada. Al ejecutar el módulo directamente
    # sirve de comprobación rápida de que los datos siguen llegando.
    print(resultados_carrera(2026, "Zandvoort"))