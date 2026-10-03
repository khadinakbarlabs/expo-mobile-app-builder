# Practical stage gates

Apply only gates needed by the current request. Small bug fixes may enter at engineering; asset-only work may enter at launch. These gates identify evidence and the next owner, not mandatory meetings or automatic approval prompts.

| Gate | Producer → receiver | Reviewable deliverable | Pass evidence |
| --- | --- | --- | --- |
| Research → decision | Market researcher → product strategist | Competitor matrix, user problems, inspiration inventory, source ledger | Each material claim has dated evidence or an inference label; platform/locale and sample limits are explicit; retrieval and paid-run authority recorded |
| Strategy → design/build | Product strategist → UX designer + mobile architect | One-page product brief, primary journey, prioritized scope, acceptance criteria | User outcome, exclusion, first useful moment, and monetization assumption are clear; unresolved decisions have an owner |
| UX → visual design | UX designer → visual designer | Screen/flow map, content model, state inventory, accessibility requirements | Primary journey works in a walkthrough; loading/empty/error/offline/resume, denied permissions, and platform differences are specified where relevant |
| Design → engineering | Visual designer + mobile architect → Expo engineer | Implementable tokens, screen specifications, architecture plan | Typography/contrast/tap targets and adaptive layout reviewed; asset rights/source tracked; SDK/native/dependency constraints checked against versioned official docs; files have owners |
| Implementation → quality | Expo engineer → QA engineer + security reviewer | Focused diff, behavior tests, run/build instructions | Static checks and relevant behavior checks pass, or concrete failures are disclosed; source identity and dirty scope known; no unsupported native parity claims |
| Quality → candidate | QA engineer + security reviewer → release manager | Test matrix, reproductions, severity-ranked findings, security verdict | Changed critical journey and failure paths observed on required platforms; material findings fixed/retested or explicitly accepted by an authorized owner; missing device evidence stays missing |
| Store package → submission-ready | Store producer → release manager | Metadata, screenshot set, privacy/data disclosures, review notes | Assets match real current UI; localized exports and store limits checked live; disclosures reflect SDK/server behavior; submission inputs and account gates known |
| Candidate → external release | Release manager → user/project owner | Candidate receipt, rollout/rollback plan, exact external action | Source/build identity and release checks established; authority for upload/submission/publication exists before acting; actual external status read back afterward |
| Growth → product learning | Growth strategist → product strategist | Measured experiment, event contract, cost cap, readout criteria | Baseline and metric denominator defined; claims truthful; activation/spend authority available when needed; no fabricated attribution or ROI |

## Risk-based acceptance examples

- Auth change: test signed-out, signed-in, expired credentials, and cross-user access; server authorization must hold without the client UI.
- Paywall change: test guest preview, entitlement, restore, cancellation, and failure paths according to the approved product contract. A mocked purchase is not provider or store proof.
- Navigation/layout change: test smallest supported viewport, keyboard, screen reader order, back behavior, and relevant deep link/resume state.
- New native capability: verify SDK support and Expo Go/development-build requirements before promising a preview; test permission refusal and both supported platforms.
- Screenshot change: capture the intended current build, verify content and locale, export dimensions, and inspect legibility at listing size. Mockups should be labeled as concepts when shown before implementation.
- Research change: a successful Actor run needs the exact run and output inspection; an empty dataset or a process exit code alone cannot establish a competitor finding.

## Handling blocked gates

State the missing evidence and owner action precisely. Prepare everything that can be completed locally. Do not publish an unverified outcome, fabricate an independent reviewer, or keep repeating unchanged status. Resume from the blocked gate when the prerequisite arrives.
