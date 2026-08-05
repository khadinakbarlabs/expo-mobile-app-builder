---
name: "enroll-apple-developer"
description: "Plan Apple Developer Program enrollment for an individual or organization without exposing identity documents, payment details, signing files, or account credentials. Use when the user asks about Apple developer enrollment or D-U-N-S preparation."
---

# Enroll in the Apple Developer Program

Use this skill to prepare a safe enrollment plan. Enrollment, agreement acceptance, payment, identity verification, and role changes are external actions: explain the requirements, then wait for the intended account owner to confirm before taking any action.

## Choose the right enrollment path

| Path | Best for | Publisher display |
|---|---|---|
| Individual | A developer publishing under their legal personal name | Individual legal name |
| Organization | Apps owned by a verified legal entity | Organization legal name |

Use the legal owner of the app and the Apple ID controlled by that owner. Current fees, country eligibility, D-U-N-S needs, required documents, and verification timelines can change; verify them in Apple's current enrollment flow.

## Safe preparation checklist

- Confirm the legal owner, enrollment type, target country, and authorized signer.
- For an organization, confirm the legal entity is active and collect only the current verification materials Apple requests.
- Keep Apple ID recovery methods and two-factor authentication under the owner's control.
- Do not place identity documents, payment information, API keys, `.p8` files, provisioning profiles, certificates, or recovery codes in the repository, chat, or plugin.
- Decide least-privilege App Store Connect roles for team members after enrollment.

## Owner-confirmed enrollment flow

1. Open the official Apple Developer enrollment flow using the owner's Apple ID.
2. Choose Individual or Organization based on the verified legal owner.
3. Enter legal, contact, and payment information directly in Apple's interface.
4. Complete requested verification, respond through Apple's official channels, and wait for approval.
5. Review Apple Developer Program and Paid Apps agreements before accepting them. Each agreement is a separate owner decision.

## After approval

- Use EAS-managed credentials when appropriate, or store signing material only in approved owner-controlled secret storage.
- Create App Store Connect API keys with the narrowest practical role and rotate/revoke them on personnel changes.
- Treat creating an app record, building a binary, TestFlight upload, App Review submission, price changes, and publishing as separate confirmation gates.

## Common safety checks

- Never use another person's identity, payment card, address, or Apple ID to bypass eligibility checks.
- Do not email signing material or API keys; revoke and rotate a credential if it might have been exposed.
- If enrollment fails, use Apple's official remediation path rather than attempting duplicate accounts.

## Pair with

- `code-signing`
- `eas-submit-testflight`
- `pre-submission-audit`
