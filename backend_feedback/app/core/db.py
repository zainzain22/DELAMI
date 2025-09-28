import os
from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.pool import NullPool
from sqlalchemy.orm import sessionmaker, declarative_base, Session


DATABASE_URL = os.getenv(
    "DATABASE_URL",
    # Default local Postgres; adjust user/password if needed
    "postgresql+psycopg2://postgres:SaranaZain@localhost:5432/belami",
)

# Use NullPool to avoid connection issues
engine = create_engine(
    DATABASE_URL,
    poolclass=NullPool,
    connect_args={"connect_timeout": 5},
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()




