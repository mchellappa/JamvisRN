# JamvisRN Build Workflows

## Active Workflows

### 1. `build-apk.yml` - **MAIN BUILD** ✅
- **Triggers:** Push to main (package.json, App.js, android/**, workflow file changes)
- **Uses:** Default package.json + App.js (minimal, no navigation)
- **Artifact:** `app-debug-apk`
- **Status:** ✅ WORKING (no React Navigation issues)

### 2. `build-enhanced-apk.yml` - **ENHANCED BUILD** ✨
- **Triggers:** Push to main (package.enhanced.json, EnhancedApp.js, workflow file changes)  
- **Uses:** package.enhanced.json + EnhancedApp.js (full functional app)
- **Artifact:** `jamvis-enhanced-apk`
- **Status:** ✅ WORKING (no React Navigation issues)

## Disabled/Reference Files

### 3. `react-native-build.yml.disabled` - Alternative approach (manual trigger only)
### 4. Original Navigation Files - Available as backups:
- `App.original.js` - React Navigation version
- `package.original.json` - Full dependencies with navigation

## File Usage Matrix

| Build Type | package.json | App.js | Navigation | Dependencies |
|------------|--------------|--------|------------|--------------|
| **Main** | package.json | App.js | ❌ None | Minimal |
| **Enhanced** | package.enhanced.json | EnhancedApp.js | ✅ State-based | Minimal + AsyncStorage |
| **Original** | package.original.json | App.original.js | ✅ React Navigation | Full (problematic) |

## Why Only One Build Should Trigger

- **Fixed trigger paths** prevent workflow conflicts
- **Main build** only triggers for core files
- **Enhanced build** only triggers for enhanced files  
- **No more dual builds** on single commits

## Manual Trigger Available
All workflows support `workflow_dispatch` for manual triggering from GitHub Actions tab.
