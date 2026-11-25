"""Insertar un historial tipado en un prompt sin convertirlo en texto plano."""

from langchain_core.messages import AIMessage, HumanMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder


def main() -> None:
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", "Mantén el contexto de la conversación."),
            MessagesPlaceholder("historial"),
            ("human", "{pregunta_actual}"),
        ]
    )
    history = [
        HumanMessage(content="¿Cuál es la capital de Francia?"),
        AIMessage(content="La capital de Francia es París."),
    ]
    for message in prompt.format_messages(
        historial=history, pregunta_actual="¿Qué caracteriza su arquitectura?"
    ):
        print(f"{message.type}: {message.content}")


if __name__ == "__main__":
    main()
