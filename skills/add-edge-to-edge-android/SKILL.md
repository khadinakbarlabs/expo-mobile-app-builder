---
name: "add-edge-to-edge-android"
description: "Add edge-to-edge layout support (Android 15+ default) using react-native-edge-to-edge with safe area handling. Use when the user says 'edge to edge android', 'full screen android', 'status bar android', 'system bars'."
---

# Add Edge-to-Edge (Android)

Android 15+ defaults to edge-to-edge — content extends under status bar + nav bar. Must handle insets.

## Install
```bash
npx expo install react-native-edge-to-edge react-native-safe-area-context
```

`app.json`:
```json
{
  "expo": {
    "plugins": ["react-native-edge-to-edge"],
    "android": { "edgeToEdgeEnabled": true }
  }
}
```

## Use SafeAreaProvider

```tsx
// _layout.tsx
import { SafeAreaProvider } from 'react-native-safe-area-context';
<SafeAreaProvider>{children}</SafeAreaProvider>
```

## Apply insets per screen

```tsx
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const insets = useSafeAreaInsets();
<View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
```

## Status bar styling

```tsx
import { SystemBars } from 'react-native-edge-to-edge';

<SystemBars style="dark" />  // dark icons on light background
```

For light/dark theme:
```tsx
<SystemBars style={isDark ? 'light' : 'dark'} />
```

## Common gotchas

- "Header behind status bar" → wrap in SafeAreaView or apply `paddingTop: insets.top`
- "Tab bar behind gesture bar" → apply `paddingBottom: insets.bottom`
- "Modal not full-screen" → set presentation style + handle insets
- Don't apply ALL insets to every screen — use SafeAreaView at root, then inner content adjusts

## When this matters

- Android 15+ (API 35+) MAKES this default — your app WILL look broken if you don't handle
- Older Android: optional, but better UX

## Pair with
- `add-predictive-back` (often paired with edge-to-edge)
- `apply-material3` for theming
