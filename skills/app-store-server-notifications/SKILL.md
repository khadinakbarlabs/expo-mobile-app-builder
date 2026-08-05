---
name: "app-store-server-notifications"
description: "Set up a signature-verified Apple App Store Server Notifications V2 webhook for subscription events. Use when the user says 'app store server notifications', 'assn', 'subscription webhook', or 'iap webhook'."
---

# Set Up App Store Server Notifications V2

App Store Server Notifications are signed webhook payloads. Decode-only JWT helpers are not verification. Reject any notification that fails certificate-chain, signature, environment, bundle-ID, or app-ID validation before it can update entitlement state.

## Required controls

- Use Apple's current App Store Server Library and its `SignedDataVerifier` rather than `jsonwebtoken.decode`.
- Load Apple root certificates from a trusted, versioned server-side source.
- Configure the expected bundle ID, production app Apple ID, and environment explicitly.
- Verify the outer notification and every nested signed transaction or renewal record you consume.
- Make event processing idempotent by persisting a verified event identifier before applying state changes.
- Keep this endpoint server-side. It must never rely on an app-bundled signing key or a client-provided "verified" flag.

## Verified handler pattern

```ts
import { Environment, SignedDataVerifier } from '@apple/app-store-server-library';

const bundleId = process.env.APP_BUNDLE_ID;
const appAppleId = Number(process.env.APP_APPLE_ID);

if (!bundleId || !Number.isSafeInteger(appAppleId)) {
  throw new Error('Missing verified App Store notification configuration');
}

const verifier = new SignedDataVerifier(
  loadTrustedAppleRootCAs(),
  true,
  Environment.PRODUCTION,
  bundleId,
  appAppleId,
);

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.signedPayload !== 'string') {
    return new Response('Bad request', { status: 400 });
  }

  let notification;
  try {
    notification = await verifier.verifyAndDecodeNotification(body.signedPayload);
  } catch {
    return new Response('Invalid notification', { status: 400 });
  }

  const signedTransaction = notification.data?.signedTransactionInfo;
  if (typeof signedTransaction !== 'string') {
    return new Response('Missing transaction', { status: 400 });
  }

  let transaction;
  try {
    transaction = await verifier.verifyAndDecodeTransaction(signedTransaction);
  } catch {
    return new Response('Invalid transaction', { status: 400 });
  }

  await db.transaction(async (tx) => {
    const eventId = notification.notificationUUID;
    if (!eventId) throw new Error('Verified notification is missing an id');

    const alreadyProcessed = await tx.processedEvents.findUnique({ where: { eventId } });
    if (alreadyProcessed) return;

    await tx.processedEvents.create({ data: { eventId } });
    await applyVerifiedSubscriptionTransition(tx, {
      notificationType: notification.notificationType,
      transactionId: transaction.transactionId,
      originalTransactionId: transaction.originalTransactionId,
    });
  });

  return new Response('OK', { status: 200 });
}
```

`loadTrustedAppleRootCAs` and `applyVerifiedSubscriptionTransition` are application-owned server helpers. The former must load current Apple roots; the latter must allow only known event-state transitions. Do not replace either with decode-only parsing or a client-provided status.

## Environment and testing

- Use a separate verifier configuration for Sandbox and Production. Production requires the configured app Apple ID.
- Test invalid signatures, wrong bundle IDs, duplicate events, out-of-order events, refunds, renewals, and retries before enabling customer access changes.
- Return quickly after recording verified work; queue slow side effects such as email or analytics.

## RevenueCat alternative

RevenueCat can forward normalized events, but its webhook must still be authenticated with its current documented verification control before it mutates entitlement state.

## Reference

See the current [Apple App Store Server Library documentation](https://apple.github.io/app-store-server-library-node/) before implementation. Apple documents `SignedDataVerifier.verifyAndDecodeNotification` for notification verification.
