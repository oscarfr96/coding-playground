"""Construye el dataset histórico: una fila por piloto y carrera.

Este programa es lento y depende de internet. Se ejecuta pocas veces y deja
un CSV. Entrenar el modelo lee ese CSV y es instantáneo. Son dos cosas
separadas a propósito.
"""

import pandas as pd

from config import DATOS_CRUDOS
from datos import calendario, resultados_carrera

# De la temporada más reciente a la más antigua: si el límite de la API nos
# corta, nos quedamos con los datos que más valen para predecir.
ANIOS = range(2026, 2017, -1)


def carreras_disputadas(anio):
    """El calendario de una temporada, de la última carrera a la primera.

    Descarta las rondas que aún no se han corrido: en la temporada en curso
    no tienen datos, y pedirlas gasta llamadas a la API para nada.
    """
    cal = calendario(anio).sort_values("RoundNumber", ascending=False)
    return cal[cal["EventDate"] < pd.Timestamp.now()]


def datos_de_una_carrera(anio, evento):
    """Los resultados de una carrera, con el contexto del evento pegado."""
    r = resultados_carrera(anio, evento["RoundNumber"])

    # FastF1 a veces devuelve la lista de pilotos pero sin resultados: la
    # llamada no falla y Position viene entera vacía. Lo convertimos en un
    # error de verdad para que el try/except lo vea y no se cuele en el CSV.
    if r["Position"].isna().all():
        raise ValueError("la sesión no trae resultados (Position vacía)")

    r["Anio"] = anio
    r["Ronda"] = evento["RoundNumber"]
    r["NombreGP"] = evento["EventName"]
    r["Circuito"] = evento["Location"]
    r["FechaGP"] = evento["EventDate"]
    return r


def ya_descargadas(destino):
    """Lo que ya hay en el CSV, descartando las carreras que salieron vacías."""
    if not destino.exists():
        return pd.DataFrame(), set()
    df = pd.read_csv(destino)
    df = df[df["Position"].notna()]              # fuera las filas sin resultado
    hechas = set(zip(df["Anio"], df["Ronda"]))   # pares (año, ronda) buenos
    return df, hechas


def construir(anios, destino):
    df_previo, hechas = ya_descargadas(destino)
    filas = [df_previo] if not df_previo.empty else []
    print(f"Ya tengo {len(hechas)} carreras buenas. Voy a por el resto.\n")

    for anio in anios:
        for _, evento in carreras_disputadas(anio).iterrows():
            ronda = int(evento["RoundNumber"])
            if (anio, ronda) in hechas:
                continue
            try:
                filas.append(datos_de_una_carrera(anio, evento))
                print(f"OK    {anio} R{ronda:>2}  {evento['EventName']}")
            except Exception as e:
                print(f"FALLO {anio} R{ronda:>2}  {evento['EventName']}: {e}")

    return pd.concat(filas, ignore_index=True)


if __name__ == "__main__":
    DATOS_CRUDOS.mkdir(parents=True, exist_ok=True)
    # Sin años en el nombre: el fichero crece con cada carrera nueva de 2026.
    destino = DATOS_CRUDOS / "carreras.csv"
    df = construir(ANIOS, destino)
    df.to_csv(destino, index=False)
    print(f"\n{len(df)} filas guardadas en {destino}")