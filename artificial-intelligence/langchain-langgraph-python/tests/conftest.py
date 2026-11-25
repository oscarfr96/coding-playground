"""Dobles locales para verificar flujos sin credenciales ni llamadas de pago."""

import socket

import pytest
from langchain_core.messages import AIMessage
from langchain_core.runnables import Runnable, RunnableLambda


@pytest.fixture(autouse=True)
def no_network(monkeypatch):
    original_connect = socket.socket.connect

    def blocked(connection, address):
        # asyncio usa loopback para su socketpair en Windows; no es una API externa.
        if isinstance(address, tuple) and address[0] in {"127.0.0.1", "::1"}:
            return original_connect(connection, address)
        raise AssertionError("Las pruebas del curso no pueden acceder a la red externa.")

    monkeypatch.setattr(socket.socket, "connect", blocked)
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    monkeypatch.setenv("ANONYMIZED_TELEMETRY", "False")


class ModelStub(Runnable):
    def __init__(self, *, text="Respuesta de prueba", structured=None):
        self.text = text
        self.structured = structured or {}
        self.inputs = []

    def invoke(self, input, config=None, **kwargs):
        self.inputs.append(input)
        return AIMessage(content=self.text)

    def with_structured_output(self, schema):
        def predict(input):
            self.inputs.append(input)
            value = self.structured[schema.__name__]
            if isinstance(value, Exception):
                raise value
            if isinstance(value, list):
                value = value.pop(0)
            return schema(**value)

        return RunnableLambda(predict)


@pytest.fixture
def model():
    return ModelStub()
