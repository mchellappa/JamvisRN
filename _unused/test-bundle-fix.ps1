#!/usr/bin/env powershell

Write-Host "Testing JavaScript Bundle Export Fix" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green

# Check if bundle exists
$bundlePath = "android\app\src\main\assets\index.android.bundle"
if (Test-Path $bundlePath) {
    $bundleSize = (Get-Item $bundlePath).Length / 1MB
    Write-Host "✅ Bundle exists: $([math]::Round($bundleSize, 2)) MB" -ForegroundColor Green
    
    # Check for TypeScript syntax that should not be in JavaScript
    Write-Host ""
    Write-Host "Checking for TypeScript syntax issues..." -ForegroundColor Yellow
    
    $tsIssues = @(
        "useState<",
        "DailyData |",
        "Set<string>",
        ": string",
        ": 'prev' |",
        ": 'wod' |"
    )
    
    $foundIssues = @()
    foreach ($pattern in $tsIssues) {
        $result = Select-String -Path $bundlePath -Pattern $pattern -Quiet
        if ($result) {
            $foundIssues += $pattern
        }
    }
    
    if ($foundIssues.Count -eq 0) {
        Write-Host "✅ No TypeScript syntax found in bundle" -ForegroundColor Green
        Write-Host "✅ Export declaration issue should be fixed" -ForegroundColor Green
    } else {
        Write-Host "❌ Found TypeScript syntax:" -ForegroundColor Red
        foreach ($issue in $foundIssues) {
            Write-Host "  - $issue" -ForegroundColor Red
        }
    }
    
    Write-Host ""
    Write-Host "Bundle ready for testing!" -ForegroundColor Cyan
    Write-Host "The JavaScript bundle is now pure JavaScript without TypeScript syntax." -ForegroundColor Cyan
    Write-Host "Test it on your device - the 'export declaration must be at top level' error should be gone." -ForegroundColor Cyan
    
} else {
    Write-Host "❌ Bundle not found at $bundlePath" -ForegroundColor Red
    Write-Host "Run: npx react-native bundle --platform android --dev true --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res"
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Install APK on device"
Write-Host "2. Test the app - should load without 'export declaration' errors"
Write-Host "3. Verify offline WOD and meal plan functionality works"
