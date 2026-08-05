---
name: "add-app-icon-launch-screen"
description: "Generate iOS app icon (all sizes), launch screen, and SF Symbols configuration for an Expo app. Use when the user says 'app icon', 'launch screen', 'splash screen', 'icon generator', 'ios icon sizes', 'ios splash'."
---

# Add App Icon + Launch Screen

The 5-second decision asset. Get this right or installs drop 30%.

## App Icon

### Required size
1024×1024 PNG, no transparency, no rounded corners (Apple rounds them).

### Where to put it (Expo)
Save to `assets/icon.png` (1024×1024). Then in `app.json`:

```json
{
  "expo": {
    "icon": "./assets/icon.png",
    "ios": {
      "icon": "./assets/icon.png"
    }
  }
}
```

Expo / EAS auto-generates all required sizes (29×29 through 1024×1024) at build time.

### Design rules
- **No text in the icon** (except brand name in some cases — but text reads as small at 60×60)
- **High contrast** background
- **Single subject**, centered
- **Recognizable at 60×60** (the home screen size)
- **Distinctive silhouette** (helps users find on home screen)

### Tools to generate
- Figma → 1024×1024 frame, export PNG
- Sketch → similar
- icon.kitchen → free online generator
- Bakery (Mac app) → preview on device mockup
- Your designer in Figma + iOS App Icon template

### Variants for iOS 18+ (optional)
- Dark mode icon (1024×1024 PNG, transparent OK)
- Tinted icon (1024×1024 grayscale PNG, transparent OK)

In `app.json`:
```json
{
  "expo": {
    "ios": {
      "icon": {
        "light": "./assets/icon.png",
        "dark": "./assets/icon-dark.png",
        "tinted": "./assets/icon-tinted.png"
      }
    }
  }
}
```

## Launch Screen (Splash)

### What it is
The first screen shown while your app loads. Should be FAST (<200ms perceived).

### Required (Expo)
A storyboard-based launch screen, not a static image (Apple requires storyboard since iOS 14).

In `app.json`:
```json
{
  "expo": {
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "splash": {
        "image": "./assets/splash.png",
        "tabletImage": "./assets/splash-ipad.png",
        "resizeMode": "contain",
        "backgroundColor": "#ffffff"
      }
    }
  }
}
```

### Design rules
- **Match your app's first screen** (so it feels seamless when transitioning)
- **No text** ("Loading..." is unprofessional)
- **No animations** (Apple's splash is static)
- **Background color matches** your app's background

### Image specs
- 2732×2732 PNG (covers all device sizes via storyboard)
- Center your logo in middle (will be cropped on different aspect ratios)
- Safe area: keep important content within center 60%

## SF Symbols (system icons in your UI)

Use Apple's free icon library instead of bundling custom icons.

```bash
pnpm add expo-symbols
```

```tsx
import { SymbolView } from 'expo-symbols';

<SymbolView name="heart.fill" tintColor="red" size={24} />
```

Browse all 5,000+ icons in SF Symbols app (Mac App Store, free).

Benefits:
- Zero bundle weight
- Auto-adapts to system dark mode
- Native rendering
- Updated across iOS versions automatically

## Adaptive icon for Dynamic Island / Live Activities

Different icon variant shown in:
- Dynamic Island (smaller, monochrome)
- Live Activities (small color)

Apple auto-generates from your main icon, but for premium look:
- Provide tinted variant
- Provide dark variant

## Common gotchas

- Icon transparency = Apple rejects (fill the corners, they'll round)
- Icon text smaller than ~60px = unreadable
- Splash screen with text = looks broken on rotate
- Icon doesn't match marketing site = inconsistent brand
- Forgetting iPad version = iPad version uses iPhone icon stretched (ugly)

## Iterate / test

After uploading to TestFlight:
1. Install on real device
2. Look at home screen — does it stand out?
3. Look at search results in Spotlight
4. Look in Settings -> Apps list (icon size differs)
5. Look at icon in Notification banner

If any look bad, redesign and re-submit.

## Pair with
- `apply-hig` for full HIG compliance
- `apply-liquid-glass` for iOS 26 visual treatment
- `design-screenshots` (different — App Store screenshots, not icon)
