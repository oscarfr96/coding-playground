"""Indexar el corpus de prueba en Chroma sin duplicarlo al repetir el ejercicio."""

import argparse
from pathlib import Path

from llm_playground.config import SAMPLE_DIR
from llm_playground.rag import build_index, index_path, load_documents


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--path", type=Path, default=SAMPLE_DIR / "contratos")
    args = parser.parse_args()
    store = build_index(load_documents(args.path), index_path("contratos"), "contratos")
    print(f"Fragmentos indexados: {len(store.get(include=[])['ids'])}")
    for doc in store.similarity_search("¿Cuál es la renta del local de Alex Demo?", k=2):
        print(doc.metadata, doc.page_content)


if __name__ == "__main__":
    main()
