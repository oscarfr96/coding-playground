# Chat con memoria por usuario

Demo local de varias conversaciones, historial SQLite y recuerdos semánticos que se
pueden reutilizar entre chats del mismo usuario.

```powershell
uv run python -m streamlit run apps/multiuser_chat_system/app.py --server.address 127.0.0.1
```

1. Crea un usuario y abre un chat.
2. Comparte un hecho explícito («Me gusta programar en Python»).
3. Abre otro chat de ese usuario y consulta sus preferencias.
4. Crea otro usuario y comprueba que no recibe los recuerdos del primero.
5. Reinicia la aplicación para recuperar los chats, o elimina uno para borrar su checkpoint.

`storage.py` mantiene el catálogo y valida pertenencia de cada chat; `service.py`
coordina el grafo, el historial y el borrado. `UserMemories` aplica el filtro de usuario
en cada consulta a Chroma. Las conexiones SQLite se cierran al acabar cada operación.

El historial completo se guarda bajo `local_data/multiuser/`. Solo los últimos doce
mensajes elegibles se envían al modelo, además del sistema y los recuerdos recuperados.
La ventana limita el contexto sin modificar el historial almacenado.

La extracción de recuerdos hace otra llamada al modelo. Puedes desactivarla y consultar
o eliminar recuerdos en la interfaz. Un fallo de extracción conserva la respuesta ya
generada y avisa del fallo parcial. Eliminar un chat borra sus checkpoints y metadatos;
los recuerdos entre chats se eliminan desde «Ver recuerdos».

El selector de usuario es para probar aislamiento lógico, **no es autenticación**.
Los datos de versiones antiguas no se importan automáticamente.

[Volver al curso](../../README.md)
