# Alice RAG chatbot · earlier full-stack experiment

Learning project based on the [Pixegami RAG tutorial](https://www.youtube.com/watch?v=tcqEUSNCn8I),
extended with a FastAPI endpoint and a React interface. It retrieves passages from
*Alice in Wonderland* and supplies them as context to a language model.

## Implementation

- `backend/create_database.py`: load Markdown, split it and create the Chroma index.
- `backend/query_data.py`: query the local index from the console.
- `backend/backend.py`: FastAPI `POST /ask`, accepting `{"query": "..."}` and returning `{"answer": "..."}`.
- `backend/data/books/alice_in_wonderland.md`: the included document.
- `frontend/`: React 19, TypeScript and Vite UI.

## Compatibility status

This is an earlier experiment. The backend imports legacy modules such as
`langchain.prompts` and `langchain.text_splitter`, while its requirements are not locked.
A fresh install of the latest packages is not guaranteed to work. Review and select
a compatible LangChain environment before running it; no clean-install backend check
is claimed here.

For the reviewed, reproducible examples, use the separate
[LangChain/LangGraph course](../../langchain-langgraph-python/README.md).

## Backend workflow

Work from `backend/`, because its data and index paths are relative to that directory.
Use an isolated Python environment with the compatible dependencies and Markdown
loader support (`unstructured[md]`). Set `OPENAI_API_KEY` in a local `.env`.

```powershell
python create_database.py
python query_data.py "How does Alice meet the Mad Hatter?"
python -m uvicorn backend:app --host 127.0.0.1 --port 8000
```

The index builder **replaces `backend/chroma/`** when run again. Indexing and answers
use the configured OpenAI account. The retrieval threshold in the example is a
heuristic, not a calibrated confidence estimate.

## Frontend workflow

In a second terminal, from `frontend/`:

```powershell
npm ci
npm run dev
```

The RAG client calls `http://127.0.0.1:8000/ask`. The frontend also contains an older
direct-OpenAI module (`src/services/openai.ts`) that reads `VITE_OPENAI_API_KEY` and
allows browser access. `Chat.tsx` imports it eagerly, so its missing-key check can
prevent startup even when you intend to use RAG. Refactoring that legacy mode behind
a backend is pending; do not put a private API key in a browser bundle.

The example API is intended for local experimentation and has permissive CORS.
It has not been hardened for a public deployment.

[Back to the area index](../README.md)
