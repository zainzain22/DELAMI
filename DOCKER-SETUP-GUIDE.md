# Panduan Lengkap Docker Setup - Delami Style Whisperer

## 📋 Prerequisites

### 1. Install Docker dan Docker Compose
```bash
# Untuk Windows (Docker Desktop)
# Download dari: https://www.docker.com/products/docker-desktop

# Untuk Linux (Ubuntu/Debian)
sudo apt update
sudo apt install docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker

# Untuk macOS
# Download Docker Desktop dari: https://www.docker.com/products/docker-desktop

# Verifikasi instalasi
docker --version
docker-compose --version
```

### 2. Pastikan Port Tersedia
```bash
# Cek port yang akan digunakan
netstat -tulpn | grep :3000  # Frontend
netstat -tulpn | grep :8000  # Backend
netstat -tulpn | grep :5432  # Database

# Jika port sudah digunakan, stop service yang konflik
sudo systemctl stop postgresql  # Jika ada PostgreSQL lokal
```

## 🚀 Setup dan Running

### Step 1: Persiapan Environment
```bash
# 1. Clone atau pastikan di direktori project
cd belami

# 2. Copy environment file
cp docker.env.example .env

# 3. Edit environment file (opsional)
nano .env
```

### Step 2: Build Docker Images
```bash
# Build semua images
docker-compose build

# Atau build specific service
docker-compose build backend
docker-compose build frontend
docker-compose build postgres
```

### Step 3: Jalankan Services
```bash
# Jalankan semua services di background
docker-compose up -d

# Atau jalankan dengan logs visible
docker-compose up

# Jalankan specific service
docker-compose up -d postgres
docker-compose up -d backend
docker-compose up -d frontend
```

### Step 4: Verifikasi Services
```bash
# Cek status semua services
docker-compose ps

# Cek logs
docker-compose logs -f

# Cek logs specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

## 🔍 Testing dan Verifikasi

### 1. Test Database Connection
```bash
# Akses PostgreSQL container
docker-compose exec postgres psql -U postgres -d belami

# Di dalam psql, test query
\dt  # List tables
SELECT version();  # Check PostgreSQL version
\q   # Exit
```

### 2. Test Backend API
```bash
# Health check
curl http://localhost:8000/health

# Test feedback endpoint
curl -X POST "http://localhost:8000/feedback" \
  -H "Content-Type: application/json" \
  -d '{
    "sku_id": "TEST123",
    "accept_reject": 1,
    "komentar": "Test feedback",
    "image_url": "https://example.com/test.jpg"
  }'

# Get all feedback
curl http://localhost:8000/feedback
```

### 3. Test Frontend
```bash
# Buka browser dan akses
http://localhost:3000

# Atau test dengan curl
curl http://localhost:3000
```

## 🛠️ Development Mode

### 1. Development dengan Hot Reload
```bash
# Stop production containers
docker-compose down

# Jalankan hanya database
docker-compose up -d postgres

# Jalankan backend dengan hot reload
cd backend_feedback
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Jalankan frontend dengan hot reload (terminal baru)
cd delami-style-whisperer
npm run dev
```

### 2. Development dengan Docker
```bash
# Jalankan dengan volume mounting untuk hot reload
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

## 📊 Monitoring dan Debugging

### 1. Monitor Resource Usage
```bash
# Monitor container resources
docker stats

# Monitor specific container
docker stats belami-backend
docker stats belami-frontend
docker stats belami-postgres
```

### 2. Debug Container Issues
```bash
# Akses container shell
docker-compose exec backend bash
docker-compose exec frontend sh
docker-compose exec postgres bash

# Cek container logs
docker logs belami-backend
docker logs belami-frontend
docker logs belami-postgres

# Cek container details
docker inspect belami-backend
```

### 3. Network Debugging
```bash
# Cek network
docker network ls
docker network inspect belami_belami-network

# Test connectivity antar containers
docker-compose exec backend ping postgres
docker-compose exec frontend ping backend
```

