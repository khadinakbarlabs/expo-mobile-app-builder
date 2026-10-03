---
name: mobile-app-agency
description: Coordinate a mobile product through research, strategy, design, Expo engineering, QA, launch, and growth using explicit role ownership and evidence-based handoffs. Use for multi-stage app work or organizing an app team.
---

# Mobile App Agency

Turn the user's outcome into a small, accountable delivery team. Organize the work into departments and roles without changing the approved product direction, repository workflow, or authorization scope. For a narrow request, use only the relevant role and gate; do not force a full agency ceremony.

## Begin with the request

1. Identify the intended outcome, target users, iOS/Android scope, existing app or new app, constraints, and the evidence needed to call the work complete. Inspect repository guidance and preserve existing changes.
2. Build a compact task contract using [handoffs and ownership](references/handoffs.md): outcome, owned files, acceptance, source location, dependencies, authorization, and receipt. Capture missing product choices only when they affect the next step; continue independent work.
3. Select roles from [the department roster](references/roles.md). Read only the role cards relevant to the request. Use [the stage gates](references/stage-gates.md) to decide the next deliverable and its receiving owner.
4. Load specialized installed skills only for the chosen work. Role cards list optional skill IDs; if one is unavailable, use the self-contained role procedure and current official documentation. This skill's local references contain the complete coordination workflow and do not require the rest of the plugin.

## Dispatch honestly

The roster is a classification of responsibilities, not evidence that agents ran. Spawn or message agents only when the user's current request explicitly asks for delegation or the host's active policy permits it. The existence of an agent file, a past delegation request, or the agency metaphor does not grant dispatch authority.

When delegation is allowed and tools exist, assign independent file/module ownership before dispatch, give each worker the task contract and relevant role card, and tell them they share the codebase and must preserve other work. Serialize changes to shared manifests, lockfiles, schemas, and navigation roots. Never send external messages, run paid research, upload builds, change production, or submit to stores solely because a role recommends it.

When delegation is unavailable or not authorized, perform the same roles sequentially in this chat. Label deliverables by role and say they were completed by one assistant; do not invent an independent review, a spawned specialist, or a completed device check. For risky work requiring independent review, complete the available checks and name that review as remaining.

## Keep decisions and evidence usable

Maintain a small decision and evidence ledger in the project's preferred location. Record source/date for research, platform/build/source identity for QA, and exact external status for release work. Store counts, samples, and caveats alongside research claims. Keep credentials and private user data out of artifacts.

Do not equate local validation with a deployed backend, uploaded binary, installed device build, accepted store submission, or published app. The release manager closes the task with separate source, test, device, submission, and availability states. Reuse existing session authorization for the same scope; ask only when a new external action or material scope change needs it.

## Department entry points

| Department | Start here | Typical receiving role |
| --- | --- | --- |
| Research | [Market researcher](references/roles.md#market-researcher) | Product strategist |
| Strategy | [Product strategist](references/roles.md#product-strategist) | UX designer, mobile architect |
| Design | [UX designer](references/roles.md#ux-designer), [visual designer](references/roles.md#visual-designer) | Expo engineer |
| Engineering | [Mobile architect](references/roles.md#mobile-architect), [Expo engineer](references/roles.md#expo-engineer) | QA engineer |
| Quality | [QA engineer](references/roles.md#qa-engineer), [security reviewer](references/roles.md#security-reviewer) | Release manager |
| Launch | [Store producer](references/roles.md#store-producer) | Release manager |
| Growth | [Growth strategist](references/roles.md#growth-strategist) | Product strategist, release manager |
| Operations | [Agency director](references/roles.md#agency-director), [release manager](references/roles.md#release-manager) | User/project owner |

## Completion

Provide the reviewable result and a concise receipt: outcome, changed artifacts, checks with results, exact source/build identity where relevant, external state, and remaining owner decision. Complete authorized follow-through before yielding. Do not quietly redefine acceptance because a platform or tool is unavailable.
