"""SQLite permite recuperar el mismo thread_id después de cerrar el proceso."""

import argparse

from langchain_core.messages import HumanMessage
from langgraph.checkpoint.sqlite import SqliteSaver

from llm_playground.config import DATA_DIR
from llm_playground.memory import create_chat_graph
from llm_playground.models import create_chat_model
from llm_playground.terminal import run_chat


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--thread-id", default="terminal")
    args = parser.parse_args()
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    # El context manager cierra la conexión incluso si falla una llamada al modelo.
    with SqliteSaver.from_conn_string(str(DATA_DIR / "historial.db")) as memory:
        app = create_chat_graph(create_chat_model(), memory)
        config = {"configurable": {"thread_id": args.thread_id}}
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
