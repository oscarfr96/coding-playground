# 02 · Componentes de LangChain

Construir cadenas a partir de piezas pequeñas y verificables.

| Ejercicio | Concepto | ¿Requiere API? |
| --- | --- | --- |
| [chat_prompt_template.py](chat_prompt_template.py) | Roles system y human | No |
| [rol_prompt_templates.py](rol_prompt_templates.py) | Plantillas parametrizadas por rol | No |
| [message_placeholders.py](message_placeholders.py) | Insertar historial manteniendo los tipos de mensaje | No |
| [ejemplo_runnables.py](ejemplo_runnables.py) | RunnableLambda, invoke y batch | No |
| [output_parsers.py](output_parsers.py) | Salida estructurada y vocabulario validado | Sí |
| [analizador_sentimientos.py](analizador_sentimientos.py) | Ramas en paralelo y procesamiento por lotes | Sí |

Desde la raíz del curso, ejecuta cada módulo sustituyendo el nombre del ejercicio:

```powershell
uv run python -m examples.tema_02_componentes.ejemplo_runnables
```

El analizador hace dos llamadas por texto. batch limita la concurrencia a dos entradas. Una respuesta inválida produce un error; nunca se etiqueta como neutra por defecto.

[Volver al recorrido del curso](../../README.md)
