"""Separar las instrucciones del sistema de la pregunta del usuario."""

from langchain_core.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)


def main() -> None:
    system = SystemMessagePromptTemplate.from_template(
        "Eres un {rol} especializado en {especialidad}. Responde de manera {tono}."
    )
    human = HumanMessagePromptTemplate.from_template("Mi pregunta sobre {tema}: {pregunta}")
    prompt = ChatPromptTemplate.from_messages([system, human])
    for message in prompt.format_messages(
        rol="profesor de inglés",
        especialidad="expresiones coloquiales",
        tono="amigable",
        tema="saludos",
        pregunta="¿Cómo saludo a un amigo?",
    ):
        print(f"{message.type}: {message.content}")


if __name__ == "__main__":
    main()
