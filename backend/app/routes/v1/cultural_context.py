from fastapi import APIRouter, HTTPException, status

from app.core.database import get_db
from app.models.models import CulturalContext

router = APIRouter()


@router.get("/context")
async def cultural_context():
    return {"status": "OK"}
