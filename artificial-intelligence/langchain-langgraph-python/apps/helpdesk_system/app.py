"""Crear tickets, consultar su estado y reanudar los que esperan intervención."""

from uuid import uuid4

import streamlit as st
from langgraph.types import Command

from apps.helpdesk_system.service import (
    KNOWLEDGE_DIR,
    add_ticket,
    open_helpdesk,
    ticket_catalog,
)
from apps.ui import show_error
from llm_playground.rag import build_index, format_documents, index_path, load_documents


def main() -> None:
    st.set_page_config(page_title="Helpdesk con revisión humana", page_icon="🎫", layout="wide")
    st.title("Helpdesk con revisión humana")
    st.caption("Demo local: recuperación documental, clasificación y respuesta de un agente.")
    if st.sidebar.button("Indexar base de conocimiento"):
        try:
            build_index(load_documents(KNOWLEDGE_DIR), index_path("helpdesk"), "helpdesk")
            st.sidebar.success("Base preparada.")
        except Exception as error:
            show_error(error)
    with st.form("ticket"):
        question = st.text_area("Consulta", placeholder="¿Cómo restablezco mi contraseña?")
        submitted = st.form_submit_button("Crear ticket")
    if submitted:
        if not question.strip():
            st.error("Describe la consulta.")
        else:
            try:
                ticket_id = str(uuid4())
                with open_helpdesk() as graph:
                    graph.invoke(
                        {"question": question, "logs": []},
                        {"configurable": {"thread_id": ticket_id}},
                    )
                add_ticket(ticket_id, question)
                st.session_state.selected_ticket = ticket_id
            except Exception as error:
                show_error(error)
    tickets = ticket_catalog()
    if not tickets:
        st.info("Todavía no hay tickets. Prepara el índice y crea el primero.")
        return
    labels = {row[0]: row[1][:70] for row in tickets}
    ids = list(labels)
    selected = st.session_state.get("selected_ticket")
    ticket_id = st.selectbox(
        "Tickets",
        ids,
        index=ids.index(selected) if selected in ids else 0,
        format_func=lambda identity: labels[identity],
    )
    config = {"configurable": {"thread_id": ticket_id}}
    try:
        with open_helpdesk() as graph:
            snapshot = graph.get_state(config)
            state = snapshot.values
            if not state:
                st.warning("No se encontró el estado del ticket.")
                return
            st.write(state["question"])
            st.write("Criterio de resolución:", state.get("reason", ""))
            with st.expander("Fragmentos recuperados y pasos"):
                st.text(format_documents(state.get("documents", [])))
                st.write(state.get("logs", []))
            if snapshot.next:
                st.warning("Pendiente de respuesta del agente.")
                with st.form("human_reply"):
                    answer = st.text_area("Respuesta del agente")
                    resume = st.form_submit_button("Enviar respuesta")
                if resume:
                    if not answer.strip():
                        st.error("Escribe una respuesta antes de enviarla.")
                    else:
                        graph.invoke(Command(resume=answer), config)
                        st.rerun()
            else:
                st.success(f"Resuelto por: {state.get('resolved_by', 'sin determinar')}")
                st.write(state.get("answer", ""))
    except Exception as error:
        show_error(error)


if __name__ == "__main__":
    main()
