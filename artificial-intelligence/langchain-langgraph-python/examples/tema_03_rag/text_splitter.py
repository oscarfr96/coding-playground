"""Dividir documentos en fragmentos con solapamiento; no requiere una API."""

from llm_playground.config import SAMPLE_DIR
from llm_playground.rag import load_documents, split_documents


def main() -> None:
    documents = load_documents(SAMPLE_DIR / "contratos")
    # El tamaño se mide en caracteres. El solapamiento conserva contexto local.
    chunks = split_documents(documents, chunk_size=200, overlap=40)
    print(f"Documentos: {len(documents)}; fragmentos: {len(chunks)}")
    for chunk in chunks:
        print(chunk.metadata, repr(chunk.page_content))


if __name__ == "__main__":
    main()
