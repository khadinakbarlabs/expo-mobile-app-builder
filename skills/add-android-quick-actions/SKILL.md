---
name: "add-android-quick-actions"
description: "Add Android app shortcuts (long-press launcher icon menu) using expo-quick-actions. Use when the user says 'app shortcuts android', 'long press menu android', 'quick actions android'."
---

# Add Android Quick Actions

Add launcher shortcuts to app features the user has chosen. Inspect the current Expo version, navigation and lockfile first; preserve existing shortcuts and permissions. Use the maintained package's documentation at https://github.com/EvanBacon/expo-quick-actions and verify its current SDK compatibility before selecting a dependency version.

## Dependency and configuration

Present the package name, exact version and project changes before installation. Follow the user's existing installation authorization; otherwise obtain permission to change dependencies. Use the project's package manager and lockfile. Do not install globally, run remote installers or change machine settings.

Register Android items at runtime with the maintained package's `QuickActions.setItems` API, using a small fixed set of IDs such as `new-habit` and `today`, localized labels and supported icons. Static Android actions are not supported by this package. The config plugin declares Android icon resources with `androidIcons`; `iosActions` configures static iOS actions. Map runtime IDs to routes owned by the app. Treat shortcut payloads as external input: never navigate to an arbitrary path or URL supplied in params.

## Route resolver

This standalone example is exercised by the repository regression test:

```javascript
function resolveShortcut(action) {
  if (!action || typeof action.id !== 'string') return null;
  switch (action.id) {
    case 'new-habit': return '/new';
    case 'today': return '/today';
    default: return null;
  }
}
```

Use the resolver in the documented shortcut callback. Navigate only when it returns a known route. Apply normal authentication and authorization at the destination; a shortcut never bypasses a sign-in or entitlement check. Do not put tokens, personal data or sensitive record names in launcher-visible labels or payloads.

## Verify

Test cold and warm launch, unknown/malformed IDs, signed-out state and unavailable destinations. Unknown actions should produce no navigation. Check supported launchers on a physical Android device and the corresponding iOS quick-action behavior. Report actual results and platform limits; do not claim this is Siri automation.

Pair with `add-deep-links` and the app's existing Expo Router configuration.
