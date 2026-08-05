---
name: "add-android-pip"
description: "Add Picture-in-Picture mode for Android (Android 8+). Use when the user says 'pip android', 'picture in picture android', 'floating window android'."
---

# Add Picture-in-Picture (Android)

Floating mini-window. Best for video, video calls, navigation.

## Enable in manifest

`app.json`:
```json
{
  "expo": {
    "android": {
      "config": { "androidPictureInPicture": true }
    },
    "plugins": [
      ["expo-build-properties", {
        "android": {
          "extraProguardRules": "..."
        }
      }]
    ]
  }
}
```

Inject into `AndroidManifest.xml` via config plugin:
```xml
<activity android:supportsPictureInPicture="true" android:configChanges="screenSize|smallestScreenSize|screenLayout|orientation" />
```

## Enter PiP

Currently no first-class Expo API. Use community:
```bash
pnpm add react-native-picture-in-picture
```

```tsx
import PiP from 'react-native-picture-in-picture';

const enterPip = () => {
  PiP.enter({ aspectRatio: { numerator: 16, denominator: 9 } });
};
```

OR drop down to native via expo-modules-core to call `activity.enterPictureInPictureMode()`.

## Detect PiP state

```tsx
useEffect(() => {
  const sub = AppState.addEventListener('change', state => {
    // No direct PiP state on Android — infer via activity callbacks (need native module)
  });
}, []);
```

## When PiP makes sense

- Video player (YouTube, Netflix pattern)
- Video calls (Zoom, Meet)
- Live workout class
- Navigation map
- Live activity tracker

When PiP DOESN'T

- Static content (use widget instead)
- Forms (no input in PiP)
- Heavy UI (PiP is tiny — keep content simple)

## Common gotchas

- Some launchers (Samsung) don't support PiP for all apps
- PiP exit puts user on home, not back to app — design for this
- Don't put critical controls in PiP only (e.g., emergency stop)

## Pair with
- `add-android-foreground-service` for video playback service
- `add-foldable-tablet` (PiP behavior differs on large screens)
