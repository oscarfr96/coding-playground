"""Recuperar con varias formulaciones y generar una respuesta con fuentes."""

from llm_playground.models import create_chat_model
from llm_playground.rag import answer_question, index_path, multi_query, require_index


def main() -> None:
    store = require_index(index_path("contratos"), "contratos")
    llm = create_chat_model()
    question = "¿Qué gastos corresponden a Alex Demo en el local?"
    documents = multi_query(question, store.as_retriever(search_kwargs={"k": 2}), llm)
    result = answer_question(question, documents, llm)
    print(result.answer)
    for doc in result.documents:
        print("Fuente:", doc.metadata)


if __name__ == "__main__":
    main()
