---
name: "add-wear-os-app"
description: "Add a Wear OS companion app (Compose for Wear). Always native Kotlin - RN doesn't run on Wear. Use when the user says 'wear os app', 'android watch app', 'wearable companion'."
---

# Add Wear OS App

Wear OS 5 (current 2026). Compose for Wear is the only viable UI.

## Reality
- Wear OS app = separate Compose module, not RN
- Pair with main app via Wearable Data Layer API
- Build separately in `wear/` directory in your repo
- Submit as separate Play Store entry OR bundled

## When to build

- Activity tracking (fitness, sleep)
- Notifications + replies on wrist
- Quick logging (habit, tasks, mood)
- Glanceable data (counter, streak, next workout)

When NOT to build
- Casual content consumption
- Anything text-heavy
- One-off feature (low ROI — small Wear user base)

## Project setup

Open Android Studio → New → Wear OS module in your existing project.

```
android/
  app/             # Phone app
  wear/            # Wear OS app
```

Build with Gradle:
```bash
cd android
./gradlew :wear:assembleRelease
```

## Compose for Wear

```kotlin
// MainActivity.kt
@Composable
fun MainScreen() {
  ScalingLazyColumn {
    item { Text("Today's streak") }
    item { Card { Text("7 days") } }
    item { Chip(onClick = { logHabit() }, label = { Text("Log it") }) }
  }
}
```

## Data Layer (sync from phone)

```kotlin
// Send data from phone:
Wearable.getDataClient(context).putDataItem(...)

// Receive on watch:
class WearListener : WearableListenerService() {
  override fun onDataChanged(events: DataEventBuffer) { ... }
}
```

## Health permissions (if fitness-related)
- ACTIVITY_RECOGNITION
- BODY_SENSORS
- Permissions checked separately on watch

## Common gotchas
- Wear emulator is slow → test on real Wear device
- Battery is brutal — limit background work
- No web view, no RN — Kotlin only
- Wear apps can submit separately or as `embedded` in phone app's APK
- Battery-conscious UI: dark backgrounds, no animations

## Build constraint
This skill is for if the user is OK dropping to Kotlin. Otherwise: skip Wear OS for MVP, add post-launch if data shows demand.

## Pair with
- `add-gemini-nano` (Wear devices don't support, so skip)
- `set-up-eas-android` (Wear is a separate Gradle task)
