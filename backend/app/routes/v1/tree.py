from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter()


@router.get("/tree")
async def get_tree():
    return {"status": "OK"}
