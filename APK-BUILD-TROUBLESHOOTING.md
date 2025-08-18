# APK Build Troubleshooting Guide

## Recent Fixes Applied ✅

### Dependency Compatibility Issues (Fixed)
The project now uses React Native 0.73.6 compatible versions:
- `react-native-screens`: 3.25.0 (was 3.29.0 - too new)
- `react-native-safe-area-context`: 4.5.4 (was 4.8.2 - too new) 
- `@react-navigation/*`: 6.x (was 7.x - unstable with RN 0.73.6)

### React Version Conflicts (Fixed)
- `react`: 18.2.0 (exact version)
- `react-dom`: 18.2.0 (exact version, was ^18.2.0 causing 18.3.1)
- Added `resolutions` field to force React 18.2.0
- GitHub Actions now uses `--legacy-peer-deps` flag

### Gradle Wrapper Issues (Fixed)
- Added `android/gradlew` and `android/gradlew.bat` to repository
- Removed these files from `.gitignore`
- Updated GitHub Actions to handle gradlew permissions properly

## SSL Certificate Issues Resolution

The SSL certificate errors you're encountering are common in corporate environments. Here are several solutions:

### Solution 1: Configure Gradle to Use HTTP Instead of HTTPS

1. Create or edit `gradle.properties` in your Android project:
   ```properties
   # Add these lines to use HTTP repositories
   systemProp.http.proxyHost=
   systemProp.http.proxyPort=
   systemProp.https.proxyHost=
   systemProp.https.proxyPort=
   
   # Disable HTTPS verification (temporary fix)
   systemProp.javax.net.ssl.trustStore=
   systemProp.javax.net.ssl.trustStorePassword=
   ```

2. Edit `android/build.gradle` to use HTTP repositories:
   ```gradle
   allprojects {
       repositories {
           maven { url 'http://repo1.maven.org/maven2' }
           maven { url 'http://jcenter.bintray.com' }
           google()
           mavenCentral()
       }
   }
   ```

### Solution 2: Use Pre-downloaded Gradle

1. Download Gradle 8.3 manually from: https://gradle.org/releases/
2. Extract it to a local directory
3. Update `android/gradle/wrapper/gradle-wrapper.properties`:
   ```properties
   distributionUrl=file:///path/to/your/gradle-8.3-all.zip
   ```

### Solution 3: Use Docker Build Environment

Create a `Dockerfile` in your project root:

```dockerfile
FROM node:20-slim

# Install Java 17
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk wget unzip && \
    rm -rf /var/lib/apt/lists/*

# Install Android SDK
ENV ANDROID_HOME=/opt/android-sdk
RUN mkdir -p ${ANDROID_HOME}/cmdline-tools && \
    wget -O /tmp/cmdline-tools.zip https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip && \
    unzip /tmp/cmdline-tools.zip -d ${ANDROID_HOME}/cmdline-tools && \
    mv ${ANDROID_HOME}/cmdline-tools/cmdline-tools ${ANDROID_HOME}/cmdline-tools/latest

ENV PATH=${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools:${PATH}

# Accept licenses and install SDK components
RUN yes | sdkmanager --licenses && \
    sdkmanager "platforms;android-34" "build-tools;34.0.0" "platform-tools"

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN cd android && ./gradlew assembleDebug

CMD ["sh", "-c", "cp android/app/build/outputs/apk/debug/app-debug.apk /output/"]
```

Then build using:
```bash
docker build -t jamvis-builder .
docker run -v $(pwd)/output:/output jamvis-builder
```

### Solution 4: Use GitHub Actions (Recommended)

Your GitHub Actions workflow has been updated to use JDK 17. To use it:

1. Push your code to GitHub
2. Go to your repository on GitHub
3. Click "Actions" tab
4. Click "Build Android APK" workflow
5. Click "Run workflow"
6. Download the built APK from the artifacts

### Solution 5: Use Expo Development Build

Since your project originally used Expo, you can use Expo's cloud build service:

1. Install Expo CLI: `npm install -g @expo/cli`
2. Login to Expo: `npx expo login`
3. Configure your app: `npx expo prebuild`
4. Build APK: `npx eas build --platform android --profile debug`

### Solution 6: Manual Android Studio Build

1. Install Android Studio
2. Open the `android` folder as an Android project
3. Let it download and configure everything automatically
4. Build APK using: Build > Build Bundle(s) / APK(s) > Build APK(s)

## Local Build Scripts

Use the provided build scripts:
- **Windows**: `build-apk.bat` or `build-apk.ps1`
- **Linux/Mac**: `build-apk.sh` (if created)

## Common Issues and Fixes

### Issue: "adb not found"
**Fix**: Install Android SDK Platform Tools or Android Studio

### Issue: "ANDROID_HOME not set"
**Fix**: Set environment variable:
```bash
export ANDROID_HOME=/path/to/your/android-sdk
```

### Issue: "Java version mismatch"
**Fix**: Install Java 17 and set JAVA_HOME:
```bash
export JAVA_HOME=/path/to/java-17
```

### Issue: "Gradle daemon connection failed"
**Fix**: Use `--no-daemon` flag:
```bash
./gradlew assembleDebug --no-daemon
```

## Testing Your APK

Once built, you can:
1. Install on Android device: `adb install app-debug.apk`
2. Test on emulator
3. Upload to device manually via USB

## Need Help?

If you continue to have issues:
1. Check the GitHub Actions build logs
2. Try the Docker approach for a clean environment
3. Use Expo's cloud build service for the easiest solution
