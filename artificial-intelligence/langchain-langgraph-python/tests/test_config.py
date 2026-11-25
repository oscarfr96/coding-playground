import pytest

from llm_playground import config


def test_dotenv_does_not_override_environment(tmp_path, monkeypatch):
    (tmp_path / ".env").write_text(
        'OPENAI_API_KEY="file-key"\nOPENAI_API_MODEL="model-from-file"\n', encoding="utf-8"
    )
    monkeypatch.setattr(config, "ROOT_DIR", tmp_path)
    monkeypatch.setenv("OPENAI_API_KEY", "environment-key")
    monkeypatch.delenv("OPENAI_API_MODEL", raising=False)
    settings = config.get_settings()
    assert settings.openai_api_key == "environment-key"
    assert settings.openai_api_model == "model-from-file"
    assert "environment-key" not in repr(settings)
    monkeypatch.delenv("OPENAI_API_MODEL")


@pytest.mark.parametrize("key", ["", " ", "replace-me", "sk-your-api-key"])
def test_missing_or_placeholder_key_is_actionable(tmp_path, monkeypatch, key):
    monkeypatch.setattr(config, "ROOT_DIR", tmp_path)
    monkeypatch.setenv("OPENAI_API_KEY", key)
    with pytest.raises(RuntimeError, match="OPENAI_API_KEY"):
        config.get_settings()
