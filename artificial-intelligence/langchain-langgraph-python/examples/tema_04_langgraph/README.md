# 04 · LangGraph

Expresar un flujo con estado, nodos, aristas y reglas de actualización.

| Ejercicio | Concepto | ¿Requiere API? |
| --- | --- | --- |
| [primer_programa_langgraph.py](primer_programa_langgraph.py) | Mayúsculas y longitud con actualizaciones parciales | No |
| [control_flujo_langgraph.py](control_flujo_langgraph.py) | Enrutamiento condicional: número par o impar | No |
| [annotated_types_langgraph.py](annotated_types_langgraph.py) | Acumular logs con Annotated y operator.add | No |
| [procesador_reuniones_langgraph.py](procesador_reuniones_langgraph.py) | Participantes, temas, tareas, acta y resumen | Sí |

Desde la raíz del curso, ejecuta cada módulo sustituyendo el nombre del ejercicio:

```powershell
uv run python -m examples.tema_04_langgraph.primer_programa_langgraph
```

El procesador usa por defecto data/samples/reunion.txt y hace cinco llamadas de chat. Acepta --input para otra transcripción o un audio/vídeo compatible; este último añade una llamada de transcripción. Los errores de lectura o transcripción detienen el flujo. El ejemplo mínimo de reducers aísla el concepto; el procesador de reuniones también acumula los logs que antes estaban en una copia completa del mismo procesador.

[Volver al recorrido del curso](../../README.md)
