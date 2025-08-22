# Metro Load Error Troubleshooting Guide

## Common Metro Load Error Fixes

### 1. **Clear Metro Cache (Most Common Fix)**
```bash
# Clear all caches
npx react-native start --reset-cache

# Or manually clear
rm -rf node_modules
npm install
npx react-native start --reset-cache
```

### 2. **Fix Network Connection Issues**
```bash
# Check if Metro server is running on correct IP
ipconfig  # Windows - get your IP address
adb reverse tcp:8081 tcp:8081  # Forward port for Android device
```

### 3. **Reset Metro Bundler**
```bash
# Kill any running Metro processes
taskkill /f /im node.exe  # Windows
# or
pkill -f metro  # Linux/Mac

# Start fresh
npx react-native start
```

### 4. **Android Device Connection**
```bash
# Check device connection
adb devices

# If device not listed:
adb kill-server
adb start-server
adb devices
```

### 5. **Check Metro URL on Device**
On your Android device:
- Shake device → Dev Settings → Debug server host & port
- Should be: `YOUR_IP:8081` or `localhost:8081` (if USB connected)
- Get your IP: Run `ipconfig` in PowerShell

## Quick Fix Commands (Run in PowerShell)
