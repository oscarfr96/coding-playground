# 🏎️ F1 ML from Scratch

Construyendo, desde cero y en público, un modelo de Machine Learning que predice el ganador de un Gran Premio de Fórmula 1.

Cada lección de este repositorio es un vídeo de la serie. Todo el código es el que escribo yo, en directo, aprendiendo.

- 📚 **[Curso completo →](CURSO-ML-F1.md)** — 21 lecciones, de cargar el primer dato a un modelo desplegado.
- 🗓️ **[Plan de contenido →](PLAN-CONTENIDO.md)** — calendario semanal de publicaciones (Sep–Dic 2026).
- 📊 **[Marcador de predicciones →](predicciones/)** — cada predicción publicada, con su resultado real. Sin borrar los fallos.

## Estructura

```
f1-ml-series/
├── CURSO-ML-F1.md        # El curso, lección a lección
├── PLAN-CONTENIDO.md     # Calendario editorial
├── requirements.txt
├── cache/                # Caché de FastF1 (no se sube)
├── data/
│   ├── raw/              # Datos crudos descargados (no se suben)
│   └── processed/        # Datasets limpios (sí se suben, son pequeños)
├── src/                  # El código de cada lección
├── notebooks/            # Exploración
├── modelos/              # Modelos entrenados (.joblib)
├── predicciones/         # Predicción vs realidad, GP a GP
└── assets/
    ├── plantillas/       # Generador de carruseles + sistema visual de marca
    └── carruseles/       # Un JSON por carrusel; los PNG salen en _salida/
```

## Puesta en marcha

```bash
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
playwright install chromium   # solo para generar los carruseles
```

## Generar un carrusel de Instagram

```bash
python assets/plantillas/generar_carrusel.py assets/carruseles/s01_que_es_ml.json --png
```

Salen los PNG a 1080×1350 en `assets/carruseles/_salida/`, con la identidad visual
tomada del portfolio (paleta "Flower Boy", Fredoka + Geist + JetBrains Mono).

## Aviso honesto

Esto **no** es un sistema de apuestas ni una predicción fiable. Es un proyecto de aprendizaje. La F1 tiene ~24 carreras al año y 20 pilotos: hay muy pocos datos y muchísimo azar. Además, **2026 estrena reglamento**, así que un modelo entrenado con 2018–2025 va a fallar más de lo normal. Eso también forma parte del aprendizaje, y lo explicamos en la Lección 13.
