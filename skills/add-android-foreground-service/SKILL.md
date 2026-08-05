---
name: "add-android-foreground-service"
description: "Add an Android foreground service (for music, fitness tracking, downloads). Requires FGSTYPE declaration in Android 14+. Use when the user says 'foreground service android', 'background tracking android', 'persistent notification android'."
---

# Add Android Foreground Service

Run code that survives app background. Requires user-visible persistent notification.

## Android 14+ requirement

Must declare `foregroundServiceType` in `AndroidManifest.xml`:
- `location` — GPS tracking
- `mediaPlayback` — audio playback
- `phoneCall` — VoIP
- `connectedDevice` — Bluetooth, Watch
- `camera` — recording
- `mediaProjection` — screen recording
- `microphone` — voice recording
- `health` — fitness/health
- `dataSync` — file sync
- `shortService` — <3 min total

Each requires Play Console justification + video at submission!

## RN+Expo approach

```bash
pnpm add @notifee/react-native
```

Notifee wraps Android's NotificationCompat + foreground service. Best community option.

```tsx
import notifee from '@notifee/react-native';

await notifee.displayNotification({
  title: 'Tracking workout',
  body: 'Running for 23 min',
  android: {
    channelId: 'workout',
    asForegroundService: true,
    ongoing: true,
    smallIcon: 'ic_notification',
  },
});

// To stop:
await notifee.stopForegroundService();
```

## Service type declaration (config plugin needed)

Inject into `AndroidManifest.xml` via expo-build-properties:
```json
{
  "expo-build-properties": {
    "android": {
      "manifestPlaceholders": {
        "foregroundServiceType": "location"
      }
    }
  }
}
```

Or use a custom config plugin.

## When users will see the persistent notif

ALWAYS while service runs. User can tap to open app, can swipe-dismiss only on Android 14+ if you allow.

## Play Console justification

Submit a 30-sec video showing:
1. What the service does
2. Why the persistent notif is needed
3. How users start/stop it

Common rejections:
- "App doesn't need a foreground service for this" → use WorkManager instead
- "Type 'dataSync' used for analytics" → wrong type
- "User can't stop the service"

## When NOT to use

- Periodic background work → use WorkManager (no notif required)
- Push notifications → FCM
- Brief tasks (<10 sec) → use coroutine in app

## Pair with
- `add-expo-notifications-fcm` for push (different concern)
- `add-onesignal-push` for marketing push
