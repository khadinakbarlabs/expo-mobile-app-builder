---
name: "design-onboarding-quiz"
description: "Design or audit activation-first mobile onboarding that reaches a meaningful result quickly. Use for onboarding flows, first-run experience, personalization quizzes, activation mapping, permission sequencing, or onboarding conversion work."
---

# Design activation-first onboarding

Treat onboarding as the shortest trustworthy path from first launch to a meaningful product result. A quiz is optional. Use the fewest screens and questions the product actually needs.

## Start with the activation contract

Before drawing screens, define:

```yaml
target_user: "Who is arriving, and in what situation?"
desired_outcome: "What progress are they hiring the app to make?"
activation_event: "What observable user action demonstrates value?"
meaningful_result: "What useful output or changed state exists at the end?"
time_to_value_target: "How quickly should a new user reach it?"
required_inputs: []
required_permissions: []
required_account_or_payment: false
```

Do not use account creation, onboarding completion, or paywall views as the activation event unless one of those actions is the product's actual value. Prefer events such as completing a first workout, generating a useful plan, saving a first project, or hearing a first personalized session.

## Design the shortest value path

1. **Promise relevant value.** State the immediate outcome in specific language. Let users continue with one obvious action.
2. **Show value before effort.** Demonstrate the experience, provide a useful preview, or start the core task before requesting optional profile data, notification access, tracking access, an account, or payment.
3. **Ask only consequential questions.** Every answer must alter content, defaults, recommendations, navigation, or the final result. Delete questions whose answers are merely collected.
4. **Keep one primary action per screen.** Make the question, reason, response options, and next action instantly understandable. Keep Back and Skip predictable where the input is optional.
5. **Make progress feel responsive.** Use selection feedback, short transitions, purposeful motion, and subtle haptics when supported. Never add fake processing time. Respect reduced-motion, screen-reader, text-scaling, and haptics settings.
6. **Apply answers visibly.** Tell the user what changed because of their choices. Avoid cosmetic personalization that only repeats their name or answer.
7. **End with a meaningful result.** Show the created plan, configured workspace, first recommendation, projected path, or ready-to-start core action. Give one clear next step into the product.

Read [the activation-first reference](references/activation-first-onboarding.md) for the source principles, decision rules, screen specification, and measurement model. If onboarding includes a subscription, also read [mobile monetization and purchase safety](references/03-monetization.md).

## Use a question-utility ledger

For every proposed question, fill this table before keeping it:

| Question | Why it is needed now | Product change caused by answer | Optional? | Data sensitivity | Retention |
| --- | --- | --- | --- | --- | --- |
| Example: preferred session length | Selects a safe default duration | Player and plan default to the chosen duration | Yes | Low | Local profile |

Remove or defer a question when the product cannot name a visible consequence. Collect sensitive data only when necessary, disclose why, minimize retention, and use an appropriate secure boundary.

## Sequence gates at the moment of need

- Request notification, microphone, camera, health, tracking, or location permission immediately before the feature that needs it. Explain the user benefit before the system dialog.
- Require an account early only when identity is necessary for the first result, such as cross-device data or protected remote work.
- Place a paywall where the user understands the paid value. That may be before an expensive operation or after a useful preview; it is not automatically the last onboarding screen.
- Provide truthful trial, billing, restore, cancellation, close, and free-path behavior. Do not use fake social proof, fabricated scarcity, misleading progress, confirmshaming, or surprise discounts.

## Produce these artifacts

Return:

1. The activation contract and assumptions.
2. A shortest-path flow plus optional branches.
3. A screen table with purpose, one primary action, input, visible output, Back/Skip behavior, and accessibility notes.
4. The question-utility ledger and answer-to-experience mapping.
5. Permission, account, and monetization timing with rationale.
6. A typed state model covering fresh, partial, completed, resumed, and reset onboarding.
7. An analytics plan that measures progress without collecting answer text or sensitive personal data by default.
8. A test matrix for iOS and Android.
9. One falsifiable experiment with a guardrail metric.

## Measure the journey

Use a compact, stable event vocabulary adapted to the app's existing analytics provider:

```text
onboarding_started
onboarding_step_viewed {step_id, step_index}
onboarding_step_completed {step_id, step_index}
onboarding_step_skipped {step_id, step_index}
permission_pre_prompt_viewed {permission}
permission_result {permission, result}
meaningful_result_viewed {result_type}
activation_completed {activation_type, elapsed_ms}
onboarding_abandoned {last_step_id}
```

Never send free-form answers, health details, or other sensitive values as analytics properties by default. Measure median time to activation, step-to-step completion, meaningful-result reach, next-action completion, day-one return, and permission denial. A higher onboarding-completion rate is not a win if activation or trust declines.

## Quality gate

Reject or revise the flow when any of these are true:

- the activation moment is vague or unobservable;
- a required step does not help create or safely deliver the meaningful result;
- an answer does not change the experience;
- a screen presents competing primary actions;
- a system permission appears without benefit context;
- motion delays progress or ignores reduced-motion;
- proof, progress, scarcity, or personalization is fabricated;
- the final screen says only "You're all set" or lands on an empty state;
- Back, Skip, resume, reset, offline, small-screen, keyboard, screen-reader, or Android system-back behavior is undefined;
- the plan assumes one universal number of onboarding screens or makes an unsupported conversion promise.

## Implementation boundary

Before writing Expo code, read the exact Expo SDK documentation for the project's installed version. Reuse the app's navigation, state, analytics, design tokens, and test stack. Add a dependency only when the product behavior cannot be implemented clearly with the existing stack. Write focused tests before changing the flow, then verify the activation path on both iOS and Android.
