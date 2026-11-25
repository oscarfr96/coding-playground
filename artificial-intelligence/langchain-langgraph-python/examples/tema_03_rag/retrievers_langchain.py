"""Convertir el índice en un retriever que implementa invoke."""

from llm_playground.rag import index_path, require_index


def main() -> None:
    store = require_index(index_path("contratos"), "contratos")
    retriever = store.as_retriever(search_type="similarity", search_kwargs={"k": 2})
    for doc in retriever.invoke("¿Quién paga los suministros del local?"):
        print(doc.metadata, doc.page_content)


if __name__ == "__main__":
    main()
