from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter()


@router.get("/tracker")
async def migration_tracker():
    return {"status": "OK"}
