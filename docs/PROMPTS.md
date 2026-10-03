# Mobile App Builder prompt kit

Use the shortest prompt that gives the agent enough context to make a sound decision. State the operating mode, the user outcome, the repository or product context, constraints, and the proof you expect. Do not paste keys, certificates, tokens, customer data, or signing files.

## Universal brief

```text
Use Mobile App Builder for this Expo project.

Mode: [plan only / inspect and recommend / implement / debug / release preparation]
Outcome: [the user-visible result]
Audience: [who this is for]
Platforms: iOS and Android
Context: [repository state, existing architecture, or product constraints]
Non-goals: [what must not change]
Proof required: [tests, simulator checks, screenshots, or a release checklist]

Inspect before changing files. Reuse the existing architecture where it is sound.
Cover loading, empty, error, offline, accessibility, and parity where relevant.
Keep secrets out of prompts and source. Stop before builds, uploads, store submissions,
publication, pricing, or paid actions unless I give explicit approval for that exact target.
```

## Choose a workflow

### Turn an idea into a viable MVP

```text
Use Mobile App Builder in plan-only mode.

Idea: [idea]
Audience and situation: [who needs it, and when]
Desired change: [the job or outcome]
Constraints: [budget, deadline, offline, compliance, integrations]

Challenge the scope. Return the smallest useful release, a single activation event,
core journey, screen map, data boundary, non-goals, biggest risks, and a 3-phase
implementation plan. Make separate iOS and Android notes. Do not create files,
accounts, builds, or provider resources.
```

### Start a new Expo implementation

```text
Build the first complete vertical slice for [product] using Expo SDK 54 and TypeScript.

The first user result is: [result]
Must-have screens: [screens]
Existing decisions: [navigation, backend, design system, or none]
Non-goals: [excluded features]

Inspect the repository first. Propose the smallest architecture that can support the
first journey, then implement it with loading, empty, error, offline, and accessible
states. Use Expo-compatible dependencies. Run focused checks and report iOS and Android
evidence separately. Do not prebuild, start EAS, or create provider resources.
```

### Audit an existing mobile app before changing it

```text
Audit this Expo repository in read-only mode for [release readiness / onboarding /
performance / conversion / architecture].

Priorities: [what must work]
Known symptoms: [if any]
Target users and platforms: [audience, iOS, Android]

Map routing, state, data, auth, native configuration, permissions, tests, analytics,
and release configuration. Rank findings by user impact and release risk. For every
finding, give evidence, affected files, a smallest safe fix, and the validation needed.
Do not make edits until I choose a scope.
```

### Diagnose a build or runtime failure

```text
Debug this Expo iOS/Android issue.

Observed symptom: [exact symptom]
Where it happens: [device, simulator, emulator, CI, or command]
Relevant output: [redacted error excerpt]
Last known good state: [if known]
What changed: [if known]

Reproduce or establish the highest-confidence hypothesis first. Inspect the existing
configuration before changing it. State the root cause, the smallest fix, regressions to
check, and whether iOS and Android are independently verified. Never ask me to paste
credentials or signing material.
```

### Make one journey offline-first

```text
Make [journey] reliable when connectivity is absent or unstable.

Current data source: [API, Supabase, local state, unknown]
Local persistence available: [existing library or none]
Conflict rule: [last-write-wins, user choice, merge, unknown]

Inspect the current data layer. Define the local source of truth, optimistic update
rules, queue/retry behavior, conflict strategy, stale-data UI, and recovery path. Then
implement the smallest usable slice and verify restart, offline, failed request, and
reconnection behavior on both platforms where available.
```

### Improve activation and monetization without dark patterns

```text
Improve the path from first open to [activation event] for [audience].

Current journey: [steps]
Business model: [free, subscription, one-time, undecided]
Evidence available: [analytics, interviews, reviews, none]
Guardrails: clear pricing, restore access, cancellation visibility, no fabricated proof.

Inspect the current flow and identify the narrowest high-impact experiment. Design the
screen states, copy, event definitions, and evaluation metric. Keep iOS and Android
purchase/disclosure requirements explicit. Do not change prices, products, or provider
settings without separate approval.
```

### Prepare a store-ready release, without submitting it

```text
Prepare this Expo app for a human-reviewed iOS and Android release.

App name: [name]
Target version: [version]
Capabilities and permissions: [list]
Data collected: [list or unknown]
Release target: [TestFlight, internal testing, production]

Audit versioning, identifiers, icons, splash screens, permissions, privacy disclosures,
store metadata, build profiles, test coverage, and device evidence. Return a release
checklist with pass/fail/unknown status and the remaining owner-only account actions.
Do not run EAS, upload artifacts, or submit to either store.
```

## Prompt quality checks

- Use a concrete outcome, not a technology request alone.
- Ask for a smallest vertical slice before a full app build.
- Name the operating mode so an audit does not become an implementation.
- Request evidence separately for iOS and Android.
- Include non-goals and external-action boundaries.
- Replace secrets with the secret name, owner, and approved storage location.
