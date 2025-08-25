# Jamvis APK Build Instructions

## Option 1: EAS Build (Cloud) - RECOMMENDED

1. **Sign up/Login to Expo:**
   ```bash
   npx eas-cli@latest login
   ```
   - Create account at expo.dev if you don't have one
   - It's free for personal projects

2. **Build APK:**
   ```bash
   npx eas-cli@latest build --platform android --profile preview
   ```
   - This builds in the cloud (no local Android setup needed)
   - Takes 5-10 minutes
   - Downloads APK file when complete

3. **Install APK:**
   - Download the APK file from the provided link
   - Enable "Install unknown apps" in Android settings
   - Install the APK on your device

## Option 2: Local Build (Requires Android Studio)

1. **Install Android Studio & SDK**
2. **Generate Android project:**
   ```bash
   npx expo prebuild --platform android
   ```
3. **Build APK:**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

## Option 3: Test in Browser (Immediate)

```bash
npx expo start --web
```
- Works immediately in browser
- Good for testing UI and navigation
- Some mobile features won't work

## Current Status
- EAS configuration is ready (eas.json created)
- App.json configured with Android package name
- All dependencies are compatible

## Recommendation
Use Option 1 (EAS Build) - it's the simplest and most reliable method.
