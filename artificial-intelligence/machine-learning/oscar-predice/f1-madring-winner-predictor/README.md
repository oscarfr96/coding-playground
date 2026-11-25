# Predictor experimental de Madring

Modelo de dos etapas sobre una instantánea local de datos: estima quién lidera al
terminar la primera vuelta y después combina probabilidades de victoria bajo tres
escenarios (`limpia`, `sc_vsc` y `roja`).

Las probabilidades dependen de supuestos de transferencia entre circuitos; no están
calibradas específicamente para Madring. Las fechas y fuentes de la instantánea están
documentadas en `2026-madring-base.md`, `parrilla.json` y los archivos de entrada.

## Ejecutar sin descargar datos

Desde esta carpeta, `artificial-intelligence/machine-learning/oscar-predice/f1-madring-winner-predictor`:

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe predecir.py
```

`predecir.py` usa `historico.json` y `parrilla.json`, realiza validación temporal y
**reescribe** `resultado.json` y `validacion.json`. La ejecución no necesita conexión.
Las métricas impresas comparan aciertos y log loss con referencias simples.

## Reconstruir el histórico

```powershell
.\.venv\Scripts\python.exe descargar.py
.\.venv\Scripts\python.exe predecir.py
```

La descarga sí requiere red y puede tardar. `fuentes/` conserva respuestas públicas
para reproducir la construcción del histórico. El código aplica su fecha de corte
antes de la carrera objetivo para evitar incorporar ese resultado al ajuste.

`extra-madring-salida.html` y `2026-madring-base.md` son material complementario;
la implementación del cálculo está en `predecir.py`.

[Volver a Óscar predice](../README.md)
