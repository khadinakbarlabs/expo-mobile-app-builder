---
name: "add-android-widget-glance"
description: "Add an Android home screen widget using Glance (Compose for widgets). Native Kotlin module via expo-modules-core. Use when the user says 'add widget android', 'glance widget', 'home screen widget android'."
---

# Add Android Widget (Glance)

Home screen widgets. Glance = Compose for widgets.

## Reality check
RN/JS cannot run in widget context. Must drop to native Kotlin via Glance.

## Path 1: Expo native config plugin

Create a custom config plugin that injects widget Kotlin code into the prebuild output.

Example structure:
```
my-app/
  plugins/
    withAndroidWidget.js  # Config plugin
  android-templates/
    HabitWidget.kt
    HabitWidgetReceiver.kt
    widget_layout.xml
    widget_info.xml
```

## Path 2: react-native-android-widget

Community library that abstracts most of this:
```bash
pnpm add react-native-android-widget
```

Lets you write widget UI in JSX:
```tsx
<View style={{ padding: 8, flex: 1 }}>
  <Text>Habit streak</Text>
  <Text>{streak} days</Text>
</View>
```

Limitations:
- Updates only every 30 min minimum
- No animations
- Limited components
- Click intent must launch deep link

## Widget update strategies

| Trigger | Cadence | Use |
|---|---|---|
| onAppForeground | Every app open | Daily counters |
| WorkManager | 30 min minimum | Time-based |
| User interaction | On widget tap | Quick toggles |

## Widget size constraints

- Small: 1×1 cell (~110×110 dp)
- Medium: 2×2 or 4×1 (~260×130 dp)
- Large: 4×2 or 4×4 (~260×280 dp)
- Adaptive (Android 12+): single XML, auto-resizes

## Common gotchas
- Background tinting only — Glance, not full bitmap
- Limited intent actions (tap or button only)
- No live data binding without manual update calls
- Pinning programmatically requires Android 8+ and user gesture
- Some launchers don't honor adaptive size

## Pair with
- `add-android-quick-actions` for related shortcuts
- `set-up-cloudflare-workers-backend` if widget shows server data
