# 01 · Introducción a LangChain

Conectar con un modelo y componer una primera cadena.

| Ejercicio | Concepto | ¿Requiere API? |
| --- | --- | --- |
| [hello_world.py](hello_world.py) | Enviar una pregunta con invoke | Sí |
| [hello_world_avanzado.py](hello_world_avanzado.py) | PromptTemplate + modelo + StrOutputParser | Sí |

Desde la raíz del curso, ejecuta cada módulo sustituyendo el nombre del ejercicio:

```powershell
uv run python -m examples.tema_01_introduccion.hello_world
```

Instalación base y OPENAI_API_KEY. Se usa LCEL en lugar del antiguo LLMChain.run.

[Volver al recorrido del curso](../../README.md)
