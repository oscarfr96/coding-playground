import pytest
from conftest import ModelStub
from langchain_core.documents import Document
from langchain_core.embeddings import DeterministicFakeEmbedding
from langchain_core.runnables import RunnableLambda

from llm_playground.memory import UserMemories
from llm_playground.rag import answer_question, build_index, load_documents, multi_query, open_store


def test_loading_rejects_missing_and_empty_sources(tmp_path):
    with pytest.raises(FileNotFoundError):
        load_documents(tmp_path / "missing")
    with pytest.raises(ValueError, match="texto"):
        load_documents(tmp_path)


def test_index_is_idempotent_and_removes_stale_chunks(tmp_path):
    embeddings = DeterministicFakeEmbedding(size=16)
    docs = [Document(page_content="Renta del local: 700 euros.", metadata={"source": "demo.txt"})]
    store = build_index(docs, tmp_path, "course_test", embeddings=embeddings)
    first = store.get(include=[])["ids"]
    build_index(docs, tmp_path, "course_test", embeddings=embeddings)
    assert store.get(include=[])["ids"] == first
    docs[0].page_content = "Renta del local: 800 euros."
    build_index(docs, tmp_path, "course_test", embeddings=embeddings)
    assert store.get(include=[])["ids"] != first
    assert len(store.get(include=[])["ids"]) == 1
    assert "800" in store.similarity_search("Renta", k=1)[0].page_content


def test_vector_memory_reads_and_deletes_only_its_owner(tmp_path):
    store = open_store(tmp_path, "memory_test", embeddings=DeterministicFakeEmbedding(size=16))
    alice, bob = UserMemories(store, "alice"), UserMemories(store, "bob")
    alice_id = alice.save("Me gusta Python")
    bob_id = bob.save("Me gusta Rust")
    assert alice.search("Qué me gusta") == ["Me gusta Python"]
    assert bob.search("Qué me gusta") == ["Me gusta Rust"]
    with pytest.raises(ValueError, match="pertenece"):
        alice.delete(bob_id)
    alice.delete(alice_id)
    assert alice.list()["ids"] == []
    assert bob.list()["ids"] == [bob_id]


def test_multiquery_deduplicates_and_includes_original():
    calls = []
    doc = Document(page_content="Documento repetido", metadata={"source": "same.txt"})

    def retrieve(query):
        calls.append(query)
        return [doc, doc]

    llm = ModelStub(structured={"QueryVariants": {"consultas": ["variante", "original"]}})
    result = multi_query("original", RunnableLambda(retrieve), llm)
    assert calls == ["original", "variante"]
    assert result == [doc]


def test_answer_uses_exact_documents_displayed(model):
    docs = [Document(page_content="Texto de prueba", metadata={"source": "sample.txt", "page": 0})]
    result = answer_question("Pregunta", docs, model)
    assert result.documents is docs
    prompt = model.inputs[-1].to_messages()[-1].content
    assert "[1] sample.txt, página 1" in prompt
    assert "Texto de prueba" in prompt


def test_no_documents_does_not_call_model(model):
    assert answer_question("Pregunta", [], model).documents == []
    assert model.inputs == []
