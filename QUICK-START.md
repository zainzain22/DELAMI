# 🚀 Quick Start - Delami Style Whisperer

## ⚡ Cara Cepat Menjalankan

### 1. **Windows Users**
```bash
# Double click file start.bat
# Atau jalankan di Command Prompt:
start.bat
```

### 2. **Linux/Mac Users**
```bash
# Jalankan script:
./start.sh

# Atau manual:
chmod +x start.sh
./start.sh
```

### 3. **Manual Setup**
```bash
# 1. Copy environment file
cp docker.env.example .env

# 2. Build dan jalankan
docker-compose build
docker-compose up -d

# 3. Akses aplikasi
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

## 🔍 Verifikasi Setup

### Test Backend API
```bash
# Health check
curl http://localhost:8000/health

# Test feedback
curl -X POST "http://localhost:8000/feedback" \
  -H "Content-Type: application/json" \
  -d '{"sku_id": "TEST123", "accept_reject": 1, "komentar": "Test"}'
```

### Test Frontend
```bash
# Buka browser
http://localhost:3000
```

## 🛠️ Development Mode

### Hot Reload
```bash
# Stop production
docker-compose down

# Jalankan development mode
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

### Manual Development
```bash
# Database saja
docker-compose up -d postgres

# Backend manual
cd backend_feedback
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Frontend manual (terminal baru)
cd delami-style-whisperer
npm run dev
```

## 📊 Monitoring

### Status Services
```bash
docker-compose ps
```

### Logs
```bash
# Semua logs
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Resource Usage
```bash
docker stats
```

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Cek port
netstat -tulpn | grep :3000
netstat -tulpn | grep :8000
netstat -tulpn | grep :5432

# Stop services
docker-compose down
```

### Build Error
```bash
# Clean build
docker-compose down
docker system prune -f
docker-compose build --no-cache
```

### Database Error
```bash
# Restart database
docker-compose restart postgres

# Reset database
docker-compose down -v
docker-compose up -d
```

## 🎯 API Endpoints

### Submit Feedback
```bash
POST /feedback
{
  "sku_id": "SKU123",
  "accept_reject": 1,  # 0=reject, 1=accept
  "komentar": "Bagus banget!",
  "image_url": "https://example.com/image.jpg"
}
```

### Get All Feedback
```bash
GET /feedback
```

### Health Check
```bash
GET /health
```

## 📝 Database Schema

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

## 🔧 Useful Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Restart services
docker-compose restart

# View logs
docker-compose logs -f

# Access container
docker-compose exec backend bash
docker-compose exec frontend sh
docker-compose exec postgres psql -U postgres -d belami

# Clean up
docker-compose down -v
docker system prune -f
```

## 📞 Support

Jika mengalami masalah:
1. Cek logs: `docker-compose logs -f`
2. Cek status: `docker-compose ps`
3. Cek resource: `docker stats`
4. Restart services: `docker-compose restart`

## 🎉 Success!

Jika semua berjalan dengan baik, Anda akan melihat:
- ✅ Frontend: http://localhost:3000
- ✅ Backend API: http://localhost:8000
- ✅ API Docs: http://localhost:8000/docs
- ✅ Database: PostgreSQL running on port 5432
