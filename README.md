# JARVIS Fitness App

A minimal React Native fitness app with offline capabilities.

## Essential Files

- `App.minimal.js` - Main application component
- `index.js` - React Native entry point  
- `app.json` - App configuration
- `eas.json` - EAS build configuration
- `credentials.json` - Local keystore credentials
- `package.json` - Dependencies
- `babel.config.js` - Babel configuration
- `metro.config.js` - Metro bundler configuration
- `android/` - Android native code
- `assets/` - App assets (icons, splash screen)

## Build

```bash
npm run build:android
```

## Features

- Login screen with JARVIS branding
- Today's workout display
- Meal plan overview  
- Grocery list
- Dark theme with cyan accents
- Fully offline (no network dependencies)

All unused files moved to `_unused/` directory.
