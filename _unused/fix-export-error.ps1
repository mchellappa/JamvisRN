#!/usr/bin/env powershell

Write-Host "Export Declaration Error Troubleshooting" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Green

# Check if bundle exists
$bundlePath = "android\app\src\main\assets\index.android.bundle"
if (Test-Path $bundlePath) {
    Write-Host "✅ Bundle exists" -ForegroundColor Green
    
    # Check bundle size
    $bundleSize = (Get-Item $bundlePath).Length / 1MB
    Write-Host "Bundle size: $([math]::Round($bundleSize, 2)) MB" -ForegroundColor Cyan
    
    # Check creation time
    $bundleTime = (Get-Item $bundlePath).LastWriteTime
    Write-Host "Bundle created: $bundleTime" -ForegroundColor Cyan
    
} else {
    Write-Host "❌ Bundle not found" -ForegroundColor Red
}

Write-Host ""
Write-Host "Checking file structure..." -ForegroundColor Yellow

# Check main files
$files = @(
    "App.js",
    "HomeScreenWithOfflineWOD.js", 
    "index.js",
    "app.json"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "✅ $file exists" -ForegroundColor Green
    } else {
        Write-Host "❌ $file missing" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "If you're still getting export declaration errors:" -ForegroundColor Yellow
Write-Host "1. Clear app cache on device" -ForegroundColor White
Write-Host "2. Uninstall and reinstall the APK" -ForegroundColor White  
Write-Host "3. Run: adb uninstall com.jamvis && adb install Jamvis-standalone.apk" -ForegroundColor White
Write-Host "4. Make sure Metro bundler is stopped before testing standalone APK" -ForegroundColor White

Write-Host ""
Write-Host "To rebuild everything fresh:" -ForegroundColor Cyan
Write-Host "./build-standalone-apk.ps1" -ForegroundColor White
