"""Indexar la base de conocimiento de soporte incluida en el curso."""

from apps.helpdesk_system.service import KNOWLEDGE_DIR
from llm_playground.rag import build_index, index_path, load_documents


def main() -> None:
    store = build_index(load_documents(KNOWLEDGE_DIR), index_path("helpdesk"), "helpdesk")
    print("Fragmentos de soporte:", len(store.get(include=[])["ids"]))


if __name__ == "__main__":
    main()
