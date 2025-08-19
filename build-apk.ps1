# Local Android APK Build Script for Jamvis
Write-Host "========================================" -ForegroundColor Green
Write-Host "Building Jamvis Android APK locally" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Function to check if a command exists
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Check if Node.js is installed
if (-not (Test-Command "node")) {
    Write-Host "Error: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if Java is installed
if (-not (Test-Command "java")) {
    Write-Host "Error: Java is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Java 17+ from https://adoptium.net/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Display versions
Write-Host ""
Write-Host "Node.js version:" -ForegroundColor Cyan
node --version

Write-Host "Java version:" -ForegroundColor Cyan
java -version

# Install dependencies
Write-Host ""
Write-Host "Installing npm dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to install npm dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Clean previous builds
Write-Host ""
Write-Host "Cleaning previous builds..." -ForegroundColor Yellow
Set-Location android
.\gradlew.bat clean
Set-Location ..

# Build debug APK
Write-Host ""
Write-Host "Building debug APK..." -ForegroundColor Yellow
Set-Location android
.\gradlew.bat assembleDebug
Set-Location ..

# Check if APK was built successfully
$apkPath = "android\app\build\outputs\apk\debug\app-debug.apk"
if (Test-Path $apkPath) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "SUCCESS: APK built successfully!" -ForegroundColor Green
    Write-Host "Location: $apkPath" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    
    # Copy APK to root directory for easy access
    $targetApk = "Jamvis-debug.apk"
    Copy-Item $apkPath $targetApk -Force
    if (Test-Path $targetApk) {
        Write-Host "APK copied to: $targetApk" -ForegroundColor Green
        
        # Show APK size
        $apkSize = (Get-Item $targetApk).Length / 1MB
        Write-Host "APK size: $([math]::Round($apkSize, 2)) MB" -ForegroundColor Cyan
    }
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "ERROR: APK build failed!" -ForegroundColor Red
    Write-Host "Check the error messages above." -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
}

Write-Host ""
Read-Host "Press Enter to exit"
