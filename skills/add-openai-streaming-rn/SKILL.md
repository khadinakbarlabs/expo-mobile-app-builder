---
name: "add-openai-streaming-rn"
description: "Add authenticated, rate-limited AI streaming to an Expo app without exposing a provider key. Use when the user says 'add openai', 'streaming chat rn', 'gpt in app', 'ai chat ios', or 'openai streaming'."
---

# Add Secure AI Streaming to React Native + Expo

Never call an AI provider directly from a mobile client. Put the provider key in server-side secret storage and require a verified user identity, bounded input, and a server-side quota before every provider request.

## Required controls

- Use an authenticated backend route. For Supabase Edge Functions, use `withSupabase({ auth: 'user' })` and keep `verify_jwt` enabled for user-facing functions.
- Do not accept a merely present `Authorization` header as proof of identity.
- Keep provider keys in server-side secret storage only. Never use an `EXPO_PUBLIC_` variable for a private provider key.
- Enforce a per-user, server-side rate and spend quota with an atomic datastore operation before calling the provider.
- Bound message count, message size, allowed roles, and request frequency.
- Show a provider-specific disclosure and obtain consent before the first transfer of user content.

## Authenticated Supabase Edge Function

The following pattern uses Supabase's authenticated user mode. It intentionally keeps the quota implementation server-side because its schema and atomic operation depend on the application's datastore.

```ts
import { withSupabase } from 'npm:@supabase/server';

const MAX_MESSAGES = 20;
const MAX_CHARS_PER_MESSAGE = 8_000;

function isValidMessages(value: unknown): value is Array<{ role: string; content: string }> {
  return Array.isArray(value)
    && value.length > 0
    && value.length <= MAX_MESSAGES
    && value.every((message) =>
      message
      && typeof message.role === 'string'
      && ['system', 'user', 'assistant'].includes(message.role)
      && typeof message.content === 'string'
      && message.content.length > 0
      && message.content.length <= MAX_CHARS_PER_MESSAGE
    );
}

export default {
  fetch: withSupabase({ auth: 'user' }, async (req, ctx) => {
    const userId = ctx.userClaims?.sub;
    if (!userId) return new Response('Unauthorized', { status: 401 });

    const body = await req.json().catch(() => null);
    if (!body || !isValidMessages(body.messages)) {
      return new Response('Invalid request', { status: 400 });
    }

    // Implement this as one atomic server-side datastore operation. It must
    // reserve the user's allowance before any provider request is made.
    const allowed = await enforceUserQuotaAtomically(userId);
    if (!allowed) return new Response('Usage limit reached', { status: 429 });

    const providerKey = Deno.env.get('OPENAI_API_KEY');
    if (!providerKey) return new Response('Service unavailable', { status: 503 });

    const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${providerKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: body.messages,
        stream: true,
      }),
    });

    if (!upstream.ok || !upstream.body) {
      return new Response('Upstream service unavailable', { status: 502 });
    }

    return new Response(upstream.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  }),
};
```

Before deploying, verify the current authentication configuration in the provider's official documentation. Do not set `auth: 'none'` or disable JWT verification for a route that spends provider funds or reads user data.

## Client streaming

Call the authenticated function through the user's session-aware client. Do not embed a provider key, server secret, or service-role key in the app.

```tsx
const res = await expoFetch('https://your-project.functions.supabase.co/chat', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${session?.access_token ?? ''}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ messages }),
  signal: abortRef.current.signal,
});
```

Treat an absent session as a local sign-in error before making this request. The backend remains the enforcement point.

## Streaming parser notes

- Use `expo/fetch` or another SDK-54-compatible streaming client after verifying its current compatibility.
- Cap response size and handle malformed chunks without treating them as trusted app data.
- Clear the `AbortController` in `finally`, and never log user prompts, credentials, or provider responses unless the product's privacy policy permits it.

## Consent and privacy

Before first use, disclose the exact provider, what content leaves the device, why it is processed, and where the user can revoke consent. Do not make promises about a provider's data use unless they match the account's current agreement and published terms.

## Security tests

- A missing, malformed, expired, or arbitrary bearer value receives `401` before the provider request.
- An overlong or malformed message array receives `400`.
- An exhausted user receives `429` and cannot trigger a provider request.
- A provider failure returns a generic error and does not reveal a key or upstream body.

## Pair with

- `5-1-2-i-ai-disclosure`
- `add-app-attestation`
- `add-supabase-auth`
