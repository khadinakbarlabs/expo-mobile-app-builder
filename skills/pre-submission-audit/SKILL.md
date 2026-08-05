---
name: "pre-submission-audit"
description: "Pre-submission rejection-prevention audit. Pattern-matches against top 15 rejection reasons including 5.1.2(i) AI disclosure. Use when the user says 'pre-submission audit', 'will Apple reject', 'audit before submit', 'rejection check'."
---

# Pre-Submission Audit

Pattern-match the app + metadata against top 15 rejection reasons from Q1-Q2 2026. Output PASS/FAIL per dimension with file:line fixes.

## 12-dimension audit

### 1. Apple Floor (every app must have)
- [ ] App icon (1024x1024 + Asset Catalog set)
- [ ] PrivacyInfo.xcprivacy (run `privacy-manifest-rn`)
- [ ] Privacy Policy URL: in ASC AND in-app Settings
- [ ] Restore Purchases on paywall AND Settings (if IAP)
- [ ] Account-deletion flow in app (5.1.1(v), if accounts)
- [ ] App version + build number visible (Settings)
- [ ] Empty/error states for every list/async call
- [ ] Built against iOS 26 SDK (mandatory)

### 2. Guideline 2.1 — App Completeness
- No "TODO" placeholder strings
- All buttons have working actions
- No dead navigation links
- Demo account credentials prepared
- "What's New" specific (NOT "Bug fixes and improvements")
- No crashes on launch

### 3. Guideline 2.3 — Accurate Metadata
- Screenshots match current app
- No "best", "#1", "fastest" claims
- No "AI-powered" claim if you don't have AI

### 4. Guideline 3.1.1 / 3.1.2 — IAP & Subscriptions (run `paywall-compliance`)
- All paid digital goods through StoreKit (no external web checkout)
- Subscription paywall shows: exact price, billing freq, trial length, restore button
- NOT toggle-based "free trial → paid" design (REJECTED in 2026)
- Auto-renewal disclosure visible
- Cancel-anytime instructions visible

### 5. Guideline 4.0 / 4.1 — Design / Copycats
- Native iOS feel (not web wrapper)
- 44x44 pt taps everywhere

### 6. Guideline 4.2 — Minimum Functionality
- More than wraps a website
- Uses native iOS capabilities meaningfully
- Has seed content (not all empty states)

### 7. Guideline 4.3 — Spam / Clones
- Not near-duplicate of own apps
- If saturated category: clear wedge in review notes

### 8. Guideline 4.8 — Sign in with Apple
- Required if any 3rd-party social login offered
- expo-apple-authentication wired

### 9. Guideline 5.1.1 — Privacy
- NSUserTrackingUsageDescription if 3rd-party tracking SDK
- Privacy nutrition label matches actual collection
- No required login for non-account features
- Account deletion in-app

### 10. Guideline 5.1.2(i) — Third-Party AI Disclosure (run `5-1-2-i-ai-disclosure`)
- Every 3rd-party AI provider named explicitly in privacy disclosures
- Explicit consent modal naming the provider before first call
- (On-device Foundation Models exempt)

### 11. Guideline 5.1.5 — Location
- Always-on location only if justified
- WhenInUse default

### 12. Accessibility (run `accessibility-audit`)
- VoiceOver labels everywhere
- Dynamic Type respected
- 44pt taps
- Reduce Motion gating

## Output
```
PRE-SUBMISSION AUDIT — [app name] v[version] build [build]

CRITICAL (will reject):
- [ ] FAIL 5.1.2(i): an external AI provider receives user content but no provider-specific consent modal is shown
- [ ] FAIL 3.1.1: Paywall toggle-based design

HIGH:
- [ ] FAIL 4.2: TabView has only one tab + 2 empty states

MEDIUM:
- [ ] WARN 2.1: What's New says "Bug fixes and improvements"

PASS: [list]

VERDICT: BLOCK SUBMISSION until 2 critical and 1 high fixed.
```

## Reference
`../../docs/references/06-store-readiness.md`
