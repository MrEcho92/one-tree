from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel

from app.models.models import CulturalContext


class CulturalContextResponse(BaseModel):
    cultural_contexts: List[CulturalContext] = []
    total_items: Optional[int]
    total_pages: Optional[int]
    current_page: Optional[int]


class CulturalContextsResponse(BaseModel):
    id: str
    updated_at: datetime
    title: str
    status: str
    created_at: datetime
