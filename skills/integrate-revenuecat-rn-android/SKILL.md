---
name: "integrate-revenuecat-rn-android"
description: "Integrate RevenueCat 8.x SDK in Expo Android with Play Billing 7+. Use when the user says 'integrate revenuecat android', 'rc android setup', 'play billing rn'."
---

# Integrate RevenueCat (Android)

RC wraps Google Play Billing. Mostly same as iOS version.

## Install
```bash
pnpm add react-native-purchases
```

## Configure

```tsx
import Purchases, { LOG_LEVEL } from 'react-native-purchases';

Purchases.setLogLevel(__DEV__ ? LOG_LEVEL.DEBUG : LOG_LEVEL.WARN);

Purchases.configure({ apiKey: 'goog_YOUR_RC_API_KEY' });

// On login:
await Purchases.logIn(user.id);
// On logout:
await Purchases.logOut();
```

## Fetch offerings + show paywall

```tsx
const offerings = await Purchases.getOfferings();
const current = offerings.current;

// Display packages
current.availablePackages.forEach(pkg => {
  console.log(pkg.product.priceString); // localized "$9.99"
});

// Purchase
try {
  const { customerInfo } = await Purchases.purchasePackage(pkg);
  if (customerInfo.entitlements.active.pro) {
    // grant access
  }
} catch (e) {
  if (e.userCancelled) return;
  throw e;
}
```

## Restore

```tsx
const { customerInfo } = await Purchases.restorePurchases();
```

## Check entitlement on app open

```tsx
const info = await Purchases.getCustomerInfo();
const hasPro = info.entitlements.active.pro !== undefined;
```

## Android-specific gotchas

- Play Billing Library 8 mandatory since Aug 2025
- RC 8.x handles PBL 8 — make sure on RC 8.0+
- For one-time products, use `oneTimePurchaseOfferDetailsList` (PBL 8 requirement)
- Test in sandbox via license testers (`test-paywall-play-billing`)
- "DEVELOPER_ERROR" usually means SHA-1 mismatch in Play vs your build

## Edge cases

- User on Play Family plan: `customerInfo` shows entitlement from family sharing
- User refunded by Google: RTDN fires `SUBSCRIPTION_REVOKED` → RC auto-revokes entitlement
- Grace period: user still has access for ~3 days after card fail
- Account hold: longer grace (16 days default in 2025)

## Pair with
- `set-up-revenuecat-dashboard-android`
- `revenuecat-paywall-builder-android`
- `app-store-server-notifications-android`
