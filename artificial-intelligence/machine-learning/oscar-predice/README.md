# Óscar predice

Experimentos para aprender a formular predicciones, preparar datos y explicar los
supuestos y los límites de cada resultado. Los tres proyectos tienen estados distintos.

| Proyecto | Qué existe hoy | Estado |
| --- | --- | --- |
| [F1 Race Predictor](f1-race-predictor/README.md) | Descarga incremental de resultados y acceso a FastF1 | Preparación de datos; aún sin entrenamiento ni inferencia |
| [Madring](f1-madring-winner-predictor/README.md) | Modelo de dos etapas, escenarios y validación temporal con una instantánea local | Experimento ejecutable; probabilidades no calibradas para el circuito |
| [Error de sondeos](prediccion-elecciones/README.md) | Lectura de un ejemplo documentado y cálculo del error en puntos porcentuales | Primer ejercicio; no produce un pronóstico electoral |

Cada carpeta contiene su código, fuentes y README. Crea entornos independientes para
los proyectos con dependencias; el ejercicio inicial de sondeos usa solo la biblioteca
estándar de Python.

[Volver a machine learning](../README.md)
