from fastapi import APIRouter

router = APIRouter(prefix="/health", tags=["health"])

@router.get("/live")
def live() -> dict[str, str]:
    """Liveness: el proceso responde. Si falla, el orquestador reinica el contenedor."""
    return {"status": "ok"}