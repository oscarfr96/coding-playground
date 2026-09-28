"""OIDC access-token validation and current teacher identity."""

import os
from typing import Any
from uuid import UUID

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2AuthorizationCodeBearer
from jwt import PyJWKClient
from jwt.exceptions import PyJWKClientConnectionError, PyJWKClientError


OIDC_ISSUER_URL = os.environ.get(
    "OIDC_ISSUER_URL", "http://localhost:8080/realms/school-demo"
).rstrip("/")
OIDC_AUDIENCE = os.environ.get("OIDC_AUDIENCE", "school-assistant-api")
OIDC_JWKS_URL = f"{OIDC_ISSUER_URL}/protocol/openid-connect/certs"

oauth2_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl=f"{OIDC_ISSUER_URL}/protocol/openid-connect/auth",
    tokenUrl=f"{OIDC_ISSUER_URL}/protocol/openid-connect/token",
    scopes={"openid": "Sign in with OpenID Connect"},
)
jwks_client = PyJWKClient(OIDC_JWKS_URL)


class InvalidAccessTokenError(Exception):
    """Raised when an access token is invalid or lacks a teacher identity."""


class IdentityProviderUnavailableError(Exception):
    """Raised when the identity provider's signing keys cannot be reached."""


def validate_access_token(token: str) -> dict[str, Any]:
    """Validate an OIDC access token and return its trusted claims.

    This function is framework-independent so both FastAPI and MCP can use the
    same JWT validation rules.
    """
    try:
        signing_key = jwks_client.get_signing_key_from_jwt(token)
    except PyJWKClientConnectionError as exc:
        raise IdentityProviderUnavailableError from exc
    except PyJWKClientError as exc:
        raise InvalidAccessTokenError from exc

    try:
        claims = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            audience=OIDC_AUDIENCE,
            issuer=OIDC_ISSUER_URL,
            options={"require": ["exp", "iss", "aud", "sub"]},
        )
        teacher_id_claim = claims["teacher_id"]
        if not isinstance(teacher_id_claim, str):
            raise TypeError("teacher_id claim must be a string")
        UUID(teacher_id_claim)
    except (jwt.PyJWTError, KeyError, TypeError, ValueError) as exc:
        raise InvalidAccessTokenError from exc

    return claims


def get_current_teacher_id(token: str = Depends(oauth2_scheme)) -> UUID:
    """FastAPI dependency that returns the teacher mapped to the access token."""
    try:
        claims = validate_access_token(token)
    except IdentityProviderUnavailableError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Identity provider is unavailable",
        ) from exc
    except InvalidAccessTokenError as exc:
        raise _invalid_credentials() from exc

    return UUID(claims["teacher_id"])


def _invalid_credentials() -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
