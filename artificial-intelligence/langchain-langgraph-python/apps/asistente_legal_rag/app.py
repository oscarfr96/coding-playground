"""RAG documental sobre contratos ficticios con fuentes visibles."""

import streamlit as st

from apps.asistente_legal_rag.service import query_rag
from apps.ui import show_error
from llm_playground.config import SAMPLE_DIR
from llm_playground.models import create_chat_model
from llm_playground.rag import (
    build_index,
    format_documents,
    index_path,
    load_documents,
    require_index,
)


def main() -> None:
    st.set_page_config(page_title="Asistente de contratos", page_icon="📚", layout="wide")
    st.title("Asistente de contratos")
    st.caption("Demo educativa sobre contratos ficticios. Consulta documental con fuentes.")
    st.sidebar.write("Recuperación: MMR + multiquery + fusión de rankings.")
    if st.sidebar.button("Indexar contratos de ejemplo"):
        try:
            with st.spinner("Indexando..."):
                build_index(load_documents(SAMPLE_DIR / "contratos"), index_path("legal"), "legal")
            st.sidebar.success("Índice preparado.")
        except Exception as error:
            show_error(error)
    if st.sidebar.button("Limpiar conversación"):
        st.session_state.messages = []
    st.sidebar.caption("Cada pregunta se consulta de forma independiente; usa nombres explícitos.")
    history = st.session_state.setdefault("messages", [])
    for message in history:
        with st.chat_message(message["role"]):
            st.write(message["content"])
            if message.get("sources"):
                with st.expander("Fragmentos utilizados"):
                    st.text(message["sources"])
    if question := st.chat_input("¿Cuál es la renta del local de Alex Demo?"):
        try:
            with st.spinner("Consultando documentos..."):
                store = require_index(index_path("legal"), "legal")
                result = query_rag(question, store, create_chat_model())
            history.extend(
                [
                    {"role": "user", "content": question},
                    {
                        "role": "assistant",
                        "content": result.answer,
                        "sources": format_documents(result.documents),
                    },
                ]
            )
            st.rerun()
        except Exception as error:
            show_error(error)


if __name__ == "__main__":
    main()
