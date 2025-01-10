from typing import List

from fastapi import APIRouter, Depends, HTTPException, status

from app.core.database import get_db
from app.models.models import CulturalContext
from app.schemas.schemas import CreateCulturalContextSchema

router = APIRouter()


@router.get(
    "/contexts", response_model=List[CulturalContext], status_code=status.HTTP_200_OK
)
async def get_contexts(db=Depends(get_db)) -> List[CulturalContext]:
    """Get all cultural contexts"""
    try:
        contexts = db.collection("culturalContext").stream()
        return [CulturalContext.from_dict(context.to_dict()) for context in contexts]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get(
    "/contexts/{context_id}",
    response_model=CulturalContext,
    status_code=status.HTTP_200_OK,
)
async def get_context_by_id(context_id: str, db=Depends(get_db)) -> CulturalContext:
    """Get a cultural context by ID"""
    try:
        context = db.collection("culturalContext").document(context_id).get()
        if not context.exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cultural context not found",
            )
        return CulturalContext.from_dict(context.to_dict())
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.post(
    "/contexts", response_model=CulturalContext, status_code=status.HTTP_201_CREATED
)
async def create_context(
    context: CreateCulturalContextSchema, db=Depends(get_db)
) -> CulturalContext:
    """Create a new cultural context"""
    try:
        context = CulturalContext(**context.dict())
        db.collection("culturalContext").document(context.id).set(context.to_dict())
        return context
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.put(
    "/contexts/{context_id}",
    response_model=CulturalContext,
    status_code=status.HTTP_200_OK,
)
async def update_context(
    context_id: str, context: CreateCulturalContextSchema, db=Depends(get_db)
) -> CulturalContext:
    """Update a cultural context by ID"""
    try:
        context = CulturalContext(**context.dict())
        db.collection("culturalContext").document(context_id).set(context.to_dict())
        return context
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.delete(
    "/contexts/{context_id}",
    response_model=CulturalContext,
    status_code=status.HTTP_200_OK,
)
async def delete_context(context_id: str, db=Depends(get_db)) -> None:
    """Delete a cultural context by ID"""
    try:
        db.collection("culturalContext").document(context_id).delete()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
