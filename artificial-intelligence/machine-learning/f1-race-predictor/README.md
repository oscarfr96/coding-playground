# 🏎️ F1 Race Predictor

Un modelo de Machine Learning que estima la probabilidad de que cada piloto gane un Gran Premio de Fórmula 1, construido desde cero con [FastF1](https://docs.fastf1.dev/) y scikit-learn.

Es un proyecto de aprendizaje que voy publicando poco a poco: cada commit es un paso más del modelo.

## El problema

Predecir el ganador de una carrera es un problema de **clasificación binaria muy desbalanceado**:

- **Una fila = un piloto en una carrera.** Con datos desde 2018 son unas 3.800 filas.
- **El target es `¿ganó?`.** Solo el 5% de las filas son victorias: 1 de cada 20 pilotos.
- **Solo se usa información previa a la carrera:** parrilla, tiempos de clasificación, forma reciente, fuerza del equipo, historial en el circuito, clima. Nada de lo que pasa el domingo.
- **La partición respeta el tiempo:** se entrena con temporadas antiguas y se evalúa con las recientes. Nunca al azar.

Para cada carrera, las probabilidades de los 20 pilotos se normalizan para que sumen 1, y el favorito es el de mayor probabilidad.

## La métrica

El *accuracy* aquí no sirve de nada: un modelo que diga "no gana nadie" acierta el 95%. La métrica de referencia es otra:

> **De las N carreras evaluadas, ¿en cuántas el piloto con mayor probabilidad fue el ganador real?**

Y siempre se compara contra un baseline honesto: **"gana el que sale desde la pole"**, que ya acierta alrededor del 40% de las carreras. Un modelo que no bata eso, sobra.

## Estructura

```
f1-race-predictor/
├── requirements.txt
├── src/                  # Descarga, limpieza, features, entrenamiento e inferencia
├── data/
│   ├── raw/              # Datos crudos de FastF1 (no se suben)
│   └── processed/        # Datasets limpios
├── modelos/              # Modelos entrenados (.joblib) con sus metadatos
├── notebooks/            # Exploración
└── cache/                # Caché de FastF1 (no se sube)
```

## Puesta en marcha

```bash
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Avisos

Esto **no es un sistema de apuestas** ni una predicción fiable, y no debe usarse como tal.

Hay razones de fondo para ser modesto con los resultados:

1. **Muy pocos datos.** ~24 carreras al año, 20 pilotos, y solo ~190 victorias en ocho temporadas. Para ML eso es un dataset diminuto.
2. **Mucho azar.** Safety cars, lluvia, abandonos y estrategia explican una parte del resultado que ningún modelo va a capturar.
3. **2026 estrena reglamento.** Coches y motores nuevos: un modelo entrenado con 2018–2025 está prediciendo un deporte que ya no existe. Es un caso de manual de *distribution shift*, y es una de las cosas que quiero estudiar aquí.

## Datos

Los datos vienen de [FastF1](https://docs.fastf1.dev/), que accede a los datos públicos de cronometraje de la Fórmula 1. Este proyecto no está afiliado a la Fórmula 1 ni a ninguno de sus equipos.
