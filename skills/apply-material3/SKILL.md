---
name: "apply-material3"
description: "Apply Material Design 3 (Material You) components, type scale, color tokens, motion principles to your Android app. Use when the user says 'apply material 3', 'material design android', 'm3 components', 'follow material guidelines'."
---

# Apply Material 3 (Material You)

Google's design system for Android 12+. Required for App Store featuring + Editor's Choice.

## The 5 pillars of Material 3

1. **Color** — Material You dynamic colors (user wallpaper → app theme)
2. **Typography** — Material 3 type scale (display, headline, title, body, label)
3. **Shape** — Corner radius scale (xs/sm/md/lg/xl/full)
4. **Motion** — Easing curves, duration tokens
5. **Components** — 35+ standard components

## Component conventions

### App bars
- **Top app bar (small)** — most common, 64dp height
- **Top app bar (medium)** — collapses, 112dp expanded
- **Top app bar (large)** — for hero screens, 152dp expanded
- Use `Appbar.Header` with `mode="small" | "medium" | "large"`

### Navigation
- **Bottom navigation** for 3-5 top destinations (mobile only)
- **Navigation rail** for tablets / foldables (instead of bottom nav)
- **Navigation drawer** for 5+ destinations

### Buttons
- **Filled** — primary action
- **Tonal** — secondary action (NEW in M3)
- **Outlined** — secondary action
- **Text** — tertiary action (cancel, dismiss)
- **Icon** — for compact spaces
- **FAB** — single primary action per screen

### Cards
- **Elevated** — default, subtle shadow
- **Filled** — solid background, no shadow
- **Outlined** — 1dp border, no shadow

### Surfaces
M3 introduces "tonal elevation" — surfaces tint with primary color as they elevate. Avoid hard shadows; use tonal surface colors instead.

## Type scale

| Style | Size | Use |
|---|---|---|
| displayLarge | 57sp | Hero numbers |
| displayMedium | 45sp | Hero numbers (smaller) |
| displaySmall | 36sp | Section headers |
| headlineLarge | 32sp | Page titles |
| headlineMedium | 28sp | Sub-pages |
| headlineSmall | 24sp | Cards |
| titleLarge | 22sp | App bar |
| titleMedium | 16sp | List items |
| titleSmall | 14sp | Subtitles |
| bodyLarge | 16sp | Body text |
| bodyMedium | 14sp | Secondary body |
| bodySmall | 12sp | Captions |
| labelLarge | 14sp | Button text |
| labelMedium | 12sp | Tabs |
| labelSmall | 11sp | Overline |

## Spacing scale (4dp grid)

4, 8, 12, 16, 24, 32, 48, 64, 96, 128

## Motion durations

- Short 100ms
- Medium 250ms
- Long 400ms
- Extended 700ms

Use react-native-reanimated curves: `Easing.inOut(Easing.cubic)` matches M3 standard.

## Material 3 vs M3 Expressive (2025+)

Google announced "M3 Expressive" at I/O 2025 — looser, more playful variant. Available in Material You 3.0 on Android 16. Not required.

## Pair with
- `apply-material-you-dynamic-colors` for color theming
- `figma-to-rn-android` for code conversion
- `accessibility-audit-android` for contrast checks
