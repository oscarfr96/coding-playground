"""Combinar historial volátil por hilo con hechos persistentes de un usuario."""

import argparse

from langchain_core.messages import HumanMessage
from langgraph.checkpoint.memory import InMemorySaver

from llm_playground.memory import UserMemories, create_chat_graph
from llm_playground.models import create_chat_model
from llm_playground.rag import index_path, open_store
from llm_playground.terminal import run_chat


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--user-id", default="demo")
    args = parser.parse_args()
    llm = create_chat_model()
    memories = UserMemories(open_store(index_path("memoria"), "memorias"), args.user_id)
    app = create_chat_graph(llm, InMemorySaver(), memories=memories)
    config = {"configurable": {"thread_id": f"{args.user_id}:terminal"}}

    def reply(message: str) -> str:
        if message.lower() == "memorias":
            return "\n".join(memories.list()["documents"]) or "Sin recuerdos."
        result = app.invoke({"messages": [HumanMessage(content=message)]}, config)
        # La extracción es otra llamada al modelo y solo guarda hechos explícitos.
        memories.extract(message, llm)
        return result["messages"][-1].content

    run_chat(reply)


if __name__ == "__main__":
    main()
