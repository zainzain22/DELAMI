#!/bin/bash

# Script untuk menjalankan Delami Style Whisperer dengan Docker

echo "🚀 Starting Delami Style Whisperer..."

# Cek apakah Docker terinstall
if ! command -v docker &> /dev/null; then
    echo "❌ Docker tidak terinstall. Silakan install Docker terlebih dahulu."
    exit 1
fi

# Cek apakah Docker Compose terinstall
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose tidak terinstall. Silakan install Docker Compose terlebih dahulu."
    exit 1
fi

# Cek apakah file .env ada
if [ ! -f .env ]; then
    echo "📝 Membuat file .env dari template..."
    cp docker.env.example .env
    echo "✅ File .env dibuat. Silakan edit jika diperlukan."
fi

# Cek port yang digunakan
echo "🔍 Mengecek port yang digunakan..."
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 3000 sudah digunakan. Silakan stop service yang menggunakan port ini."
    exit 1
fi

if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 8000 sudah digunakan. Silakan stop service yang menggunakan port ini."
    exit 1
fi

if lsof -Pi :5432 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 5432 sudah digunakan. Silakan stop service yang menggunakan port ini."
    exit 1
fi

echo "✅ Port tersedia."

# Build images
echo "🔨 Building Docker images..."
docker-compose build

if [ $? -ne 0 ]; then
    echo "❌ Build gagal. Silakan cek error di atas."
    exit 1
fi

echo "✅ Build berhasil."

# Jalankan services
echo "🚀 Starting services..."
docker-compose up -d

if [ $? -ne 0 ]; then
    echo "❌ Gagal menjalankan services. Silakan cek error di atas."
    exit 1
fi

echo "✅ Services berhasil dijalankan."

# Tunggu sebentar untuk services startup
echo "⏳ Menunggu services startup..."
sleep 10

# Cek status services
echo "📊 Status services:"
docker-compose ps

# Test health check
echo "🔍 Testing health checks..."
if curl -f http://localhost:8000/health >/dev/null 2>&1; then
    echo "✅ Backend API healthy"
else
    echo "⚠️  Backend API belum ready"
fi

if curl -f http://localhost:3000 >/dev/null 2>&1; then
    echo "✅ Frontend healthy"
else
    echo "⚠️  Frontend belum ready"
fi

echo ""
echo "🎉 Setup selesai!"
echo ""
echo "📱 Akses aplikasi:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo "📋 Useful commands:"
echo "   docker-compose logs -f          # Lihat logs"
echo "   docker-compose ps               # Status services"
echo "   docker-compose down             # Stop services"
echo "   docker-compose restart          # Restart services"
echo ""
echo "🔧 Troubleshooting:"
echo "   docker-compose logs -f backend  # Logs backend"
echo "   docker-compose logs -f frontend # Logs frontend"
echo "   docker-compose logs -f postgres # Logs database"
