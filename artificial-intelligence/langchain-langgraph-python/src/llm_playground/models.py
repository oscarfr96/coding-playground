"""Factorías explícitas: los clientes se crean al ejecutar, nunca al importar."""

from langchain_openai import ChatOpenAI, OpenAIEmbeddings

from .config import get_settings


def create_chat_model(*, temperature: float = 0) -> ChatOpenAI:
    """Usa el modelo elegido en .env, con timeout y reintentos acotados."""
    settings = get_settings()
    return ChatOpenAI(
        api_key=settings.openai_api_key,
        model=settings.openai_api_model,
        temperature=temperature,
        timeout=60,
        max_retries=2,
    )


def create_embeddings() -> OpenAIEmbeddings:
    """Mantiene el mismo espacio vectorial al indexar y consultar."""
    settings = get_settings()
    return OpenAIEmbeddings(
        api_key=settings.openai_api_key,
        model=settings.embedding_model,
        request_timeout=60,
        max_retries=2,
    )
