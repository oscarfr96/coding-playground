"""Configuración común; importar un ejemplo no lee claves ni crea directorios."""

import os
from dataclasses import dataclass, field
from pathlib import Path

from dotenv import load_dotenv

ROOT_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = ROOT_DIR / "local_data"
SAMPLE_DIR = ROOT_DIR / "data" / "samples"


@dataclass(frozen=True)
class Settings:
    """Modelos configurables y clave oculta en la representación del objeto."""

    openai_api_key: str = field(repr=False)
    openai_api_model: str = "gpt-4o-mini"
    embedding_model: str = "text-embedding-3-small"


def get_settings() -> Settings:
    """Lee el .env del curso respetando las variables ya exportadas."""
    load_dotenv(ROOT_DIR / ".env", override=False)
    api_key = os.getenv("OPENAI_API_KEY", "").strip()
    if not api_key or api_key in {"sk-your-api-key", "your-api-key", "replace-me"}:
        raise RuntimeError("Configura OPENAI_API_KEY en el .env del curso o en tu entorno.")
    return Settings(
        openai_api_key=api_key,
        openai_api_model=os.getenv("OPENAI_API_MODEL", "gpt-4o-mini").strip() or "gpt-4o-mini",
        embedding_model=os.getenv("OPENAI_EMBEDDING_MODEL", "text-embedding-3-small").strip()
        or "text-embedding-3-small",
    )
