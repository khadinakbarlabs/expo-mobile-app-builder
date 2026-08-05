---
name: "add-expo-secure-store-keystore"
description: "Add expo-secure-store backed by Android Keystore for storing auth tokens and secrets. Use when the user says 'secure store android', 'keystore android', 'store token secure'."
---

# Add Expo Secure Store (Android Keystore)

Hardware-backed encrypted key-value store. Uses Android Keystore on Android.

## Install
```bash
npx expo install expo-secure-store
```

## Basic use
```tsx
import * as SecureStore from 'expo-secure-store';

await SecureStore.setItemAsync('auth_token', 'jwt...');
const token = await SecureStore.getItemAsync('auth_token');
await SecureStore.deleteItemAsync('auth_token');
```

## Android-specific options

```tsx
// Require biometric or PIN to access (Android 6+)
await SecureStore.setItemAsync('sensitive', 'value', {
  requireAuthentication: true,
  authenticationPrompt: 'Verify to unlock',
});
```

## What it uses under the hood

- Android: EncryptedSharedPreferences + Android Keystore (hardware-backed on TEE/StrongBox devices)
- Each key encrypted with hardware-derived key
- Survives app data clear (but NOT uninstall)

## When NOT to use SecureStore

- Large data (use SQLite encrypted instead)
- Frequently-read values (slow ~5-10ms per read)
- Data that should survive uninstall (use cloud sync)

## When to use

- Auth tokens (access, refresh)
- API keys for the user's session
- Encryption keys for local SQLite
- Sensitive user inputs (PIN, recovery phrase)

## Gotcha: rooted devices

SecureStore relies on Android Keystore. On rooted devices, Keystore can be bypassed. For high-value apps, also implement:
- `add-app-attestation` (Play Integrity API)
- Server-side validation

## Pair with
- `add-supabase-auth-android` for token persistence
- Use MMKV (`add-zustand` persistence) for non-sensitive data
