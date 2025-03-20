from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel

from app.models.models import CulturalContext


class CulturalContextResponse(BaseModel):
    cultural_contexts: List[CulturalContext] = []
    total_items: Optional[int]
    total_pages: Optional[int]
    current_page: Optional[int]


class CulturalContextAdminResponse(BaseModel):
    id: str
    status: str
    title: str
    updated_at: datetime
    created_at: datetime
