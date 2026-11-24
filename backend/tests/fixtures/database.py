import alembic.config
import psycopg
import pytest
from pytest_docker.plugin import Services

from app.db import get_engine, get_sessionmaker
from app.settings import get_settings


def _is_postgres_ready(dsn: str) -> bool:
    try:
        with psycopg.connect(dsn, connect_timeout=1):
            return True
    except psycopg.OperationalError:
        return False


@pytest.fixture(scope="session")
def database_url(docker_ip: str, docker_services: Services) -> str:
    port = docker_services.port_for("db", 5432)
    dsn = f"postgresql://postgres:postgres@{docker_ip}:{port}"
    docker_services.wait_until_responsive(check=lambda: _is_postgres_ready(dsn), timeout=60.0, pause=0.5)

    return f"postgresql+psycopg://postgres:postgres@{docker_ip}:{port}"


@pytest.fixture(scope="session")
def database(database_url: str) -> None:
    with pytest.MonkeyPatch.context() as mp:
        mp.setenv("DATABASE_URL", database_url)
        get_settings.cache_clear()
        get_engine.cache_clear()
        get_sessionmaker.cache_clear()

        alembic.config.main(argv=["upgrade", "head"])
