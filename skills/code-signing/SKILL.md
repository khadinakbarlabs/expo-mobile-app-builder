---
name: "code-signing"
description: "Manage iOS code signing: ASC API key, Distribution Certificate, Provisioning Profiles via EAS managed credentials. Use when the user says 'code signing', 'provisioning profile', 'distribution certificate', 'ASC API key'."
---

# Code Signing

Indie default: **EAS managed credentials**. EAS handles cert + profile rotation. You never touch keychains.

## Credential and external action gate

Signing certificates, profiles, and App Store Connect keys are private credentials. Do not run `eas credentials`, create EAS secrets, download a `.p8`, generate signing material, or revoke a profile without the owner's explicit confirmation of the Apple account, bundle identifier, affected apps, and intended action. Store credentials outside the repository and never display their values.

## Initial setup
```bash
eas credentials
```

Choose iOS → Build credentials. EAS will:
1. Log into your Apple Developer account
2. Create Distribution Certificate
3. Create App ID (matching your bundle ID)
4. Create Provisioning Profile
5. Store everything in EAS-managed credentials

After that, `eas build` just works. Collaborators can build without ever touching ASC.

## ASC API Key (.p8) — owner-managed setup
1. App Store Connect → Users and Access → Integrations → +
2. Use the least-privilege role that supports the intended workflow
3. Download .p8 file (Apple gives ONE chance — lose it, regenerate)
4. Note Key ID + Issuer ID

After the owner has approved key creation and selected protected secret storage, configure the values through the approved EAS or CI secret mechanism. The following placeholders are illustrative; never paste real values into a repository, prompt, or log.

```bash
eas secret:create --scope project --name ASC_KEY_ID --value "<key-id>"
eas secret:create --scope project --name ASC_ISSUER_ID --value "<issuer-id>"
eas secret:create --scope project --name ASC_KEY_BASE64 --type file --value "<path-outside-repository/AuthKey.p8>"
```

## Manual signing (advanced)
Upload your own .p12 + .mobileprovision via `eas credentials`. Use when:
- Multiple apps share one cert
- You need a specific entitlement (App Groups, Push, custom)
- Org security policy forbids EAS holding Apple credentials

## Recovery from broken signing
```bash
# Review the impact with the owner before removing any profile.
eas credentials  # → Build credentials → Remove provisioning profile

# Then, after separate build approval, trigger an interactive build to regenerate.
eas build --platform ios --profile production
```

## Common errors
- "Provisioning Profile expired" in CI → EAS won't auto-regenerate non-interactively. Run `eas credentials` locally to remove + rebuild interactively, then re-trigger CI.
- "No profiles for X were found" with extension targets → set `ios.bundleIdentifier` per-target via config plugin, then `eas credentials` to generate per-target profiles.
- "Cached profile without App Groups" → `eas build --clear-cache` + remove cached profile via `eas credentials`.

## Certificate rotation
Distribution certs last 1 year. Provisioning profiles last 1 year. EAS auto-regenerates interactively. For CI, run `eas credentials` proactively a month before expiry.

## Reference
`../../docs/references/02-eas-pipeline.md`
