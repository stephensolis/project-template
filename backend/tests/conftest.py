from collections.abc import Iterator

import pytest
from fastapi.testclient import TestClient

from app.main import create_app

pytest_plugins = ["tests.fixtures.database"]


@pytest.fixture
def client(database: None) -> Iterator[TestClient]:
    with TestClient(create_app()) as test_client:
        yield test_client
