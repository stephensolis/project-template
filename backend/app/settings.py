from functools import lru_cache
from typing import Annotated

from fastapi import Depends
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    model_config = {
        "env_file": ".env",
    }

    cors_origins: list[str] = ["*"]


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()


DependsSettings = Annotated[Settings, Depends(get_settings)]
