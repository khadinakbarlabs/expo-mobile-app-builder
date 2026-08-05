---
name: "apply-material-you-dynamic-colors"
description: "Wire up Material You dynamic colors (user's wallpaper drives app theme) in RN+Expo on Android 12+. Use when the user says 'material you', 'dynamic colors android', 'wallpaper theming', 'monet theming'."
---

# Apply Material You Dynamic Colors

User's Android wallpaper → app's color palette. Premium signal on Pixel devices.

## How it works
- Android 12+ extracts colors from wallpaper (Monet engine)
- System exposes 5 tonal palettes (primary, secondary, tertiary, neutral, neutral variant)
- Each palette has 13 tones (0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100)
- App reads these and themes accordingly

## RN+Expo setup

```bash
pnpm add @pchmn/expo-material3-theme
```

```tsx
// App.tsx
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';

export default function App() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme({
    fallbackSourceColor: '#3E8260', // your brand color as fallback
  });

  const paperTheme = colorScheme === 'dark'
    ? { ...MD3DarkTheme, colors: theme.dark }
    : { ...MD3LightTheme, colors: theme.light };

  return (
    <PaperProvider theme={paperTheme}>
      <YourApp />
    </PaperProvider>
  );
}
```

## What you get

```tsx
theme.light.primary           // #6750A4 (user's wallpaper-derived)
theme.light.onPrimary         // text on primary
theme.light.primaryContainer  // softer version of primary
theme.light.onPrimaryContainer

theme.light.secondary
theme.light.tertiary
// ... and so on for all M3 color roles
```

## Devices that support dynamic colors

- Pixel 6+ on Android 12+
- Samsung One UI 4+ (Galaxy S20+, with some delay)
- OxygenOS 12+ (OnePlus)
- Other OEMs with Android 12+ skin

## Fallback strategy

For pre-Android 12 OR OEMs that don't support:
- Use your brand color as the source
- `@pchmn/expo-material3-theme` auto-falls back

## Should you opt OUT of dynamic colors?

Yes if:
- You're a strong brand (Spotify green, Netflix red)
- Your category is mood-specific (kids app, fitness motivator)

Then:
```tsx
const { theme } = useMaterial3Theme({
  sourceColor: '#YOUR_BRAND_COLOR',  // force, ignore wallpaper
});
```

## Test on different wallpapers

Real devices: change wallpaper, kill app, reopen → colors should re-derive.

Emulator: Settings → Wallpaper → change → restart app.

## Common gotchas

- `useMaterial3Theme` requires Android 12+ for dynamic; below = falls back
- React Native Paper v5+ uses M3 by default; v4 still MD2
- Don't hard-code colors anywhere — use theme tokens always
- Test in both light and dark modes after every wallpaper change

## Pair with
- `apply-material3` for component compliance
- `figma-to-rn-android` for design conversion
- `add-edge-to-edge-android` for full-screen rendering
