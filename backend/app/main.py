from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI

from .api import router
from .db import get_engine


@asynccontextmanager
async def lifespan(_app: FastAPI) -> AsyncGenerator[None]:
    yield
    await get_engine().dispose()


def create_app() -> FastAPI:
    app = FastAPI(
        title="Project API",
        lifespan=lifespan,
    )

    app.include_router(router)

    return app


app = create_app()