## 🔧 Troubleshooting

### 1. Port Already in Use
```bash
# Cek proses yang menggunakan port
sudo lsof -i :3000
sudo lsof -i :8000
sudo lsof -i :5432

# Kill proses yang konflik
sudo kill -9 <PID>

# Atau ganti port di docker-compose.yml
```

### 2. Database Connection Error
```bash
# Cek status database
docker-compose exec postgres pg_isready -U postgres

# Restart database
docker-compose restart postgres

# Cek database logs
docker-compose logs postgres
```

### 3. Build Error
```bash
# Clean build
docker-compose down
docker system prune -f
docker-compose build --no-cache

# Atau rebuild specific service
docker-compose build --no-cache backend
```

### 4. Permission Error
```bash
# Fix permission
sudo chown -R $USER:$USER .

# Atau jalankan dengan sudo
sudo docker-compose up -d
```

### 5. Container Won't Start
```bash
# Cek container logs
docker-compose logs <service-name>

# Cek container status
docker-compose ps

# Restart specific service
docker-compose restart <service-name>

# Recreate container
docker-compose up -d --force-recreate <service-name>
```

## 📝 Database Management

### 1. Backup Database
```bash
# Backup database
docker-compose exec postgres pg_dump -U postgres belami > backup.sql

# Backup dengan timestamp
docker-compose exec postgres pg_dump -U postgres belami > backup_$(date +%Y%m%d_%H%M%S).sql
```

### 2. Restore Database
```bash
# Restore database
docker-compose exec -T postgres psql -U postgres belami < backup.sql
```

### 3. Reset Database
```bash
# Stop services
docker-compose down

# Remove database volume
docker volume rm belami_postgres_data

# Start services (database akan dibuat ulang)
docker-compose up -d
```

## 🚀 Production Deployment

### 1. Environment Variables untuk Production
```bash
# Edit .env untuk production
nano .env

# Contoh production config
DATABASE_URL=postgresql+psycopg2://user:password@db-host:5432/belami
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NODE_ENV=production
```

### 2. Security Hardening
```bash
# Gunakan password database yang kuat
# Setup SSL/TLS
# Gunakan secrets management
# Setup firewall
```

### 3. Monitoring Production
```bash
# Setup health checks
# Monitor logs
# Setup backup strategy
# Monitor resource usage
```

## 📚 Useful Commands

### Docker Compose Commands
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Restart services
docker-compose restart

# Scale services
docker-compose up --scale backend=2

# View logs
docker-compose logs -f

# Execute command in container
docker-compose exec <service> <command>
```

### Docker Commands
```bash
# List containers
docker ps

# List images
docker images

# Remove unused containers
docker container prune

# Remove unused images
docker image prune

# Remove unused volumes
docker volume prune

# System cleanup
docker system prune -f
```

## 🆘 Support dan Bantuan

### 1. Cek Status
```bash
# Status semua services
docker-compose ps

# Health checks
curl http://localhost:8000/health
curl http://localhost:3000
```

### 2. Logs Analysis
```bash
# Semua logs
docker-compose logs -f

# Logs dengan timestamp
docker-compose logs -f -t

# Logs terakhir 100 baris
docker-compose logs --tail=100
```

### 3. Reset Everything
```bash
# Stop dan hapus semua
docker-compose down -v

# Hapus semua images
docker rmi $(docker images -q)

# Cleanup system
docker system prune -a -f

# Build ulang
docker-compose build --no-cache
docker-compose up -d
```

## 📞 Troubleshooting Checklist

- [ ] Docker dan Docker Compose terinstall
- [ ] Port 3000, 8000, 5432 tersedia
- [ ] File .env sudah dibuat
- [ ] Build images berhasil
- [ ] Services berjalan (docker-compose ps)
- [ ] Database connection OK
- [ ] Backend API accessible
- [ ] Frontend accessible
- [ ] Logs tidak ada error

Jika semua checklist sudah OK, aplikasi siap digunakan!
