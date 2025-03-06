import uuid
from datetime import datetime
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, EmailStr, Field


class AbstractBaseModel(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_by: str
    created_at: datetime = Field(default_factory=datetime.now)
    updated_by: Optional[str] = None
    updated_at: Optional[datetime] = Field(default_factory=datetime.now)

    def to_dict(self) -> dict:
        """Convert model to dictionary for Firestore"""
        return self.dict(exclude_none=True)

    @classmethod
    def from_dict(cls, data: dict):
        """Create model instance from Firestore dictionary"""
        return cls(**data)


class UserProfile(BaseModel):
    id: str
    email: EmailStr
    username: str
    display_name: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)
    photo_url: Optional[str] = None
    family_tree_ids: List[str] = []


class Person(AbstractBaseModel):
    """This is the family member model"""

    first_name: str
    middle_name: Optional[str] = None
    last_name: str
    last_name_at_birth: Optional[str] = None
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


class FamilyTree(AbstractBaseModel):
    name: str
    is_public: bool = False
    description: Optional[str] = None
    collaborators: Optional[List[str]] = []
    members: List[Person] = []


class FamilyStory(AbstractBaseModel):
    title: str
    content: str
    media_url: Optional[str] = None
    tags: Optional[List[str]] = []
    tree_id: str
    is_public: bool = False


class ContextStatus(Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"


class CulturalContext(AbstractBaseModel):
    name: str
    title: str
    content: str
    video_url: Optional[str] = None
    image_url: Optional[str] = None
    audio_url: Optional[str] = None
    link_url: Optional[str] = None
    tags: List[str] = []
    status: str = ContextStatus.PENDING.value


class MigrationEvent(AbstractBaseModel):
    year: int
    event: str
    location: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class MigrationRecord(AbstractBaseModel):
    tree_id: Optional[str] = None
    title: str
    description: str
    timeline: List[MigrationEvent] = []
    media: Optional[List[str]] = None
