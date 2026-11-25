"""Una ventana limita mensajes enviados al LLM, sin borrar el estado guardado."""

from langchain_core.messages import HumanMessage
from langgraph.checkpoint.memory import InMemorySaver

from llm_playground.memory import create_chat_graph
from llm_playground.models import create_chat_model
from llm_playground.terminal import run_chat


def main() -> None:
    # Se cuentan mensajes con len; cuatro mensajes NO equivalen a cuatro tokens.
    app = create_chat_graph(create_chat_model(), InMemorySaver(), window=4)
    config = {"configurable": {"thread_id": "terminal"}}
    run_chat(
        lambda message: (
            app.invoke(
                {"messages": [HumanMessage(content=message)]},
                config,
            )["messages"][-1].content
        )
    )


if __name__ == "__main__":
    main()
