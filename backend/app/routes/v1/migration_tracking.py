from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from google.cloud import firestore

from app.common.firebase import verify_firebase_token
from app.core.constants import MIGRATION_RECORDS
from app.core.database import get_db
from app.models.models import MigrationRecord
from app.schemas.tracking_schema import (
    CreateMigrationRecordSchema,
    MigrationRecordUpdateSchema,
)

router = APIRouter()


@router.post(
    "/migration-records/",
    response_model=MigrationRecord,
    status_code=status.HTTP_201_CREATED,
)
async def create_migration_record(
    record: CreateMigrationRecordSchema,
    current_user=Depends(verify_firebase_token),
    db=Depends(get_db),
) -> MigrationRecord:
    try:
        if current_user["uid"] != record.created_by:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to access this resource",
            )

        record_dict = record.model_dump()
        record_ref = db.collection(MIGRATION_RECORDS).document(record.id)
        record_ref.set(record_dict)
        return record
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get(
    "/migration-records",
    response_model=list[MigrationRecord],
    status_code=status.HTTP_200_OK,
)
async def get_migration_records(
    user_id: str = Query(None),
    tree_id: Optional[str] = Query(None),
    current_user=Depends(verify_firebase_token),
    db=Depends(get_db),
):
    try:
        if current_user["uid"] != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to access this resource",
            )

        records_ref = db.collection(MIGRATION_RECORDS)

        # Apply filters if provided
        if user_id:
            records_ref = records_ref.where("user_id", "==", user_id)
        if tree_id:
            records_ref = records_ref.where("tree_id", "==", tree_id)

        records = [MigrationRecord(**doc.to_dict()) for doc in records_ref.stream()]

        return records

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get(
    "/migration-records/{record_id}",
    response_model=MigrationRecord,
    status_code=status.HTTP_200_OK,
)
async def get_migration_records(
    record_id: str,
    current_user=Depends(verify_firebase_token),
    db=Depends(get_db),
):
    try:
        record_ref = db.collection(MIGRATION_RECORDS).document(record_id)
        record = record_ref.get()

        if not record.exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Migration record not found",
            )

        record_data = record.to_dict()

        if current_user["uid"] != record_data.get("created_by"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to access this resource",
            )

        return MigrationRecord(**record_data)

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.put(
    "/migration-records/{record_id}",
    response_model=MigrationRecord,
    status_code=status.HTTP_200_OK,
)
async def update_migration_record(
    record_id: str,
    record_update: MigrationRecordUpdateSchema,
    current_user=Depends(verify_firebase_token),
    db=Depends(get_db),
) -> MigrationRecord:
    try:
        if current_user["uid"] != record_update.updated_by:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to access this resource",
            )

        record_ref = db.collection(MIGRATION_RECORDS).document(record_id)
        record = record_ref.get()

        if not record.exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Migration record not found",
            )

        update_data = record_update.model_dump(exclude_unset=True)
        update_data["updated_by"] = record_update.updated_by
        update_data["updated_at"] = firestore.SERVER_TIMESTAMP

        record_ref.update(update_data)

        updated_record = record_ref.get().to_dict()

        return MigrationRecord.from_dict(updated_record)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.delete("/migration-records/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_migration_record(
    record_id: str, current_user=Depends(verify_firebase_token), db=Depends(get_db)
) -> None:
    try:
        record_ref = db.collection(MIGRATION_RECORDS).document(record_id)
        record = record_ref.get()

        if not record.exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Migration record not found",
            )
        record_data = record.to_dict()
        if current_user["uid"] != record_data.get("created_by"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to access this resource",
            )

        record_ref.delete()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
