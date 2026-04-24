@echo off
setlocal
cd /d "%~dp0"
echo ==========================================
echo   Starting Alba Consulting Task Manager
echo ==========================================

:: Start Backend Server
echo Starting Backend...
start "Alba Backend" cmd /k "cd /d "%~dp0server" && npm run dev"

:: Start Frontend Server
echo Starting Frontend...
start "Alba Frontend" cmd /k "cd /d "%~dp0client" && npm run dev"

:: Wait for servers to initialize
echo Waiting for servers to start...
timeout /t 8 /nobreak > nul

:: Open the App in Browser
echo Opening browser...
start http://localhost:3000

echo.
echo Application is running! 
echo Keep the other two terminal windows open while using the app.
echo.
pause
