from pathlib import Path
import fastf1

# ── Dónde está cada cosa ────────────────────────────────────────
# __file__ es este fichero, src/config.py
# .resolve()  -> lo convierte en una ruta absoluta y limpia
# .parent     -> sube a src/
# .parent     -> sube otra vez, a la raíz del proyecto
RAIZ = Path(__file__).resolve().parent.parent

CACHE = RAIZ / "cache"                     # descargas de FastF1
DATOS_CRUDOS = RAIZ / "data" / "raw"       # datos tal cual llegan
DATOS_LIMPIOS = RAIZ / "data" / "processed"  # datos ya trabajados


# ── La caché de FastF1 ──────────────────────────────────────────
def activar_cache():
    """Crea la carpeta de caché si hace falta y le dice a FastF1 que la use."""
    CACHE.mkdir(exist_ok=True)
    fastf1.Cache.enable_cache(CACHE)