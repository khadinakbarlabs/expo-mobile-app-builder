---
name: "data-safety-form"
description: "Complete Google Play Data Safety form correctly to avoid rejection or misrepresentation flags. Use when the user says 'data safety form', 'play data safety', 'declare data collection android'."
---

# Data Safety Form (Play)

Required for every Play submission. Tightened April 2025 — runtime traffic now audited against declarations.

## The form sections

### 1. Data collection
For each data type, declare:
- Collected? Yes/No
- Optional or required for app function?
- Linked to user identity?
- Used for tracking?

### 2. Data types Apple cares about (mirror)

- Personal info (name, email, address)
- Financial info
- Health & fitness
- Photos & videos
- Audio files
- Messages
- Contacts
- Calendar
- Location (precise/approximate)
- App activity
- Web browsing
- App info & performance
- Device & other IDs

### 3. Third-party SDK declarations
Each SDK gets disclosed:

| SDK | Data sent | Disclose |
|---|---|---|
| RevenueCat | Anonymous user ID, purchase events | App info & performance |
| Sentry | Crash logs, device info | Crashes |
| PostHog | Usage events, anonymized | App activity |
| Supabase | All account data | Per data type stored |
| OpenAI/Anthropic | User prompts | App activity, optionally personal |
| Firebase Crashlytics | Crashes, device info | Crashes |
| Google Sign-In | Identity tokens | Personal info |

### 4. Sharing (broadened April 2025)

"Sharing" now includes:
- Forwarding to your own backend (if it's then sent elsewhere)
- Used by ML model that lives elsewhere
- Sent for advertising (rare for indie)

Disclose ALL sharing — Play scans runtime to detect undeclared.

### 5. Security practices

- Encryption in transit (HTTPS): yes
- Encryption at rest: yes
- Account deletion: in-app
- Auditable security: based on industry standards

## Common rejection patterns

- "App actively collects [X] but didn't declare it" → Play scanner detected unrequested data type
- "SDK [X] requires declaration of [Y]" → Play knows that SDK collects data you didn't declare
- "Account deletion declared but not in-app" → check `account-deletion-flow-android`
- "Data shared with [country] not disclosed" → server location matters

## Audit yourself before submission

1. List every SDK in package.json
2. For each, check its Data Safety entry in Play's "SDK Index" (Play Console search)
3. Cross-check: does your form match what those SDKs collect?

## Tools
Play Console SDK Index: developer.android.com/google/play/sdk-console — shows what each SDK collects.

## Pair with
- `play-ai-disclosure` for AI-specific
- `generate-privacy-policy-android` for the human-readable version
