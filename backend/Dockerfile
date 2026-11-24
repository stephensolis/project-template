# syntax=docker/dockerfile:1

# ---- Builder Stage ----
FROM ghcr.io/astral-sh/uv:python3.15-alpine AS builder
ENV UV_COMPILE_BYTECODE=1 UV_LINK_MODE=copy

WORKDIR /app
COPY pyproject.toml uv.lock ./

# Install dependencies
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --locked --no-install-project --no-editable --no-dev

# Install the app
COPY . .
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --locked --no-editable --no-dev

# ---- Final Stage ----
FROM python:3.15-alpine AS final
ENV PYTHONUNBUFFERED=1

ARG VERSION
ENV VERSION=$VERSION

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Install runtime dependencies
RUN apk add --no-cache \
    postgresql-libs

WORKDIR /app
COPY --from=builder --chown=appuser:appgroup /app/.venv /app/.venv
ENV PATH="/app/.venv/bin:$PATH"

USER appuser
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
