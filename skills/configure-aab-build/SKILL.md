---
name: "configure-aab-build"
description: "Configure Android App Bundle (AAB) build settings: ProGuard/R8 minification, resource shrinking, ABI filters. Use when the user says 'configure aab', 'shrink android app', 'proguard android', 'r8 minification'."
---

# Configure AAB Build

Build the leanest possible AAB.

## app.json + expo-build-properties

```json
{
  "expo": {
    "plugins": [
      ["expo-build-properties", {
        "android": {
          "enableProguardInReleaseBuilds": true,
          "enableShrinkResourcesInReleaseBuilds": true,
          "extraProguardRules": "-keep class com.facebook.react.** { *; }"
        }
      }]
    ]
  }
}
```

## What each does

- **ProGuard/R8** (minify): obfuscates + removes unused code (~30% size reduction)
- **Shrink Resources**: removes unused images/strings (~10-20% reduction)
- **AAB**: Play splits per-device (~30-50% download reduction vs single APK)

## Inspect AAB

```bash
bundletool build-apks --bundle=app-release.aab --output=app.apks
unzip -l app.apks
# See split APKs by ABI, density, language
```

## Per-device split APK size

```bash
bundletool build-apks --bundle=app-release.aab --connected-device --output=app.apks
bundletool get-size total --apks=app.apks
# Shows actual download size for THIS device
```

## ABI filters (smaller for specific architectures)

If you only support arm64 (which is fine for Android 8+ devices):
```json
{
  "expo-build-properties": {
    "android": {
      "ndkVersion": "26.1.10909125",
      "abiFilters": ["arm64-v8a"]
    }
  }
}
```

Drops armeabi-v7a, x86 architectures → ~30% smaller AAB.

WARNING: some emulators are x86. Keep x86_64 if targeting devs.

## Image optimization

```bash
# Before adding to assets/
# Use WebP instead of PNG (50% smaller)
cwebp -q 80 input.png -o output.webp
```

## ProGuard config rules

Custom rules in `proguard-rules.pro`:
```
-keep class com.yourcompany.** { *; }
-keepattributes Signature
-keepattributes *Annotation*
```

## Verify
```bash
bundletool get-size total --apks=app.apks --dimensions=ABI,LANGUAGE,SCREEN_DENSITY
```

Should be <20MB target for indie apps.

## Pair with
- `optimize-aab-size` for deeper optimization
- `eas-build-profiles-android` for build config
