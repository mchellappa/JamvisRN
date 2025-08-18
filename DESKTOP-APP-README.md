# JamvisRN Desktop App 🖥️

Your React Native mobile app is now available as a **Windows Desktop Application** using React Native Web!

## 🚀 Quick Start

### Method 1: Double-click launcher
- Run `launch-desktop.bat` (Windows)
- Or run `launch-desktop.ps1` (PowerShell)

### Method 2: Command line
```bash
npm run desktop
# or
npm run web:dev
```

## ✨ Features Available

### 📱 All Mobile Features
- **Login Screen** - User authentication
- **Workouts Screen** - Exercise management
- **Meals Screen** - Meal planning
- **Grocery List Screen** - Shopping lists
- **Navigation** - Full React Navigation stack

### 🖥️ Desktop Enhancements
- **Responsive Design** - Adapts to desktop screen sizes
- **Keyboard Shortcuts**:
  - `Ctrl+R` - Refresh application
  - `F11` - Toggle fullscreen mode
  - `Ctrl+C` - Stop the development server
- **Native Scrollbars** - Windows-style scrolling
- **Auto-open** - Launches in your default browser automatically

## 🌐 Access Methods

### Local Access
- **Primary**: http://localhost:3000
- **IPv6**: http://[::1]:3000

### Network Access
- **LAN**: http://10.34.195.198:3000 (accessible from other devices)

## 🛠️ Development

### Build for Production
```bash
npm run web:build
```
Creates optimized build in `web-build/` directory.

### Development Mode
```bash
npm run web:dev
```
Runs with hot reloading for development.

## 📋 System Requirements

- **Node.js** 18+ (already installed ✅)
- **Modern Browser** (Chrome, Firefox, Edge, Safari)
- **Windows 10/11** (for best experience)

## 🎯 Usage Tips

1. **Fullscreen Mode**: Press `F11` for app-like experience
2. **Mobile Testing**: Resize browser to test responsive behavior
3. **Network Testing**: Use the network URL to test from mobile devices
4. **Development**: Changes auto-reload in development mode

## 🔧 Technical Details

- **Framework**: React Native Web + Webpack
- **Port**: 3000 (configurable in webpack.config.js)
- **Build**: Development server with hot module replacement
- **Compatible**: Works with all existing React Native components

## 🚀 Next Steps

1. **Test the App**: Try all screens and navigation
2. **Customize**: Modify styles for desktop-specific improvements
3. **Deploy**: Use `npm run web:build` for production deployment
4. **PWA**: Can be enhanced to work as a Progressive Web App

Your mobile app is now a fully functional desktop application! 🎉
