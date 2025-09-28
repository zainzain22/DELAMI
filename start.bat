@echo off
echo 🚀 Starting Delami Style Whisperer...

REM Cek apakah Docker terinstall
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker tidak terinstall. Silakan install Docker terlebih dahulu.
    pause
    exit /b 1
)

REM Cek apakah Docker Compose terinstall
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose tidak terinstall. Silakan install Docker Compose terlebih dahulu.
    pause
    exit /b 1
)

REM Cek apakah file .env ada
if not exist .env (
    echo 📝 Membuat file .env dari template...
    copy docker.env.example .env
    echo ✅ File .env dibuat. Silakan edit jika diperlukan.
)

echo 🔨 Building Docker images...
docker-compose build

if %errorlevel% neq 0 (
    echo ❌ Build gagal. Silakan cek error di atas.
    pause
    exit /b 1
)

echo ✅ Build berhasil.

echo 🚀 Starting services...
docker-compose up -d

if %errorlevel% neq 0 (
    echo ❌ Gagal menjalankan services. Silakan cek error di atas.
    pause
    exit /b 1
)

echo ✅ Services berhasil dijalankan.

echo ⏳ Menunggu services startup...
timeout /t 10 /nobreak >nul

echo 📊 Status services:
docker-compose ps

echo.
echo 🎉 Setup selesai!
echo.
echo 📱 Akses aplikasi:
echo    Frontend: http://localhost:3000
echo    Backend API: http://localhost:8000
echo    API Docs: http://localhost:8000/docs
echo.
echo 📋 Useful commands:
echo    docker-compose logs -f          # Lihat logs
echo    docker-compose ps               # Status services
echo    docker-compose down             # Stop services
echo    docker-compose restart          # Restart services
echo.
echo 🔧 Troubleshooting:
echo    docker-compose logs -f backend  # Logs backend
echo    docker-compose logs -f frontend # Logs frontend
echo    docker-compose logs -f postgres # Logs database

pause
