from fastapi import APIRouter

router = APIRouter(prefix="/api")


@router.get("/status")
async def status_check() -> dict[str, str]:
    """Status check endpoint."""
    return {"status": "healthy"}
