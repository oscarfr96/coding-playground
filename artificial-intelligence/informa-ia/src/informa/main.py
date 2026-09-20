from fastapi import FastAPI

from informa.routers import health


def create_app() -> FastAPI:
    app = FastAPI(title="Informa API", description="API for Informa service", version="0.1.0")
    app.include_router(health.router)
    return app

app = create_app()