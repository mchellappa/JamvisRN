#!/bin/bash
# Android Build Fix Script
# This script fixes common React Native Android build issues

echo "🔧 Fixing Android build issues..."

# Step 1: Clean existing build files
echo "1. Cleaning build files..."
if [ -d "android" ]; then
    cd android
    rm -rf .gradle
    rm -rf app/build
    rm -rf build
    cd ..
fi

# Step 2: Clean node modules related to native dependencies
echo "2. Cleaning native dependencies..."
rm -rf node_modules/@react-native-async-storage
rm -rf node_modules/react-native-screens
rm -rf node_modules/@react-navigation

# Step 3: Reinstall dependencies
echo "3. Reinstalling dependencies..."
npm install @react-native-async-storage/async-storage@^2.2.0 --legacy-peer-deps
npm install react-native-screens@^3.22.0 --legacy-peer-deps
npm install @react-navigation/native@^6.1.7 --legacy-peer-deps
npm install @react-navigation/native-stack@^6.9.12 --legacy-peer-deps

# Step 4: Clean Metro cache
echo "4. Cleaning Metro cache..."
npx react-native start --reset-cache &
sleep 5
pkill -f "react-native start"

echo "✅ Build fix complete!"
echo ""
echo "Next steps:"
echo "1. Try building: npm run android"
echo "2. If build still fails, try: cd android && ./gradlew clean && cd .. && npm run android"
echo "3. For GitHub Actions, ensure you have proper JDK version (11 or 17)"
