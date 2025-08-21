#!/bin/bash
# App Icon Generation Script
# This script helps generate app icons in various sizes from the main JARVIS logo

echo "🎨 JARVIS App Icon Generator"
echo "================================"

# Check if logo exists
if [ ! -f "assets/jarvis-logo.png" ]; then
    echo "❌ Logo not found at assets/jarvis-logo.png"
    echo "Please save the JARVIS logo image as 'assets/jarvis-logo.png' first"
    exit 1
fi

echo "✅ Logo found: assets/jarvis-logo.png"

# Create Android icon directories if they don't exist
echo "📁 Creating Android icon directories..."
mkdir -p android/app/src/main/res/mipmap-hdpi
mkdir -p android/app/src/main/res/mipmap-mdpi  
mkdir -p android/app/src/main/res/mipmap-xhdpi
mkdir -p android/app/src/main/res/mipmap-xxhdpi
mkdir -p android/app/src/main/res/mipmap-xxxhdpi

# Create web assets directory
mkdir -p web/assets

echo "🖼️  Generating Android app icons..."

# Check if ImageMagick or similar tool is available
if command -v convert &> /dev/null; then
    echo "Using ImageMagick to resize images..."
    
    # Generate Android icons
    convert assets/jarvis-logo.png -resize 48x48 android/app/src/main/res/mipmap-mdpi/ic_launcher.png
    convert assets/jarvis-logo.png -resize 72x72 android/app/src/main/res/mipmap-hdpi/ic_launcher.png
    convert assets/jarvis-logo.png -resize 96x96 android/app/src/main/res/mipmap-xhdpi/ic_launcher.png
    convert assets/jarvis-logo.png -resize 144x144 android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png
    convert assets/jarvis-logo.png -resize 192x192 android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png
    
    # Generate round icons
    convert assets/jarvis-logo.png -resize 48x48 android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png
    convert assets/jarvis-logo.png -resize 72x72 android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png
    convert assets/jarvis-logo.png -resize 96x96 android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png
    convert assets/jarvis-logo.png -resize 144x144 android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png
    convert assets/jarvis-logo.png -resize 192x192 android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png
    
    # Generate web assets
    convert assets/jarvis-logo.png -resize 32x32 web/favicon-32x32.png
    convert assets/jarvis-logo.png -resize 16x16 web/favicon-16x16.png
    convert assets/jarvis-logo.png -resize 192x192 web/logo192.png
    convert assets/jarvis-logo.png -resize 512x512 web/logo512.png
    
    echo "✅ Icons generated successfully!"
    
elif command -v sips &> /dev/null; then
    echo "Using sips (macOS) to resize images..."
    
    # Generate Android icons using sips (macOS)
    sips -z 48 48 assets/jarvis-logo.png --out android/app/src/main/res/mipmap-mdpi/ic_launcher.png
    sips -z 72 72 assets/jarvis-logo.png --out android/app/src/main/res/mipmap-hdpi/ic_launcher.png
    sips -z 96 96 assets/jarvis-logo.png --out android/app/src/main/res/mipmap-xhdpi/ic_launcher.png
    sips -z 144 144 assets/jarvis-logo.png --out android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png
    sips -z 192 192 assets/jarvis-logo.png --out android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png
    
    echo "✅ Icons generated successfully!"
    
else
    echo "⚠️  No image resizing tool found (ImageMagick or sips)"
    echo "Please install ImageMagick or resize the logo manually to these sizes:"
    echo ""
    echo "Android Icons:"
    echo "- 48x48   → android/app/src/main/res/mipmap-mdpi/ic_launcher.png"
    echo "- 72x72   → android/app/src/main/res/mipmap-hdpi/ic_launcher.png"
    echo "- 96x96   → android/app/src/main/res/mipmap-xhdpi/ic_launcher.png"
    echo "- 144x144 → android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png"
    echo "- 192x192 → android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png"
    echo ""
    echo "Web Icons:"
    echo "- 16x16   → web/favicon-16x16.png"
    echo "- 32x32   → web/favicon-32x32.png"
    echo "- 192x192 → web/logo192.png"
    echo "- 512x512 → web/logo512.png"
fi

echo ""
echo "🎯 Next Steps:"
echo "1. Save the JARVIS logo as 'assets/jarvis-logo.png'"
echo "2. Run this script to generate all icon sizes"
echo "3. Update JarvisLogo component to use the actual image"
echo "4. Build and test the app with the new logo"

echo ""
echo "✨ JARVIS branding will be complete!"
