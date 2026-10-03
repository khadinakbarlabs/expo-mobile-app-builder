---
name: "add-app-clips"
description: "Plan and implement an iOS App Clip with preserved native work, validated invocation URLs and verified target constraints. Use for App Clips, QR/NFC launch, or lightweight app experiences."
---

# Add an App Clip

Plan a small iOS App Clip for an owner-selected QR, NFC or URL entry point. Inspect the existing Expo SDK, Xcode project, targets and signing configuration. Use Apple's current documentation at https://developer.apple.com/documentation/appclip/creating-an-app-clip-with-xcode and the maintained Expo integration at https://github.com/EvanBacon/expo-apple-targets. Verify size and capability restrictions for the chosen deployment target instead of assuming a universal size limit.

## Preserve the existing app

Review the current target configuration and native changes before proposing a dependency or prebuild. Present the exact compatible package version, files affected and regeneration risk. Follow existing user authorization for dependency changes; obtain missing authorization before installation or native regeneration. Do not automatically run a clean prebuild: it can overwrite native work. Use a recoverable snapshot and review the diff before adopting generated changes.

Create an App Clip target through the maintained package's documented target configuration, typically `targets/clip/expo-target.config.js` with `type: 'clip'`, or the owner's Xcode workflow. Keep credentials, signing keys and provisioning material out of generated source and logs. Do not enable capabilities or change developer accounts silently.

## Invocation and security

Prepare associated domains and an AASA document only for domains the owner controls. Reuse verified bundle/team identifiers; do not invent them. Publishing AASA files or configuring App Store Connect experiences requires the owner's authorization for those external changes.

Treat invocation URLs and parameters as untrusted input. Allow only documented HTTPS hosts, known paths and validated identifiers; reject unknown destinations. An App Clip must enforce ordinary authentication and authorization before account actions. Avoid sensitive values in URLs. Payment, location and other permission-dependent functionality needs its own approved flow; adding an App Clip does not authorize transactions or personal-data access.

## Verification and handoff

Build the correct target and test valid/invalid invocation links, cold launch, denied permissions, offline behavior and the transition to the full app on a supported physical device. Measure the actual binary against the applicable Apple limit. Record entitlements, build evidence, unresolved errors and any domain/store step awaiting authorization. A local build does not prove App Store approval or a working production invocation.

Pair with `add-expo-apple-targets`, `add-deep-links`, `code-signing` and `pre-submission-audit`.
