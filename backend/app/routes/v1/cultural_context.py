from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from google.cloud import firestore

from app.core.constants import CULTURAL_CONTEXT
from app.core.database import get_db
from app.models.models import ContextStatus, CulturalContext
from app.schemas.cultural_schemas import (
    CreateCulturalContextSchema,
    UpdateCulturalContextSchema,
)

router = APIRouter()


@router.get(
    "/contexts",
    response_model=List[CulturalContext],
    status_code=status.HTTP_200_OK,
)
async def get_contexts(db=Depends(get_db)) -> List[CulturalContext]:
    """Get all cultural contexts"""
    try:
        contexts = db.collection(CULTURAL_CONTEXT).stream()
        return [
            CulturalContext.from_dict(context.to_dict())
            for context in contexts
            if context.status == ContextStatus.APPROVED
        ]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get(
    "/contexts/{user_id}",
    response_model=List[CulturalContext],
    status_code=status.HTTP_200_OK,
)
async def get_user_contexts(user_id: str, db=Depends(get_db)) -> List[CulturalContext]:
    """Get all cultural contexts by a user"""
    try:
        contexts = (
            db.collection(CULTURAL_CONTEXT).where("created_by", "==", user_id).stream()
        )
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
        context = db.collection(CULTURAL_CONTEXT).document(context_id).get()
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
    "/contexts",
    response_model=CulturalContext,
    status_code=status.HTTP_201_CREATED,
)
async def create_context(
    context: CreateCulturalContextSchema, db=Depends(get_db)
) -> CulturalContext:
    """Create a new cultural context"""
    try:
        if context.video_url:
            # Handle video URL (e.g., validate, process, etc.)
            # upload to Google cloud storage and generate url
            pass

        if context.image_url:
            # Handle image URL (e.g., validate, process, etc.)
            # upload to Google cloud storage and generate url
            pass

        context = CulturalContext(**context.model_dump())
        db.collection(CULTURAL_CONTEXT).document(context.id).set(context.to_dict())
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
    context_id: str, context: UpdateCulturalContextSchema, db=Depends(get_db)
) -> CulturalContext:
    """Update a cultural context by ID"""
    try:
        context_ref = db.collection(CULTURAL_CONTEXT).document(context_id)
        context = context_ref.get()
        if not context.exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cultural context not found",
            )

        updated_context_data = context.model_dump(exclude_unset=True)
        updated_context_data["updated_by"] = context.updated_by
        updated_context_data["updated_at"] = firestore.SERVER_TIMESTAMP
        context_ref.update(updated_context_data)

        updated_context = context_ref.get().to_dict()

        return CulturalContext.from_dict(updated_context)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.delete(
    "/contexts/{context_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_context(context_id: str, db=Depends(get_db)) -> None:
    """Delete a cultural context by ID"""
    try:
        context_ref = db.collection(CULTURAL_CONTEXT).document(context_id)
        context = context_ref.get()
        if not context.exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cultural context not found",
            )
        context_ref.delete()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
