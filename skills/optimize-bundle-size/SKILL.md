---
name: "optimize-bundle-size"
description: "Reduce React Native + Expo iOS app bundle size from 100MB to 30MB. Use when the user says 'reduce bundle size', 'app too big', 'optimize app size', 'app store download size', 'bundle size rn'."
---

# Optimize Bundle Size

Apps over 200MB don't get downloaded over cellular. Targets: <50MB for cellular install, <30MB ideal.

## Build gate

Local inspection is safe. An EAS production build is an external, potentially billable action and may use signing credentials. Prepare the command and run it only after the owner confirms the EAS account, profile, and intended build.

## Measure first

```bash
# Build production app after confirmation
eas build --profile production --platform ios

# Inspect IPA
unzip Runner.ipa -d unpacked/
du -sh unpacked/Payload/*.app
# Look at biggest folders within
```

Or via Xcode Organizer: Window -> Organizer -> Archives -> select -> Show in Finder -> right-click .xcarchive -> Show Package Contents -> Products/Applications/[App].app

## Top size offenders (in order)

### 1. Native binaries (.framework, .dylib)
The native code from Pods. Biggest contributors:
- React Native core (~30MB)
- Hermes (~5MB if not enabled, smaller if enabled)
- Reanimated (~8MB)
- Skia (~15MB if added)
- Each expo-* native module

**Fix**:
- Enable Hermes (default in Expo SDK 50+, replaces JSC)
- Remove unused expo modules from `package.json`
- Skia: only include if you USE it

### 2. JavaScript bundle
Your app code + dependencies bundled.

```bash
# Inspect bundle composition
npx expo export --platform ios
ls -lh dist/_expo/static/js/ios
```

**Fix**:
- Tree-shake by importing only what you use:
  ```ts
  // Bad: imports all of lodash
  import _ from 'lodash';

  // Good: imports only debounce
  import debounce from 'lodash/debounce';
  ```
- Don't bundle large data (move to backend or CDN)
- Use `@expo/metro-config` to alias dev-only imports

### 3. Assets (images, videos, fonts)
- Images: use WebP instead of PNG (50% smaller)
- Use `expo-image` for runtime decode of large images
- Lazy-load images via CDN — don't bundle them
- Fonts: only bundle weights you use (e.g., Inter Regular + Bold, not all 9)

### 4. Localization (i18n)
- If you have 10 languages × 50KB strings = 500KB
- Use server-loaded translations for less common languages

### 5. Map data (if using maps)
- Don't bundle offline tiles
- Use online MapKit / Google Maps with caching

## Specific Expo optimizations

### Disable unused features in app.json

```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "...",
      "supportsTablet": false,    // saves iPad assets if not needed
      "buildNumber": "1"
    },
    "plugins": [
      // Only include plugins you actually use
      // Each plugin = native code + JS = bigger bundle
    ]
  }
}
```

### Use App Thinning (automatic with EAS)
- iOS automatically thins to user's device:
  - Only their architecture (arm64)
  - Only their resolution image assets
- Reduces user download by 30-50% from your IPA size

### Use App Slicing for resources

In Xcode: assign resources to specific iOS device targets so users only download relevant ones.

## Audit checklist

```bash
# 1. Check your IPA size
ls -lh build/*.ipa

# 2. Check JS bundle size
npx expo export --platform ios --dump-assetmap
# Should be <5MB for indie apps

# 3. Check native module count
grep "expo-" package.json | wc -l
# Each expo module = 1-3MB native code

# 4. Check unused deps
npx depcheck
# Remove anything in "unused dependencies"

# 5. Check large assets
find assets -size +100k -type f
# Compress / move to CDN
```

## Targets

- IPA size (uncompressed): <100MB
- IPA download size on App Store: <50MB (cellular threshold)
- After App Thinning on user device: <30MB ideal

## When app is genuinely large

Some apps NEED to be 100MB+ (image-heavy, AR, ML models). For those:
- App Clips (`add-app-clips`) for sub-10MB lite version
- Background asset download via expo-asset on first launch
- App Store description: explain WHY it's big ("includes offline ML models")

## Pair with
- `add-image` for expo-image setup
- `add-flashlist` for memory-efficient lists
- `versioning-fingerprint` (different concern but adjacent)
