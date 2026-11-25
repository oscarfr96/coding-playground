"""Catálogo SQLite de usuarios y chats, con pertenencia comprobada en cada operación."""

import re
import sqlite3
from contextlib import closing, contextmanager
from datetime import UTC, datetime
from pathlib import Path
from uuid import uuid4


def validate_user_id(user_id: str) -> None:
    if not re.fullmatch(r"[a-zA-Z0-9_-]{2,30}", user_id):
        raise ValueError(
            "El usuario debe tener 2–30 letras ASCII, números, guiones o guiones bajos."
        )


class ChatRepository:
    def __init__(self, directory: Path):
        self.directory = directory
        directory.mkdir(parents=True, exist_ok=True)
        self.path = directory / "catalog.db"
        with self.connection() as conn:
            conn.executescript(
                "CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY);"
                "CREATE TABLE IF NOT EXISTS chats ("
                "id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id),"
                "title TEXT NOT NULL, updated TEXT NOT NULL, "
                "message_count INTEGER NOT NULL DEFAULT 0);"
            )

    @contextmanager
    def connection(self):
        with closing(sqlite3.connect(self.path)) as conn:
            conn.row_factory = sqlite3.Row
            conn.execute("PRAGMA foreign_keys = ON")
            with conn:
                yield conn

    def users(self) -> list[str]:
        with self.connection() as conn:
            return [row[0] for row in conn.execute("SELECT id FROM users ORDER BY id")]

    def create_user(self, user_id: str) -> None:
        validate_user_id(user_id)
        with self.connection() as conn:
            try:
                conn.execute("INSERT INTO users VALUES (?)", (user_id,))
            except sqlite3.IntegrityError as error:
                raise ValueError("El usuario ya existe.") from error

    def require_user(self, user_id: str) -> None:
        validate_user_id(user_id)
        if user_id not in self.users():
            raise ValueError("El usuario no existe.")

    def chats(self, user_id: str) -> list[dict]:
        self.require_user(user_id)
        with self.connection() as conn:
            return [
                dict(row)
                for row in conn.execute(
                    "SELECT * FROM chats WHERE user_id=? ORDER BY updated DESC",
                    (user_id,),
                )
            ]

    def create_chat(self, user_id: str) -> str:
        self.require_user(user_id)
        identity = str(uuid4())
        with self.connection() as conn:
            conn.execute(
                "INSERT INTO chats (id,user_id,title,updated) VALUES (?,?,?,?)",
                (identity, user_id, "Nuevo chat", datetime.now(UTC).isoformat()),
            )
        return identity

    def require_chat(self, user_id: str, chat_id: str) -> dict:
        self.require_user(user_id)
        with self.connection() as conn:
            row = conn.execute(
                "SELECT * FROM chats WHERE id=? AND user_id=?", (chat_id, user_id)
            ).fetchone()
        if row is None:
            raise ValueError("El chat no pertenece a este usuario.")
        return dict(row)

    def record_turn(self, user_id: str, chat_id: str, first_message: str) -> None:
        chat = self.require_chat(user_id, chat_id)
        title = first_message[:50] if chat["title"] == "Nuevo chat" else chat["title"]
        with self.connection() as conn:
            conn.execute(
                "UPDATE chats SET title=?, updated=?, message_count=message_count+2 "
                "WHERE id=? AND user_id=?",
                (title, datetime.now(UTC).isoformat(), chat_id, user_id),
            )

    def delete_chat(self, user_id: str, chat_id: str) -> None:
        self.require_chat(user_id, chat_id)
        with self.connection() as conn:
            conn.execute("DELETE FROM chats WHERE id=? AND user_id=?", (chat_id, user_id))
