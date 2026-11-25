"""Pruebas de las interfaces reales de Streamlit con servicios simulados."""

from pathlib import Path

import pytest
from conftest import ModelStub
from streamlit.testing.v1 import AppTest

ROOT = Path(__file__).resolve().parents[1]


@pytest.fixture
def isolated_ui(tmp_path, monkeypatch):
    monkeypatch.setattr("llm_playground.config.DATA_DIR", tmp_path)
    monkeypatch.setattr("apps.helpdesk_system.service.APP_DIR", tmp_path / "helpdesk")
    return tmp_path


@pytest.mark.parametrize(
    "app",
    [
        "streamlit_chatbot.py",
        "asistente_legal_rag/app.py",
        "cv_analyzer/app.py",
        "helpdesk_system/app.py",
        "multiuser_chat_system/app.py",
    ],
)
def test_app_starts_without_credentials(app, isolated_ui):
    app_test = AppTest.from_file(str(ROOT / "apps" / app)).run(timeout=20)
    assert not app_test.exception
    assert app_test.title


def test_cv_analysis_can_be_downloaded_and_cleared(isolated_ui, monkeypatch):
    llm = ModelStub(
        structured={
            "AnalisisCV": {
                "nombre_candidato": "Alex Demo",
                "experiencia_anos": 3,
                "habilidades_clave": ["Python"],
                "educacion": "Informática",
                "experiencia_relevante": "Backend",
                "fortalezas": ["Python"],
                "areas_mejora": ["Validar requisitos"],
                "porcentaje_ajuste": 75,
                "evidencias": ["Tres años de experiencia"],
            }
        }
    )
    monkeypatch.setattr("llm_playground.models.create_chat_model", lambda **kwargs: llm)
    app_test = AppTest.from_file(str(ROOT / "apps/cv_analyzer/app.py")).run(timeout=20)
    next(button for button in app_test.button if button.label == "Analizar CV").click().run()
    assert not app_test.exception
    assert app_test.metric[0].value == "75%"
    assert len(app_test.get("download_button")) == 1
    next(button for button in app_test.button if button.label == "Limpiar resultado").click().run()
    assert not app_test.metric


def test_multiuser_ui_creates_chat_and_sends_turn(isolated_ui, monkeypatch):
    monkeypatch.setattr("llm_playground.models.create_chat_model", lambda **kwargs: ModelStub())
    app_test = AppTest.from_file(str(ROOT / "apps/multiuser_chat_system/app.py")).run(timeout=20)
    app_test.text_input[0].set_value("alice")
    next(button for button in app_test.button if button.label == "Crear usuario").click().run()
    next(button for button in app_test.button if button.label == "Nuevo chat").click().run()
    app_test.checkbox[0].uncheck().run()
    app_test.chat_input[0].set_value("Hola").run(timeout=20)
    assert not app_test.exception
    assert len(app_test.chat_message) == 2
    assert app_test.chat_message[1].markdown[0].value == "Respuesta de prueba"
    first_chat = app_test.selectbox[1].value
    next(button for button in app_test.button if button.label == "Nuevo chat").click().run()
    assert app_test.selectbox[1].value != first_chat
    assert len(app_test.chat_message) == 0
    next(button for button in app_test.button if button.label == "Eliminar este chat").click().run()
    assert app_test.selectbox[1].value == first_chat
    assert len(app_test.chat_message) == 2
