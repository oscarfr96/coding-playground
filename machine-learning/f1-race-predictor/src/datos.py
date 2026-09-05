"""Acceso a los datos de la Fórmula 1.

Es la única parte del proyecto que habla con FastF1. El resto pide 
carreras y recibe tablas, sin saber de dónde salen.
"""

import fastf1
import pandas as pd

from config import activar_cache

# Lo que necesitamos de cada piloto en cada carrera.
COLUMNAS = ["Abbreviation", "TeamName", "GridPosition", "Position", "Status"]

# Las dos fuentes escriben distinto el nombre de dos equipos. Traducimos al
# vocabulario de FastF1, que es el que usa la mayor parte del dataset.
EQUIPOS_ERGAST = {
    "Red Bull": "Red Bull Racing",
    "Alpine F1 Team": "Alpine",
}


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
    r = sesion.results[COLUMNAS].copy()

    # Para algunas carreras de 2022-2023, FastF1 no tiene los resultados en su
    # propia API y se los pide a Ergast, que ya no responde: la tabla llega con
    # los pilotos pero sin posiciones. En esos casos vamos al sucesor de Ergast.
    if r["Position"].isna().all():
        r = _resultados_desde_ergast(anio, int(sesion.event["RoundNumber"]))
    return r


def _resultados_desde_ergast(anio, ronda):
    """Plan B: los resultados desde el servicio compatible con Ergast.

    Trae menos detalle en `Status` (solo Finished, Lapped y Retired), pero es
    la única forma de completar las carreras que la API de FastF1 no cubre.
    """
    from fastf1.ergast import Ergast

    r = Ergast().get_race_results(season=anio, round=ronda).content[0]
    return pd.DataFrame({
        "Abbreviation": r["driverCode"].values,
        "TeamName": r["constructorName"].replace(EQUIPOS_ERGAST).values,
        "GridPosition": r["grid"].astype(float).values,
        "Position": r["position"].astype(float).values,
        "Status": r["status"].values,
    })


if __name__ == "__main__":
    # La última carrera disputada. Al ejecutar el módulo directamente
    # sirve de comprobación rápida de que los datos siguen llegando.
    print(resultados_carrera(2026, "Zandvoort"))