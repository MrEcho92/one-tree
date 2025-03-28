from datetime import datetime
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel


class CreateFamilyTreeSchema(BaseModel):
    name: str
    description: Optional[str] = None
    is_public: bool
    created_by: str
    root_member: dict
    father: Optional[dict] = None
    mother: Optional[dict] = None


class AddPersonSchema(BaseModel):
    created_by: str
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


class UpdatePersonSchema(BaseModel):
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
    updated_by: Optional[str] = None


class FamilyTrees(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    is_public: bool
    created_by: str
    created_at: datetime
    updated_by: Optional[str] = None
    updated_at: Optional[datetime] = None


class RelationType(Enum):
    FATHER = "father"
    MOTHER = "mother"
    SIBLING = "sibling"
    SPOUSE = "spouse"
    CHILD = "child"


class RelationToMemberSchema(BaseModel):
    primary_user_id: str
    primary_user_gender: str
    rel: RelationType
    primary_spouse_id: Optional[str] = None
    primary_spouse_gender: Optional[str] = None
    primary_children_id: Optional[List[str]] = None


class UpdateTreeSchema(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    is_public: Optional[bool] = False
    collaborators: Optional[List[str]] = []
    updated_by: Optional[str] = None


class DeleteMemberSchema(BaseModel):
    delete_member_id: str
    root_id: str


class AddCollaboratorSchema(BaseModel):
    collaborators: List[str] = []


class FamilyStoriesSchema(BaseModel):
    id: str
    title: str
    tree_id: str
    created_by: str
    created_at: datetime
    updated_by: Optional[str] = None
    updated_at: Optional[datetime] = None


class AddFamilyStorySchema(BaseModel):
    title: str
    content: str
    media_url: Optional[str] = None
    tags: Optional[List[str]] = []
    tree_id: str
    is_public: bool = False
    created_by: str


class UpdatedFamilyStorySchema(BaseModel):
    title: Optional[str]
    content: Optional[str]
    media_url: Optional[str] = None
    tags: Optional[List[str]] = []
    is_public: Optional[bool]
    updated_by: str


class FamilyTreesResponse(BaseModel):
    id: str
    updated_at: datetime
    name: str
    created_by: str
