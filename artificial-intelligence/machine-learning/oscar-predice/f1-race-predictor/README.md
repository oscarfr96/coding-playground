# F1 Race Predictor · preparación de datos

Proyecto de aprendizaje para construir un predictor de victorias en Fórmula 1.
**La implementación actual descarga resultados; todavía no entrena un modelo ni
genera probabilidades de victoria.**

## Código disponible

- `src/config.py`: rutas del proyecto y caché de FastF1.
- `src/datos.py`: calendario, resultados y recuperación alternativa cuando faltan posiciones.
- `src/descargar.py`: descarga incremental de 2018–2026, de las temporadas recientes a las antiguas.

Cada fila representa un piloto en una carrera. Se guardan piloto, equipo, parrilla,
posición final, estado y metadatos del evento. El descargador reutiliza las carreras
ya guardadas y vuelve a intentar las que no tienen ninguna posición válida.

## Ejecutar

Desde esta carpeta, `artificial-intelligence/machine-learning/oscar-predice/f1-race-predictor`:

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe src/descargar.py
```

La descarga requiere red y puede tardar. Escribe `data/raw/carreras.csv` y la caché
local; ambos quedan fuera de Git. Al terminar compara el número de carreras con el
número de ganadores como comprobación de integridad. Revisa los mensajes `FALLO` antes
de usar el CSV.

## Próximos pasos

Preparar variables disponibles antes de cada carrera, separar entrenamiento y evaluación
por fecha, comparar contra la pole como referencia y estudiar la calibración. Las
carpetas `data/processed/`, `modelos/` y `notebooks/` son espacios preparados para esas
fases, no evidencias de un modelo ya entrenado.

Fuente de datos: [FastF1](https://docs.fastf1.dev/). Proyecto educativo sin afiliación
con Fórmula 1 ni sus equipos.

[Volver a Óscar predice](../README.md)
