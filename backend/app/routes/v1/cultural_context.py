import os
from datetime import datetime
from typing import List, Optional
from urllib.parse import urlparse

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
from firebase_admin import firestore

from app.common.firebase import verify_firebase_token
from app.core.constants import (
    CULTURAL_CONTEXT,
    CULTURAL_CONTEXT_GCP_PATH,
    MAX_CULTURAL_CONTEXT,
)
from app.core.database import get_db
from app.models.models import ContextStatus, CulturalContext
from app.schemas.cultural_schemas import CulturalContextResponse
from app.utils.helper import delete_blob, upload_to_gcs

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
async def get_user_contexts(
    user_id: str, current_user=Depends(verify_firebase_token), db=Depends(get_db)
) -> List[CulturalContext]:
    """Get all cultural contexts by a user"""
    try:
        if current_user["uid"] != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to access this resource",
            )

        contexts = (
            db.collection(CULTURAL_CONTEXT).where("created_by", "==", user_id).stream()
        )
        user_contexts = [CulturalContext(**context.to_dict()) for context in contexts]
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
    current_user=Depends(verify_firebase_token),
    db=Depends(get_db),
    name: str = Form(...),
    created_by: str = Form(...),
    title: str = Form(...),
    content: str = Form(...),
    link_url: Optional[str] = Form(None),
    tags: List[str] = Form([]),
    image_file: Optional[UploadFile] = File(None),
    video_file: Optional[UploadFile] = File(None),
    audio_file: Optional[UploadFile] = File(None),
) -> CulturalContext:
    """Create a new cultural context"""
    try:
        if current_user["uid"] != created_by:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to access this resource",
            )

        cultural_docs = (
            db.collection(CULTURAL_CONTEXT)
            .where("created_by", "==", created_by)
            .stream()
        )
        posts = [doc.to_dict() for doc in cultural_docs]

        if len(posts) >= MAX_CULTURAL_CONTEXT:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Limit reached! You can only add up to {MAX_CULTURAL_CONTEXT} cultural posts.",
            )

        image_url, video_url, audio_url = None, None, None

        context = CulturalContext(
            name=name,
            created_by=created_by,
            title=title,
            content=content,
            link_url=link_url,
            tags=tags,
            video_url=video_url,
            audio_url=audio_url,
            image_url=image_url,
        )

        if video_file:
            video_url = upload_to_gcs(
                video_file,
                f"{CULTURAL_CONTEXT_GCP_PATH}/{context.id}/videos/{video_file.filename}",
            )
            context.video_url = video_url

        if image_file:
            image_url = upload_to_gcs(
                image_file,
                f"{CULTURAL_CONTEXT_GCP_PATH}/{context.id}/images/{image_file.filename}",
            )
            context.image_url = image_url

        if audio_file:
            audio_url = upload_to_gcs(
                audio_file,
                f"{CULTURAL_CONTEXT_GCP_PATH}/{context.id}/audio/{audio_file.filename}",
            )
            context.audio_url = audio_url

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
    current_user=Depends(verify_firebase_token),
    db=Depends(get_db),
    updated_by: str = Form(...),
    title: str = Form(...),
    content: str = Form(...),
    link_url: Optional[str] = Form(None),
    tags: List[str] = Form([]),
    image_file: Optional[UploadFile] = File(None),
    video_file: Optional[UploadFile] = File(None),
    audio_file: Optional[UploadFile] = File(None),
) -> CulturalContext:
    """Update a cultural context by ID"""
    try:
        if current_user["uid"] != updated_by:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to access this resource",
            )

        context_ref = db.collection(CULTURAL_CONTEXT).document(context_id)
        context = context_ref.get()

        if not context.exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cultural context not found",
            )

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

        if link_url:
            updated_context_data["link_url"] = link_url

        bucket_name = os.getenv("FIREBASE_STORAGE_BUCKET")

        for file_key in ["image_url", "video_url", "audio_url"]:
            old_url = context_data.get(file_key)
            if old_url:
                updated_context_data[file_key] = None
                parsed_url = urlparse(old_url)
                path_parts = parsed_url.path.lstrip("/").split("/")

                if bucket_name in path_parts:
                    index = path_parts.index(bucket_name) + 1
                    blob_name = "/".join(path_parts[index:])
                    delete_blob(blob_name)
                else:
                    raise Exception(f"Invalid Storage URL format: {old_url}")

        if video_file:
            video_url = upload_to_gcs(
                video_file,
                f"{CULTURAL_CONTEXT_GCP_PATH}/{context_id}/videos/{video_file.filename}",
            )
            updated_context_data["video_url"] = video_url

        if image_file:
            image_url = upload_to_gcs(
                image_file,
                f"{CULTURAL_CONTEXT_GCP_PATH}/{context_id}/images/{image_file.filename}",
            )
            updated_context_data["image_url"] = image_url

        if audio_file:
            audio_url = upload_to_gcs(
                audio_file,
                f"{CULTURAL_CONTEXT_GCP_PATH}/{context_id}/audio/{audio_file.filename}",
            )
            updated_context_data["audio_url"] = audio_url

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
async def delete_context(
    context_id: str, current_user=Depends(verify_firebase_token), db=Depends(get_db)
) -> None:
    """Delete a cultural context by ID"""
    try:
        context_ref = db.collection(CULTURAL_CONTEXT).document(context_id)
        context = context_ref.get()
        if not context.exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cultural context not found",
            )

        context_data = context.to_dict()
        if current_user["uid"] != context_data.get("created_by"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to access this resource",
            )

        bucket_name = os.getenv("FIREBASE_STORAGE_BUCKET")

        urls = [
            context_data.get("image_url"),
            context_data.get("video_url"),
            context_data.get("audio_url"),
        ]

        for url in urls:
            if url:
                parsed_url = urlparse(url)
                path_parts = parsed_url.path.lstrip("/").split("/")

                if bucket_name in path_parts:
                    index = path_parts.index(bucket_name) + 1
                    blob_name = "/".join(path_parts[index:])
                    delete_blob(blob_name)
                else:
                    raise Exception(f"Invalid Storage URL format: {url}")

        context_ref.delete()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
