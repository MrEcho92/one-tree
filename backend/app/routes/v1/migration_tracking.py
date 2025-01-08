from fastapi import APIRouter, HTTPException, status

from app.core.database import get_db
from app.models.models import MigrationEvent, MigrationRecord

router = APIRouter()


@router.get("/tracker")
async def migration_tracker():
    return {"status": "OK"}
