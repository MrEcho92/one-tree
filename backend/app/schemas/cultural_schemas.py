from typing import List, Optional

from fastapi import Form
from pydantic import BaseModel


class CreateCulturalContextSchema(BaseModel):
    title: str
    content: str
    video_url: Optional[str] = Form(None)
    image_url: Optional[str] = Form(None)
    link_url: Optional[str] = None
    tags: List[str] = []
    created_by: str


class UpdateCulturalContextSchema(BaseModel):
    title: Optional[str]
    content: Optional[str]
    video_url: Optional[str] = Form(None)
    image_url: Optional[str] = Form(None)
    link_url: Optional[str] = None
    tags: Optional[List[str]] = []
    updated_by: str
