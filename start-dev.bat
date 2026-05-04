@echo off
REM Script para rodar Backend e Frontend simultaneamente no Windows

echo ========================================
echo CCS Hub - Development Environment
echo ========================================
echo.
echo Iniciando Backend (port 3001)...
start cmd /k "cd backend && npm run dev"

timeout /t 2 /nobreak

echo Iniciando Frontend (port 3000)...
start cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Dois terminais foram abertos!
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo ========================================
