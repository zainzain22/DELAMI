# Feedback Service Backend

Backend khusus untuk service feedback yang terpisah dari style-snap-backend.

## Features

- **Feedback Service**: Menerima dan menyimpan feedback user untuk rekomendasi produk
- **Database**: PostgreSQL dengan tabel `recommendation_feedback`
- **API**: RESTful API dengan FastAPI

## Database Schema

```sql
CREATE TABLE recommendation_feedback (
    id SERIAL PRIMARY KEY,
    sku_id VARCHAR(255) NOT NULL,
    accept_reject INTEGER NOT NULL CHECK (accept_reject IN (0, 1)),
    komentar TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### POST /feedback
Menerima feedback dari user

**Request Body:**
```json
{
    "sku_id": "5624979194006",
    "accept_reject": 1,
    "komentar": "Bagus banget!",
    "image_url": "https://example.com/image.jpg"
}
```

**Response:**
```json
{
    "id": 1,
    "sku_id": "5624979194006",
    "accept_reject": 1,
    "komentar": "Bagus banget!",
    "image_url": "https://example.com/image.jpg",
    "created_at": "2025-09-27T06:16:00.000Z"
}
```

### GET /health
Health check endpoint

**Response:**
```json
{
    "status": "ok",
    "service": "feedback"
}
```

## Setup

1. **Install dependencies:**
```bash
pip install -r requirements.txt
```

2. **Setup database:**
- Pastikan PostgreSQL berjalan
- Database: `belami`
- User: `postgres`
- Password: `SaranaZain`

3. **Run server:**
```bash
uvicorn main:app --reload --port 8001
```

Server akan berjalan di `http://localhost:8001`

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string (optional, default sudah diset)

## Testing

Test dengan curl:
```bash
curl -X POST http://localhost:8001/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "sku_id": "5624979194006",
    "accept_reject": 1,
    "komentar": "Test feedback",
    "image_url": "https://example.com/image.jpg"
  }'
```




