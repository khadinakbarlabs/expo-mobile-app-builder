---
name: "add-predictive-back"
description: "Enable Android 14+ predictive back gesture support in Expo Router. Use when the user says 'predictive back android', 'back gesture android', 'android 14 back'."
---

# Add Predictive Back (Android 14+)

Android 14 introduced predictive back: drag from edge to "peek" behind. Premium UX feel.

## Enable in app.json
```json
{
  "expo": {
    "android": {
      "softwareKeyboardLayoutMode": "pan",
      "predictiveBackGestureEnabled": true
    }
  }
}
```

Some Expo SDK versions enable it via `expo-build-properties`:
```json
[
  "expo-build-properties",
  {
    "android": {
      "enablePredictiveBack": true
    }
  }
]
```

## Test

1. Build on Android 14+ device (NOT emulator — gesture nav required)
2. Settings → System → Gestures → "Predictive back" → ON (Android Developer Options if not visible)
3. Drag from left or right edge in your app
4. Should see app peek behind your current screen

## What Expo Router does automatically

- Stack navigator: peeks previous screen as you drag
- Tabs navigator: dismisses to home
- Modal: dismisses

## Override behavior

Use `BackHandler`:
```tsx
import { BackHandler } from 'react-native';

useEffect(() => {
  const sub = BackHandler.addEventListener('hardwareBackPress', () => {
    if (hasUnsavedChanges) {
      showConfirmDialog();
      return true; // prevent default
    }
    return false;
  });
  return () => sub.remove();
}, [hasUnsavedChanges]);
```

## Common gotchas

- Only works on Android 14+
- Emulator simulation is buggy — test on real device
- "Back" inside a modal should dismiss modal, not whole stack
- Conflicts with custom swipe gestures in screen content

## Pair with
- `add-edge-to-edge-android` (commonly paired)
- `set-up-expo-router` (predictive back needs proper stack setup)
