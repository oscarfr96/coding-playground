"""Historial persistente por chat y recuerdos semánticos independientes por usuario."""

import logging
from dataclasses import dataclass

from langchain_core.messages import HumanMessage
from langgraph.checkpoint.sqlite import SqliteSaver

from apps.multiuser_chat_system.storage import ChatRepository
from llm_playground.memory import create_chat_graph

logger = logging.getLogger(__name__)


@dataclass
class ChatReply:
    text: str
    memory_warning: bool = False


class ChatService:
    def __init__(self, repository: ChatRepository):
        self.repository = repository
        self.checkpoint_path = repository.directory / "checkpoints.db"

    def config(self, user_id: str, chat_id: str) -> dict:
        self.repository.require_chat(user_id, chat_id)
        return {"configurable": {"thread_id": f"{user_id}:{chat_id}"}}

    def history(self, user_id: str, chat_id: str) -> list:
        config = self.config(user_id, chat_id)
        with SqliteSaver.from_conn_string(str(self.checkpoint_path)) as saver:
            # Leer el estado no necesita credenciales ni instanciar un modelo.
            graph = create_chat_graph(None, saver)
            return graph.get_state(config).values.get("messages", [])

    def send(self, user_id: str, chat_id: str, message: str, llm, memories=None) -> ChatReply:
        if not message.strip():
            raise ValueError("Escribe un mensaje.")
        config = self.config(user_id, chat_id)
        with SqliteSaver.from_conn_string(str(self.checkpoint_path)) as saver:
            graph = create_chat_graph(llm, saver, window=12, memories=memories)
            result = graph.invoke({"messages": [HumanMessage(content=message)]}, config)
        self.repository.record_turn(user_id, chat_id, message)
        warning = False
        if memories is not None:
            try:
                memories.extract(message, llm)
            except Exception:
                # La respuesta ya está guardada; un fallo al extraer recuerdos
                # no debe ocultarla ni provocar el reenvío del turno completo.
                logger.exception("Respuesta guardada; falló la extracción de memoria")
                warning = True
        return ChatReply(result["messages"][-1].content, warning)

    def delete_chat(self, user_id: str, chat_id: str) -> None:
        config = self.config(user_id, chat_id)
        with SqliteSaver.from_conn_string(str(self.checkpoint_path)) as saver:
            saver.delete_thread(config["configurable"]["thread_id"])
        # Borrado real del checkpoint y del catálogo; los recuerdos se gestionan aparte.
        self.repository.delete_chat(user_id, chat_id)
