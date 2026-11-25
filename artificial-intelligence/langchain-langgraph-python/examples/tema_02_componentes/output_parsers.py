"""Validar una respuesta estructurada con Pydantic."""

from typing import Literal

from pydantic import BaseModel, Field

from llm_playground.models import create_chat_model


class AnalisisTexto(BaseModel):
    """El sentimiento debe pertenecer al vocabulario definido."""

    resumen: str = Field(description="Resumen breve del texto")
    sentimiento: Literal["positivo", "neutro", "negativo"]


def main() -> None:
    structured_llm = create_chat_model().with_structured_output(AnalisisTexto)
    result = structured_llm.invoke("Analiza este texto: Me ha encantado la película.")
    print(result.model_dump_json(indent=2))


if __name__ == "__main__":
    main()
