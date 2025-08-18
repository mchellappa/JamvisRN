# GitHub Actions Setup for Jamvis Android App

This repository includes GitHub Actions workflows to build your React Native Expo app in the cloud.

## Setup Instructions

### 1. Create Expo Account and Get Token

1. Go to [expo.dev](https://expo.dev) and create an account
2. Install EAS CLI: `npm install -g eas-cli`
3. Login: `eas login`
4. Generate access token: `eas build:configure` (this creates your first build)
5. Go to [expo.dev/accounts/[your-username]/settings/access-tokens](https://expo.dev/accounts/settings/access-tokens)
6. Create a new access token

### 2. Add Secrets to GitHub Repository

1. Go to your GitHub repository
2. Click Settings > Secrets and variables > Actions
3. Add a new repository secret:
   - Name: `EXPO_TOKEN`
   - Value: Your Expo access token from step 1

### 3. Available Workflows

#### EAS Build (Recommended)
- File: `.github/workflows/eas-build.yml`
- Builds APK using Expo's cloud service
- Requires EXPO_TOKEN secret
- Automatically triggered on push to main/master

#### React Native Build (Alternative)
- File: `.github/workflows/react-native-build.yml`
- Builds APK using GitHub Actions runners
- No external service required
- Good fallback option

### 4. Triggering Builds

**Automatic:**
- Push to main or master branch
- Create pull request

**Manual:**
- Go to Actions tab in GitHub
- Select workflow
- Click "Run workflow"

### 5. Downloading APK

1. Go to Actions tab in your GitHub repository
2. Click on a successful build
3. Download the APK from Artifacts section

## Workflow Files Created

- `.github/workflows/eas-build.yml` - EAS cloud build
- `.github/workflows/react-native-build.yml` - Self-hosted build
- `.gitignore` - Prevents committing build files

## Next Steps

1. Push your code to GitHub
2. Add EXPO_TOKEN secret
3. Trigger a build
4. Download your APK!

This bypasses all local SSL certificate issues by building in GitHub's cloud environment.
