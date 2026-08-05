---
name: "paywall-compliance"
description: "Audit a paywall against 3.1.1 / 3.1.2  -  visible price, billing freq, trial timeline, restore button. Use when the user says 'paywall compliance', 'paywall audit', 'paywall rejection', 'toggle paywall'."
---

# Paywall Compliance

Audit paywall against 2026 Apple rules. Toggle paywalls REJECTED since Jan 2026.

## Required elements (visible WITHOUT scrolling)
- [ ] **Exact price** — "$9.99/month" not "less than a coffee"
- [ ] **Billing frequency** — "month"/"year"/"week" explicit
- [ ] **Trial length** — "3-day free trial then $9.99/month"
- [ ] **Auto-renewal disclosure** — "Cancel anytime. Renews automatically."
- [ ] **Restore Purchases button** — paywall AND Settings
- [ ] **Terms of Service link** — works
- [ ] **Privacy Policy link** — works

## Apple-blessed pattern: visual trial timeline
Replace toggle paywalls with a 3-step timeline:
```
[Today]──────[Day 5: reminder]──────[Day 7: charge]
   ↑                                       ↑
Full access                          $49.99/year
```

Blinkist saw +23% conversion, -55% complaints with this pattern.

## REJECTED patterns (2026)
- Toggle "Free trial / Paid" switch with full price hidden behind toggle
- "$0.00 today" without showing what will be charged later
- "Save 50%" without showing what 100% would be
- Restore button below the fold or buried in Settings only
- "Cancel anytime" without explaining HOW (link to Apple ID Subscriptions)

## Audit script
```
PAYWALL AUDIT

CRITICAL:
[ ] Toggle-based design? → REJECT. Replace with 2 distinct plan cards.
[ ] Trial price not shown? → REJECT. Show "$0 trial then $9.99/month" prominently.
[ ] Restore button missing? → REJECT. Add to paywall + Settings.

HIGH:
[ ] Auto-renewal disclosure missing? → Add "Renews automatically" near CTA.
[ ] No visual trial timeline? → Add 3-step graphic.

MEDIUM:
[ ] EULA link broken? → Fix.
[ ] No "How to cancel" instructions? → Add link to Apple ID Subscriptions.
```

## Reference
`../../docs/references/06-store-readiness.md`
