---
name: "paywall-compliance-play"
description: "Ensure paywall complies with Google Play's subscription policy: clear terms, restore, cancel, no dark patterns. Use when the user says 'paywall compliance play', 'play subscription policy'."
---

# Paywall Compliance (Play)

Play subscription policy checklist.

## Required disclosures (on paywall)

- [ ] Price + currency clearly visible
- [ ] Billing period (weekly/monthly/yearly)
- [ ] Free trial length AND that it converts to paid
- [ ] When billing starts ("Day 7: charged $X")
- [ ] Cancel instructions (in Play Store → Subscriptions)
- [ ] Restore Purchases button visible (not hidden in menu)
- [ ] Privacy Policy link
- [ ] Terms of Service link

## Required UX

- Free trial timeline shown visually
- Cancellation accessible via Play (not just in-app)
- Restore Purchases works for users on new device
- No fake urgency (countdown timers that don't actually expire)
- No "FREE" labels if paywall converts to paid

## Prohibited

- Pre-checked auto-renew without consent
- Hidden cancel link (>2 scrolls)
- Auto-conversion without notice
- External payment links (unless EEA/UK/US + enrolled)
- Misleading pricing (decoy + bait)
- "Limited offer" always present

## Restore Purchases

Must work without login if user has Google account with active subscription:

```tsx
import Purchases from 'react-native-purchases';

const restore = async () => {
  const { customerInfo } = await Purchases.restorePurchases();
  if (customerInfo.entitlements.active.pro) {
    // grant access
  }
};

// Button:
<Pressable onPress={restore}><Text>Restore Purchases</Text></Pressable>
```

## Cancel link

```tsx
import { Linking } from 'react-native';

<Pressable onPress={() => Linking.openURL('https://play.google.com/store/account/subscriptions')}>
  <Text>Manage subscription</Text>
</Pressable>
```

Opens Play Store subscription management directly.

## Refund policy

You can't issue refunds — Google does. Direct users to:
play.google.com/store/account/orderhistory

## External Payments (EEA/UK/US only)

If you offer alternative billing:
1. Enroll in Play Console
2. Display "Use other payment method" link
3. Pay 11% commission (vs 15-30%) when used
4. Still must accept Play Billing as default option

## Pair with
- `design-paywall-android` for UI
- `restore-purchases-android` for restore UX
- `subscription-server-validation-play` for backend
