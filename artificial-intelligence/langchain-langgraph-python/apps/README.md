# Aplicaciones del curso

Las interfaces usan Streamlit; los servicios se pueden probar sin abrir la interfaz.
Ejecuta desde la raíz del curso, después de instalar el extra `apps` y configurar `.env`.

## Chat básico

```powershell
uv run python -m streamlit run apps/streamlit_chatbot.py --server.address 127.0.0.1
```

Composición LCEL, historial tipado en `session_state`, temperatura configurable y
respuesta por streaming. «Nueva conversación» limpia el historial. Se pierde al cerrar
la sesión. El modelo se selecciona con `OPENAI_API_MODEL`.

## Aplicaciones con servicios

- [Analizador de CV](cv_analyzer/README.md): análisis estructurado con evidencias.
- [Asistente de contratos](asistente_legal_rag/README.md): RAG con fuentes verificables.
- [Helpdesk](helpdesk_system/README.md): decisiones y revisión humana con checkpoints.
- [Chat por usuario](multiuser_chat_system/README.md): historial y recuerdos separados.

Los archivos duplicados de la carpeta original `projects/` se conservan en
`local_data/originales/projects/`; estas son las versiones revisadas para el curso.
