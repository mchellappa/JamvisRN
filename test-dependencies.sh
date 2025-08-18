#!/bin/bash

echo "========================================="
echo "Testing JamvisRN dependency installation"
echo "========================================="

# Clean existing installation
echo "Cleaning existing installation..."
rm -rf node_modules
rm -f package-lock.json

# Install dependencies
echo "Installing dependencies with compatible versions..."
npm install

# Verify critical packages
echo ""
echo "Verifying installed versions..."
echo "react-native-screens:" $(npm list react-native-screens --depth=0 | grep react-native-screens)
echo "react-native-safe-area-context:" $(npm list react-native-safe-area-context --depth=0 | grep react-native-safe-area-context)
echo "@react-navigation/native:" $(npm list @react-navigation/native --depth=0 | grep @react-navigation/native)

# Check for potential peer dependency issues
echo ""
echo "Checking for peer dependency warnings..."
npm ls --depth=0

echo ""
echo "Dependency installation test complete!"
echo "If you see warnings above, they should not prevent the build from working."
echo ""
echo "Next steps:"
echo "1. Test the build locally: ./build-apk.ps1"
echo "2. Or use GitHub Actions to build the APK"
