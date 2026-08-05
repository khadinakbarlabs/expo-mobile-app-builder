---
name: "add-expo-notifications"
description: "Add push + local notifications via expo-notifications, register APNs token, handle taps. Use when the user says 'push notifications', 'expo-notifications', 'APNs', 'notification permission'."
---

# Add Expo Notifications

Local + push notifications. APNs registration, token capture, foreground/background handling.

## Install
```bash
npx expo install expo-notifications expo-device
```

## app.json
```json
{
  "expo": {
    "plugins": [
      ["expo-notifications", {
        "icon": "./assets/notification-icon.png",
        "color": "#ffffff",
        "sounds": ["./assets/notification.wav"]
      }]
    ],
    "ios": {
      "infoPlist": {
        "UIBackgroundModes": ["remote-notification"]
      }
    }
  }
}
```

## Setup + register
```tsx
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export function usePushRegistration() {
  useEffect(() => {
    if (!Device.isDevice) return; // simulator can't register

    (async () => {
      const { status: existing } = await Notifications.getPermissionsAsync();
      let final = existing;
      if (existing !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        final = status;
      }
      if (final !== 'granted') return;

      const token = (await Notifications.getDevicePushTokenAsync()).data; // raw APNs token
      // OR Expo push token: const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;

      await fetch('/api/register-push', { method: 'POST', body: JSON.stringify({ token }) });
    })();
  }, []);
}
```

## Local notification (no server)
```tsx
await Notifications.scheduleNotificationAsync({
  content: { title: 'Reminder', body: 'Time to log your meal' },
  trigger: { seconds: 3600, repeats: true },
});
```

## Server-side send via APNs Auth Key
Recommended: Expo Push API (free, simple) or direct APNs HTTP/2 with .p8 key.

## Reference
`references/01-expo-sdk-54.md`
