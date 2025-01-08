from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter()


@router.get("/context")
async def cultural_context():
    return {"status": "OK"}
