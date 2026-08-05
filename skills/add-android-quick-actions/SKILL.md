---
name: "add-android-quick-actions"
description: "Add Android app shortcuts (long-press launcher icon menu) using expo-quick-actions. Use when the user says 'app shortcuts android', 'long press menu android', 'quick actions android'."
---

# Add Android Quick Actions

Long-press launcher icon → menu of in-app shortcuts.

## Install
```bash
pnpm add expo-quick-actions
```

## Configure shortcuts in app.json

```json
{
  "expo": {
    "plugins": [
      ["expo-quick-actions", {
        "shortcuts": [
          { "id": "new-habit", "title": "New Habit", "icon": "plus", "params": { "screen": "/new" } },
          { "id": "today", "title": "Today's Log", "icon": "today", "params": { "screen": "/today" } }
        ]
      }]
    ]
  }
}
```

## Handle taps

```tsx
import { useQuickActionCallback } from 'expo-quick-actions/router';

useQuickActionCallback((action) => {
  router.push(action.params?.screen);
});
```

## Dynamic shortcuts (change at runtime)

```tsx
import * as QuickActions from 'expo-quick-actions';

await QuickActions.setItems([
  { id: 'recent-1', title: recentHabit.name, params: { id: recentHabit.id } },
]);
```

## Limits
- Max 4 shortcuts visible per launcher
- Icons: use built-in symbol names OR drawable resources
- Long-press needs Android 7.1+
- Some launchers (older Samsung) don't honor

## Cross-platform
expo-quick-actions handles both iOS (Siri Shortcuts-adjacent) and Android (app shortcuts).

## Pair with
- `add-deep-links` (often shortcuts deep-link)
- `set-up-expo-router` (the destination of shortcut taps)
