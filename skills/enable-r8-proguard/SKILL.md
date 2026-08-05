---
name: "enable-r8-proguard"
description: "Enable R8/ProGuard with proper keep rules for RN+Expo Android. Use when the user says 'enable r8', 'proguard rules', 'minify android'."
---

# Enable R8 + ProGuard

R8 = Google's minifier (replaces ProGuard). Removes unused code + obfuscates.

## Build gate

The configuration changes are local, but an EAS build can consume cloud resources and use signing credentials. Prepare the command and test plan first; run it only after the owner confirms the EAS account, build profile, and action.

## Enable in app.json
```json
{
  "expo-build-properties": {
    "android": {
      "enableProguardInReleaseBuilds": true,
      "enableShrinkResourcesInReleaseBuilds": true,
      "extraProguardRules": "..."
    }
  }
}
```

## Required keep rules

Common RN deps that need rules to survive minification:

```
# React Native
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }

# Reanimated
-keep class com.swmansion.reanimated.** { *; }

# Sentry
-keep class io.sentry.** { *; }
-keepattributes LineNumberTable,SourceFile

# Crashlytics
-keepattributes *Annotation*
-keepattributes SourceFile,LineNumberTable

# Your native modules (if any)
-keep class com.yourcompany.nativemodule.** { *; }
```

## Save as `proguard-rules.pro` and reference in expo-build-properties

## Test minified build after confirmation
```bash
eas build --profile production --platform android --local
adb install build.apk
# Run full E2E to verify nothing broke
```

## Common gotchas
- Reflection-using libraries break under R8 → add keep rule
- Stack traces unreadable → enable mapping file upload to Sentry/Crashlytics
- ~30% size reduction on AAB after R8

## Pair with
- `optimize-aab-size`
- `add-sentry-rn-android` (need mapping file for stack traces)
