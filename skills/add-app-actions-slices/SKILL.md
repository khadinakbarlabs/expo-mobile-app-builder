---
name: "add-app-actions-slices"
description: "Add Google Assistant App Actions and Slices for Android (equivalent of iOS Siri Shortcuts). Use when the user says 'app actions android', 'google assistant integration', 'slices android'."
---

# Add App Actions + Slices (Android Assistant)

Google Assistant integration. Equivalent of Siri Shortcuts on iOS.

## Reality (2026)
Google's app integrations API is in flux. As of 2025, Google announced shift toward Gemini integration. Direct Assistant App Actions less common in new apps.

## When to invest

- High-value voice commands (fitness logging, smart home)
- Hands-busy users (cooking, driving)
- Existing voice ecosystem (Nest, Pixel Buds)

## Implementation paths

### Path 1: App Actions (legacy, Google Assistant)

Create `app/src/main/res/xml/actions.xml`:
```xml
<actions>
  <action intentName="actions.intent.LOG_HABIT">
    <fulfillment urlTemplate="myapp://log/{habit}" />
  </action>
</actions>
```

Reference in manifest:
```xml
<meta-data android:name="com.google.android.actions" android:resource="@xml/actions" />
```

Test via Google's App Actions Test Tool.

### Path 2: Slices (deprecated by Google but still works)

Render rich content in Assistant suggestions. Mostly replaced by App Actions; new apps shouldn't bother.

### Path 3: Wait for Gemini Extensions API

Google announced Gemini Extensions for Android at I/O 2025 — will replace Assistant App Actions long-term. As of 2026, in developer preview.

## Recommendation
For 2026 indie apps: skip this. Lower ROI than building widgets (`add-android-widget-glance`) or app shortcuts (`add-android-quick-actions`). Revisit when Gemini Extensions API stabilizes.

## Pair with
- `add-android-quick-actions` for higher-ROI shortcut UX
- `add-gemini-nano` for actual AI capability
