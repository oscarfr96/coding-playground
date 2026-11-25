"""Contrato de salida del ejercicio de análisis de CV."""

from pydantic import BaseModel, Field


class AnalisisCV(BaseModel):
    nombre_candidato: str
    experiencia_anos: float | None = Field(ge=0, description="Años explícitos; null si no constan")
    habilidades_clave: list[str]
    educacion: str
    experiencia_relevante: str
    fortalezas: list[str]
    areas_mejora: list[str]
    porcentaje_ajuste: int = Field(ge=0, le=100, description="Estimación orientativa, no calibrada")
    evidencias: list[str] = Field(description="Citas breves del CV que sustentan el análisis")
