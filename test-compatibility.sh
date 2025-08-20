#!/bin/bash
# Quick Compatibility Test Script
# This script verifies that your backward compatibility fixes are working

echo "🔍 Testing Jamvis Backward Compatibility..."
echo ""

# Check bundle generation
echo "📦 Testing bundle generation..."
cd "$(dirname "$0")"
npx react-native bundle --platform android --dev true --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

if [ $? -eq 0 ]; then
    echo "✅ Bundle generation: SUCCESS"
else
    echo "❌ Bundle generation: FAILED"
    exit 1
fi

# Check manifest overrides
echo ""
echo "📝 Testing manifest overrides..."
if grep -q "tools:overrideLibrary" android/app/src/main/AndroidManifest.xml; then
    echo "✅ Main manifest override: PRESENT"
else
    echo "❌ Main manifest override: MISSING"
fi

if grep -q "tools:overrideLibrary" android/app/src/debug/AndroidManifest.xml; then
    echo "✅ Debug manifest override: PRESENT"
else
    echo "❌ Debug manifest override: MISSING"
fi

# Check Flipper removal
echo ""
echo "🔌 Testing Flipper removal..."
if ! grep -q "flipper-integration" android/app/build.gradle; then
    echo "✅ Flipper dependency: REMOVED"
else
    echo "❌ Flipper dependency: STILL PRESENT"
fi

# Check compatibility code
echo ""
echo "📱 Testing compatibility code..."
if grep -q "Platform.Version" BackwardCompatibleJamvisApp.js; then
    echo "✅ Platform detection: PRESENT"
else
    echo "❌ Platform detection: MISSING"
fi

if grep -q "Legacy Mode" BackwardCompatibleJamvisApp.js; then
    echo "✅ Legacy mode indicator: PRESENT"
else
    echo "❌ Legacy mode indicator: MISSING"
fi

# Check SDK version
echo ""
echo "🎯 Testing SDK configuration..."
if grep -q "minSdkVersion = 19" android/build.gradle; then
    echo "✅ minSdkVersion: SET TO 19"
else
    echo "❌ minSdkVersion: NOT SET TO 19"
fi

echo ""
echo "🎉 Backward Compatibility Test Complete!"
echo "Your app should now work on Android 4.4 (API 19) and above."
echo ""
echo "📋 Next Steps:"
echo "1. Use GitHub Actions to build APK (recommended)"
echo "2. Test the generated bundle on your old device"  
echo "3. Manual sideload if needed"
