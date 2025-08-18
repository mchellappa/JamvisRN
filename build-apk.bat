@echo off
REM Local Android APK Build Script for JamvisRN
echo ========================================
echo Building JamvisRN Android APK locally
echo ========================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if Java 17+ is installed
java -version 2>&1 | find "version" >nul
if %errorlevel% neq 0 (
    echo Error: Java is not installed or not in PATH
    echo Please install Java 17+ from https://adoptium.net/
    pause
    exit /b 1
)

REM Install dependencies
echo.
echo Installing npm dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install npm dependencies
    pause
    exit /b 1
)

REM Clean previous builds
echo.
echo Cleaning previous builds...
cd android
call gradlew.bat clean
cd ..

REM Build debug APK
echo.
echo Building debug APK...
cd android
call gradlew.bat assembleDebug
cd ..

if exist "android\app\build\outputs\apk\debug\app-debug.apk" (
    echo.
    echo ========================================
    echo SUCCESS: APK built successfully!
    echo Location: android\app\build\outputs\apk\debug\app-debug.apk
    echo ========================================
    
    REM Copy APK to root directory for easy access
    copy "android\app\build\outputs\apk\debug\app-debug.apk" "JamvisRN-debug.apk"
    if exist "JamvisRN-debug.apk" (
        echo APK copied to: JamvisRN-debug.apk
    )
) else (
    echo.
    echo ========================================
    echo ERROR: APK build failed!
    echo Check the error messages above.
    echo ========================================
)

echo.
pause
