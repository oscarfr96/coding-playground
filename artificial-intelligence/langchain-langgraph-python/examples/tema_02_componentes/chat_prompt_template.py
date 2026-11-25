"""Inspeccionar los roles de un prompt sin llamar a ninguna API."""

from langchain_core.prompts import ChatPromptTemplate


def main() -> None:
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", "Traduce del español al inglés coloquial."),
            ("human", "{texto}"),
        ]
    )
    for message in prompt.format_messages(texto="¡Hola mundo! ¿Cómo estás?"):
        print(f"{message.type}: {message.content}")


if __name__ == "__main__":
    main()
