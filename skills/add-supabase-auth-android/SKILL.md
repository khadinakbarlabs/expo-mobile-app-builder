---
name: "add-supabase-auth-android"
description: "Add Supabase Auth with Google Sign-In + email magic link on Android. Use when the user says 'supabase auth android', 'add auth android'."
---

# Supabase Auth (Android)

Same as iOS plugin's pattern. Android-specific notes.

## Install
```bash
pnpm add @supabase/supabase-js @react-native-async-storage/async-storage
npx expo install @react-native-google-signin/google-signin
```

## Google Sign-In flow
```tsx
const signInGoogle = async () => {
  const { idToken } = await GoogleSignin.signIn();
  const { error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: idToken,
  });
};
```

Supabase Auth → Providers → Google → enable, paste OAuth client IDs from Google Cloud.

## Magic link with deep link
Magic link callback opens app via Android App Link or scheme.

`app.json`:
```json
{
  "expo": {
    "scheme": "myapp",
    "android": {
      "intentFilters": [{
        "action": "VIEW",
        "data": [{ "scheme": "https", "host": "myapp.com", "pathPrefix": "/auth" }],
        "category": ["BROWSABLE", "DEFAULT"],
        "autoVerify": true
      }]
    }
  }
}
```

Universal links require `assetlinks.json` at `https://myapp.com/.well-known/assetlinks.json` with Play signing SHA-256.

## Common gotchas
- Magic link redirects to web instead of app → assetlinks.json missing or wrong SHA-256
- Supabase token refresh fails on long-idle app → AsyncStorage cleared by system, force re-auth

## Pair with
- `add-google-signin-credential-manager`
- iOS plugin's `add-supabase-auth`
