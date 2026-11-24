from fastapi.testclient import TestClient


def test_status(client: TestClient) -> None:
    response = client.get("/api/status")

    assert response.status_code == 200
    assert response.json() == {"status": "ok", "version": "unknown"}
