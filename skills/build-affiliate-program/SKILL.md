---
name: "build-affiliate-program"
description: "Build a referral / affiliate program for an iOS app to drive viral growth. Use when the user says 'affiliate program', 'referral program', 'invite friends feature', 'viral growth', 'creator program app'."
---

# Build an Affiliate / Referral Program

Two flavors: peer referrals (give-get) and creator affiliates (commission). Both work for iOS.

## Peer referral (give-get)

User invites friend, both get a reward.

### Reward types
- Both get 1 month free Pro
- Both get $5 credit
- Friend gets 50% off first month, you get 1 month free

### Implementation

1. **Generate unique code/link per user**
   - Backend: `referrals` table with `(user_id, code)`
   - Code: short readable: `YOUR-REFERRAL-CODE`
   - Link: `https://yourapp.com/r/YOUR-REFERRAL-CODE`

2. **Friend taps link**
   - Goes to landing page (use universal links to deep-link into App Store with referral code preserved)
   - Or: "Continue in App" + Smart Banner

3. **Friend installs app**
   - Use Branch.io OR AppsFlyer to track install attribution
   - Or: deferred deep link via Apple Search Ads attribution API
   - Friend signs up, code auto-applied

4. **Reward both**
   - When friend converts to paid (or completes first action), credit both accounts
   - In RevenueCat: extend trial / grant entitlement programmatically

### Tools for tracking install attribution

| Tool | Cost | Notes |
|---|---|---|
| Branch.io | Free tier | Best deferred deep linking |
| AppsFlyer | Paid | Enterprise, more analytics |
| Singular | Paid | Similar to AppsFlyer |
| Apple SKAdNetwork | Free | Limited attribution windows |
| Build your own | Free | Pasteboard trick (user copies code from web, app reads on first launch) |

### DIY paste-board trick (no SDK needed)

Web landing page:
```js
navigator.clipboard.writeText('REF:YOUR-REFERRAL-CODE');
```

App on first launch:
```ts
import * as Clipboard from 'expo-clipboard';

const onboarding = async () => {
  const text = await Clipboard.getStringAsync();
  if (text?.startsWith('REF:')) {
    const code = text.slice(4);
    await applyReferralCode(code);
  }
};
```

Works without SDK, no install attribution provider needed. Limitation: user must consent to clipboard read on iOS 14+.

## Creator affiliate program

Influencers / YouTubers send traffic, get % commission.

### Why it works for iOS apps
- Creators love $$ for content they'd post anyway
- Higher trust than ads
- Permanent backlinks (videos stay up)

### Build it

1. **Affiliate signup page** (your marketing site)
   - "Join our affiliate program" form
   - Capture: name, audience size, channels

2. **Approval flow**
   - Manual at first (review each application)
   - Issue unique tracking link to each

3. **Tracking**
   - Each affiliate has unique code
   - Track conversions via RevenueCat metadata or your own backend
   - Use first-party attribution (Apple Search Ads attribution API + your code)

4. **Commission structure**
   - 30% of first year revenue (standard)
   - OR $X per paid signup (simpler)
   - Pay monthly through an owner-approved payout provider → affiliate's bank

5. **Affiliate dashboard**
   - Show clicks, signups, paid users, earnings
   - Build basic version in Notion/Airtable + zapier first
   - Upgrade to Tolt / Rewardful / FirstPromoter at scale

### Tools
- **Tolt** — $39/mo, best for SaaS with subscriptions
- **Rewardful** — $49/mo, integrates with Stripe (use if you have web tier)
- **FirstPromoter** — $49/mo, similar
- **Roll your own** — Notion + Airtable + Zapier for first 20 affiliates

## Apple App Store + affiliate considerations

- Apple Search Ads has its own attribution API; can pass referral codes through
- App Store Connect doesn't support affiliate links directly
- For non-paid acquisition: use universal links → your landing page → install

## What works best for iOS apps in 2026

1. Peer referral with give-get of 1 month free both
2. Creator program for top 5 niche YouTubers in your category
3. App Store CPP (Custom Product Pages) per major affiliate so attribution works visually

## Common pitfalls

- Reward too small → no one shares
- Reward only for the inviter → friend has no reason to convert
- Attribution too lossy → can't pay affiliates accurately, they leave
- Manual payouts that take >2 weeks → affiliates churn

## Pair with
- `add-deep-links` (universal links setup)
- `custom-product-pages` (CPP per affiliate for tracking)
- `add-posthog-rn` (track funnel: click → install → trial → paid)
