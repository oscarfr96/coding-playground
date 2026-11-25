"""Cargar documentos y conservar sus metadatos de origen."""

import argparse
from pathlib import Path

from llm_playground.config import SAMPLE_DIR
from llm_playground.rag import load_documents


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--path", type=Path, default=SAMPLE_DIR / "contratos")
    args = parser.parse_args()
    for doc in load_documents(args.path):
        print(doc.metadata)
        print(doc.page_content)


if __name__ == "__main__":
    main()
