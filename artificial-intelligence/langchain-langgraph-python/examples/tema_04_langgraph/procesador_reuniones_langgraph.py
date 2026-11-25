"""Procesar notas o audio: participantes → temas → tareas → acta → resumen."""

import argparse
from operator import add
from pathlib import Path
from typing import Annotated, TypedDict

from langchain_core.output_parsers import StrOutputParser
from langgraph.graph import END, START, StateGraph
from pydantic import BaseModel, Field

from llm_playground.config import SAMPLE_DIR, get_settings
from llm_playground.models import create_chat_model


class MeetingState(TypedDict, total=False):
    notes: str
    participants: list[str]
    topics: list[str]
    action_items: list[str]
    minutes: str
    summary: str
    logs: Annotated[list[str], add]


class Items(BaseModel):
    items: list[str] = Field(description="Solo elementos mencionados explícitamente en las notas")


def create_workflow(llm):
    """Cada nodo devuelve un parche del estado; logs se acumula con su reducer."""
    structured = llm.with_structured_output(Items)
    text = llm | StrOutputParser()

    def extract(state, field, instruction):
        result = structured.invoke(f"{instruction} No inventes información.\n{state['notes']}")
        return {field: result.items, "logs": [f"Completado: {field}"]}

    def minutes(state):
        result = text.invoke(
            "Genera un acta de máximo 150 palabras a partir de estos datos. "
            f"Participantes: {state['participants']}. Temas: {state['topics']}. "
            f"Acciones: {state['action_items']}. No añadas acuerdos."
        )
        return {"minutes": result, "logs": ["Acta generada"]}

    def summary(state):
        return {
            "summary": text.invoke(f"Resume en 30 palabras esta acta: {state['minutes']}"),
            "logs": ["Resumen generado"],
        }

    graph = StateGraph(MeetingState)
    graph.add_node(
        "participants", lambda state: extract(state, "participants", "Extrae asistentes.")
    )
    graph.add_node("topics", lambda state: extract(state, "topics", "Extrae temas tratados."))
    graph.add_node(
        "actions", lambda state: extract(state, "action_items", "Extrae tareas y responsables.")
    )
    graph.add_node("minutes", minutes)
    graph.add_node("summary", summary)
    steps = [START, "participants", "topics", "actions", "minutes", "summary", END]
    for source, target in zip(steps[:-1], steps[1:], strict=True):
        graph.add_edge(source, target)
    return graph.compile()


def read_notes(path: Path) -> str:
    """Un fallo de transcripción se propaga; nunca se procesa como si fueran notas."""
    if path.suffix.lower() in {".txt", ".md"}:
        notes = path.read_text(encoding="utf-8")
    elif path.suffix.lower() in {".mp3", ".mp4", ".m4a", ".wav", ".webm"}:
        from openai import OpenAI

        settings = get_settings()
        with OpenAI(api_key=settings.openai_api_key, timeout=120, max_retries=2) as client:
            with path.open("rb") as media:
                notes = client.audio.transcriptions.create(
                    model="whisper-1",
                    file=media,
                    language="es",
                    response_format="text",
                )
    else:
        raise ValueError("Formato no admitido. Usa texto, MP3, MP4, M4A, WAV o WebM.")
    if not notes.strip():
        raise ValueError("El archivo no contiene notas o una transcripción utilizable.")
    return notes


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, default=SAMPLE_DIR / "reunion.txt")
    args = parser.parse_args()
    notes = read_notes(args.input)
    result = create_workflow(create_chat_model()).invoke({"notes": notes, "logs": []})
    for field in ["participants", "topics", "action_items", "minutes", "summary", "logs"]:
        print(f"\n{field}:\n{result[field]}")


if __name__ == "__main__":
    main()
