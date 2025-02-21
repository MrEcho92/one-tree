from typing import List, Optional

from pydantic import BaseModel


class CreateCulturalContextSchema(BaseModel):
    title: str
    content: str
    media_url: Optional[str] = None
    tags: List[str] = []
    country: str
    created_by: str
