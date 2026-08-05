---
name: "design-splash-screen"
description: "Design Android splash screen using SplashScreen API (Android 12+) and expo-splash-screen for older. Use when the user says 'splash screen android', 'launch screen android', 'first screen android'."
---

# Design Splash Screen (Android)

Android 12+ uses the official SplashScreen API — different from iOS storyboard pattern.

## How it works (Android 12+)

System renders:
1. Window background (color)
2. Animated app icon (default duration)
3. Brand image (optional)
4. App's first activity

Android 11 and below: fallback to expo-splash-screen full-screen image.

## RN+Expo config

```bash
npx expo install expo-splash-screen
```

`app.json`:
```json
{
  "expo": {
    "plugins": [
      [
        "expo-splash-screen",
        {
          "image": "./assets/splash-icon.png",
          "imageWidth": 200,
          "backgroundColor": "#ffffff",
          "android": {
            "image": "./assets/splash-icon-android.png",
            "imageWidth": 200,
            "backgroundColor": "#ffffff"
          },
          "dark": {
            "image": "./assets/splash-icon-dark.png",
            "backgroundColor": "#000000"
          }
        }
      ]
    ]
  }
}
```

## Design rules

- **No text** — Android system renders icon, not your design
- **Center-anchor logo** — 200dp width recommended
- **Match app background color** — seamless transition to first screen
- **No animation** — system handles fade
- **Light + dark variants** — match system theme

## Image specs

- **PNG with transparency** for the icon
- **200dp width** typical (Android scales for density)
- Single subject, centered

## Hide splash from code

```tsx
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

// After your app is ready:
useEffect(() => {
  if (appReady) {
    SplashScreen.hideAsync();
  }
}, [appReady]);
```

## Splash screen timing budget

- System splash: ~200-400ms (Android 12+ standardized)
- Your bootstrap (font loading, theme calc): <200ms target
- Total perceived: <600ms

If your app takes longer to boot, defer non-critical work — don't show "Loading..." in splash.

## Pre-Android 12 fallback

expo-splash-screen renders a full-screen image. Same image, but stretched. Less polished but acceptable.

## Common gotchas

- "Splash flashes white" — wrong background color in plugin config
- "Splash too long" — your JS is slow; not the splash screen
- "Logo too big" — `imageWidth` is in dp, not px
- Dark mode splash not matching system — set `dark` variant explicitly
- Splash showing brand image on Android 12+ — use `brandImage` field, separate from icon

## Pair with
- `design-app-icon-adaptive` for icon
- `optimize-aab-size` if splash assets bloat bundle
