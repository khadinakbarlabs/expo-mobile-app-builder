---
name: "app-store-server-notifications-android"
description: "Set up Google Play Real-Time Developer Notifications (RTDN) - equivalent of Apple's ASSN - to receive subscription events. Use when the user says 'rtdn android', 'play subscription webhook', 'real time developer notifications'."
---

# RTDN (Real-Time Developer Notifications)

Google's webhook for subscription events. Equivalent of Apple's ASSN.

## How it works
- Play sends events to Google Cloud Pub/Sub topic
- Your backend subscribes to topic
- Events delivered as JWT-signed messages

## Events you'll get
- SUBSCRIPTION_PURCHASED (initial buy)
- SUBSCRIPTION_RENEWED (auto-renewal)
- SUBSCRIPTION_CANCELED (user-initiated)
- SUBSCRIPTION_EXPIRED (grace period ended)
- SUBSCRIPTION_RECOVERED (came back after hold)
- SUBSCRIPTION_RESTARTED (resubscribed after expiry)
- SUBSCRIPTION_REVOKED (refund)
- SUBSCRIPTION_PAUSE_SCHEDULE_CHANGED
- And ~10 more

## Setup

### 1. Create Pub/Sub topic
Google Cloud Console → Pub/Sub → Topics → Create.

```bash
gcloud pubsub topics create play-subscriptions
```

### 2. Subscribe to topic
Play Console → Monetization setup → Real-time developer notifications:
- Topic name: `projects/your-gcp-project/topics/play-subscriptions`
- Test connection
- Save

### 3. Backend subscriber

Option A: Push to your endpoint:
```bash
gcloud pubsub subscriptions create play-sub \
  --topic=play-subscriptions \
  --push-endpoint=https://api.yourapp.com/webhooks/play-rtdn
```

Option B: Pull (poll Pub/Sub from your server):
```ts
const subscription = pubsub.subscription('play-sub');
subscription.on('message', (msg) => {
  const data = JSON.parse(Buffer.from(msg.data, 'base64').toString());
  // Process event
  msg.ack();
});
```

## Verify Play's auth on push

Push endpoint receives JWT. Verify:
```ts
const { payload } = await jwtVerify(token, jwks, {
  issuer: 'accounts.google.com',
  audience: 'https://api.yourapp.com/webhooks/play-rtdn',
});
```

## Use RevenueCat instead (recommended)

RC handles RTDN for you and forwards standardized events.

## Pair with
- `set-up-revenuecat-dashboard-android` (alternate, simpler)
- `subscription-server-validation-android`
