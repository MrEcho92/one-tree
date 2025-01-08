from fastapi import APIRouter, HTTPException, status

from app.core.database import get_db
from app.models.models import FamilyStory, FamilyTree, Person

router = APIRouter()


@router.get("/tree")
async def get_tree():
    return {"status": "OK"}
