from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from datetime import datetime
import os
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database setup
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://postgres:postgres@postgres:5432/belami"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class RecommendationFeedback(Base):
    __tablename__ = "recommendation_feedback"

    id = Column(Integer, primary_key=True, index=True)
    sku_id = Column(String(255), nullable=False)
    accept_reject = Column(Integer, nullable=False)  # 0=reject, 1=accept
    komentar = Column(Text)
    image_url = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

# Schemas
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

# Create tables
Base.metadata.create_all(bind=engine)

# FastAPI app
app = FastAPI(title="Delami Feedback API", version="0.1.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Routes
@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "delami-feedback-api"}

@app.post("/feedback", response_model=FeedbackResponse)
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

@app.get("/feedback")
def get_feedback(db: Session = Depends(get_db)):
    try:
        feedbacks = db.query(RecommendationFeedback).all()
        return feedbacks
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get feedback: {str(e)}")