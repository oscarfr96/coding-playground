"""Privacy-conscious request correlation and JSON application logging."""

from __future__ import annotations

import json
import logging
import sys
from contextvars import ContextVar

current_request_id: ContextVar[str] = ContextVar("request_id", default="-")

_LOG_FIELDS = (
    "request_id", "method", "path", "status_code", "duration_ms", "model",
    "prompt_version", "tool_name", "input_tokens", "output_tokens", "error_type",
    "status",
)


class _JsonFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        payload: dict[str, object] = {
            "timestamp": self.formatTime(record, "%Y-%m-%dT%H:%M:%S%z"),
            "level": record.levelname,
            "event": record.getMessage(),
            "request_id": getattr(record, "request_id", current_request_id.get()),
        }
        for field in _LOG_FIELDS:
            if field in {"request_id"}:
                continue
            value = getattr(record, field, None)
            if value is not None:
                payload[field] = value
        if record.exc_info:
            payload["exception_type"] = record.exc_info[0].__name__
        return json.dumps(payload, ensure_ascii=False, separators=(",", ":"))


def configure_logging() -> None:
    logger = logging.getLogger("school_assistant")
    if logger.handlers:
        return
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(_JsonFormatter())
    logger.addHandler(handler)
    logger.setLevel(logging.INFO)
    logger.propagate = False
