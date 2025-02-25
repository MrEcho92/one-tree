from datetime import datetime
from typing import List, Optional

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    Query,
    UploadFile,
    status,
)
from google.cloud import firestore

from app.core.constants import CULTURAL_CONTEXT
from app.core.database import get_db
from app.models.models import ContextStatus, CulturalContext
from app.schemas.cultural_schemas import CulturalContextResponse

router = APIRouter()


@router.get(
    "/contexts",
    response_model=CulturalContextResponse,
    status_code=status.HTTP_200_OK,
)
async def get_contexts(
    q: Optional[str] = Query(None, description="Search query for title and tags"),
    latest: bool = Query(False, description="Get latest posts first"),
    limit: int = Query(10, ge=1, le=100, description="Number of items per page"),
    page: int = Query(1, ge=1, description="Page number"),
    db=Depends(get_db),
) -> CulturalContextResponse:
    """
    Get cultural contexts with search, pagination and sorting capabilities

    Args:
        q: Optional search query for filtering by title and tags
        latest: Boolean to sort by creation date descending
        limit: Number of items per page (1-100)
        page: Page number (starts at 1)
        db: Database connection dependency
    """
    try:
        # Fetch all APPROVED documents
        all_docs = (
            db.collection(CULTURAL_CONTEXT)
            .where("status", "==", ContextStatus.APPROVED.value)
            .stream()
        )

        # Convert Firestore documents to Python dictionaries
        contexts = [doc.to_dict() for doc in all_docs]

        if not contexts:
            return CulturalContextResponse(
                cultural_contexts=[],
                total_items=0,
                total_pages=0,
                current_page=page,
            )

        # Search filtering (only in Python)
        if q:
            search_term = q.lower()
            contexts = [
                context
                for context in contexts
                if search_term in context.get("title", "").lower()
                or any(search_term in tag.lower() for tag in context.get("tags", []))
            ]

        # Sort by `created_at` if `latest=True`
        if latest:
            contexts.sort(key=lambda x: x.get("created_at", datetime.min), reverse=True)

        # Pagination logic
        total_items = len(contexts)
        total_pages = (total_items + limit - 1) // limit
        start_idx = (page - 1) * limit
        end_idx = start_idx + limit
        paginated_contexts = contexts[start_idx:end_idx]

        # Convert to CulturalContext objects
        cultural_contexts = [
            CulturalContext(**context) for context in paginated_contexts
        ]

        return CulturalContextResponse(
            cultural_contexts=cultural_contexts,
            total_items=total_items,
            total_pages=total_pages,
            current_page=page,
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get(
    "/contexts/{user_id}/user",
    response_model=List[CulturalContext],
    status_code=status.HTTP_200_OK,
)
async def get_user_contexts(user_id: str, db=Depends(get_db)) -> List[CulturalContext]:
    """Get all cultural contexts by a user"""
    try:
        contexts = (
            db.collection(CULTURAL_CONTEXT).where("created_by", "==", user_id).stream()
        )
        user_contexts = [
            CulturalContext.from_dict(context.to_dict()) for context in contexts
        ]
        sorted_contexts = sorted(
            user_contexts, key=lambda x: x.created_at, reverse=True
        )
        return sorted_contexts
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get(
    "/contexts/{context_id}/post",
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
    db=Depends(get_db),
    created_by: str = Form(...),
    title: str = Form(...),
    content: str = Form(...),
    link_url: Optional[str] = Form(None),
    tags: List[str] = Form([]),
    image_url: Optional[UploadFile] = File(None),
    video_url: Optional[UploadFile] = File(None),
    audio_url: Optional[UploadFile] = File(None),
) -> CulturalContext:
    """Create a new cultural context"""
    try:
        if video_url:
            # Handle video URL (e.g., validate, process, etc.)
            # upload to Google cloud storage and generate url
            video_url = "https://test_video_url"

        if image_url:
            # Handle image URL (e.g., validate, process, etc.)
            # upload to Google cloud storage and generate url
            image_url = "https://test_image_url"

        if audio_url:
            # Handle image URL (e.g., validate, process, etc.)
            # upload to Google cloud storage and generate url
            video_url = "https://test_audio_url"

        context = CulturalContext(
            created_by=created_by,
            title=title,
            content=content,
            link_url=link_url,
            tags=tags,
            # TODO: generate url from gcp
            # video_url=video_url,
            # audio_url=audio_url,
            # image_url=image_url
        )
        db.collection(CULTURAL_CONTEXT).document(context.id).set(context.to_dict())
        return context
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.put(
    "/contexts/{context_id}/update",
    response_model=CulturalContext,
    status_code=status.HTTP_200_OK,
)
async def update_context(
    context_id: str,
    db=Depends(get_db),
    updated_by: str = Form(...),
    title: str = Form(...),
    content: str = Form(...),
    link_url: Optional[str] = Form(None),
    tags: List[str] = Form([]),
    image_url: Optional[UploadFile] = File(None),
    video_url: Optional[UploadFile] = File(None),
    audio_url: Optional[UploadFile] = File(None),
) -> CulturalContext:
    """Update a cultural context by ID"""
    try:
        # Get reference to the context document
        context_ref = db.collection(CULTURAL_CONTEXT).document(context_id)
        context = context_ref.get()

        # Check if context exists
        if not context.exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cultural context not found",
            )

        # Prepare update data
        context_data = context.to_dict()

        # Update fields while preserving other existing data
        updated_context_data = context_data.copy()
        updated_context_data.update(
            {
                "title": title,
                "content": content,
                "updated_by": updated_by,
                "updated_at": firestore.SERVER_TIMESTAMP,
                "tags": tags,
            }
        )

        # Add optional fields if provided
        if link_url:
            updated_context_data["link_url"] = link_url

        # TODO: generate url from gcp
        # Add logic here to upload files to storage and get URLs
        # Then add the URLs to updated_context_data
        # Handle optional file uploads (you need GCS/S3 to store and return URLs)
        # if image_url:
        #     updated_context_data["image_url"] = f"uploaded/{image_url.filename}"
        # if video_url:
        #     updated_context_data["video_url"] = f"uploaded/{video_url.filename}"
        # if audio_url:
        #     updated_context_data["audio_url"] = f"uploaded/{audio_url.filename}"

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
