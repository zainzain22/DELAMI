from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

from app.core.db import Base


class RecommendationFeedback(Base):
    __tablename__ = "recommendation_feedback"

    id = Column(Integer, primary_key=True, index=True)
    sku_id = Column(String(255), nullable=False)
    accept_reject = Column(Integer, nullable=False)  # 0=reject, 1=accept
    komentar = Column(Text)
    image_url = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)




