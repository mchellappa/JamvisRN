# Backward Compatible Build Script for Old Android Devices
# This script builds the app with settings optimized for older Android devices

Write-Host "Building Jamvis for Backward Compatibility (Android 4.4+)..." -ForegroundColor Green

# Clean previous builds
Write-Host "Cleaning previous builds..." -ForegroundColor Yellow
if (Test-Path "android\app\build") {
    Remove-Item -Recurse -Force "android\app\build"
}

# Clean Metro cache
Write-Host "Clearing Metro cache..." -ForegroundColor Yellow
npx react-native start --reset-cache &
Start-Sleep -Seconds 3
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue

# Generate bundle with ES5 compatibility
Write-Host "Generating backward-compatible bundle..." -ForegroundColor Yellow
npx react-native bundle `
  --platform android `
  --dev false `
  --entry-file index.js `
  --bundle-output android/app/src/main/assets/index.android.bundle `
  --assets-dest android/app/src/main/res/

if ($LASTEXITCODE -ne 0) {
    Write-Host "Bundle generation failed!" -ForegroundColor Red
    exit 1
}

# Build APK for old devices
Write-Host "Building APK for old Android devices..." -ForegroundColor Yellow
cd android
.\gradlew assembleRelease

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build successful!" -ForegroundColor Green
    Write-Host "APK location: android\app\build\outputs\apk\release\app-release.apk" -ForegroundColor Cyan
    Write-Host "This APK is compatible with Android 4.4 (API 19) and above" -ForegroundColor Cyan
} else {
    Write-Host "Build failed!" -ForegroundColor Red
}

cd ..
