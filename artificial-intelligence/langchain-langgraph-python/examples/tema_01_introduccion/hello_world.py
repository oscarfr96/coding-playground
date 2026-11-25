"""Primera llamada: una pregunta entra y un AIMessage sale."""

from llm_playground.models import create_chat_model


def main() -> None:
    llm = create_chat_model()
    question = "¿Cuál es la capital de Francia?"
    print(f"Pregunta: {question}")
    print(f"Respuesta: {llm.invoke(question).content}")


if __name__ == "__main__":
    main()
