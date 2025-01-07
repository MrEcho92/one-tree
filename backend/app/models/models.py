import uuid
from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, EmailStr, Field


class AbstractBaseModel(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_by: str
    created_at: datetime
    updateed_by: Optional[str] = None
    updated_at: Optional[datetime] = None


class UserProfile(BaseModel):
    id: str
    email: EmailStr
    username: str
    display_name: Optional[str] = None
    created_at: datetime
    photo_url: Optional[str] = None
    family_tree_ids: List[str] = []


class Person(AbstractBaseModel):
    """This is the family member model"""

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
    children_id: List[str] = []


class FamilyTree(AbstractBaseModel):
    name: str
    is_public: bool = False
    desciption: Optional[str] = None
    collaborators: Optional[List[str]] = []
    last_updated_by: str
    last_updated_at: datetime
    members: List[Person] = []


class FamilyStory(AbstractBaseModel):
    title: str
    content: str
    media_url: Optional[str] = None
    tags: Optional[List[str]] = []
    family_tree_id: str


class CulturalContext(AbstractBaseModel):
    title: str
    content: str
    media_url: Optional[str] = None
    tags: List[str] = []
    is_public: bool = True
    country: Optional[str] = None


class MigrationEvent(AbstractBaseModel):
    id: str
    year: int
    event: str


class MigrationRecord(AbstractBaseModel):
    family_tree_id: str
    title: str
    description: str
    timeline: List[MigrationEvent] = []
    media_url: Optional[str] = None
