@echo off
REM Android Build Fix Script for Windows
REM This script fixes common React Native Android build issues

echo 🔧 Fixing Android build issues...

REM Step 1: Clean existing build files
echo 1. Cleaning build files...
if exist "android" (
    cd android
    if exist ".gradle" rmdir /s /q ".gradle"
    if exist "app\build" rmdir /s /q "app\build"
    if exist "build" rmdir /s /q "build"
    cd ..
)

REM Step 2: Clean node modules related to native dependencies
echo 2. Cleaning native dependencies...
if exist "node_modules\@react-native-async-storage" rmdir /s /q "node_modules\@react-native-async-storage"
if exist "node_modules\react-native-screens" rmdir /s /q "node_modules\react-native-screens"
if exist "node_modules\@react-navigation" rmdir /s /q "node_modules\@react-navigation"

REM Step 3: Reinstall dependencies
echo 3. Reinstalling dependencies...
call npm install @react-native-async-storage/async-storage@^2.2.0 --legacy-peer-deps
call npm install react-native-screens@^3.22.0 --legacy-peer-deps
call npm install @react-navigation/native@^6.1.7 --legacy-peer-deps
call npm install @react-navigation/native-stack@^6.9.12 --legacy-peer-deps

REM Step 4: Clean Metro cache
echo 4. Cleaning Metro cache...
call npx react-native start --reset-cache

echo ✅ Build fix complete!
echo.
echo Next steps:
echo 1. Try building: npm run android
echo 2. If build still fails, try: cd android ^&^& .\gradlew clean ^&^& cd .. ^&^& npm run android
echo 3. For GitHub Actions, ensure you have proper JDK version (11 or 17)
pause
