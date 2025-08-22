# EAS Build Setup Instructions

## Required GitHub Secrets

To enable EAS builds in GitHub Actions, you need to add your Expo access token:

### 1. Get Your Expo Access Token
1. Go to [https://expo.dev/accounts/[your-username]/settings/access-tokens](https://expo.dev/accounts/[your-username]/settings/access-tokens)
2. Click "Create Token"
3. Give it a name like "GitHub Actions - JamvisRN"
4. Copy the generated token

### 2. Add to GitHub Repository Secrets
1. Go to your GitHub repository: `https://github.com/mchellappa/JamvisRN`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `EXPO_TOKEN`
5. Value: Paste your Expo access token
6. Click **Add secret**

## Build Commands

Once the secret is set up, builds will trigger automatically on:
- Push to `main` or `develop` branches
- Manual workflow dispatch
- Pull requests

### Manual Build Trigger
You can also manually trigger a build:
1. Go to **Actions** tab in your GitHub repo
2. Select **EAS Build Android APK** workflow
3. Click **Run workflow**
4. Choose the branch and click **Run workflow**

## Build Profiles

The current setup uses the `preview` profile from `eas.json`:
- **preview**: Builds APK files for testing
- **debug**: Development builds with debugging enabled
- **production**: Production-ready builds (requires signing)

## Artifacts

After successful builds, APK files are available in:
- **Actions** → **[Build Run]** → **Artifacts** section
- Downloads are available for 30 days

## Troubleshooting

### SSL Certificate Issues
If you see SSL certificate errors locally:
```bash
# This is why we use GitHub Actions instead of local builds
npm config set strict-ssl false  # Not recommended for production
V5P9IGyNzergFB_HE9vchpaTMsnsOqg6IErGoIOM
```

### Build Failures
Check the **Actions** tab for detailed logs. Common issues:
1. Missing EXPO_TOKEN secret
2. Invalid eas.json configuration  
3. Package version conflicts

## EAS Configuration Files

- `eas.json`: Build profiles and settings
- `app.json`: Expo project configuration
- `.github/workflows/eas-build.yml`: GitHub Actions workflow
