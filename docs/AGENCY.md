# Mobile App Agency

The agency organizes the builder's capabilities into eight departments with twelve accountable roles. It adds ownership and handoffs to the existing skill library; the original 179 skills remain available. Use one role for a narrow task or coordinate a full product journey with `mobile-app-agency`.

## Package tree

```text
agents/                              Native role definitions; no fixed model/tool overrides
  agency-director.md
  market-researcher.md
  product-strategist.md
  ux-designer.md
  visual-designer.md
  mobile-architect.md
  expo-engineer.md
  qa-engineer.md
  security-reviewer.md
  store-producer.md
  growth-strategist.md
  release-manager.md
agency/
  taxonomy.json                      Department/subcategory/role definitions
  catalog.json                       Categorized skills and platform metadata
skills/
  mobile-app-agency/
    SKILL.md                         Coordination entry point
    agents/openai.yaml               Codex skill discovery metadata
    references/
      roles.md                       All portable role cards
      handoffs.md                    Task contract, ownership, permissions, receipt
      stage-gates.md                 Practical acceptance and receiving owners
  engineering-workflow-guard/        Repo policy, source provenance, verification
  apify-mobile-research/             Actor/CLI research workflow
  mobile-design-references/          UX principles, inspiration, platform references
  mobile-store-asset-production/     Metadata, screenshot production, export QA
  ...                                Existing specialized skill library
```

The taxonomy is an organization of resources, not a Git checkout layout. Calling it a “worktree of skills and agents” does not create or authorize Git worktrees. Follow the user's repository policy: use the required checkout/branch, preserve dirty changes, give concurrent workers disjoint file ownership, and serialize changes to shared files. If Git isolation is allowed and useful, choose it deliberately.

## Departments and owners

| Department ID | Roles | Owned outcome |
| --- | --- | --- |
| `research` | `market-researcher` | Dated competitor, review, ad, market, and inspiration evidence |
| `strategy` | `product-strategist` | Product brief, primary journey, scope, acceptance, measurement |
| `design` | `ux-designer`, `visual-designer` | Interaction flows, states, accessibility, visual system, implementable specs |
| `engineering` | `mobile-architect`, `expo-engineer` | Compatible architecture, focused implementation, behavior evidence |
| `quality` | `qa-engineer`, `security-reviewer` | Observed interaction QA, regression checks, trust-boundary review |
| `launch` | `store-producer` | Accurate metadata, screenshot sets, localization, disclosure drafts |
| `growth` | `growth-strategist` | Measurable acquisition/retention experiments and readouts |
| `operations` | `agency-director`, `release-manager` | File ownership, dependency coordination, evidence and external-state closure |

Native agents can be discovered by a host that supports the plugin's agent format. Codex's `agents/openai.yaml` is skill UI metadata, not a promise of native subagent execution. The standalone `mobile-app-agency` skill carries every role card locally so the same workflow works when only that skill is installed.

## How a project moves

1. The director turns the request into an outcome contract with actual owner, source location, owned files, acceptance, dependencies, and authorization.
2. Research produces dated evidence and sample limits. Strategy uses that evidence to define the first useful journey and measurable scope.
3. UX supplies flows and success/failure states. Visual design supplies tokens and assets. Architecture checks SDK/native constraints and defines file-level implementation order.
4. Engineering implements owned modules and records verification. QA observes the intended build on required platforms; security reviews relevant trust boundaries. Defects return to their owner with reproducible steps.
5. Store production prepares accurate local assets and submission inputs. Release management reconciles source, tests, device evidence, upload, review, and availability separately, then completes authorized external actions.
6. Growth uses real measurement to propose the next product experiment and returns findings to strategy.

These are entry/exit gates, not a fixed full-project ceremony. A bug fix can begin with engineering and quality; a listing refresh can begin with store production. Each handoff points to a concrete artifact and reproducible evidence. See [stage gates](../skills/mobile-app-agency/references/stage-gates.md) and [ownership contracts](../skills/mobile-app-agency/references/handoffs.md).

## Parallel and sequential operation

Dispatch agents only when the current user request explicitly asks for delegation or active host policy permits it. Check that dispatch tools actually exist. Give each worker its role card, owned files, acceptance, dependencies, and the instruction that other writers are present and their edits must be preserved. One writer owns a file at a time; manifest, lockfile, schema, and navigation-root edits are serialized.

Without authorized dispatch, perform the same roles sequentially in the current chat and identify that mode truthfully. A named role is not an independent review. If independent review or a physical device is required and unavailable, report the exact missing evidence while finishing authorized local preparation.

## Research and resource handling

Apify research begins with the decision question, current Actor input/output schema, bounded sample, and budget. CLI availability and Actor discovery do not prove a completed research run. Before billable execution, check existing authority for that cost and scope; afterward inspect exact run status and records before claiming findings. Keep credentials in approved environment/configuration channels and out of artifacts.

Use design references as decision aids with source/date and applicability. Distinguish mobile interaction guidance, visual inspiration, and Azure cloud/architecture principles; do not invent a single Azure mobile UX standard. Preserve attribution and asset rights. Store screenshots should show the real intended build; concept art is labeled as such.

## Permission and completion

Session authorization persists across roles and handoffs. A director or release manager should not ask again for an action already authorized in the same scope. Prepare concrete reviewable results before requesting a missing external approval. Research plans do not authorize spend; asset production does not authorize uploads; build readiness does not authorize store submission or availability changes.

A completion receipt gives the result, changed artifacts, checks, source/build/device identity, exact external state, and any remaining owner action. A local pass, a simulator install, an upload, store review, and public availability each need their own evidence.
