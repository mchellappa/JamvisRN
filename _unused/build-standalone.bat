@echo off
echo Creating standalone bundles for JamvisRN...
echo.

echo Creating Android bundle...
call npx react-native bundle --platform android --dev true --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

echo.
echo Creating iOS bundle...
call npx react-native bundle --platform ios --dev true --entry-file index.js --bundle-output ios/main.jsbundle

echo.
echo Bundles created successfully!
echo Android bundle: android/app/src/main/assets/index.android.bundle
echo iOS bundle: ios/main.jsbundle
echo.
echo You can now build the APK without running Metro bundler:
echo   cd android
echo   ./gradlew assembleRelease
echo.
pause
