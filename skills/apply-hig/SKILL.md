---
name: "apply-hig"
description: "Apply Apple Human Interface Guidelines to a React Native screen. Use when the user says 'HIG compliance', 'iOS native feel', 'Apple guidelines', '44pt taps', 'Dynamic Type'."
---

# Apply Apple Human Interface Guidelines

Review the requested React Native screens against Apple's current HIG: https://developer.apple.com/design/human-interface-guidelines. Limit changes to the app's UI and preserve the product's existing visual direction. Read `references/05-product-design.md` for the package's design context.

## Screen improvements

Use at least 44 by 44 point touch targets, clear labels and appropriate spacing. Respect font scaling and avoid fixed text heights that clip large Dynamic Type sizes. Use semantic colors, sufficient contrast and Reduce Motion preferences. Keep accessibility roles, labels, hints and selected/disabled states accurate.

Prefer existing compatible app components and icon assets. If additional symbols support is needed, inspect the current Expo SDK and official Expo Symbols guidance at https://docs.expo.dev/versions/latest/sdk/symbols/ before proposing a dependency. Do not automatically install third-party icon packages or download assets with unclear usage rights.

## Verification

Have the owner enable VoiceOver, large text and increased contrast on their test device or simulator. These are test instructions; do not alter their personal device settings automatically. Exercise focus order, labels, tappable areas, light/dark appearance and truncation. Restore any temporary test preferences the owner chose to change.

Deliver annotated findings, scoped UI changes and actual accessibility results. Name unresolved behavior instead of claiming HIG certification.
