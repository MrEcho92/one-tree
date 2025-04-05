import os

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from app.core.config import settings
from app.core.database import lifespan
from app.routes.v1.routes import api_router

# Define the global limit (e.g., 50 requests per minute per IP)
limiter = Limiter(key_func=get_remote_address, default_limits=["50/minute"])

app = FastAPI(lifespan=lifespan, title=settings.PROJECT_NAME)

app.include_router(api_router, prefix=settings.API_V1_STR)

# Attach the limiter to the app
app.state.limiter = limiter

# Define allowed origins based on environment
ENV = os.getenv("ENV", "dev")  # Default to 'development'

if ENV == "prod":
    ALLOWED_ORIGINS = [
        "https://one-tree-2025.web.app",
        "https://one-tree-2025.firebaseapp.com",
    ]
else:  # Development mode
    ALLOWED_ORIGINS = [
        "http://localhost:3000",
    ]

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check(request: Request):
    return {"status": "OK"}


# Optional: Custom handler for 429 errors
@app.exception_handler(RateLimitExceeded)
async def custom_rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=status.HTTP_429_TOO_MANY_REQUESTS,
        content={"detail": "Rate limit exceeded. Please try again later."},
    )
