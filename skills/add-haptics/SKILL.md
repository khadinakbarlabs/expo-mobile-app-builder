---
name: "add-haptics"
description: "Add haptic feedback (impact, notification, selection) via expo-haptics. Use when the user says 'haptics', 'haptic feedback', 'vibration', 'tap feedback'."
---

# Add Haptics

iOS Taptic Engine feedback via expo-haptics.

## Install
```bash
npx expo install expo-haptics
```

## Usage
```tsx
import * as Haptics from 'expo-haptics';

// Impact (taps, button presses)
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);

// Notification (success, warning, error)
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

// Selection (picker scrolling)
Haptics.selectionAsync();
```

## When to use
- Button press confirmation: `impactAsync(Light)`
- Successful save: `notificationAsync(Success)`
- Failed action: `notificationAsync(Error)`
- Picker / segmented control change: `selectionAsync()`
- Toggle switch: `impactAsync(Medium)`
- Long press start: `impactAsync(Heavy)`

## ABSOLUTE NO
- Don't fire haptics on every render
- Don't trigger haptics during animation (jarring)
- Respect user's Haptic settings (don't force-override)
