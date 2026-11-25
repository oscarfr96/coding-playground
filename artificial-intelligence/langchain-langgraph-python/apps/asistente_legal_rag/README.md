# Asistente de contratos con RAG

Consulta documental sobre dos contratos **ficticios** incluidos en `data/samples/contratos`.
Recupera candidatos con MMR y multiquery, combina rankings mediante fusión de rangos
recíprocos y genera una respuesta con los fragmentos exactos que muestra la interfaz.

```powershell
uv run python -m streamlit run apps/asistente_legal_rag/app.py --server.address 127.0.0.1
```

1. Pulsa «Indexar contratos de ejemplo» en la barra lateral.
2. Pregunta «¿Cuál es la renta del local de Alex Demo?».
3. Abre los fragmentos utilizados y comprueba la respuesta contra el texto.

El índice vive en `local_data/indexes/`. Cada pregunta es independiente; el historial
visible no reformula referencias como «¿y su fianza?». Utiliza nombres o contratos explícitos.
Una consulta hace una llamada para reformular, varias búsquedas de embeddings y una
llamada para responder. La indexación también consume embeddings.

Las dos estrategias de recuperación son vectoriales. Su fusión es un ensemble, no
una búsqueda híbrida léxica/vectorial ni una probabilidad de acierto. La demo recupera
información del corpus; no realiza interpretación jurídica fuera de esos textos.

[Volver al curso](../../README.md)
