from fastapi import APIRouter, HTTPException, status

from app.core.database import get_db
from app.models.models import UserProfile

router = APIRouter()


@router.get("/users")
async def users():
    return {"status": "OK"}
