@echo off
chcp 65001 >nul
title Recepty z Lednice
cls
echo ========================================================
echo   Recepty z Lednice - Spousteni aplikace
echo ========================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [CHYBA] Na vasem pocitaci neni nainstalovan Node.js!
    echo.
    echo Prosim stahnete a nainstalujte si Node.js zdarma z:
    echo https://nodejs.org
    echo.
    echo Po instalaci spustte tento soubor znovu.
    pause
    exit /b 1
)

if not exist node_modules (
    echo [1/2] Prvni spusteni: Instaluji potrebne knihovny (npm install)...
    echo To muze trvat 1-2 minuty, prosim pockejte...
    call npm install
    if %errorlevel% neq 0 (
        echo [CHYBA] Instalace knihoven selhala.
        pause
        exit /b 1
    )
)

echo.
echo [2/2] Spoustim aplikaci na http://localhost:3000 ...
echo.
start http://localhost:3000
call npm run dev
pause
