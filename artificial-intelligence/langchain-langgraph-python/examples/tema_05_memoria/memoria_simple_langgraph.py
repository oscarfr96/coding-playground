"""MessagesState acumula mensajes y el checkpointer los separa por thread_id."""

from langchain_core.messages import HumanMessage, SystemMessage
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.graph import END, START, MessagesState, StateGraph

from llm_playground.models import create_chat_model
from llm_playground.terminal import run_chat


def create_graph(llm, checkpointer):
    def chatbot(state: MessagesState):
        response = llm.invoke(
            [
                SystemMessage(content="Eres un asistente útil."),
                *state["messages"],
            ]
        )
        # add_messages ya conserva el historial; devolverlo entero lo duplicaría.
        return {"messages": [response]}

    graph = StateGraph(MessagesState)
    graph.add_node("chatbot", chatbot)
    graph.add_edge(START, "chatbot")
    graph.add_edge("chatbot", END)
    return graph.compile(checkpointer=checkpointer)


def main() -> None:
    app = create_graph(create_chat_model(), InMemorySaver())
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
