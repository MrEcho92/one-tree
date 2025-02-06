import uuid
from datetime import datetime
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, EmailStr, Field


class CreateFamilyTreeSchema(BaseModel):
    name: str
    description: Optional[str] = None
    is_public: bool
    created_by: str
    root_member: dict
    father: Optional[dict] = None
    mother: Optional[dict] = None


class AddPersonSchema(BaseModel):
    first_name: str
    middle_name: Optional[str] = None
    last_name: str
    date_of_birth: Optional[datetime] = None
    gender: Optional[str] = None
    is_alive: Optional[bool] = True
    birth_place: Optional[str] = None
    death_date: Optional[datetime] = None
    bio: Optional[str] = None
    photo_url: Optional[str] = None
    father_id: Optional[str] = None
    mother_id: Optional[str] = None
    spouse_id: Optional[List[str]] = []
    children_id: Optional[List[str]] = []
    sibling_id: Optional[List[str]] = []
    tree_id: str
    created_by: str
    updated_by: Optional[str] = None


class CreateCulturalContextSchema(BaseModel):
    title: str
    content: str
    media_url: Optional[str] = None
    tags: List[str] = []
    country: str
    created_by: str


class FamilyTrees(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    is_public: bool
    created_by: str
    created_at: datetime
    updated_by: Optional[str] = None
    updated_at: Optional[datetime] = None
