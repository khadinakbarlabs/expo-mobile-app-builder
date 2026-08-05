---
name: "add-google-signin-credential-manager"
description: "Add Google Sign-In via Credential Manager API (modern Android auth, replaces deprecated Google Sign-In SDK). Use when the user says 'google sign in android', 'credential manager android', 'auth android'."
---

# Google Sign-In via Credential Manager

Modern Android auth API (Android 14+, backports to 4.4). Replaces deprecated Google Sign-In SDK.

## Install
```bash
npx expo install @react-native-google-signin/google-signin
```

## Configure
`app.json`:
```json
{
  "expo": {
    "plugins": [
      ["@react-native-google-signin/google-signin", {
        "iosUrlScheme": "com.googleusercontent.apps.YOUR_CLIENT_ID"
      }]
    ]
  }
}
```

## SHA-1 setup (CRITICAL)
Add BOTH to Firebase / Google Cloud OAuth:
- Upload key SHA-1 (your keystore)
- Play signing key SHA-1 (from Play Console → App integrity)

Without BOTH: works in dev, breaks in prod.

## Implement
```tsx
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
});

const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    // userInfo.idToken — send to backend for verification
  } catch (e: any) {
    if (e.code === statusCodes.SIGN_IN_CANCELLED) return;
    throw e;
  }
};
```

## Backend verifies idToken
```ts
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client();
const ticket = await client.verifyIdToken({ idToken, audience: WEB_CLIENT_ID });
const payload = ticket.getPayload();
// payload.sub = stable Google user ID
```

## Common gotchas
- "DEVELOPER_ERROR" → SHA-1 mismatch
- Two web client IDs (Android client + Web client) — use WEB client ID for `webClientId`
- Google Play Services missing on emulator → use one with Play services
- Production builds need Play signing SHA-1 added to OAuth credentials

## Pair with
- `add-supabase-auth-android` (Supabase handles verify)
- `code-signing-android` (SHA-1 extraction)
