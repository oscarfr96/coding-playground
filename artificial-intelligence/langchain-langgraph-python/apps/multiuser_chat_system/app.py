"""Demo local con selección de usuario, varios chats y gestión de recuerdos."""

import streamlit as st

from apps.multiuser_chat_system.service import ChatService
from apps.multiuser_chat_system.storage import ChatRepository
from apps.ui import show_error
from llm_playground.config import DATA_DIR
from llm_playground.memory import UserMemories
from llm_playground.models import create_chat_model
from llm_playground.rag import index_path, open_store


def main() -> None:
    st.set_page_config(page_title="Chat con memoria por usuario", page_icon="🧠", layout="wide")
    st.title("Chat con memoria por usuario")
    st.caption("Demo local sin autenticación. El selector de usuario no controla acceso de red.")
    repository = ChatRepository(DATA_DIR / "multiuser")
    service = ChatService(repository)
    with st.sidebar.form("create_user"):
        new_user = st.text_input("Nuevo usuario")
        create = st.form_submit_button("Crear usuario")
    if create:
        try:
            repository.create_user(new_user.strip())
            st.rerun()
        except Exception as error:
            show_error(error)
    users = repository.users()
    if not users:
        st.info("Crea un usuario para comenzar.")
        return
    user = st.sidebar.selectbox("Usuario", users)
    if st.sidebar.button("Nuevo chat"):
        st.session_state[f"chat_selector_{user}"] = repository.create_chat(user)
        st.rerun()
    chats = repository.chats(user)
    if not chats:
        st.info("Crea un chat para este usuario.")
        return
    titles = {chat["id"]: chat["title"] for chat in chats}
    ids = list(titles)
    selector_key = f"chat_selector_{user}"
    if st.session_state.get(selector_key) not in ids:
        st.session_state[selector_key] = ids[0]
    chat_id = st.sidebar.selectbox(
        "Conversación",
        ids,
        format_func=lambda identity: titles[identity],
        key=selector_key,
    )
    if st.sidebar.button("Eliminar este chat"):
        try:
            service.delete_chat(user, chat_id)
            st.rerun()
        except Exception as error:
            show_error(error)
    use_memory = st.sidebar.checkbox("Usar y extraer recuerdos", value=True)
    if st.sidebar.checkbox("Ver recuerdos"):
        try:
            memories = UserMemories(open_store(index_path("usuarios"), "usuarios"), user)
            entries = memories.list()
            for identity, content, metadata in zip(
                entries["ids"],
                entries["documents"],
                entries["metadatas"],
                strict=True,
            ):
                with st.expander(f"{metadata['category']}: {content[:60]}"):
                    st.write(content)
                    st.caption(f"Importancia: {metadata['importance']}/5")
                    if st.button("Eliminar recuerdo", key=f"delete_{identity}"):
                        memories.delete(identity)
                        st.rerun()
        except Exception as error:
            show_error(error)
    for message in service.history(user, chat_id):
        if message.type in {"human", "ai"}:
            with st.chat_message("user" if message.type == "human" else "assistant"):
                st.write(message.content)
    if st.session_state.pop("memory_warning", False):
        st.warning("La respuesta está guardada, pero no se pudo extraer un recuerdo de ese turno.")
    if question := st.chat_input("Escribe tu mensaje"):
        try:
            with st.spinner("Preparando respuesta..."):
                memories = (
                    UserMemories(open_store(index_path("usuarios"), "usuarios"), user)
                    if use_memory
                    else None
                )
                result = service.send(user, chat_id, question, create_chat_model(), memories)
            st.session_state.memory_warning = result.memory_warning
            st.rerun()
        except Exception as error:
            show_error(error)


if __name__ == "__main__":
    main()
