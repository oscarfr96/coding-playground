"""Un grafo determinista: estado tipado y actualizaciones parciales."""

from typing import TypedDict

from langgraph.graph import END, START, StateGraph


class TextState(TypedDict, total=False):
    texto_original: str
    texto_mayusculas: str
    longitud: int


def uppercase(state: TextState) -> dict:
    return {"texto_mayusculas": state["texto_original"].upper()}


def count_characters(state: TextState) -> dict:
    return {"longitud": len(state["texto_mayusculas"])}


def create_graph():
    graph = StateGraph(TextState)
    graph.add_node("mayusculas", uppercase)
    graph.add_node("longitud", count_characters)
    graph.add_edge(START, "mayusculas")
    graph.add_edge("mayusculas", "longitud")
    graph.add_edge("longitud", END)
    return graph.compile()


def main() -> None:
    print(create_graph().invoke({"texto_original": "hola mundo"}))


if __name__ == "__main__":
    main()
