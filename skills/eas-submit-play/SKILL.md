---
name: "eas-submit-play"
description: "Prepare a controlled AAB upload to Google Play Console via EAS Submit. Use when the user asks to submit an Android build to Play."
---

# EAS Submit to Play

Prepare an AAB upload to Play Console. The final upload and any promotion are owner-confirmed external actions.

## External action gate

Do not read, create, or upload a service-account key; run `eas submit`; or promote a track until the owner has confirmed the exact Play developer account, app, build, target track, release status, and upload action. A draft upload and a production release are separate decisions.

## Prerequisites

1. App created in Play Console (manual first upload required per Play policy)
2. Service Account JSON (see `set-up-play-app-signing` for setup)
3. `eas.json` configured

## Service Account setup

Google Play Console → Setup → API access:
1. "Choose existing Google Cloud project" OR create new
2. "Create new service account" → grant Play Developer roles
3. In Google Cloud Console → IAM → that account → Keys → Add Key → JSON
4. Download the key only to owner-controlled secret storage outside the repository
5. Configure its local path or CI secret reference without committing the file, its path, or its contents

Play Console → Setup → API access → grant the account permissions:
- "App access" → all
- "Releases" → manage production releases
- "Store presence" → manage

## `eas.json` submit section
```json
{
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "<path-outside-the-repository>",
        "track": "internal",
        "releaseStatus": "draft"
      }
    }
  }
}
```

`track` options: `internal`, `alpha`, `beta`, `production`.
`releaseStatus`: `draft` (review only), `inProgress` (start staged), `completed` (full release).

## Submit after confirmation
```bash
eas submit --platform android --profile production --latest
```

Confirm the resolved build ID before running this command; `--latest` can select a different build than expected.

## Common gotchas
- "Authentication failed" → service account JSON invalid OR API not enabled
- "App not found" → must do FIRST upload manually via Play Console web UI
- "Track not available" → app not yet promoted to that track (rollout from lower track first)
- "Already in review" → can't submit while previous version under review

## Track lifecycle
```
Internal (immediate) → Closed (alpha/beta) → Open (testing) → Production
```

Promote between tracks only after a separate owner confirmation of the target track and release status.

## Pair with
- `internal-testing-track`, `closed-testing-track`, `phased-release-play`
