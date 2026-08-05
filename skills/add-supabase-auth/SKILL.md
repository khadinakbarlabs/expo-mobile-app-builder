---
name: "add-supabase-auth"
description: "Add Supabase Auth to a React Native + Expo app with Apple Sign In, email magic link, and session management. Use when the user says 'add supabase auth', 'apple sign in supabase', 'magic link rn', 'auth setup', 'supabase login'."
---

# Add Supabase Auth to RN + Expo

Apple Sign In + magic link, persistent sessions, server-side route guards.

## Install

```bash
pnpm add @supabase/supabase-js @react-native-async-storage/async-storage
npx expo install expo-apple-authentication expo-web-browser
```

## Client setup (`lib/supabase.ts`)

```ts
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
```

## Apple Sign In (REQUIRED if you offer any other social login)

```tsx
import * as AppleAuthentication from 'expo-apple-authentication';
import { supabase } from '@/lib/supabase';

export function AppleSignInButton() {
  const onPress = async () => {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    if (!credential.identityToken) throw new Error('No token');

    const { error } = await supabase.auth.signInWithIdToken({
      provider: 'apple',
      token: credential.identityToken,
    });

    if (error) console.error(error);
  };

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={8}
      style={{ height: 44 }}
      onPress={onPress}
    />
  );
}
```

In Supabase dashboard -> Authentication -> Providers -> Apple:
- Enable
- Client ID = your iOS bundle ID
- Apple Services ID configured separately (use the auto-generate flow)

## Magic link (passwordless email)

```tsx
const sendMagicLink = async (email: string) => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: 'yourapp://auth/callback',
    },
  });
};
```

In `app.json`:
```json
{
  "scheme": "yourapp"
}
```

Handle deep link callback in `app/_layout.tsx`:
```ts
import * as Linking from 'expo-linking';
import { useEffect } from 'react';

useEffect(() => {
  const sub = Linking.addEventListener('url', ({ url }) => {
    if (url.includes('auth/callback')) {
      // Supabase auto-detects from the URL
      supabase.auth.getSession();
    }
  });
  return () => sub.remove();
}, []);
```

## Session hook

```tsx
// hooks/useSession.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_, s) => {
      setSession(s);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  return { session, loading };
}
```

## Protected routes (Expo Router)

`app/_layout.tsx`:
```tsx
export default function RootLayout() {
  const { session, loading } = useSession();

  if (loading) return <SplashScreen />;

  return (
    <Stack>
      {session ? (
        <Stack.Screen name="(app)" />
      ) : (
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
  );
}
```

## Common gotchas

- Magic link with `expo-router` deep links: must add scheme to `app.json` AND configure Supabase URL allowlist
- Apple Sign In on simulator works only on iOS 16.4+
- If you offer Google/Facebook sign-in, you MUST also offer Apple Sign In (App Store rule)
- Token refresh fails silently sometimes — listen for `TOKEN_REFRESHED` event and retry on `signOut` -> show login

## Privacy / Apple compliance

- "Sign in with Apple" must be at least equally prominent if you offer other social
- Don't request more scopes than you need (FULL_NAME + EMAIL is the max recommended)
- Apple lets users hide email — store the relay address, don't try to extract real email

## Pair with
- `choose-backend` to decide if Supabase is right
- `account-deletion-flow` (already in plugin) for required deletion endpoint
- `5-1-2-i-ai-disclosure` if user data goes to AI
