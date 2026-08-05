---
name: "code-signing-android"
description: "Manage Android signing keys: upload key (you), signing key (Play), keystore generation, EAS credentials, SHA hash extraction. Use when the user says 'android signing', 'keystore', 'signing key android'."
---

# Code Signing (Android)

Keystore management.

## Credential and external action gate

An Android keystore and its password are private signing credentials. Do not generate, import, download, replace, or expose a keystore; run `eas credentials`; or alter Play App Signing without explicit owner confirmation of the exact developer account, app, and recovery plan. Keep keystores and passwords out of the repository, prompts, screenshots, and logs.

## Two keys with Play App Signing

| Key | Holder | Use |
|---|---|---|
| Upload key | You (EAS) | Sign AAB before upload |
| Signing key | Google | Sign APKs delivered to users |

Lose upload key → Google reissues (Play App Signing benefit).
Lose signing key → not possible (Google has it).

## EAS-managed keystore after confirmation

```bash
eas credentials
# → Android → set up new keystore
```

EAS generates keystore (.jks), stores on their servers. Download anytime.

## DIY keystore (if migrating, after confirmation)

```bash
keytool -genkey -v -keystore upload-key.jks \
  -keyalg RSA -keysize 2048 -validity 25000 \
  -alias upload-key
```

Upload to EAS only after the owner has approved the account and credential-storage plan:
```bash
eas credentials
# → Android → use existing keystore
```

## Extract SHA-1/SHA-256 (for Firebase)

```bash
# From keystore (upload key)
keytool -list -v -keystore upload-key.jks -alias upload-key

# From Play Console (signing key)
# Play Console → Setup → App integrity → copy SHA values
```

## Add to Firebase

Firebase Console → Project Settings → Your apps → Android app → Add fingerprint:
- Both upload key SHA-1 + signing key SHA-1
- Both upload key SHA-256 + signing key SHA-256

This makes Google Sign-In and Dynamic Links work in dev + production.

## Common gotchas
- "DEVELOPER_ERROR" on Google Sign-In → SHA-1 not in Firebase
- Different SHA in dev (your keystore) vs production (Play's) → add BOTH
- Keystore password lost → can't recover unless using Play App Signing reissue
- ".jks vs .keystore" → same format, just naming

## Pair with
- `set-up-play-app-signing`
- `add-google-signin-credential-manager`
