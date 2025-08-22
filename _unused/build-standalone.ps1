Write-Host "Creating standalone bundles for JamvisRN..." -ForegroundColor Green
Write-Host ""

Write-Host "Creating Android bundle..." -ForegroundColor Yellow
npx react-native bundle --platform android --dev true --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

if ($LASTEXITCODE -eq 0) {
    Write-Host "Android bundle created successfully!" -ForegroundColor Green
} else {
    Write-Host "Android bundle creation failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Creating iOS bundle..." -ForegroundColor Yellow
npx react-native bundle --platform ios --dev true --entry-file index.js --bundle-output ios/main.jsbundle

if ($LASTEXITCODE -eq 0) {
    Write-Host "iOS bundle created successfully!" -ForegroundColor Green
} else {
    Write-Host "iOS bundle creation failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Bundles created successfully!" -ForegroundColor Green
Write-Host "Android bundle: android/app/src/main/assets/index.android.bundle"
Write-Host "iOS bundle: ios/main.jsbundle"
Write-Host ""
Write-Host "Bundle sizes:"
$androidBundle = Get-Item "android/app/src/main/assets/index.android.bundle" -ErrorAction SilentlyContinue
$iosBundle = Get-Item "ios/main.jsbundle" -ErrorAction SilentlyContinue

if ($androidBundle) {
    $androidSize = [math]::Round($androidBundle.Length / 1MB, 2)
    Write-Host "  Android: $androidSize MB"
}

if ($iosBundle) {
    $iosSize = [math]::Round($iosBundle.Length / 1MB, 2)
    Write-Host "  iOS: $iosSize MB"
}

Write-Host ""
Write-Host "You can now build the APK without running Metro bundler:" -ForegroundColor Cyan
Write-Host "  cd android"
Write-Host "  ./gradlew assembleRelease"
Write-Host ""
Write-Host "Or use the existing build script:"
Write-Host "  ./build-apk.ps1"
