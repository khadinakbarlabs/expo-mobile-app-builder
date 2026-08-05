---
name: "enroll-google-play-developer"
description: "Plan Google Play Console enrollment for an individual or organization without exposing identity documents, payment details, or account credentials. Use when the user asks about Play developer enrollment or account setup."
---

# Enroll in Google Play Console

Use this skill to prepare a safe enrollment plan. Account creation, identity checks, payment, acceptance of terms, and changing Play Console access are external actions: explain the required steps first and act only after the account owner explicitly confirms the exact target account.

## Choose the right account type

| Type | Best for | Typical evidence |
|---|---|---|
| Personal | A solo developer publishing under their own legal name | Government ID and contact verification |
| Organization | Apps owned and published by a legal entity | Legal entity details, authorized representative, and any current verification documents requested by Google |

Use the legal owner of the app, not an agent's identity or a placeholder. Eligibility, country availability, verification requirements, fees, and testing thresholds change, so check the current Google Play Console instructions before beginning.

## Safe preparation checklist

- Confirm the publisher's legal name, target country, account type, and who is authorized to accept terms.
- Prepare only the documents requested in the official flow; do not copy identity documents, tax forms, payment details, or recovery codes into source control, chat, or the plugin.
- Use a verified business domain and support contact when the publisher is an organization.
- Decide the minimum people who need Console access and assign least-privilege roles after approval.
- Plan Play App Signing before the first production upload; keep upload keys in managed credential storage or another owner-controlled secret store.

## Owner-confirmed enrollment flow

1. Open the current Google Play Console enrollment page while signed in as the intended owner.
2. Select the verified account type and review the current fee, agreements, and policies.
3. Enter legal and contact information directly into Google Play Console. Do not provide it to a coding agent.
4. Complete only the requested verification steps and wait for Google's decision.
5. After approval, configure least-privilege access and create the app record only when the owner confirms that next action.

## After approval

- Review the current Play App Signing setup before uploading any AAB.
- Use a separate, least-privileged service account for automated submissions. Keep its JSON key outside the repository and out of `eas.json`; use owner-controlled secret storage or a protected CI secret instead.
- Treat first upload, test-track promotion, production rollout, price changes, and publishing as separate confirmations.

## Common safety checks

- Never use another person's identity, payment card, address, tax information, or a VPN to bypass eligibility checks.
- Do not share recovery codes, service-account JSON, keystores, or access tokens with contributors.
- If verification is rejected, follow the official remediation request instead of opening a replacement account.

## Pair with

- `code-signing-android`
- `eas-submit-play`
- `data-safety-form`
