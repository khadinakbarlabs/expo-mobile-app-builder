---
name: "add-expo-notifications-fcm"
description: "Set up Firebase Cloud Messaging (FCM) push notifications via expo-notifications for Android. Use when the user says 'add fcm', 'push notifications android', 'expo notifications android', 'firebase push'."
---

# Add FCM Push (expo-notifications)

Firebase Cloud Messaging — free, unlimited push for Android.

## Install
```bash
npx expo install expo-notifications expo-device
```

## Firebase project setup

Run `set-up-firebase-cli` skill first. Result: `google-services.json` in `android/app/`.

`app.json`:
```json
{
  "expo": {
    "android": { "googleServicesFile": "./google-services.json" },
    "notification": {
      "icon": "./assets/notification-icon.png",
      "color": "#ffffff",
      "androidMode": "default"
    }
  }
}
```

## Request permission (Android 13+ runtime)
```tsx
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

async function registerForPush() {
  if (!Device.isDevice) return;
  let { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const r = await Notifications.requestPermissionsAsync();
    if (r.status !== 'granted') return null;
  }
  const token = (await Notifications.getDevicePushTokenAsync()).data;
  // FCM token — save to backend
  return token;
}
```

## Custom pre-prompt (boost permission opt-in)

Before calling `requestPermissionsAsync`, show your own screen:
> "Get a daily reminder. We promise no spam."
> [Sure] [Later]

If "Sure" → trigger system dialog. If "Later" → don't ask again this session.

## Notification channels (Android 8+)

```tsx
import * as Notifications from 'expo-notifications';

Notifications.setNotificationChannelAsync('daily-reminders', {
  name: 'Daily Reminders',
  importance: Notifications.AndroidImportance.HIGH,
  sound: 'default',
  vibrationPattern: [0, 250, 250, 250],
  lightColor: '#FF231F7C',
});
```

Channels are user-controllable in Settings. Group related notifs.

## Foreground handler
```tsx
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});
```

## Send from backend
Use Firebase Admin SDK or Expo Push API:
```ts
fetch('https://exp.host/--/api/v2/push/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: deviceToken,
    title: 'Reminder',
    body: 'Time to log today',
    channelId: 'daily-reminders',
  }),
});
```

## Deep link on tap
```tsx
const notificationRoutes = new Set(['/today', '/library']);

Notifications.addNotificationResponseReceivedListener((response) => {
  const screen = response.notification.request.content.data.screen;
  if (typeof screen === 'string' && notificationRoutes.has(screen)) {
    router.push(screen);
  }
});
```

## Manufacturer battery optimization (CRITICAL)

Xiaomi (MIUI), Oppo (ColorOS), OnePlus, Samsung kill background apps aggressively. Push works most of the time but for ENGAGEMENT push (reminders), users must:
- Settings → Battery → [Your app] → "Don't optimize"
- Some need: Settings → Apps → [Your app] → Battery saver → "No restriction"

Document this in onboarding for power users.

## Pair with
- `add-onesignal-push` for advanced campaigns (RC for transactional, OS for marketing)
- `add-deep-links` to handle taps
