"""Preprocesamiento → resumen y sentimiento en paralelo → resultado unificado."""

from typing import Literal

from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableLambda, RunnableParallel
from pydantic import BaseModel

from llm_playground.models import create_chat_model


class Sentiment(BaseModel):
    sentimiento: Literal["positivo", "negativo", "neutro"]
    razon: str


def preprocess_text(text: str) -> str:
    """Acota la entrada de esta demo; no es un resumen de documentos largos."""
    return " ".join(text.split())[:500]


def create_chain(llm):
    summary = (
        ChatPromptTemplate.from_template("Resume en una oración: {text}") | llm | StrOutputParser()
    )
    sentiment = ChatPromptTemplate.from_template(
        "Analiza el sentimiento del texto: {text}"
    ) | llm.with_structured_output(Sentiment)
    # Ambas ramas reciben la misma entrada. Un error de análisis se propaga:
    # no se disfraza de sentimiento neutro.
    parallel = RunnableParallel(resumen=summary, analisis=sentiment)
    return (
        RunnableLambda(lambda text: {"text": preprocess_text(text)})
        | parallel
        | RunnableLambda(lambda data: {"resumen": data["resumen"], **data["analisis"].model_dump()})
    )


def main() -> None:
    chain = create_chain(create_chat_model())
    reviews = [
        "¡Me encanta este producto! Funciona perfectamente.",
        "El servicio fue terrible y nadie me ayudó.",
        "El paquete llegó el martes.",
    ]
    # batch paraleliza las entradas; cada entrada hace dos llamadas al modelo.
    for review, result in zip(
        reviews, chain.batch(reviews, config={"max_concurrency": 2}), strict=True
    ):
        print(review)
        print(result)


if __name__ == "__main__":
    main()
