# JamvisRN Desktop App Launcher (PowerShell)
Write-Host "========================================" -ForegroundColor Green
Write-Host "JamvisRN Desktop App Launcher" -ForegroundColor Green  
Write-Host "========================================" -ForegroundColor Green

# Check if Node.js is installed
if (-not (Get-Command "node" -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Starting JamvisRN desktop app..." -ForegroundColor Yellow
Write-Host "The app will open in your default browser" -ForegroundColor Cyan
Write-Host ""
Write-Host "Features available:" -ForegroundColor White
Write-Host "- Login Screen" -ForegroundColor Gray
Write-Host "- Workouts Management" -ForegroundColor Gray  
Write-Host "- Meals Planning" -ForegroundColor Gray
Write-Host "- Grocery List" -ForegroundColor Gray
Write-Host ""
Write-Host "Keyboard shortcuts:" -ForegroundColor White
Write-Host "- Ctrl+R: Refresh app" -ForegroundColor Gray
Write-Host "- F11: Toggle fullscreen" -ForegroundColor Gray
Write-Host "- Ctrl+C: Stop the app" -ForegroundColor Gray
Write-Host ""

# Start the web development server
npm run web:dev

Write-Host ""
Write-Host "JamvisRN desktop app stopped." -ForegroundColor Yellow
