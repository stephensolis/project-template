# syntax=docker/dockerfile:1

# ---- Builder Stage ----
# Uses uv's official image with Python 3.13 and uv pre-installed.
FROM ghcr.io/astral-sh/uv:python3.13-alpine AS builder

# Set environment variables for uv
ENV UV_COMPILE_BYTECODE=1 UV_LINK_MODE=copy

WORKDIR /app

# Copy project definition and lock file
COPY pyproject.toml uv.lock ./

# Install project dependencies (excluding the project itself) using cache mount
# --no-editable prepares the venv for copying without source code
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --locked --no-install-project --no-editable --no-dev

# Copy the rest of the application source code
COPY . .

# Install the project itself into the virtual environment
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --locked --no-editable --no-dev

# ---- Final Stage ----
# Use the official Python Alpine image for a smaller final size
FROM python:3.13-alpine AS final

# Install only runtime dependencies
RUN apk add --no-cache \
    postgresql-libs

# Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy the virtual environment from the builder stage
COPY --from=builder --chown=appuser:appgroup /app/.venv /app/.venv

# Add venv binaries to the PATH
ENV PATH="/app/.venv/bin:$PATH"

# Switch to the non-root user
USER appuser

# Expose the port
EXPOSE 8000

# Set environment variable for number of workers
ENV WEB_CONCURRENCY=2

# Run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
