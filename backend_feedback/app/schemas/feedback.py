from pydantic import BaseModel, Field
from datetime import datetime


class FeedbackCreate(BaseModel):
    sku_id: str = Field(..., min_length=1)
    accept_reject: int = Field(..., ge=0, le=1)  # 0=reject, 1=accept
    komentar: str | None = None
    image_url: str | None = None


class FeedbackResponse(BaseModel):
    id: int
    sku_id: str
    accept_reject: int
    komentar: str | None
    image_url: str | None
    created_at: datetime

    class Config:
        from_attributes = True




