---
name: "add-supabase-auth"
description: "Add Supabase Auth to a React Native + Expo app with Apple Sign In, email magic link, and session management. Use when the user says 'add supabase auth', 'apple sign in supabase', 'magic link rn', 'auth setup', 'supabase login'."
---

# Add Supabase Auth to RN + Expo

Use app-owned public project configuration, persistent sessions and validated magic-link callbacks. These examples belong to the consuming app; the installed plugin has no authentication service or credential reader. Preserve an existing app's auth provider and navigation unless migration is explicitly requested.

## Install

In the consuming Expo app, after dependency changes are authorized:

```bash
pnpm add @supabase/supabase-js react-native-url-polyfill
npm exec --no -- expo install @react-native-async-storage/async-storage expo-apple-authentication expo-linking
```

## Explicit public client configuration

Obtain the intended app's Project URL and publishable key from its owner. Create `lib/public-config.ts` exporting `publicSupabaseConfig` with `url` and `publishableKey`. These are public app configuration, not plugin configuration. Do not discover values from the installer's environment, local credentials or unrelated projects. Never place a secret or service-role key in the mobile bundle; use Row Level Security for every exposed table. Existing legacy anon-key projects should follow Supabase's migration guidance before using this publishable-key example.

`lib/supabase.ts`:

```ts
import 'react-native-url-polyfill/auto';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { publicSupabaseConfig } from './public-config';

function createAppSupabase(config: { url: string; publishableKey: string }) {
  const url = new URL(config.url);
  if (url.protocol !== 'https:' || url.username || url.password ||
      url.search || url.hash || url.pathname !== '/' ||
      !config.publishableKey.startsWith('sb_publishable_')) {
    throw new Error('Provide the intended app public Supabase configuration.');
  }
  return createClient(url.origin, config.publishableKey, {
    auth: {
      ...(Platform.OS !== 'web' ? { storage: AsyncStorage } : {}),
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      flowType: 'pkce',
    },
  });
}

export const supabase = createAppSupabase(publicSupabaseConfig);
```

Native session storage contains this app's signed-in user session. AsyncStorage is unencrypted; choose a platform-supported protected storage adapter when the app's threat model requires it. No app session, key or callback URL belongs in logs or analytics.

## Magic link and callback

Register the app's chosen scheme and exact redirect in the Supabase Auth redirect allowlist. The example below uses yourapp://auth/callback; replace it consistently. Rebuild the development binary after scheme changes and test on both iOS and Android.

```json
{
  "expo": {
    "scheme": "yourapp",
    "ios": { "usesAppleSignIn": true },
    "plugins": ["expo-apple-authentication"]
  }
}
```

```ts
export const AUTH_REDIRECT = 'yourapp://auth/callback';

export async function sendMagicLink(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: AUTH_REDIRECT },
  });
  if (error) throw new Error('Could not send the sign-in link. Please try again.');
}
```

The PKCE client persists its verifier before sending the link. Open the link on the same device/app that initiated sign-in. Expired, reused or cross-device links need a fresh request; disable overlapping sign-in requests. Do not mix implicit token-fragment callbacks with this PKCE example.

Copy this handler into the app. It checks the exact destination before passing a one-time code to the configured Supabase client, rejects ambiguous/error payloads, deduplicates warm/cold deliveries and exposes generic errors.

```js
// lib/auth-callback.js
export function createAuthCallbackHandler(client, redirectTo) {
  const expected = new URL(redirectTo);
  let lastCode = null;
  let lastResult = null;
  const failed = () => new Error('Sign-in could not be completed. Request a new link.');
  return async function handleAuthCallback(rawUrl) {
    let url;
    try { url = new URL(rawUrl); } catch { return 'ignored'; }
    if (url.protocol !== expected.protocol || url.hostname !== expected.hostname ||
        url.port !== expected.port || url.pathname !== expected.pathname ||
        url.username || url.password) return 'ignored';
    const codes = url.searchParams.getAll('code');
    if (url.hash || url.searchParams.has('error') || url.searchParams.has('error_code') ||
        codes.length !== 1 || !codes[0].trim() || codes[0].length > 4096) throw failed();
    const code = codes[0];
    if (code === lastCode && lastResult) return lastResult;
    lastCode = code;
    lastResult = Promise.resolve().then(async () => {
      const { data, error } = await client.auth.exchangeCodeForSession(code);
      if (error || !data?.session) throw failed();
      return 'signed-in';
    }).catch(() => {
      if (lastCode === code) { lastCode = null; lastResult = null; }
      throw failed();
    });
    return lastResult;
  };
}
```

Register once in the root layout. Keep an `app/auth/callback.tsx` route accessible while signed out so Expo Router can resolve the link before the protected app group opens. Its screen should show a waiting state and generic retry action, never render URL parameters.

