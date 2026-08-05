---
name: "eas-build-profiles-android"
description: "Define EAS build profiles for Android: development, preview, production with proper signing and AAB vs APK. Use when the user says 'eas build profiles android', 'eas android profile'."
---

# EAS Build Profiles (Android)

| Profile | Purpose | Output | Signing |
|---|---|---|---|
| development | Dev client for `expo start` | APK | Debug |
| preview | Internal testers + manual install | APK | Internal |
| production | Play Store submission | AAB | Play App Signing |

## Credential and external action gate

Creating an EAS build, generating or using a keystore, and uploading an AAB are separate external actions. Prepare the profile locally, but obtain explicit owner confirmation of the EAS account, Android package, signing method, profile, and expected cost before running a build. Keep all keystores outside the repository.

## Production
```json
{
  "production": {
    "android": {
      "buildType": "app-bundle",
      "applicationArchivePath": null,
      "credentialsSource": "remote",
      "withoutCredentials": false
    },
    "channel": "production",
    "autoIncrement": "versionCode"
  }
}
```

`autoIncrement: "versionCode"` bumps version code on every build.

## Credentials
After the owner has approved the account and signing plan, EAS can manage a keystore. Do not generate, download, or export signing material merely to configure this profile.

For Play App Signing: upload your keystore to Play Console once. After that, Play manages signing.

## Build after confirmation
```bash
eas build --profile production --platform android
```

Review the resulting build ID and AAB metadata before requesting a separate submission approval.

## Pair with
- `code-signing-android`, `set-up-play-app-signing`
