# 03 · Recuperación aumentada por generación (RAG)

Cargar → fragmentar → vectorizar → indexar → recuperar → responder con fuentes.

| Ejercicio | Concepto | ¿Requiere API? |
| --- | --- | --- |
| [document_loaders.py](document_loaders.py) | Cargar textos de ejemplo o PDFs propios con --path | No |
| [text_splitter.py](text_splitter.py) | Separar en fragmentos conservando metadatos | No |
| [embeddings_langchain.py](embeddings_langchain.py) | Comparar vectores mediante similitud coseno | Sí |
| [vector_stores.py](vector_stores.py) | Crear o sincronizar el índice Chroma | Sí |
| [retrievers_langchain.py](retrievers_langchain.py) | Buscar sobre el índice existente | Sí |
| [multi_query_retriever.py](multi_query_retriever.py) | Reformular, deduplicar y responder con fuentes | Sí |
| [google_drive_loader.py](google_drive_loader.py) | Integración OAuth opcional con Google Docs | OAuth de Google |

Desde la raíz del curso, ejecuta cada módulo sustituyendo el nombre del ejercicio:

```powershell
uv run python -m examples.tema_03_rag.text_splitter
```

Instala el extra rag. Ejecuta vector_stores antes de los retrievers. El índice se guarda en local_data/indexes y repetir la indexación no duplica fragmentos. Cambiar OPENAI_EMBEDDING_MODEL requiere volver a indexar. La similitud coseno no es una probabilidad de respuesta correcta.

[Volver al recorrido del curso](../../README.md)


## Google Drive (opcional)

Configura un proyecto de Google Cloud, habilita Drive API y descarga credenciales
OAuth de aplicación de escritorio. El primer acceso abre el consentimiento de Google.

```powershell
uv sync --frozen --extra apps --extra dev --extra google
uv run python -m examples.tema_03_rag.google_drive_loader --folder-id ID_DE_CARPETA --credentials local_data/google/credentials.json
```

El token se guarda bajo `local_data/google/`. No publiques las credenciales ni el token.
La integración se limita aquí a Google Docs; no forma parte de las pruebas con servicios reales.
