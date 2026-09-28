"""Authenticated MCP server exposing read-only school operations tools."""

import asyncio
import os
from uuid import UUID

from mcp.server import MCPServer
from mcp.server.auth.middleware.auth_context import get_access_token
from mcp.server.auth.provider import AccessToken, TokenVerifier
from mcp.server.auth.settings import AuthSettings
from mcp.types import ToolAnnotations

from .database.session import SessionLocal
from .schemas import GetStudentSummaryInput, StudentSummary, StudentSummaryToolResult
from .security import (
    IdentityProviderUnavailableError,
    InvalidAccessTokenError,
    OIDC_AUDIENCE,
    OIDC_ISSUER_URL,
    validate_access_token,
)
from .services.students import get_student_summary as load_student_summary


MCP_RESOURCE_SERVER_URL = os.environ.get(
    "MCP_RESOURCE_SERVER_URL", "http://localhost:8001/mcp"
)


class KeycloakTokenVerifier:
    """Adapt the shared OIDC validator to the MCP SDK's bearer-token contract."""

    async def verify_token(self, token: str) -> AccessToken | None:
        try:
            claims = await asyncio.to_thread(validate_access_token, token)
        except InvalidAccessTokenError:
            return None
        except IdentityProviderUnavailableError:
            # Fail closed and let the HTTP server report an internal failure.
            # Treating an IdP outage as a valid token would be unsafe.
            raise

        scope_claim = claims.get("scope", "")
        scopes = scope_claim.split() if isinstance(scope_claim, str) else []
        authorized_client = claims.get("azp", OIDC_AUDIENCE)

        return AccessToken(
            token=token,
            client_id=str(authorized_client),
            scopes=scopes,
            expires_at=int(claims["exp"]),
            subject=str(claims["sub"]),
            claims=claims,
        )


mcp = MCPServer(
    "School Operations",
    instructions=(
        "Use the available read-only school operations tools. Tool access is "
        "restricted to the authenticated teacher's data."
    ),
    token_verifier=KeycloakTokenVerifier(),
    auth=AuthSettings(
        issuer_url=OIDC_ISSUER_URL,
        resource_server_url=MCP_RESOURCE_SERVER_URL,
        # Keycloak issues the school-assistant-api audience; the verifier checks it.
        validate_token_resource=False,
    ),
)


@mcp.tool(
    name="get_student_summary",
    title="Get student summary",
    annotations=ToolAnnotations(readOnlyHint=True, openWorldHint=False),
)
async def get_student_summary_tool(
    request: GetStudentSummaryInput,
) -> StudentSummaryToolResult:
    """Return a student summary only when the authenticated teacher may view it."""
    access_token = get_access_token()
    if access_token is None or access_token.claims is None:
        raise PermissionError("An authenticated teacher identity is required.")

    teacher_id_claim = access_token.claims.get("teacher_id")
    if not isinstance(teacher_id_claim, str):
        raise PermissionError("An authenticated teacher identity is required.")

    try:
        teacher_id = UUID(teacher_id_claim)
    except ValueError as exc:
        raise PermissionError("An authenticated teacher identity is required.") from exc

    summary = await asyncio.to_thread(
        _load_student_summary,
        request.student_id,
        teacher_id,
    )
    return StudentSummaryToolResult(found=summary is not None, student=summary)


def _load_student_summary(
    student_id: UUID,
    teacher_id: UUID,
) -> StudentSummary | None:
    """Open and close the synchronous database session within its worker thread."""
    with SessionLocal() as db:
        return load_student_summary(
            student_id=student_id,
            teacher_id=teacher_id,
            db=db,
        )


def main() -> None:
    """Run the MCP server locally over authenticated Streamable HTTP."""
    mcp.run(transport="streamable-http", host="127.0.0.1", port=8001)


if __name__ == "__main__":
    main()
