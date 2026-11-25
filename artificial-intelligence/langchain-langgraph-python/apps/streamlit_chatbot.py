"""Chat básico con historial en sesión y respuesta por streaming."""

import streamlit as st
from langchain_core.messages import AIMessage, HumanMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

from apps.ui import show_error
from llm_playground.models import create_chat_model


def main() -> None:
    st.set_page_config(page_title="Chat con LangChain", page_icon="💬")
    st.title("Chat con LangChain")
    st.caption("Historial en esta sesión; se pierde al cerrar la aplicación.")
    temperature = st.sidebar.slider("Temperatura", 0.0, 1.0, 0.3, 0.1)
    if st.sidebar.button("Nueva conversación"):
        st.session_state.messages = []
    history = st.session_state.setdefault("messages", [])
    for message in history:
        with st.chat_message("user" if message.type == "human" else "assistant"):
            st.write(message.content)
    if question := st.chat_input("Escribe tu mensaje"):
        with st.chat_message("user"):
            st.write(question)
        try:
            prompt = ChatPromptTemplate.from_messages(
                [
                    ("system", "Eres un asistente útil y conciso."),
                    MessagesPlaceholder("history"),
                    ("human", "question: {question}"),
                ]
            )
            chain = prompt | create_chat_model(temperature=temperature)
            with st.chat_message("assistant"):
                response = st.write_stream(chain.stream({"history": history, "question": question}))
            history.extend([HumanMessage(content=question), AIMessage(content=response)])
        except Exception as error:
            show_error(error)


if __name__ == "__main__":
    main()
