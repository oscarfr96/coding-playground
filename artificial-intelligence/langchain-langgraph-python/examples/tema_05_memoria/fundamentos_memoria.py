"""Memoria manual: añadir cada turno al historial y reenviarlo al modelo."""

from langchain_core.messages import HumanMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

from llm_playground.models import create_chat_model
from llm_playground.terminal import run_chat


def main() -> None:
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", "Eres un asistente útil."),
            MessagesPlaceholder("history"),
            ("human", "{input}"),
        ]
    )
    chain = prompt | create_chat_model()
    history = []

    def reply(message: str) -> str:
        response = chain.invoke({"history": history, "input": message})
        # El modelo no recuerda por sí solo: el programa reenvía estos mensajes.
        history.extend([HumanMessage(content=message), response])
        return response.content

    run_chat(reply)


if __name__ == "__main__":
    main()
