@echo off
REM App Icon Generation Script for Windows
REM This script helps generate app icons in various sizes from the main JARVIS logo

echo 🎨 JARVIS App Icon Generator
echo ================================

REM Check if logo exists
if not exist "assets\jarvis-logo.png" (
    echo ❌ Logo not found at assets\jarvis-logo.png
    echo Please save the JARVIS logo image as 'assets\jarvis-logo.png' first
    pause
    exit /b 1
)

echo ✅ Logo found: assets\jarvis-logo.png

REM Create Android icon directories if they don't exist
echo 📁 Creating Android icon directories...
if not exist "android\app\src\main\res\mipmap-hdpi" mkdir "android\app\src\main\res\mipmap-hdpi"
if not exist "android\app\src\main\res\mipmap-mdpi" mkdir "android\app\src\main\res\mipmap-mdpi"
if not exist "android\app\src\main\res\mipmap-xhdpi" mkdir "android\app\src\main\res\mipmap-xhdpi"
if not exist "android\app\src\main\res\mipmap-xxhdpi" mkdir "android\app\src\main\res\mipmap-xxhdpi"
if not exist "android\app\src\main\res\mipmap-xxxhdpi" mkdir "android\app\src\main\res\mipmap-xxxhdpi"

REM Create web assets directory
if not exist "web\assets" mkdir "web\assets"

echo 🖼️  Manual icon generation needed...
echo.
echo ⚠️  Please manually resize the logo to these sizes:
echo.
echo Android Icons:
echo - 48x48   → android\app\src\main\res\mipmap-mdpi\ic_launcher.png
echo - 72x72   → android\app\src\main\res\mipmap-hdpi\ic_launcher.png
echo - 96x96   → android\app\src\main\res\mipmap-xhdpi\ic_launcher.png
echo - 144x144 → android\app\src\main\res\mipmap-xxhdpi\ic_launcher.png
echo - 192x192 → android\app\src\main\res\mipmap-xxxhdpi\ic_launcher.png
echo.
echo Round Icons (same sizes):
echo - Replace ic_launcher_round.png in each folder
echo.
echo Web Icons:
echo - 16x16   → web\favicon-16x16.png
echo - 32x32   → web\favicon-32x32.png
echo - 192x192 → web\logo192.png
echo - 512x512 → web\logo512.png
echo.
echo 🎯 Next Steps:
echo 1. Save the JARVIS logo as 'assets\jarvis-logo.png'
echo 2. Resize to all the sizes listed above
echo 3. Update JarvisLogo component to use the actual image
echo 4. Build and test the app with the new logo
echo.
echo ✨ JARVIS branding will be complete!
pause
