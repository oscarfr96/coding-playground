# 05 · Memoria y contexto

Distinguir historial, persistencia y recuerdos semánticos.

| Ejercicio | Concepto | ¿Requiere API? |
| --- | --- | --- |
| [fundamentos_memoria.py](fundamentos_memoria.py) | Reenviar y actualizar el historial manualmente | Sí |
| [memoria_simple_langchain.py](memoria_simple_langchain.py) | Historial automático por session_id (API deprecada) | Sí |
| [memoria_simple_langgraph.py](memoria_simple_langgraph.py) | MessagesState + InMemorySaver por thread_id | Sí |
| [memoria_persistente_langgraph.py](memoria_persistente_langgraph.py) | Recuperar un hilo SQLite tras cerrar el proceso | Sí |
| [memoria_ventana_deslizante.py](memoria_ventana_deslizante.py) | Acotar mensajes enviados al modelo sin borrar el historial | Sí |
| [memoria_vectorial_langgraph.py](memoria_vectorial_langgraph.py) | Recuerdos persistentes filtrados por user_id | Sí |

Desde la raíz del curso, ejecuta cada módulo sustituyendo el nombre del ejercicio:

```powershell
uv run python -m examples.tema_05_memoria.fundamentos_memoria
```

Instala memory para SQLite y rag para memoria vectorial. InMemorySaver pierde el historial al terminar el proceso; SQLite conserva el mismo --thread-id. La ventana cuenta mensajes, no tokens. En el ejemplo vectorial, --user-id separa los recuerdos y el comando memorias los muestra. Los recuerdos persisten aunque el historial de ese ejemplo sea volátil. La extracción añade una llamada al modelo por turno. RunnableWithMessageHistory se mantiene para comparar con el enfoque de LangGraph y puede emitir avisos de deprecación.

[Volver al recorrido del curso](../../README.md)
