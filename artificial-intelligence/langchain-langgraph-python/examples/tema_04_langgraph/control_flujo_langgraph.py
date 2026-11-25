"""Elegir una rama del grafo según si un número es par o impar."""

from typing import Literal, TypedDict

from langgraph.graph import END, START, StateGraph


class FlowState(TypedDict, total=False):
    numero: int
    resultado: str


def route(state: FlowState) -> Literal["par", "impar"]:
    """La decisión es una función pura: se puede verificar sin un LLM."""
    return "par" if state["numero"] % 2 == 0 else "impar"


def create_graph():
    graph = StateGraph(FlowState)
    graph.add_node("par", lambda state: {"resultado": "El número es par"})
    graph.add_node("impar", lambda state: {"resultado": "El número es impar"})
    graph.add_conditional_edges(START, route, {"par": "par", "impar": "impar"})
    graph.add_edge("par", END)
    graph.add_edge("impar", END)
    return graph.compile()


def main() -> None:
    graph = create_graph()
    for number in [4, 5]:
        print(graph.invoke({"numero": number}))


if __name__ == "__main__":
    main()
