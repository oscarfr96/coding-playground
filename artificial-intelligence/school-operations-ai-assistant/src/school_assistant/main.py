import logging
from time import perf_counter
from uuid import UUID, uuid4

from fastapi import Depends, FastAPI, HTTPException, Request, Security
from sqlalchemy import text
from sqlalchemy.orm import Session

from .database.session import get_db
from .schemas import AssistantRequest, AssistantResponse, StudentSummary
from .security import get_current_teacher_id, oauth2_scheme
from .services.assistant import (
    AssistantNotConfiguredError,
    AssistantTimeoutError,
    AssistantUpstreamError,
    answer_question,
)
from .services.observability import configure_logging, current_request_id
from .services.rate_limit import (
    AssistantRateLimitExceeded,
    enforce_assistant_rate_limit,
)
from .services.students import get_student_summary

configure_logging()
logger = logging.getLogger("school_assistant.api")

app = FastAPI(
    title="School Operations AI Assistant",
    description="Interview preparation proof of concept for a secure school assistant.",
    version="0.1.0",
    swagger_ui_init_oauth={
        "clientId": "school-assistant-api",
        "usePkceWithAuthorizationCodeGrant": True,
    }
)


@app.middleware("http")
async def correlate_and_log_request(request: Request, call_next):
    request_id = str(uuid4())
    token = current_request_id.set(request_id)
    started = perf_counter()
    try:
        response = await call_next(request)
        response.headers["X-Request-ID"] = request_id
        route = request.scope.get("route")
        route_path = getattr(route, "path", "unmatched")
        logger.info(
            "http_request_complete",
            extra={
                "request_id": request_id,
                "method": request.method,
                "path": route_path,
                "status_code": response.status_code,
                "duration_ms": round((perf_counter() - started) * 1000),
            },
        )
        return response
    except Exception as exc:
        route = request.scope.get("route")
        route_path = getattr(route, "path", "unmatched")
        logger.exception(
            "http_request_failed",
            extra={
                "request_id": request_id,
                "method": request.method,
                "path": route_path,
                "duration_ms": round((perf_counter() - started) * 1000),
                "error_type": type(exc).__name__,
            },
        )
        raise
    finally:
        current_request_id.reset(token)


@app.get("/health")
def health_check():
    """Liveness only: confirms that the API process can serve HTTP."""
    return {"status": "healthy"}


@app.get("/ready")
def readiness_check(db: Session = Depends(get_db)):
    """Readiness check for the database dependency."""
    try:
        db.execute(text("SELECT 1"))
    except Exception as exc:
        logger.warning(
            "database_readiness_failed",
            extra={"error_type": type(exc).__name__},
        )
        raise HTTPException(status_code=503, detail="Database is unavailable") from exc
    return {"status": "ready", "database": "available"}


@app.get("/students/{student_id}", response_model=StudentSummary)
def get_student(
    student_id: UUID,
    db: Session = Depends(get_db),
    teacher_id: UUID = Security(get_current_teacher_id, scopes=["openid"]),
) -> StudentSummary:
    summary = get_student_summary(
        student_id=student_id,
        teacher_id=teacher_id,
        db=db,
    )
    if summary is None:
        raise HTTPException(status_code=404, detail="Student not found")

    return summary


@app.post("/assistant/chat", response_model=AssistantResponse)
async def chat_with_assistant(
    request: AssistantRequest,
    access_token: str = Depends(oauth2_scheme),
    _teacher_id: UUID = Security(get_current_teacher_id, scopes=["openid"]),
) -> AssistantResponse:
    """Answer one bounded question using only reviewed, authenticated MCP tools."""
    # Authentication gives the trusted identity used for rate limiting. The ID
    # itself is never sent to the model or accepted from user input.
    try:
        await enforce_assistant_rate_limit(_teacher_id)
    except AssistantRateLimitExceeded as exc:
        raise HTTPException(
            status_code=429,
            detail="Assistant request limit reached; try again shortly",
            headers={"Retry-After": str(exc.retry_after_seconds)},
        ) from exc
    try:
        return await answer_question(
            question=request.question,
            access_token=access_token,
        )
    except AssistantNotConfiguredError as exc:
        raise HTTPException(
            status_code=503,
            detail="AI assistant is not configured",
        ) from exc
    except AssistantTimeoutError as exc:
        raise HTTPException(
            status_code=504,
            detail="AI assistant request timed out",
        ) from exc
    except AssistantUpstreamError as exc:
        raise HTTPException(
            status_code=502,
            detail="AI assistant service failed to complete the request",
        ) from exc
