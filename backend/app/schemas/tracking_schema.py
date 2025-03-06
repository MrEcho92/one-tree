from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class MigrationEventSchema(BaseModel):
    year: int
    event: str
    location: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class CreateMigrationRecordSchema(BaseModel):
    created_by: str
    title: str
    description: str
    timeline: List[MigrationEventSchema] = []
    tree_id: Optional[str] = None
    media: Optional[List[str]] = None


class MigrationRecordUpdateSchema(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    timeline: Optional[List[MigrationEventSchema]] = None
    media: Optional[List[str]] = None
    tree_id: Optional[str] = None
    updated_by: Optional[str] = None
