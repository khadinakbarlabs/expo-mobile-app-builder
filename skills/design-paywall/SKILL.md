---
name: "design-paywall"
description: "Build Apple-compliant React Native paywall via RevenueCat Paywalls v2  -  visible price, billing freq, trial timeline, restore button. Use when the user says 'design paywall', 'build paywall', 'subscription screen', 'RevenueCat paywall'."
---

# Design Paywall

Build a paywall that converts AND passes 2026 App Review.

## Apple compliance (5 must-haves visible without scrolling)
1. **Exact price** — "$9.99/month" not "less than a coffee"
2. **Billing frequency** — "month"/"year"/"week" explicitly
3. **Trial length** — "3-day free trial then $9.99/month"
4. **Auto-renewal disclosure** — "Cancel anytime. Renews automatically."
5. **Restore Purchases button** — reachable from paywall AND Settings

**Toggle paywalls REJECTED in 2026.** Use Apple-blessed visual trial timeline:
```
[Today]──────[Day 5: reminder]──────[Day 7: charge]
   ↑                                       ↑
Full access                          $49.99/year
```

## RevenueCat Paywalls v2 (recommended)
```tsx
import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';

async function presentPaywall() {
  const result = await RevenueCatUI.presentPaywall({
    requiredEntitlementIdentifier: 'pro',
  });
  if (result === PAYWALL_RESULT.PURCHASED) {
    // grant access
  }
}
```

Edit paywall design in RevenueCat dashboard (no-code), A/B test via Experiments.

## Custom paywall (when Paywalls v2 isn't enough)
```tsx
import { useEffect, useState } from 'react';
import Purchases, { PurchasesOffering } from 'react-native-purchases';

function PaywallScreen() {
  const [offerings, setOfferings] = useState<PurchasesOffering | null>(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    Purchases.getOfferings().then((o) => {
      setOfferings(o.current);
      setSelectedPackage(o.current?.annual);
    });
  }, []);

  const purchase = async () => {
    if (!selectedPackage) return;
    try {
      const { customerInfo } = await Purchases.purchasePackage(selectedPackage);
      if (customerInfo.entitlements.active['pro']) {
        // grant
      }
    } catch (e) { /* show error */ }
  };

  const restore = async () => {
    const customerInfo = await Purchases.restorePurchases();
    // check entitlements
  };

  return (
    <ScrollView>
      <Image source={require('@/assets/paywall-hero.png')} />
      <Text style={styles.headline}>The only food log that finishes itself</Text>
      <Text style={styles.subhead}>47,000 meals logged this week</Text>

      {offerings?.availablePackages.map((pkg) => (
        <PackageRow
          key={pkg.identifier}
          package={pkg}
          selected={selectedPackage?.identifier === pkg.identifier}
          onPress={() => setSelectedPackage(pkg)}
        />
      ))}

      <TrialTimelineGraphic />

      <Button title="Start 3-day free trial" onPress={purchase} />

      <View style={styles.trustRow}>
        <Pressable onPress={restore}><Text>Restore</Text></Pressable>
        <Link href="https://...">Terms</Link>
        <Link href="https://...">Privacy</Link>
      </View>
    </ScrollView>
  );
}
```

## Common rejection triggers
- Toggle "free trial → paid" without showing full price
- Restore button buried or missing
- "100% free!" claim before paywall
- No way to dismiss paywall

## Reference
`../../docs/references/03-monetization.md`, `../../docs/references/06-store-readiness.md`
