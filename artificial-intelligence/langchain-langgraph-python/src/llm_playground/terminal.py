"""Entrada de terminal compartida por las demostraciones de memoria."""

from collections.abc import Callable


def run_chat(reply: Callable[[str], str]) -> None:
    """Termina con salir, EOF o Ctrl+C; ignora mensajes vacíos."""
    print("Chat en terminal. Escribe 'salir' para terminar.")
    while True:
        try:
            message = input("Tú: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nHasta luego.")
            return
        if message.lower() in {"salir", "exit", "quit"}:
            return
        if message:
            print("Asistente:", reply(message))
