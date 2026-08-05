---
name: "add-expo-secure-store"
description: "Use expo-secure-store for secrets (tokens, API keys) backed by iOS Keychain. Use when the user says 'secure storage', 'Keychain', 'store token', 'API key storage'."
---

# Add Expo Secure Store

Encrypted at-rest storage backed by iOS Keychain. Use for auth tokens, API keys, anything sensitive.

## Install
```bash
npx expo install expo-secure-store
```

## Usage
```ts
import * as SecureStore from 'expo-secure-store';

// Save
await SecureStore.setItemAsync('authToken', token);

// Read
const token = await SecureStore.getItemAsync('authToken');

// Delete
await SecureStore.deleteItemAsync('authToken');

// With biometric protection (Face ID / Touch ID required to unlock)
await SecureStore.setItemAsync('vaultKey', secret, {
  requireAuthentication: true,
  authenticationPrompt: 'Authenticate to access your vault',
});
```

## ABSOLUTE NO
- Never store tokens in AsyncStorage or MMKV (no encryption at rest)
- Never store more than 2KB per item (Keychain limits — use expo-sqlite for larger)
- Never call from main thread in tight loops (it's async, use it that way)

## Add Face ID permission
```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "NSFaceIDUsageDescription": "Access your secure vault"
      }
    }
  }
}
```

## Reference
`references/01-expo-sdk-54.md`
