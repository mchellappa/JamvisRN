# Standalone Bundle Build Guide for JamvisRN

## Overview
This guide explains how to create standalone JavaScript bundles for your JamvisRN app that don't require the Metro bundler to run.

## What is a Standalone Bundle?
A standalone bundle is a single JavaScript file that contains all your app's code and dependencies. When you build an APK with this bundle, the app becomes completely self-contained and doesn't need a Metro bundler server running.

## Benefits
✅ **No Metro Dependency**: APK runs without needing Metro bundler  
✅ **Self-Contained**: All JavaScript code embedded in the APK  
✅ **Offline Ready**: Your home screen with WOD and meal plans works offline  
✅ **Easy Distribution**: Share APK files that work on any Android device  
✅ **Production Ready**: Optimized for app stores and production deployment  

## Files Created

### Build Scripts
- `build-standalone.ps1` - Creates bundles for both Android and iOS
- `build-standalone.bat` - Windows batch version  
- `build-standalone-apk.ps1` - Creates bundle AND builds APK in one step

### Bundle Output Files
- `android/app/src/main/assets/index.android.bundle` - Android JavaScript bundle (~5.6 MB)
- `ios/main.jsbundle` - iOS JavaScript bundle (~5.6 MB)

## How to Use

### Option 1: Quick Build (Recommended)
```powershell
./build-standalone-apk.ps1
```
This will:
1. Create the JavaScript bundle
2. Build the APK with embedded bundle
3. Output: `JamvisRN-standalone.apk`

### Option 2: Manual Steps
```powershell
# Step 1: Create the bundle
./build-standalone.ps1

# Step 2: Build the APK
cd android
./gradlew assembleDebug
cd ..
```

### Option 3: Custom Bundle Creation
```bash
# Android bundle
npx react-native bundle --platform android --dev true --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

# iOS bundle  
npx react-native bundle --platform ios --dev true --entry-file index.js --bundle-output ios/main.jsbundle
```

## What's Included in Your Bundle

Your standalone bundle includes:
- **Complete Home Screen** with Today's WOD and Meal Plan
- **Offline Storage** using AsyncStorage
- **Default Workouts**: Full Body Strength, Cardio Blast
- **Default Meal Plans**: Complete daily nutrition tracking
- **Progress Tracking**: Exercise completion and meal logging
- **Date Navigation**: Browse different days
- **All React Native Dependencies**: No external server needed

## Bundle Details

### Development vs Production Bundles
- **Development** (`--dev true`): Larger size, includes debugging info
- **Production** (`--dev false`): Smaller size, optimized and minified

### Bundle Sizes
- **Android Bundle**: ~5.6 MB (development)
- **iOS Bundle**: ~5.6 MB (development)
- **Final APK**: Includes bundle + Android runtime (~15-25 MB total)

## Testing Your Standalone APK

1. Build using `./build-standalone-apk.ps1`
2. Install the APK: `adb install JamvisRN-standalone.apk`
3. **Turn off Metro bundler** - your app should still work!
4. **Turn off internet** - offline features should work perfectly

## Troubleshooting

### Bundle Creation Fails
```bash
# Install missing dependencies
npm install --save-dev @babel/preset-react

# Clean and retry
npm run clean
./build-standalone.ps1
```

### APK Won't Install
```bash
# Uninstall previous version first
adb uninstall com.jamvisrn

# Then install new version
adb install JamvisRN-standalone.apk
```

### App Crashes on Startup
- Check if all dependencies are included in bundle
- Verify AsyncStorage is properly installed
- Check Android logs: `adb logcat | grep ReactNative`

## Production Deployment

For app store releases:
```bash
# Create production bundle
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

# Build release APK
cd android
./gradlew assembleRelease
```

## Next Steps

Your standalone APK now contains:
- Complete fitness tracking home screen
- Offline workout and meal planning
- All JavaScript code embedded
- No external dependencies

The app is ready for distribution and will work on any Android device without requiring a development server!
