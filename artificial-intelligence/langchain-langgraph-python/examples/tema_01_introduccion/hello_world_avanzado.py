"""De una llamada directa a una cadena con plantilla y salida de texto."""

from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate

from llm_playground.models import create_chat_model


def main() -> None:
    prompt = PromptTemplate.from_template("Saluda brevemente al usuario: {nombre}.")
    # LCEL compone objetos Runnable con |; sustituye el antiguo LLMChain.run.
    chain = prompt | create_chat_model() | StrOutputParser()
    print(chain.invoke({"nombre": "Óscar"}))


if __name__ == "__main__":
    main()
