"""Annotated define cómo combinar actualizaciones de un canal del estado."""

from operator import add
from typing import Annotated, TypedDict

from langgraph.graph import END, START, StateGraph


class LoggedState(TypedDict):
    texto: str
    logs: Annotated[list[str], add]


def create_graph():
    graph = StateGraph(LoggedState)
    graph.add_node(
        "normalizar",
        lambda state: {
            "texto": state["texto"].strip(),
            "logs": ["Texto normalizado"],
        },
    )
    graph.add_node(
        "mayusculas",
        lambda state: {
            "texto": state["texto"].upper(),
            "logs": ["Texto convertido a mayúsculas"],
        },
    )
    # Cada nodo devuelve SOLO sus nuevos logs. El reducer add los acumula.
    # Devolver también los logs anteriores los duplicaría.
    graph.add_edge(START, "normalizar")
    graph.add_edge("normalizar", "mayusculas")
    graph.add_edge("mayusculas", END)
    return graph.compile()


def main() -> None:
    print(create_graph().invoke({"texto": " hola mundo ", "logs": []}))


if __name__ == "__main__":
    main()
