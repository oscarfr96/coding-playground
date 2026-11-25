"""Conexiones acotadas y catálogo persistente de tickets de la demo local."""

import sqlite3
from contextlib import closing, contextmanager
from datetime import UTC, datetime
from pathlib import Path

from langgraph.checkpoint.sqlite import SqliteSaver

from apps.helpdesk_system.graph import create_helpdesk
from llm_playground.config import DATA_DIR
from llm_playground.models import create_chat_model
from llm_playground.rag import index_path, multi_query, require_index

APP_DIR = DATA_DIR / "helpdesk"
KNOWLEDGE_DIR = Path(__file__).resolve().parent / "knowledge_base"


def ticket_catalog():
    APP_DIR.mkdir(parents=True, exist_ok=True)
    with closing(sqlite3.connect(APP_DIR / "tickets.db")) as conn:
        conn.execute(
            "CREATE TABLE IF NOT EXISTS tickets (id TEXT PRIMARY KEY, question TEXT, created TEXT)"
        )
        conn.commit()
        return conn.execute(
            "SELECT id, question, created FROM tickets ORDER BY created DESC"
        ).fetchall()


def add_ticket(ticket_id: str, question: str):
    ticket_catalog()
    with closing(sqlite3.connect(APP_DIR / "tickets.db")) as conn:
        conn.execute(
            "INSERT INTO tickets VALUES (?, ?, ?)",
            (ticket_id, question, datetime.now(UTC).isoformat()),
        )
        conn.commit()


@contextmanager
def open_helpdesk():
    APP_DIR.mkdir(parents=True, exist_ok=True)
    llm = create_chat_model()
    store = require_index(index_path("helpdesk"), "helpdesk")
    retriever = store.as_retriever(search_kwargs={"k": 3})

    def retrieve(question):
        return multi_query(question, retriever, llm)

    with SqliteSaver.from_conn_string(str(APP_DIR / "checkpoints.db")) as checkpointer:
        yield create_helpdesk(retrieve, llm, checkpointer)
