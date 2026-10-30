import pytest
from pydantic import ValidationError

from school_assistant.schemas import AssistantRequest, SearchSchoolDocumentsInput
from school_assistant.services.documents import search_school_documents


def test_document_search_returns_relevant_source_and_excerpt() -> None:
    results = search_school_documents(
        SearchSchoolDocumentsInput(query="protocolo convivencia incidencia urgente")
    )

    assert results
    assert results[0].source == "convivencia.md"
    assert "incidencia" in results[0].text.lower()


def test_document_search_returns_no_chunks_for_unrelated_query() -> None:
    results = search_school_documents(
        SearchSchoolDocumentsInput(query="zebras galactic astronomy")
    )

    assert results == []


def test_document_search_rejects_extra_fields() -> None:
    with pytest.raises(ValidationError):
        SearchSchoolDocumentsInput.model_validate(
            {"query": "protocolo convivencia", "path": "../../secrets"}
        )


def test_document_search_rejects_short_query() -> None:
    with pytest.raises(ValidationError):
        SearchSchoolDocumentsInput(query="a ")


def test_assistant_request_trims_question_and_forbids_unknown_fields() -> None:
    request = AssistantRequest(question="  ¿Qué es MCP?  ")

    assert request.question == "¿Qué es MCP?"
    with pytest.raises(ValidationError):
        AssistantRequest.model_validate(
            {"question": "Pregunta", "teacher_id": "attacker-controlled"}
        )
