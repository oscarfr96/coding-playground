"""RunnableWithMessageHistory administra el historial de cada session_id."""

from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory

from llm_playground.models import create_chat_model
from llm_playground.terminal import run_chat


def create_chain(llm):
    store: dict[str, InMemoryChatMessageHistory] = {}

    def get_history(session_id: str):
        if session_id not in store:
            store[session_id] = InMemoryChatMessageHistory()
        return store[session_id]

    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", "Eres un asistente útil."),
            MessagesPlaceholder("history"),
            ("human", "{input}"),
        ]
    )
    return RunnableWithMessageHistory(
        prompt | llm,
        get_history,
        input_messages_key="input",
        history_messages_key="history",
    )


def main() -> None:
    chain = create_chain(create_chat_model())
    config = {"configurable": {"session_id": "terminal"}}
    run_chat(lambda message: chain.invoke({"input": message}, config).content)


if __name__ == "__main__":
    main()
