from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.v1.routes import api_router

app = FastAPI()

app.include_router(api_router, prefix="/v1")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    return {"message": "Hello, world!"}


@app.get("/health")
async def health_check():
    return {"status": "ok"}
