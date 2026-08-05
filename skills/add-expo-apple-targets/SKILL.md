---
name: "add-expo-apple-targets"
description: "Plan native Apple targets in an Expo SDK 54 app, including widgets, App Clips, watch apps, share extensions, and notification extensions. Use when the user needs an Apple-only extension and wants to preserve Expo compatibility."
---

# Add Apple targets to an Expo app

Use a native target only when its user benefit cannot be delivered by the main Expo app. A target changes the native project, signing surface, app identifiers, and test matrix.

## Discovery

1. Identify the exact target type, platform minimum, required entitlements, data boundary, and fallback in the main app.
2. Verify the SDK 54 compatibility of the chosen config plugin or native-target tool before adding it. Keep the dependency name and version user-selected instead of assuming a private or newer-Expo setup.
3. Explain whether the work requires generating native projects or editing existing `ios/` files. Ask before a clean prebuild because it can replace generated native changes.

## Safe target plan

- Keep every target's bundle identifier based on a generic owner-controlled suffix, such as `com.example.myapp.widget`.
- Add App Groups, keychain sharing, notification, or background entitlements only when the product needs them. Treat each as a data-sharing boundary.
- Share only display-safe data between target and main app. Never place secrets, session tokens, raw user content, or signing files in an App Group.
- Build a target-specific test checklist: clean install, extension unavailable, disabled permissions, no data, localized text, accessibility, and native signing validation.

## Release boundary

Do not create credentials, modify a provider dashboard, start an EAS build, or upload an Apple binary until the user names the target account and confirms the action.
