import importlib
from pathlib import Path

import pytest
from conftest import ModelStub
from langchain_core.messages import HumanMessage
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.checkpoint.sqlite import SqliteSaver

from examples.tema_02_componentes.ejemplo_runnables import create_chain
from examples.tema_03_rag.embeddings_langchain import cosine_similarity
from examples.tema_04_langgraph import annotated_types_langgraph as reducers
from examples.tema_04_langgraph import control_flujo_langgraph as flow
from examples.tema_04_langgraph import primer_programa_langgraph as first
from examples.tema_04_langgraph.procesador_reuniones_langgraph import create_workflow, read_notes
from examples.tema_05_memoria.memoria_simple_langchain import create_chain as memory_chain
from llm_playground.memory import create_chat_graph


def test_every_example_and_app_can_be_imported_without_a_key_or_input(monkeypatch):
    def blocked(*args, **kwargs):
        raise AssertionError("Importar no debe pedir entrada ni crear un cliente.")

    monkeypatch.setattr("builtins.input", blocked)
    monkeypatch.setattr("llm_playground.config.get_settings", blocked)
    root = Path(__file__).resolve().parents[1]
    for folder in ["examples", "apps"]:
        for file in (root / folder).rglob("*.py"):
            module = ".".join(file.relative_to(root).with_suffix("").parts)
            importlib.reload(importlib.import_module(module))


def test_deterministic_course_flows():
    assert create_chain().invoke(5) == ["Número 5", "Número 5"]
    assert first.create_graph().invoke({"texto_original": "hola mundo"})["longitud"] == 10
    graph = flow.create_graph()
    assert graph.invoke({"numero": 4})["resultado"] == "El número es par"
    assert graph.invoke({"numero": 5})["resultado"] == "El número es impar"
    result = reducers.create_graph().invoke({"texto": " hola ", "logs": []})
    assert result["texto"] == "HOLA"
    assert len(result["logs"]) == 2


def test_chain_sessions_are_isolated(model):
    chain = memory_chain(model)
    config = {"configurable": {"session_id": "alice"}}
    chain.invoke({"input": "Me llamo Alice"}, config)
    chain.invoke({"input": "¿Mi nombre?"}, config)
    assert len(model.inputs[-1].to_messages()) == 4
    chain.invoke({"input": "Hola"}, {"configurable": {"session_id": "bob"}})
    assert len(model.inputs[-1].to_messages()) == 2


def test_window_limits_prompt_but_preserves_full_checkpoint(model):
    graph = create_chat_graph(model, InMemorySaver(), window=4)
    config = {"configurable": {"thread_id": "one"}}
    for number in range(5):
        graph.invoke({"messages": [HumanMessage(content=str(number))]}, config)
    assert len(model.inputs[-1]) <= 5  # ventana + mensaje del sistema
    assert len(graph.get_state(config).values["messages"]) == 10
    other = graph.get_state({"configurable": {"thread_id": "other"}})
    assert not other.values


def test_sqlite_restores_history_after_reopening(tmp_path, model):
    database = str(tmp_path / "history.db")
    config = {"configurable": {"thread_id": "persistent"}}
    with SqliteSaver.from_conn_string(database) as saver:
        graph = create_chat_graph(model, saver)
        graph.invoke({"messages": [HumanMessage(content="Me llamo Demo")]}, config)
    with SqliteSaver.from_conn_string(database) as saver:
        graph = create_chat_graph(model, saver)
        graph.invoke({"messages": [HumanMessage(content="¿Mi nombre?")]}, config)
        assert len(graph.get_state(config).values["messages"]) == 4
    assert model.inputs[-1][1].content == "Me llamo Demo"


@pytest.mark.parametrize("left,right", [([], []), ([0.0], [1.0]), ([1.0], [1.0, 2.0])])
def test_invalid_cosine_vectors_fail(left, right):
    with pytest.raises(ValueError):
        cosine_similarity(left, right)


def test_same_vector_has_unit_cosine():
    assert cosine_similarity([1.0, 2.0], [1.0, 2.0]) == pytest.approx(1.0)


def test_meeting_workflow_keeps_all_five_steps_and_logs():
    model = ModelStub(
        structured={
            "Items": [
                {"items": ["Alex", "Dana"]},
                {"items": ["Pruebas"]},
                {"items": ["Dana preparará las pruebas"]},
            ]
        }
    )
    result = create_workflow(model).invoke({"notes": "Reunión ficticia", "logs": []})
    assert result["participants"] == ["Alex", "Dana"]
    assert result["action_items"] == ["Dana preparará las pruebas"]
    assert result["minutes"] == model.text
    assert result["summary"] == model.text
    assert len(result["logs"]) == 5


def test_meeting_input_rejects_empty_text(tmp_path):
    path = tmp_path / "empty.txt"
    path.write_text(" ", encoding="utf-8")
    with pytest.raises(ValueError, match="notas"):
        read_notes(path)
