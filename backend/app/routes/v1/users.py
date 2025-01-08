from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter()


@router.get("/users")
async def users():
    return {"status": "OK"}