```tsx
import { useEffect } from 'react';
import { Alert } from 'react-native';
import * as Linking from 'expo-linking';
import { supabase } from '@/lib/supabase';
import { AUTH_REDIRECT } from '@/lib/auth-redirect';
import { createAuthCallbackHandler } from '@/lib/auth-callback';

// Export AUTH_REDIRECT from lib/auth-redirect.ts and import it in sendMagicLink too.
const handleAuthCallback = createAuthCallbackHandler(supabase, AUTH_REDIRECT);

export function useAuthLinks() {
  useEffect(() => {
    let mounted = true;
    const receive = async (url: string) => {
      if (!mounted) return;
      try { await handleAuthCallback(url); }
      catch { if (mounted) Alert.alert('Sign-in failed', 'Request a new link and open it in this app.'); }
    };
    const sub = Linking.addEventListener('url', ({ url }) => { void receive(url); });
    void Linking.getInitialURL().then(url => { if (url) void receive(url); })
      .catch(() => { if (mounted) Alert.alert('Sign-in failed', 'Please reopen the sign-in link.'); });
    return () => { mounted = false; sub.remove(); };
  }, []);
}
```

## Session and protected routes (SDK 54)

Call the session hook once at the layout/provider boundary. Subscribe before loading stored state so a completed callback cannot be overwritten by an older session read.

```tsx
import { useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let mounted = true;
    let observedAuth = false;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, next) => {
      observedAuth = true;
      if (mounted) { setSession(next); setLoading(false); setFailed(false); }
    });
    void supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted || observedAuth) return;
      setSession(error ? null : data.session); setFailed(Boolean(error)); setLoading(false);
    }).catch(() => { if (mounted && !observedAuth) { setFailed(true); setLoading(false); } });
    const refresh = (state: string) => {
      if (state === 'active') supabase.auth.startAutoRefresh();
      else supabase.auth.stopAutoRefresh();
    };
    const listener = Platform.OS !== 'web' ? AppState.addEventListener('change', refresh) : null;
    if (Platform.OS !== 'web') refresh(AppState.currentState);
    return () => {
      mounted = false; subscription.unsubscribe(); listener?.remove();
      if (Platform.OS !== 'web') supabase.auth.stopAutoRefresh();
    };
  }, []);
  return { session, loading, failed };
}
```

In the root layout use Expo Router's `Stack.Protected`, not conditional `Stack.Screen` declarations. Put the callback inside the signed-out guard: successful authentication removes its waiting screen and opens the app group, including when an already signed-in user opens a callback link. Keep (auth) first so signed-out fallback opens login instead of the waiting callback. This protects navigation only; enforce server authorization and database RLS independently.

```tsx
import { Stack } from 'expo-router';
import { ActivityIndicator, Text } from 'react-native';
import { useSession } from '@/hooks/useSession';
import { useAuthLinks } from '@/hooks/useAuthLinks';

export default function RootLayout() {
  useAuthLinks();
  const { session, loading, failed } = useSession();
  if (loading) return <ActivityIndicator accessibilityLabel="Loading account" />;
  if (failed) return <Text>Account could not load. Reopen the app to retry.</Text>;
  return <Stack>
    <Stack.Protected guard={!session}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="auth/callback" />
    </Stack.Protected>
    <Stack.Protected guard={Boolean(session)}><Stack.Screen name="(app)" /></Stack.Protected>
  </Stack>;
}
```

## Apple sign-in and platform parity

Native expo-apple-authentication is iOS-only. Check `AppleAuthentication.isAvailableAsync()` before rendering its button; give it explicit width and height. On press, call `signInAsync`, require a non-empty `identityToken`, and pass it to `supabase.auth.signInWithIdToken({ provider: 'apple', token: credential.identityToken })`. Treat `ERR_REQUEST_CANCELED` as cancellation; show a generic retry message for other errors. Never log provider credentials. Configure the iOS bundle ID and capability with the app owner. Android retains the same magic-link/session flow; an Apple browser OAuth option needs a separately configured Services ID and browser callback flow.

Use the current Apple 4.8 guideline to determine whether an equivalent login option is required; exceptions exist. Do not assume every social-login app has identical obligations. Store Apple's name/email only when provided and consented; relay email is valid. Verify Apple sign-in on a real supported device.

## Verification and references

- Test cold-start and running-app magic links on both platforms, cancellation, expiry/reuse, missing verifier, sign-out, resume/refresh, and direct navigation to protected routes. Local example tests do not prove these device behaviors.
- [Supabase React Native client](https://supabase.com/docs/guides/auth/quickstarts/react-native)
- [Supabase PKCE and same-device verifier](https://supabase.com/docs/guides/auth/sessions/pkce-flow)
- [Supabase public and secret keys](https://supabase.com/docs/guides/api/api-keys)
- [Expo SDK 54 AppleAuthentication](https://docs.expo.dev/versions/v54.0.0/sdk/apple-authentication/)
- [Expo Router protected routes](https://docs.expo.dev/router/advanced/protected/)
- [Apple login-services guideline](https://developer.apple.com/app-store/review/guidelines/#login-services)

Pair with `choose-backend`, `account-deletion-flow`, and `5-1-2-i-ai-disclosure` where applicable.
