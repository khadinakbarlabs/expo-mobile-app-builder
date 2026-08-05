---
name: "design-app-icon-adaptive"
description: "Generate Android adaptive app icon (foreground + background), monochrome icon for themed icons (Android 13+), and Play Store 512x512 icon. Use when the user says 'android icon', 'adaptive icon', 'app icon android', 'launcher icon android'."
---

# Design App Icon (Adaptive)

Android icons differ from iOS — they're adaptive (two-layer) and reshape per launcher.

## What's required

### 1. Adaptive icon
- **Foreground**: 432×432 (logo, transparent background)
- **Background**: 432×432 (solid color OR pattern)
- Result: launcher applies mask (circle, squircle, square, teardrop — varies by manufacturer)

### 2. Monochrome icon (Android 13+ themed icons)
- 432×432, single channel
- Used when user enables themed icons (Settings → Wallpaper → Themed icons)
- Should be a clean silhouette of your logo

### 3. Play Store icon
- **512×512 PNG**, 32-bit, no transparency
- Used in Play Store listing
- Apple's 1024×1024 → resize down

## Safe zone for adaptive icon

The icon is 432×432, but only 264×264 center is guaranteed visible (rest may be masked by launcher shape).

Keep logo within center 264×264 circle.

## RN+Expo config

`app.json`:
```json
{
  "expo": {
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon-fg.png",
        "backgroundImage": "./assets/adaptive-icon-bg.png",
        "monochromeImage": "./assets/adaptive-icon-mono.png",
        "backgroundColor": "#FFFFFF"
      },
      "icon": "./assets/icon.png"
    }
  }
}
```

Expo / EAS auto-generates required sizes (48, 72, 96, 144, 192) from your 432×432 source.

## Design rules

- **High contrast** background
- **Single subject**, centered
- **No text** (illegible at small sizes)
- **Recognizable at 48px** (launcher size)
- **Distinctive silhouette** for monochrome variant
- **Avoid white-on-white** (light themed icon mode = invisible)

## Tools

- Figma → adaptive icon template
- Android Studio Image Asset Studio (build → New Image Asset → Launcher Icons)
- icon.kitchen → free online generator with adaptive presets
- IconKitchen.dev → adaptive icon preview

## Test in real launchers

Different launchers apply different masks:
- Pixel: circle
- Samsung OneUI: squircle
- OnePlus: rounded square
- Stock AOSP: variable

Test by:
1. Build dev build
2. Install on Pixel, Samsung, OnePlus emulator/device
3. Check launcher icon shape

## Themed icon test

- Install on Android 13+ device
- Settings → Wallpaper → Themed icons → ON
- Your icon should render as monochrome silhouette

## Common gotchas

- Foreground too edge-bleeding → cropped by launcher mask
- White-on-white → invisible on light themed icons
- Forgetting monochrome → falls back to colored icon (less polished)
- Hi-res Play Store icon different from launcher → keep consistent
- Background image (not just color) — only works on Android 8+

## Pair with
- `design-splash-screen` for launch screen
- `apply-material3` for full theming
