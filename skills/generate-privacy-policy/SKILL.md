---
name: "generate-privacy-policy"
description: "Generate a Privacy Policy for an iOS app that satisfies App Store requirements, GDPR, CCPA, COPPA. Use when the user says 'privacy policy', 'generate privacy policy', 'app privacy policy', 'privacy policy template', 'gdpr policy ios'."
---

# Generate Privacy Policy

Required for App Store submission. Required for ATT prompt to be approved. Specific format requirements.

## What App Store requires

App Privacy section in App Store Connect must match what your Privacy Policy says. Mismatch = rejection.

You must disclose:
1. Categories of data collected (per Apple's list)
2. Whether each is linked to user identity
3. Whether each is used for tracking (per ATT definition)
4. Third parties data is shared with

## Data categories Apple cares about

- Contact info (name, email, phone, address)
- Health & Fitness data
- Financial info
- Location (precise vs coarse)
- Sensitive info (race, religion, sexual orientation, etc.)
- Contacts (your phone contacts list)
- User content (photos, videos, messages)
- Browsing history
- Search history
- Identifiers (User ID, Device ID)
- Purchases
- Usage data (interactions, ads viewed)
- Diagnostics (crash data, performance)

For each, declare: collected? linked to user? used for tracking?

## Third-party SDKs that need disclosure

For each SDK that processes user data:

| SDK | What it sees | Disclose how |
|---|---|---|
| RevenueCat | Purchase history, anonymous user ID | "We use RevenueCat for subscription management. RC sees subscription metadata and an anonymous user ID." |
| PostHog | Usage events, session replay | "We use PostHog for analytics. PH sees anonymized event data." |
| Sentry | Crash reports, error context | "We use Sentry for crash reporting. Sentry receives crash data including app state." |
| Supabase | Auth credentials, app data | "Supabase hosts our backend. They see all data you create in the app." |
| OpenAI / Anthropic / etc | LLM prompts | "When you use AI features, prompts are sent to [Provider]. They process them per their privacy policy. They don't train on your data." (REQUIRED for 5.1.2(i) compliance) |

## Privacy Policy structure (template)

```markdown
# Privacy Policy

Last updated: [Date]

[App Name] ("we", "us", "our") respects your privacy. This policy explains what we collect, how we use it, and your rights.

## What we collect

### Information you provide
- [Email address] when you create an account
- [Photos] when you upload them
- [...]

### Information collected automatically
- Usage data (which features you use, how often)
- Device info (model, OS version, language)
- Crash data and performance metrics

### Information from third parties
- Apple (Sign in with Apple)
- [...]

## How we use it
- Provide the service
- Improve features (analytics)
- Customer support
- [...] (NEVER list "marketing" if you don't actually do marketing emails)

## Who we share it with
We share data ONLY with these processors, who help us run the service:

- **RevenueCat** - subscription management (data: anonymous user ID, subscription status)
- **Supabase** - backend hosting (data: all account data)
- **Sentry** - crash reporting (data: crash logs)
- **PostHog** - product analytics (data: anonymized usage)
- **OpenAI** - AI features only (data: your prompts when using AI features)

We do NOT sell your data. We do NOT use it for advertising.

## Your rights
- **Access**: Request a copy of your data → email [privacy@yourapp.com]
- **Delete**: In-app: Settings → Delete Account. Or email us.
- **Export**: In-app: Settings → Export Data
- **Opt-out of analytics**: Settings → Privacy → Disable analytics
- **EU residents (GDPR)**: All above + right to data portability, right to object
- **California residents (CCPA)**: All above + right to know what's collected

## Data retention
- Account data: kept until you delete account
- Backups: retained 30 days after account deletion
- Crash logs: 90 days

## Children
We do not knowingly collect data from children under 13 (or 16 in EU). If you believe a child has used our service, contact us.

## International data transfer
Your data may be stored in [Supabase region]. By using the service you consent to this transfer.

## Changes
We will notify you in-app if we materially change this policy.

## Contact
[your name / company]
[your email]
[your address]
```

## Tools to generate

| Tool | Free | Quality | Best for |
|---|---|---|---|
| Termly.io | Free tier | Good | Compliance-heavy apps |
| iubenda | $27/mo | Best | Apps with EU users |
| Privacy Policy Generator (free sites) | Free | Basic | MVP only |
| Custom (use template above) | Free | Best | You know your stack |

## Where to host

- Public URL on your marketing site (must be reachable, not behind login)
- Link in App Store Connect -> App Information -> Privacy Policy URL
- Link in App Settings -> About -> Privacy Policy

## Common rejections

- Privacy Policy URL returns 404 -> rejection
- Doesn't mention all SDKs you use -> rejection on next App Privacy review
- Says "we collect nothing" but you obviously do -> rejection
- Doesn't mention 5.1.2(i) AI providers -> rejection (Nov 2025+)

## Pair with
- `5-1-2-i-ai-disclosure` for AI provider naming
- `privacy-manifest-rn` for Apple's Privacy Manifest XML
- `account-deletion-flow` for the "delete my account" button
