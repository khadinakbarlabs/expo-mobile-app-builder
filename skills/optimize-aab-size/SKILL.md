---
name: "optimize-aab-size"
description: "Reduce Android AAB size from 50MB+ to below 20MB via ProGuard, R8, asset optimization, ABI filters. Use when the user says 'optimize aab size', 'shrink android app', 'reduce android download'."
---

# Optimize AAB Size

Target: <20MB download for cellular install.

## Measure baseline
```bash
bundletool get-size total --apks=app.apks --dimensions=ABI,LANGUAGE,SCREEN_DENSITY
```

## Top size offenders

1. **Native binaries** (~25MB):
   - React Native core
   - Reanimated, Skia (if added)
   - Hermes (already enabled by default)
   - expo modules

2. **JS bundle** (~3-8MB):
   - Tree-shake imports
   - Don't bundle large data
   - Code-split where possible

3. **Assets** (~5-30MB):
   - WebP instead of PNG (50% smaller)
   - Don't bundle large images
   - Use expo-image for runtime decode

4. **Localization** (~1-3MB):
   - Use AAB language splits (Play delivers user's language only)

## Quick wins

```json
{
  "expo-build-properties": {
    "android": {
      "enableProguardInReleaseBuilds": true,
      "enableShrinkResourcesInReleaseBuilds": true,
      "abiFilters": ["arm64-v8a"]
    }
  }
}
```

ABI filter: drop armeabi-v7a, x86_64 → 30% smaller AAB. Devices won't be affected because almost all 2024+ are arm64.

## Audit
```bash
# Inspect AAB structure
bundletool dump manifest --bundle=app.aab

# List largest files
unzip -l app.aab | sort -nr | head -20
```

## Pair with
- `configure-aab-build`
- `add-image-android` (use expo-image)
