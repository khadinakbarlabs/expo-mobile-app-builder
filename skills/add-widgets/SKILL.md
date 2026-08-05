---
name: "add-widgets"
description: "Design and add iOS home-screen or lock-screen widgets to an Expo SDK 54 app. Use when the user asks for a WidgetKit, home-screen, lock-screen, or StandBy widget and needs a safe native-extension plan."
---

# Add iOS widgets safely

Expo SDK 54 apps can use native iOS targets when the product genuinely benefits from a widget. A widget is a native extension: it has its own signing, lifecycle, data-sharing, and review implications. Treat a clean prebuild or native-target change as a user-approved project mutation.

## Decide first

1. Confirm the widget's one primary job, update frequency, offline fallback, supported iOS versions, and whether the data is safe to show on a lock screen.
2. Prefer an in-app quick action when the widget would expose sensitive, account, health, or financial information.
3. Read [the Expo SDK 54 reference](references/01-expo-sdk-54.md) and verify the exact native-target approach and third-party library compatibility before adding dependencies. Do not assume a package designed for a newer SDK works on SDK 54.

## Implementation outline

1. Add a native widget target only after the user approves a prebuild/native-directory change.
2. Keep the WidgetKit timeline lightweight and deterministic. Avoid network-heavy refreshes and provide an empty or stale-data state.
3. If the main app and widget share data, use an App Group selected by the app owner, for example `group.com.example.myapp`; never copy a real bundle ID or team ID into a template.
4. Store only the minimum display-safe summary in the shared container. Keep tokens, raw account records, and private user content out of it.
5. Test first install, no-data, offline, localization, dynamic type, dark mode, widget refresh, and a signing build before proposing a TestFlight upload.

## Guardrails

- Do not run `npx expo prebuild --clean` or remove native directories without explaining the overwrite risk and getting confirmation.
- Do not generate or request Apple certificates, App Group identifiers, provisioning profiles, or private signing keys.
- Treat lock-screen visibility as a privacy boundary, not merely a design choice.
