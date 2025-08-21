# JARVIS App Assets

## Logo Files

### Main Logo
- **File:** `jarvis-logo.png` 
- **Description:** Futuristic JARVIS logo with teal/cyan circular design
- **Dimensions:** Optimized for mobile (512x512 recommended)
- **Usage:** Main app logo for splash screen, login screen, and navigation

### Implementation Status
- [ ] Save logo image as `assets/jarvis-logo.png`
- [x] Created JarvisLogo component (`components/JarvisLogo.js`)
- [ ] Update LoginScreen to use logo
- [ ] Update Android app icon
- [ ] Update web favicon

### Android App Icon Sizes Needed
Generate these sizes from the main logo:
- `android/app/src/main/res/mipmap-hdpi/ic_launcher.png` (72x72)
- `android/app/src/main/res/mipmap-mdpi/ic_launcher.png` (48x48)
- `android/app/src/main/res/mipmap-xhdpi/ic_launcher.png` (96x96)
- `android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png` (144x144)
- `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png` (192x192)

### Web Assets
- `web/favicon.ico` (16x16, 32x32)
- `web/logo192.png` (192x192)
- `web/logo512.png` (512x512)

## Color Palette (from logo)
- Primary Teal: `#00ffff`
- Secondary Teal: `#00cccc` 
- Dark Background: `#001a1a`
- Accent Glow: `rgba(0, 255, 255, 0.3)`
