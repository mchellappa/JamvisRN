# Simple APK Build Script - Minimal Dependencies
Write-Host "========================================" -ForegroundColor Green
Write-Host "JamvisRN Simple APK Build (No Navigation)" -ForegroundColor Green  
Write-Host "========================================" -ForegroundColor Green

# Backup current package.json
if (Test-Path "package.json") {
    Copy-Item "package.json" "package.json.backup"
    Write-Host "Backed up current package.json" -ForegroundColor Yellow
}

# Backup current App.js
if (Test-Path "App.js") {
    Copy-Item "App.js" "App.js.backup"
    Write-Host "Backed up current App.js" -ForegroundColor Yellow
}

try {
    # Use simple versions
    Write-Host "Switching to minimal dependencies..." -ForegroundColor Cyan
    Copy-Item "package.simple.json" "package.json" -Force
    Copy-Item "App.simple.js" "App.js" -Force
    
    # Clean and install
    Write-Host "Installing minimal dependencies..." -ForegroundColor Cyan
    Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue
    npm install
    
    # Build APK
    Write-Host "Building simple APK..." -ForegroundColor Cyan
    Set-Location android
    .\gradlew.bat clean
    .\gradlew.bat assembleDebug
    Set-Location ..
    
    # Check result
    $apkPath = "android\app\build\outputs\apk\debug\app-debug.apk"
    if (Test-Path $apkPath) {
        Write-Host "SUCCESS: Simple APK built!" -ForegroundColor Green
        Copy-Item $apkPath "JamvisRN-simple.apk" -Force
        Write-Host "APK copied to: JamvisRN-simple.apk" -ForegroundColor Green
    } else {
        Write-Host "APK build failed" -ForegroundColor Red
    }
    
} finally {
    # Restore original files
    Write-Host "Restoring original files..." -ForegroundColor Yellow
    if (Test-Path "package.json.backup") {
        Copy-Item "package.json.backup" "package.json" -Force
        Remove-Item "package.json.backup"
    }
    if (Test-Path "App.js.backup") {
        Copy-Item "App.js.backup" "App.js" -Force
        Remove-Item "App.js.backup"
    }
    Write-Host "Files restored" -ForegroundColor Yellow
}

Write-Host "Simple build test complete!" -ForegroundColor Green
