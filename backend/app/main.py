from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import lifespan
from app.routes.v1.routes import api_router

app = FastAPI(lifespan=lifespan, title=settings.PROJECT_NAME)

app.include_router(api_router, prefix=settings.API_V1_STR)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    return {"status": "OK"}
