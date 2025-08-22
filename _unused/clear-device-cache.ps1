#!/usr/bin/env powershell

Write-Host "Device Cache Clearing Script for Jamvis" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

Write-Host "This script will help clear all caches on your Android device" -ForegroundColor Yellow
Write-Host ""

# Check if ADB is available
$adbAvailable = $false
try {
    $null = & adb version 2>$null
    $adbAvailable = $true
    Write-Host "✅ ADB is available" -ForegroundColor Green
} catch {
    Write-Host "❌ ADB not found in PATH" -ForegroundColor Red
    Write-Host "Please install Android SDK Platform Tools" -ForegroundColor Yellow
}

if ($adbAvailable) {
    Write-Host ""
    Write-Host "Step 1: Uninstalling old app..." -ForegroundColor Yellow
    & adb uninstall com.jamvisrn 2>$null
    & adb uninstall com.jamvis 2>$null
    
    Write-Host "Step 2: Clearing ADB cache..." -ForegroundColor Yellow  
    & adb kill-server
    & adb start-server
    
    Write-Host "Step 3: Installing new APK..." -ForegroundColor Yellow
    $apkFiles = @(
        "Jamvis-standalone.apk",
        "Jamvis-debug.apk", 
        "android\app\build\outputs\apk\debug\app-debug.apk"
    )
    
    $apkInstalled = $false
    foreach ($apk in $apkFiles) {
        if (Test-Path $apk) {
            Write-Host "Installing $apk..." -ForegroundColor Cyan
            & adb install $apk
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ APK installed successfully!" -ForegroundColor Green
                $apkInstalled = $true
                break
            } else {
                Write-Host "❌ Failed to install $apk" -ForegroundColor Red
            }
        }
    }
    
    if (-not $apkInstalled) {
        Write-Host "❌ No APK file found to install" -ForegroundColor Red
        Write-Host "Please build the APK first using: ./build-standalone-apk.ps1" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Manual steps to try on your device:" -ForegroundColor Cyan
Write-Host "1. Go to Settings > Apps > Jamvis > Storage > Clear Cache" -ForegroundColor White
Write-Host "2. Go to Settings > Apps > Jamvis > Storage > Clear Data" -ForegroundColor White  
Write-Host "3. Restart your device" -ForegroundColor White
Write-Host "4. If still failing, uninstall and reinstall the app" -ForegroundColor White

Write-Host ""
Write-Host "Bundle information:" -ForegroundColor Cyan
$bundlePath = "android\app\src\main\assets\index.android.bundle"
if (Test-Path $bundlePath) {
    $bundleSize = (Get-Item $bundlePath).Length / 1MB
    $bundleTime = (Get-Item $bundlePath).LastWriteTime
    Write-Host "✅ Bundle: $([math]::Round($bundleSize, 2)) MB, created $bundleTime" -ForegroundColor Green
} else {
    Write-Host "❌ No bundle found" -ForegroundColor Red
}

Write-Host ""
Write-Host "If the export declaration error persists:" -ForegroundColor Yellow
Write-Host "1. The issue may be in React Native core files" -ForegroundColor White
Write-Host "2. Try using the Metro bundler instead of standalone bundle" -ForegroundColor White
Write-Host "3. Run: npm start, then press 'a' to run on Android" -ForegroundColor White
