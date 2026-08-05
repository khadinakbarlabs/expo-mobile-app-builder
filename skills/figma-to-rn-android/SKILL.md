---
name: "figma-to-rn-android"
description: "Convert Figma designs to React Native + Expo Android code using Material 3 components and dynamic theming. Use when the user says 'figma to rn android', 'convert figma android', 'design to code android'."
---

# Figma to RN (Android)

Convert Figma to RN+Expo code with Material 3 patterns.

## Pre-conversion checklist

- [ ] Design uses Material 3 component library
- [ ] All colors reference Material color tokens (primary, surface, onSurface, etc.)
- [ ] Spacing uses 4dp grid (4, 8, 12, 16, 24, 32...)
- [ ] Typography uses Material 3 type scale
- [ ] Components named consistently
- [ ] Variants used for states (default/pressed/disabled)

## RN libraries to use

```bash
pnpm add react-native-paper @callstack/react-native-paper  # Material 3 components
pnpm add react-native-reanimated react-native-gesture-handler
pnpm add nativewind  # Tailwind for RN — alternative to Paper
```

Choose ONE primary:
- **react-native-paper** — official Material Design, matches Google's MD3
- **nativewind + custom** — flexible but more work to match M3

## Conversion table

| Figma layer | RN component |
|---|---|
| Auto-layout horizontal | `<View style={{ flexDirection: 'row' }}>` |
| Auto-layout vertical | `<View style={{ flexDirection: 'column' }}>` |
| Frame with corner radius | `<View style={{ borderRadius: X }}>` |
| Text | `<Text>` |
| Material Button (filled) | `<Button mode="contained">` (Paper) |
| Material Card | `<Card>` (Paper) |
| TextField (filled) | `<TextInput mode="flat">` (Paper) |
| TextField (outlined) | `<TextInput mode="outlined">` (Paper) |
| FAB | `<FAB icon="plus" onPress={...} />` (Paper) |
| Bottom nav | `<BottomNavigation>` (Paper) |
| Top app bar | `<Appbar.Header>` (Paper) |
| Snackbar | `<Snackbar>` (Paper) |
| Dialog | `<Dialog>` (Paper) |
| Chip | `<Chip>` (Paper) |

## Material 3 theme setup

```tsx
// theme.ts
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6750A4',
    onPrimary: '#FFFFFF',
    primaryContainer: '#EADDFF',
    onPrimaryContainer: '#21005D',
    // ... etc
  },
};
```

## Dynamic colors (Material You)

```bash
pnpm add @pchmn/expo-material3-theme
```

```tsx
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';

const { theme } = useMaterial3Theme();
// theme.light / theme.dark — derived from user's wallpaper on Android 12+
```

## Common gotchas

- React Native Paper v5+ defaults to MD3 (good)
- `Appbar.Header` doesn't auto-handle safe area — use `react-native-safe-area-context`
- Snackbar position needs manual offset above bottom nav
- Card elevation: M3 uses tonal elevation, not shadow — Paper handles correctly
- Dark mode: pass `theme={isDark ? darkTheme : lightTheme}` to `<PaperProvider>`

## Pair with
- `apply-material3` for component conventions
- `apply-material-you-dynamic-colors` for theming setup
- `add-edge-to-edge-android` for full-screen layouts
