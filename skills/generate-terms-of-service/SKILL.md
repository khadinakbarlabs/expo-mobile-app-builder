---
name: "generate-terms-of-service"
description: "Generate a Terms of Service for an iOS app. Use when the user says 'terms of service', 'tos generate', 'eula', 'terms and conditions', 'app legal terms'."
---

# Generate Terms of Service

Required for App Store submission via "EULA" link. App Store Connect requires either Apple's standard EULA OR a custom one you provide.

## Apple's Standard EULA

Default. You don't need to write anything if Apple's EULA is enough for you.

Pros:
- Already approved by Apple
- Zero work
- Safe

Cons:
- Can't add custom terms (e.g., user-generated content rules, anti-abuse)
- Hard to enforce custom dispute resolution
- No ability to limit liability beyond Apple's defaults

## Custom EULA

Required if:
- You let users post content (UGC) — need takedown rules
- You have B2B / enterprise customers needing custom terms
- You operate in a regulated space (finance, health)
- You want arbitration clause / class action waiver
- You want jurisdiction = USA (vs Apple's default = where user lives)

## Custom EULA template

```markdown
# Terms of Service

Last updated: [Date]

These Terms ("Terms") govern your use of [App Name] ("App") provided by [Company legal name] ("we", "us"). By using the App you agree to these Terms.

## 1. License
We grant you a limited, non-exclusive, non-transferable license to use the App on Apple-branded devices you own or control, in accordance with Apple's App Store Terms of Service.

## 2. Account
You may need an account to use some features. You're responsible for keeping login credentials safe and for activity on your account.

## 3. Acceptable use
You agree NOT to:
- Reverse-engineer or decompile the App
- Use the App for illegal activity
- Upload content that infringes rights of others
- Attempt to gain unauthorized access to other accounts or our systems
- Use automated tools to interact with the App at scale (scraping, bots)

## 4. User-generated content (if applicable)
If the App lets you post content:
- You retain ownership of your content
- You grant us a license to host and display it for the purpose of operating the App
- We may remove content that violates these Terms
- You're responsible for the content you post

## 5. Subscriptions
If the App offers subscriptions:
- Billing is handled by Apple
- Subscriptions auto-renew; manage in iPhone Settings > Apple ID > Subscriptions
- Refunds: contact Apple via reportaproblem.apple.com (we cannot refund directly)
- Free trials convert to paid unless canceled 24h before end

## 6. Intellectual property
The App, its design, code, and content are owned by us or licensed to us. Don't use our trademarks without permission.

## 7. Privacy
See our Privacy Policy at [URL].

## 8. Disclaimer
THE APP IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. We don't guarantee the App will be error-free, secure, or always available.

## 9. Limitation of liability
To the maximum extent permitted by law, our total liability for any claim is limited to the amount you paid us in the 12 months before the claim. We are not liable for indirect, incidental, or consequential damages.

## 10. Termination
We may suspend or terminate your access if you violate these Terms. You may stop using the App at any time and may delete your account in-app.

## 11. Changes
We may update these Terms. Material changes will be announced in-app or by email.

## 12. Governing law
These Terms are governed by the laws of [Jurisdiction], without regard to conflict of laws principles.

## 13. Dispute resolution
Any dispute-resolution clause must name the applicable forum and comply with the laws that apply to [Company legal name] and its users. Have qualified counsel review this section before publication.

## 14. EU users
EU residents have additional rights under the EU's Digital Services Act and consumer protection laws. Nothing in these Terms reduces those rights.

## 15. Apple as third-party beneficiary
Apple has the right (and is deemed to have accepted that right) to enforce these Terms against you as a third-party beneficiary.

## 16. Contact
[Email] [Address]
```

## Apple-specific clauses required

- Mention Apple as third-party beneficiary (clause 15 above)
- Say subscriptions are billed by Apple
- Direct refund requests to Apple
- Mention Apple-branded device limitation

## Where to publish

- Hosted on your marketing site (e.g., yourapp.com/terms)
- Linked in App Store Connect -> App Information -> EULA (paste content OR link)
- Linked in App Settings -> About -> Terms

## When you'll need a lawyer

DIY templates work for MVP / first $100k revenue. After that, get a real lawyer for:
- B2B contracts
- Enterprise customers
- Funded company (LLC -> Delaware C-corp)
- Acquisition exits
- Trademark + IP disputes

Lawyer types: tech startup attorneys (Wilson Sonsini, Cooley, smaller indie startup-focused). Budget $1-3k for proper TOS + Privacy Policy review.

## Pair with
- `generate-privacy-policy` (companion document)
- `paywall-compliance` for subscription terms
- `account-deletion-flow` for required deletion flow
