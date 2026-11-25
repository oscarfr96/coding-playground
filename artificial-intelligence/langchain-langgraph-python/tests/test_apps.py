import pytest
from conftest import ModelStub
from langchain_core.documents import Document
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.checkpoint.sqlite import SqliteSaver
from langgraph.types import Command
from pydantic import ValidationError

from apps.asistente_legal_rag.service import reciprocal_rank_fusion
from apps.cv_analyzer.models import AnalisisCV
from apps.cv_analyzer.service import evaluate_cv
from apps.helpdesk_system.graph import create_helpdesk
from apps.multiuser_chat_system.service import ChatService
from apps.multiuser_chat_system.storage import ChatRepository


def test_cv_failure_is_not_a_zero_score_result():
    model = ModelStub(structured={"AnalisisCV": RuntimeError("API unavailable")})
    with pytest.raises(RuntimeError, match="API unavailable"):
        evaluate_cv("CV de ejemplo", "Puesto", model)
    with pytest.raises(ValueError, match="Completa"):
        evaluate_cv("", "Puesto", model)


def test_cv_score_is_bounded():
    with pytest.raises(ValidationError):
        AnalisisCV(
            nombre_candidato="Demo",
            experiencia_anos=3,
            habilidades_clave=[],
            educacion="",
            experiencia_relevante="",
            fortalezas=[],
            areas_mejora=[],
            porcentaje_ajuste=101,
            evidencias=[],
        )


def test_fusion_deduplicates_without_losing_sources():
    first = Document(page_content="A", metadata={"source": "a"})
    second = Document(page_content="B", metadata={"source": "b"})
    result = reciprocal_rank_fusion([[first, second], [first]], [0.7, 0.3])
    assert result == [first, second]


def test_helpdesk_automatic_route_uses_context():
    doc = Document(
        page_content="Restablece tu contraseña en el portal.", metadata={"source": "faq"}
    )
    llm = ModelStub(
        structured={
            "Decision": {
                "can_answer": True,
                "needs_human": False,
                "reason": "Procedimiento documentado",
            }
        }
    )
    graph = create_helpdesk(lambda question: [doc], llm, InMemorySaver())
    config = {"configurable": {"thread_id": "automatic"}}
    result = graph.invoke({"question": "¿Cómo cambio mi contraseña?", "logs": []}, config)
    assert result["resolved_by"] == "automatico"
    assert result["documents"] == [doc]
    assert not graph.get_state(config).next


def test_helpdesk_interrupt_survives_sqlite_reopen(tmp_path, model):
    path = str(tmp_path / "helpdesk.db")
    config = {"configurable": {"thread_id": "human"}}
    with SqliteSaver.from_conn_string(path) as saver:
        graph = create_helpdesk(lambda question: [], model, saver)
        result = graph.invoke({"question": "Necesito un reembolso", "logs": []}, config)
        assert "__interrupt__" in result
        assert "answer" not in graph.get_state(config).values
    with SqliteSaver.from_conn_string(path) as saver:
        graph = create_helpdesk(lambda question: [], model, saver)
        result = graph.invoke(Command(resume="He revisado tu solicitud."), config)
        assert result["resolved_by"] == "humano"
        assert result["answer"] == "He revisado tu solicitud."
        assert not graph.get_state(config).next


def test_multiuser_ownership_persistence_and_real_deletion(tmp_path, model):
    repository = ChatRepository(tmp_path)
    repository.create_user("alice")
    repository.create_user("bob")
    chat_id = repository.create_chat("alice")
    service = ChatService(repository)
    service.send("alice", chat_id, "Hola", model)
    assert len(service.history("alice", chat_id)) == 2
    assert repository.chats("alice")[0]["message_count"] == 2
    assert repository.chats("bob") == []
    with pytest.raises(ValueError, match="pertenece"):
        service.history("bob", chat_id)
    with pytest.raises(ValueError, match="pertenece"):
        service.delete_chat("bob", chat_id)
    reopened = ChatService(ChatRepository(tmp_path))
    assert len(reopened.history("alice", chat_id)) == 2
    config = service.config("alice", chat_id)
    service.delete_chat("alice", chat_id)
    assert repository.chats("alice") == []
    with SqliteSaver.from_conn_string(str(service.checkpoint_path)) as saver:
        assert saver.get_tuple(config) is None


@pytest.mark.parametrize("user_id", ["../other", "x", "alice/bob", "a" * 31])
def test_invalid_users_cannot_be_created(tmp_path, user_id):
    with pytest.raises(ValueError):
        ChatRepository(tmp_path).create_user(user_id)


def test_memory_failure_preserves_successful_chat(tmp_path, model):
    class BrokenMemories:
        def search(self, question):
            return []

        def extract(self, message, llm):
            raise RuntimeError("Extraction unavailable")

    repository = ChatRepository(tmp_path)
    repository.create_user("demo")
    chat = repository.create_chat("demo")
    service = ChatService(repository)
    result = service.send("demo", chat, "Hola", model, BrokenMemories())
    assert result.memory_warning
    assert result.text == model.text
    assert len(service.history("demo", chat)) == 2
