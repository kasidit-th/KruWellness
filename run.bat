@echo off
cd /d %~dp0

echo Killing processes on ports 3000...

REM ค้นหาและ kill process ที่ใช้ port 3000
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do taskkill /PID %%a /F >nul 2>&1

echo Ports cleared. Starting app...

call npm start

pause
