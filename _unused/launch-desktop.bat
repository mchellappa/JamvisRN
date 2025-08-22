@echo off
echo ========================================
echo JamvisRN Desktop App Launcher
echo ========================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Starting JamvisRN desktop app...
echo The app will open in your default browser
echo.
echo Features available:
echo - Login Screen
echo - Workouts Management
echo - Meals Planning
echo - Grocery List
echo.
echo Keyboard shortcuts:
echo - Ctrl+R: Refresh app
echo - F11: Toggle fullscreen
echo - Ctrl+C: Stop the app
echo.

REM Start the web development server
call npm run web:dev

echo.
echo JamvisRN desktop app stopped.
pause
