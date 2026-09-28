import os
from collections.abc import Generator

from sqlalchemy import URL, create_engine
from sqlalchemy.orm import Session, sessionmaker


database_url = URL.create(
    drivername="postgresql+psycopg",
    username=os.environ["APP_DB_USER"],
    password=os.environ["APP_DB_PASSWORD"],
    host="localhost",
    port=5432,
    database=os.environ["POSTGRES_DB"],
)

engine = create_engine(database_url, pool_pre_ping=True)

SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)


def get_db() -> Generator[Session, None, None]:
    """Provide one database session per request and close it afterwards."""
    with SessionLocal() as session:
        yield session
