---
name: "add-haptics-android"
description: "Add expo-haptics for tactile feedback on Android (vibration motor). Use when the user says 'add haptics android', 'vibration android', 'tactile feedback android'."
---

# Add Haptics (Android)

Tactile feedback via vibration motor. Android's haptic API is less capable than iOS but still useful.

## Install
```bash
npx expo install expo-haptics
```

## Use
```tsx
import * as Haptics from 'expo-haptics';

await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
await Haptics.selectionAsync();
```

## Android implementation

- Maps to standard Android `Vibrator` API
- Limited patterns vs iOS Taptic Engine
- All variants produce similar vibrations on most devices
- Pixel/Samsung high-end devices have better haptic motors

## Where to add

- Button press (Light impact)
- Toggle switch (Selection)
- Complete action (Success notification)
- Error (Warning notification)
- Pull-to-refresh complete (Light impact)
- Long press (Medium impact)

## Don't overuse

- Every tap = annoying
- Use sparingly for meaningful moments
- Power users disable haptics in system settings; don't rely on them for critical info

## Battery considerations

Each haptic = small battery cost. Cumulative across days = measurable. Test on a low-end device.

## Pair with
- `add-reanimated` to sync haptics with animations
- `apply-material3` (Material's "haptic feedback" guidance)
