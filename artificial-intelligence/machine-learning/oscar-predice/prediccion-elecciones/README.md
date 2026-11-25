# Error de sondeos · primer ejercicio

Primer paso de un proyecto de aprendizaje sobre agregación de encuestas y evaluación
del error. **El código actual no genera un pronóstico electoral ni asigna escaños.**

## Qué hace

`paso_01.py` lee un ejemplo documentado de 2023 y calcula:

```text
error_pp = resultado_pct - estimacion_pct
```

En el ejemplo incluido, 31,68 − 28,70 = +2,98 puntos porcentuales. El signo positivo
indica que esa estimación quedó por debajo del resultado. Es una diferencia de puntos,
no una tasa de crecimiento ni una corrección validada para otra elección.

## Ejecutar

Desde esta carpeta:

```powershell
python paso_01.py
```

Requiere Python 3.10 o posterior, solo biblioteca estándar y ninguna conexión.
Las rutas se resuelven respecto al script, por lo que también se puede ejecutar
indicando su ruta desde otra carpeta.

## Datos y límites

- `datos/ejemplo_2023.json`: estimación, resultado, metadatos y fuentes del ejemplo.
- `datos/fuentes.json`: inventario de casas y publicaciones por revisar; no equivale
  a un conjunto de encuestas ya admitidas y normalizadas.
- Los universos del sondeo y del resultado pueden diferir; conserva esas notas al
  compararlos. Un solo caso no permite atribuir causas al error de una casa.

## Trabajo pendiente

Verificar resultados y oleadas originales, normalizar candidaturas y denominadores,
definir fechas de corte y construir un promedio. Después, evaluar escenarios de
corrección con particiones temporales y datos que no se hayan usado para ajustar.
La asignación de escaños necesitará datos por circunscripción, además del voto nacional.

Los porcentajes ausentes deben seguir siendo datos ausentes; los intervalos y
probabilidades requerirán validación. Este ejercicio no contiene todavía esas etapas.

[Volver a Óscar predice](../README.md)
