---
name: "add-app-attestation"
description: "Plan Apple App Attest for a React Native backend without turning illustrative pseudocode into an insecure cryptographic implementation. Use when the user says 'app attestation', 'devicecheck api', or 'prevent api abuse'."
---

# Add Apple App Attest Safely

App Attest can raise the cost of automated abuse, but it is not a substitute for user authentication, authorization, quotas, or server-side provider-key protection. Use a maintained verifier or Apple's current server-side guidance; do not implement certificate and CBOR verification from a partial code snippet.

## Non-negotiable server contract

1. Generate a cryptographically random challenge on the server, bind it to the intended operation and request-body hash, set a short expiry, and store it server-side.
2. On registration, verify the attestation certificate chain to Apple's root, the app-identity hash, the challenge, and the returned public key before persisting the key.
3. On every asserted request, read the raw request body once, verify the assertion against the stored public key and the server-issued challenge, then atomically advance the counter.
4. Consume each challenge exactly once. A replay, stale challenge, mismatched body hash, or failed counter compare-and-swap must reject the request.
5. Apply normal user authentication and a server-side spend quota after the assertion. App Attest alone does not authorize a user.

## Safe handler shape

```ts
async function verifyProtectedRequest(req: Request) {
  const rawBody = await req.text();
  const keyId = req.headers.get('X-App-Attest-Key-Id');
  const assertion = req.headers.get('X-App-Attest-Assertion');
  const challengeId = req.headers.get('X-App-Attest-Challenge-Id');

  if (!keyId || !assertion || !challengeId) return { ok: false as const };

  const challenge = await consumeChallengeAtomically({
    challengeId,
    keyId,
    requestHash: sha256(rawBody),
  });
  if (!challenge) return { ok: false as const };

  const key = await db.attestationKeys.findUnique({ where: { keyId } });
  if (!key) return { ok: false as const };

  const verified = await appAttestVerifier.verifyAssertion({
    publicKey: key.publicKey,
    assertion,
    challenge: challenge.bytes,
    requestBody: rawBody,
  });
  if (!verified.ok) return { ok: false as const };

  const advanced = await advanceCounterAtomically({
    keyId,
    expectedPrevious: key.counter,
    nextCounter: verified.counter,
  });
  return advanced ? { ok: true as const, rawBody } : { ok: false as const };
}
```

The three named helpers are required security boundaries, not placeholders to skip: `consumeChallengeAtomically`, `appAttestVerifier.verifyAssertion`, and `advanceCounterAtomically` must be covered by server tests before use.

## Client considerations

- Generate and retain only the non-secret App Attest key identifier in secure storage.
- Request a fresh challenge for each protected operation; never reuse a challenge from local storage.
- Do not send backend or AI-provider keys to the device.
- Provide a safe fallback for unsupported devices that still requires normal user authentication and strict server-side rate limits.

## Security tests

- A stale, reused, or cross-user challenge is rejected.
- An assertion over a different raw request body is rejected.
- Two concurrent replays of the same assertion cannot both advance the counter.
- A valid App Attest assertion without a valid user session cannot use a paid backend feature.

## Pair with

- `add-openai-streaming-rn`
- `add-supabase-auth`
- `add-expo-secure-store`
