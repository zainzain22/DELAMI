from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.db import get_db, Base, engine
from app.models.feedback import RecommendationFeedback
from app.schemas.feedback import FeedbackCreate, FeedbackResponse


router = APIRouter(prefix="/feedback", tags=["feedback"])


@router.on_event("startup")
def create_tables():
    # Ensure table exists
    Base.metadata.create_all(bind=engine, tables=[RecommendationFeedback.__table__])


@router.post("", response_model=FeedbackResponse)
def submit_feedback(payload: FeedbackCreate, db: Session = Depends(get_db)):
    try:
        fb = RecommendationFeedback(
            sku_id=payload.sku_id,
            accept_reject=payload.accept_reject,
            komentar=payload.komentar,
            image_url=payload.image_url,
        )
        db.add(fb)
        db.commit()
        db.refresh(fb)
        return fb
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to save feedback: {str(e)}")


@router.get("/health")
def health_check():
    return {"status": "ok", "service": "feedback"}




