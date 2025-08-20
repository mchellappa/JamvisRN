# Option: Downgrade AsyncStorage for Better API 19 Support

# This script downgrades AsyncStorage to version 1.x which has better API 19 compatibility

Write-Host "🔄 Downgrading AsyncStorage for Android 4.4 compatibility..." -ForegroundColor Yellow

# Remove current AsyncStorage
npm uninstall @react-native-async-storage/async-storage

# Install older version with better API 19 support
npm install @react-native-async-storage/async-storage@1.21.0 --legacy-peer-deps

Write-Host "✅ AsyncStorage downgraded to v1.21.0" -ForegroundColor Green
Write-Host "📱 This version has better Android 4.4 (API 19) compatibility" -ForegroundColor Cyan
Write-Host "⚠️ Test thoroughly on your old device" -ForegroundColor Yellow
