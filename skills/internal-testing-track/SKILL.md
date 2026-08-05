---
name: "internal-testing-track"
description: "Use Play Console internal testing track for fast iteration with up to 100 testers. Use when the user says 'internal testing play', 'internal track', 'beta testing internal'."
---

# Internal Testing Track (Play)

Up to 100 testers, instant rollout (no review).

## External action gate

Creating a release, uploading an AAB, inviting testers, sharing an opt-in link, and promoting a track change real Play Console state. Prepare the steps locally, then obtain explicit owner confirmation of the Play account, app, build, tester group, track, and action before proceeding.

## Setup

Play Console → Testing → Internal testing → "Create new release":
1. Upload AAB
2. Save → Review release → Start rollout to internal testing
3. Get the opt-in URL (e.g., https://play.google.com/apps/internaltest?...)

## Add testers

Two options:
- **Email list** → manually add up to 100 email addresses
- **Google Group** → manage in Google Workspace (better for >10 testers)

## Tester opt-in flow

1. You share opt-in URL
2. Tester opens URL → accepts to join testing
3. Tester opens Play Store → installs app from there
4. Updates automatically as you ship new internal builds

## When to use

- Daily team builds
- Pre-closed-testing validation
- Smoke testing latest features

## Compared to other tracks

| Track | Max testers | Review | Speed |
|---|---|---|---|
| Internal | 100 | None | Immediate |
| Closed (alpha/beta) | Unlimited | Light review | Hours |
| Open testing | Unlimited | Full review | Days |
| Production | Unlimited | Full review | Days + staged rollout |

## EAS Submit to internal after confirmation

`eas.json`:
```json
{
  "submit": {
    "production": {
      "android": { "track": "internal" }
    }
  }
}
```

```bash
eas submit --platform android
```

## Promote internal → production after confirmation

Play Console → Internal testing → Promote release → Choose track (closed, open, or prod).

Don't promote stale builds — rebuild if internal is >7 days old.

## Common gotchas
- "Tester can't install" → forgot to add their email; check Google Group membership
- "Tester sees production version" → they're not opted in to test track
- "Build doesn't show" → click "Save" before "Review release"

## Pair with
- `closed-testing-track`, `phased-release-play`
- `eas-submit-play`
