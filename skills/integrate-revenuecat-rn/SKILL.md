---
name: "integrate-revenuecat-rn"
description: "Integrate RevenueCat 8.x React Native SDK with Expo config plugin. Use when the user says 'integrate RevenueCat', 'add subscriptions', 'set up IAP', 'react-native-purchases'."
---

# Integrate RevenueCat (RN)

RevenueCat is one option for React Native + Expo subscriptions. Check its current pricing, data processing, and store-account requirements before selecting it.

## Credential and external action gate

Creating a RevenueCat project, accessing App Store Connect or Play credentials, importing products, and starting an EAS development build are external actions. Obtain owner approval for the account, app identifiers, products, and build target. Do not place provider credentials in this plugin, source control, prompts, screenshots, or logs.

## Install
```bash
npx expo install react-native-purchases react-native-purchases-ui
```

## app.json
```json
{
  "expo": {
    "plugins": ["react-native-purchases"]
  }
}
```
Requires an EAS development build because Expo Go cannot load this native module. Prepare the build command and run it only after the owner confirms the target account and profile.

## Configure at app launch
```tsx
// app/_layout.tsx
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { useEffect } from 'react';

export default function RootLayout() {
  useEffect(() => {
    Purchases.setLogLevel(LOG_LEVEL.DEBUG); // INFO or WARN in production
    Purchases.configure({ apiKey: '<platform-public-sdk-key>' });
  }, []);
  return <Stack />;
}
```

## Check entitlement
```tsx
import Purchases from 'react-native-purchases';

const info = await Purchases.getCustomerInfo();
const isPro = info.entitlements.active['pro'] !== undefined;
```

## Purchase flow
```tsx
const offerings = await Purchases.getOfferings();
const pkg = offerings.current?.annual;
if (pkg) {
  try {
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    if (customerInfo.entitlements.active['pro']) {
      // grant access
    }
  } catch (e) {
    if (!e.userCancelled) showError(e.message);
  }
}
```

## Restore
```tsx
const customerInfo = await Purchases.restorePurchases();
```

## Listen for changes (essential)
```tsx
useEffect(() => {
  const sub = Purchases.addCustomerInfoUpdateListener((info) => {
    setIsPro(info.entitlements.active['pro'] !== undefined);
  });
  return () => sub.remove();
}, []);
```

## RevenueCat dashboard setup
1. Create account at app.revenuecat.com
2. Add the app only after the owner has approved the bundle identifier and secure App Store Connect access plan
3. Create products in App Store Connect FIRST
4. In RevenueCat: Entitlement `pro`, Products linked to ASC, Offering `current` with packages

## Reference
`../../docs/references/03-monetization.md`
