---
name: "command-build-paywall"
description: "Coordinate the cross-platform /build-paywall workflow for Expo projects. Use when the user asks for this outcome."
---

# Command workflow: /build-paywall

Use this as a host-agnostic workflow. Adapt command names and capabilities to the active coding-agent host.

## Workflow contract

```yaml
description: "Generate an Apple-compliant React Native paywall via RevenueCat Paywalls v2"
argument-hint: "<context>"
```

# /build-paywall

Generate a conversion-optimized, Apple-compliant paywall for the current Expo project.

## Workflow

1. Run `pricing-strategy` if pricing not yet decided.
2. Confirm RevenueCat is integrated; if not, run `integrate-revenuecat-rn`.
3. Run `design-paywall` skill with confirmed pricing.
4. Generate `<PaywallScreen />` using `react-native-purchases-ui` `<Paywall />` component or custom RevenueCat-backed UI with: visible price, billing frequency, trial timeline graphic, restore button.
5. Wire to onboarding flow exit point.
6. Run `test-paywall-storekit` to set up StoreKit Configuration file for sandbox testing.
7. Add snapshot tests for paywall variants.
8. Run `paywall-compliance` audit before declaring done.
