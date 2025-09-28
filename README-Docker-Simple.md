# Docker Setup Sederhana - Delami Style Whisperer

Setup Docker yang disederhanakan untuk frontend dan backend feedback.

## Struktur Project

```
belami/
├── delami-style-whisperer/  # Next.js Frontend
├── backend_feedback/        # FastAPI Backend (Feedback API)
├── docker-compose.yml       # Konfigurasi Docker Compose
└── docker.env.example       # Contoh environment variables
```

## Prerequisites

1. **Docker** dan **Docker Compose** terinstall
2. **PostgreSQL** (akan dijalankan via Docker)

## Setup

### 1. Clone dan Setup Environment

```bash
# Clone repository
git clone <repository-url>
cd belami

# Copy environment file
cp docker.env.example .env

# Edit .env file jika diperlukan
nano .env
```

### 2. Build dan Jalankan

```bash
# Build semua services
docker-compose build

# Jalankan semua services
docker-compose up -d

# Lihat logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Services

### PostgreSQL Database
- **Port**: 5432
- **Database**: belami
- **User**: postgres
- **Password**: postgres

### Backend Feedback API
- **Port**: 8000
- **URL**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health
- **Endpoints**:
  - `POST /feedback` - Submit feedback
  - `GET /feedback` - Get all feedback

### Frontend Next.js
- **Port**: 3000
- **URL**: http://localhost:3000

## API Endpoints

### Submit Feedback
```bash
curl -X POST "http://localhost:8000/feedback" \
  -H "Content-Type: application/json" \
  -d '{
    "sku_id": "SKU123",
    "accept_reject": 1,
    "komentar": "Bagus banget!",
    "image_url": "https://example.com/image.jpg"
  }'
```

### Get All Feedback
```bash
curl -X GET "http://localhost:8000/feedback"
```

## Development

### Hot Reload
Untuk development dengan hot reload:

```bash
# Backend development
docker-compose up postgres -d
cd backend_feedback
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Frontend development
cd delami-style-whisperer
npm run dev
```

### Database Management

```bash
# Akses PostgreSQL
docker-compose exec postgres psql -U postgres -d belami

# Backup database
docker-compose exec postgres pg_dump -U postgres belami > backup.sql

# Restore database
docker-compose exec -T postgres psql -U postgres belami < backup.sql
```

### Logs dan Debugging

```bash
# Lihat logs semua services
docker-compose logs -f

# Lihat logs specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Akses container
docker-compose exec backend bash
docker-compose exec frontend sh
```

## Troubleshooting

### 1. Port Already in Use
```bash
# Cek port yang digunakan
netstat -tulpn | grep :3000
netstat -tulpn | grep :8000
netstat -tulpn | grep :5432

# Stop services yang konflik
docker-compose down
```

### 2. Database Connection Error
```bash
# Cek status database
docker-compose exec postgres pg_isready -U postgres

# Restart database
docker-compose restart postgres
```

### 3. Build Error
```bash
# Clean build
docker-compose down
docker system prune -f
docker-compose build --no-cache
```

### 4. Permission Error
```bash
# Fix permission
sudo chown -R $USER:$USER .
```

## Useful Commands

```bash
# Restart specific service
docker-compose restart backend

# Scale services
docker-compose up --scale backend=2

# View resource usage
docker stats

# Clean up
docker-compose down -v
docker system prune -f
```

## Database Schema

### recommendation_feedback table
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

## Support

Jika mengalami masalah, cek:
1. Logs: `docker-compose logs -f`
2. Health checks: `docker-compose ps`
3. Resource usage: `docker stats`
4. Network: `docker network ls`
