"""RunnableLambda: composición, invocación individual y procesamiento por lotes."""

from langchain_core.runnables import RunnableLambda


def duplicate_text(text: str) -> list[str]:
    """Una función de Python puede ser un paso de una cadena."""
    return [text] * 2


def create_chain():
    return RunnableLambda(lambda number: f"Número {number}") | RunnableLambda(duplicate_text)


def main() -> None:
    chain = create_chain()
    print(chain.invoke(5))
    print(chain.batch([1, 2, 3]))


if __name__ == "__main__":
    main()
