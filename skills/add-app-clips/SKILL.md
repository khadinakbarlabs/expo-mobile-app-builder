---
name: "add-app-clips"
description: "Add an App Clip (instant launch via QR/NFC, 15MB max) via expo-apple-targets. Use when the user says 'App Clip', 'instant app', 'QR launch'."
---

# Add App Clips

Lightweight app slice that launches in seconds without install. 15 MB max. iOS-only.

## When to use
- Physical-world entry: QR / NFC / App Clip Code
- One-shot transaction (pay, order, check-in)
- Location-bound flows (parking, museum, restaurant)

## Install
```bash
npm install @bacons/apple-targets
npx expo prebuild --clean
```

## app.json
```json
{
  "expo": {
    "plugins": [
      ["@bacons/apple-targets", { "targets": ["./targets/clip"] }]
    ],
    "ios": {
      "associatedDomains": ["appclips:yourapp.com"]
    }
  }
}
```

## Host AASA at https://yourapp.com/.well-known/apple-app-site-association
```json
{
  "appclips": {
    "apps": ["TEAMID.com.example.myapp.Clip"]
  },
  "applinks": {
    "details": [{ "appID": "TEAMID.com.example.myapp", "paths": ["*"] }]
  }
}
```

## Constraints
- 15 MB binary max
- No BackgroundTasks
- No widgets in App Clip target
- Limited app group access

## Upgrade path
Show "Get the full app" overlay mid-flow:
```swift
import StoreKit
let config = SKOverlay.AppClipConfiguration(position: .bottom)
let overlay = SKOverlay(configuration: config)
overlay.present(in: scene)
```

## App Clip Code generation
App Store Connect → your app → App Clip Codes. Generate codes for specific URLs. Scannable AND NFC-tappable.
