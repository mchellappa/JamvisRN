@echo off
echo =========================================
echo Testing JamvisRN dependency installation
echo =========================================

REM Clean existing installation
echo Cleaning existing installation...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

REM Install dependencies
echo Installing dependencies with compatible versions...
call npm install

REM Verify critical packages
echo.
echo Verifying installed versions...
call npm list react-native-screens --depth=0 2>nul | find "react-native-screens"
call npm list react-native-safe-area-context --depth=0 2>nul | find "react-native-safe-area-context"
call npm list @react-navigation/native --depth=0 2>nul | find "@react-navigation/native"

REM Check for potential peer dependency issues
echo.
echo Checking for peer dependency warnings...
call npm ls --depth=0

echo.
echo Dependency installation test complete!
echo If you see warnings above, they should not prevent the build from working.
echo.
echo Next steps:
echo 1. Test the build locally: build-apk.ps1
echo 2. Or use GitHub Actions to build the APK
echo.
pause
