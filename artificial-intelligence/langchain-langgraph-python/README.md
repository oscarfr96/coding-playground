# LangChain y LangGraph con Python

Repositorio de prácticas de mi formación en aplicaciones con modelos de lenguaje.
Recoge **25 ejercicios en cinco temas y cinco aplicaciones**: desde una primera
llamada a un modelo hasta RAG, memoria persistente y flujos con intervención humana.

Los ejercicios conservan la progresión del curso. La revisión posterior unifica
configuración y dependencias, actualiza las APIs y añade pruebas sobre los
comportamientos que necesitan especial cuidado: persistencia, aislamiento y errores.

## Recorrido del curso

| Tema | Qué se trabaja | Ejercicios |
| --- | --- | --- |
| [01 · Introducción](examples/tema_01_introduccion/README.md) | Chat models, `invoke` y primera cadena LCEL | 2 |
| [02 · Componentes](examples/tema_02_componentes/README.md) | Roles, plantillas, historial, Pydantic, runnables y paralelismo | 6 |
| [03 · RAG](examples/tema_03_rag/README.md) | Carga, fragmentación, embeddings, Chroma y multiquery | 7 |
| [04 · LangGraph](examples/tema_04_langgraph/README.md) | Estado, nodos, rutas condicionales, reducers y reuniones | 4 |
| [05 · Memoria](examples/tema_05_memoria/README.md) | Historial, checkpointers, SQLite, ventanas y memoria vectorial | 6 |

## Aplicaciones

| Aplicación | Qué demuestra |
| --- | --- |
| [Chat básico](apps/README.md#chat-básico) | LCEL, streaming e historial de sesión en Streamlit |
| [Analizador de CV](apps/cv_analyzer/README.md) | PDF o texto → análisis Pydantic con evidencias → descarga JSON |
| [Asistente de contratos](apps/asistente_legal_rag/README.md) | RAG con MMR, multiquery, fusión de rankings y fuentes visibles |
| [Helpdesk](apps/helpdesk_system/README.md) | RAG, clasificación, `interrupt` y reanudación con `Command` |
| [Chat por usuario](apps/multiuser_chat_system/README.md) | Varios chats, checkpoints SQLite y recuerdos filtrados por usuario |

Para revisar el código, un buen recorrido es el [analizador de sentimientos](examples/tema_02_componentes/analizador_sentimientos.py),
el [grafo de helpdesk](apps/helpdesk_system/graph.py) y las [pruebas de aplicaciones](tests/test_apps.py).

## Instalación

Python **3.11–3.13**. Desarrollo y validación local con Python 3.12.
Ejecuta los comandos desde esta carpeta, `artificial-intelligence/langchain-langgraph-python`.

Con [uv](https://docs.astral.sh/uv/), usando las versiones de `uv.lock`:

```powershell
uv sync --frozen --extra apps --extra dev
Copy-Item .env.example .env
```

Completa `OPENAI_API_KEY` en `.env` antes de ejecutar ejemplos que usan un modelo.
`OPENAI_API_MODEL` y `OPENAI_EMBEDDING_MODEL` permiten elegir los modelos sin editar código.
Las variables exportadas en el entorno tienen prioridad sobre `.env`.

Alternativa con pip (respeta rangos de versiones, sin usar el lock):

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -e ".[apps,dev]"
Copy-Item .env.example .env
```

En macOS/Linux, usa `python3 -m venv .venv` y `.venv/bin/python`.
Con pip, sustituye `uv run python` por el Python del entorno y `uv run ruff` por su ejecutable `ruff`.
Para instalar solo los fundamentos: `pip install -e .`; extras disponibles:
`rag`, `memory`, `apps`, `google` y `dev`.

## Probar sin clave API

```powershell
uv run python -m examples.tema_02_componentes.chat_prompt_template
uv run python -m examples.tema_02_componentes.ejemplo_runnables
uv run python -m examples.tema_03_rag.text_splitter
uv run python -m examples.tema_04_langgraph.control_flujo_langgraph
uv run python -m pytest -q
```

Las pruebas usan modelos y embeddings simulados; bloquean conexiones externas.
Comprueban ambas rutas del helpdesk, recuperación tras reiniciar SQLite, borrado real
de chats, aislamiento por usuario, indexación sin duplicados y flujos de Streamlit.

## Ejecutar con un modelo

```powershell
uv run python -m examples.tema_01_introduccion.hello_world
uv run python -m examples.tema_03_rag.vector_stores
uv run python -m examples.tema_03_rag.multi_query_retriever
uv run python -m streamlit run apps/helpdesk_system/app.py --server.address 127.0.0.1
```

Las llamadas a chat, embeddings y transcripción consumen la API configurada.
Los ejemplos interactivos terminan con `salir`, Ctrl+C o EOF.
Cada README explica requisitos, orden de ejecución y límites del ejercicio.

## Estructura y decisiones

```text
examples/          Ejercicios pequeños, organizados por los cinco temas
apps/              Aplicaciones con interfaz y lógica separadas
src/llm_playground/ Configuración, modelos y utilidades compartidas
data/samples/      Textos ficticios reproducibles y sin datos personales
tests/             Pruebas de comportamiento y de las interfaces
local_data/        Índices, historiales y originales locales; excluido de Git
```

- Los archivos se pueden importar sin pedir una clave, abrir un chat ni hacer llamadas de red.
- Las rutas dependen de la ubicación del curso, sin nombres de usuario ni rutas de otro equipo.
- Chroma usa la misma función de embeddings al escribir y buscar. Cada modelo tiene su propio índice.
- Las respuestas RAG y las fuentes visibles usan exactamente los mismos fragmentos recuperados.
- Los errores se muestran como errores; no se convierten en análisis, puntuaciones o respuestas válidas.
- La ventana de contexto limita lo enviado al modelo; no borra el historial persistido.

## Alcance

Son prácticas educativas y demos locales. La selección de usuario no es autenticación;
las aplicaciones se arrancan en loopback y no incluyen despliegue multiusuario en red.
El porcentaje del analizador de CV es orientativo y las respuestas del modelo deben revisarse.

El ejercicio de memoria con `RunnableWithMessageHistory` se conserva como parte del
recorrido del curso, aunque LangChain 1.x lo marca como deprecado. Los ejercicios
posteriores y las aplicaciones usan persistencia de LangGraph.

El material anterior (incluidos PDFs, vídeo, copias de proyectos y bases de datos)
se conserva localmente en `local_data/originales/`. Las demos revisadas crean índices
e historiales nuevos; no migran las bases antiguas. No se distribuyen claves, CVs
personales, contratos originales ni historiales.

## Calidad y referencias

```powershell
uv run ruff check .
uv run ruff format --check .
uv run python -m pytest -q
```

Referencias para las APIs utilizadas:
[ChatOpenAI](https://docs.langchain.com/oss/python/integrations/chat/openai),
[Chroma](https://docs.langchain.com/oss/python/integrations/vectorstores/chroma),
[persistencia de LangGraph](https://docs.langchain.com/oss/python/langgraph/persistence)
y [Google Drive](https://docs.langchain.com/oss/python/integrations/document_loaders/google_drive).
