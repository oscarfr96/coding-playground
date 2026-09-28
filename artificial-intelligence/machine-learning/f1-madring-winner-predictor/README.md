# Predictor experimental del ganador de Madring

Este proyecto estima el ganador del GP de España a partir de la parrilla oficial, la probabilidad de liderar al terminar la vuelta 1, el rendimiento reciente y tres escenarios de neutralización.

Los ficheros `historico.json`, `parrilla.json` y `fuentes/` son una instantánea previa a la carrera del 13 de septiembre de 2026. `resultado.json` contiene la ejecución que alimenta el guion. Las probabilidades no están calibradas específicamente para Madring.

## Uso

Desde la raíz de este repositorio:

```powershell
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe predecir.py
```

Para reconstruir el histórico desde las fuentes públicas y después recalcular:

```powershell
.\.venv\Scripts\python.exe descargar.py
.\.venv\Scripts\python.exe predecir.py
```

`descargar.py` requiere conexión a internet y puede tardar unos minutos. La descarga excluye la carrera de Madring para evitar fuga de información.
