import os

from fastapi import APIRouter
from sqlmodel import select

from app.db import DependsSession

router = APIRouter()


@router.get("/status")
async def status_check(session: DependsSession) -> dict[str, str]:
    await session.exec(select(True))

    return {"status": "ok", "version": os.environ.get("VERSION", "unknown")}
