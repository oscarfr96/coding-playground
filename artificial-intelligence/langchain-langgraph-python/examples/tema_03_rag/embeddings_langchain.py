"""Comparar el significado de dos textos mediante similitud coseno."""

from math import sqrt

from llm_playground.models import create_embeddings


def cosine_similarity(left: list[float], right: list[float]) -> float:
    """El coseno no es una probabilidad de que dos frases signifiquen lo mismo."""
    if len(left) != len(right) or not left:
        raise ValueError("Los vectores deben tener la misma dimensión y no estar vacíos.")
    norm = sqrt(sum(x * x for x in left) * sum(x * x for x in right))
    if norm == 0:
        raise ValueError("No se puede comparar un vector nulo.")
    return sum(a * b for a, b in zip(left, right, strict=True)) / norm


def main() -> None:
    vectors = create_embeddings().embed_documents(
        [
            "La capital de Francia es París.",
            "París es la ciudad capital de Francia.",
        ]
    )
    print(f"Dimensión: {len(vectors[0])}")
    print(f"Similitud coseno: {cosine_similarity(*vectors):.3f}")


if __name__ == "__main__":
    main()
