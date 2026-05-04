#!/bin/bash
# Script para rodar Backend e Frontend simultaneamente (Linux/Mac)

echo "========================================"
echo "CCS Hub - Development Environment"
echo "========================================"
echo ""

# Função para limpar ao sair
cleanup() {
    echo "Encerrando servidores..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Trap para limpar ao Ctrl+C
trap cleanup SIGINT

# Rodar Backend
echo "Iniciando Backend (port 3001)..."
cd backend
npm run dev &
BACKEND_PID=$!

sleep 2

# Rodar Frontend
echo "Iniciando Frontend (port 3000)..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "Servidores iniciados!"
echo "Backend:  http://localhost:3001"
echo "Frontend: http://localhost:3000"
echo "========================================"
echo "Pressione Ctrl+C para parar"

# Esperar pelos processos
wait
