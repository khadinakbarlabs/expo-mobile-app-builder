# Mobile research protocol

## Classify the request

| Desk / collection task | Question | Useful evidence | Caveat |
| --- | --- | --- | --- |
| App Store reviews | What makes iOS users leave or subscribe? | Review permalink/ID, locale, date, version, rating, problem label | Star averages and selected reviews do not prove causation |
| Play reviews | Which Android/device issues recur? | Review ID, market, date, version/device when actually provided | Actor may not expose device or full review history |
| Reddit/community | What language describes unmet needs? | Permalink, community, date, thread context, intent/theme | Community selection and self-report bias |
| Ad libraries | Which angles and formats are active? | Ad ID, source URL, observed dates, market, creative type | Active ad is not proof of profitable performance |
| Public web | How do alternatives position themselves? | URL, fetched date, pricing date, public product claims | Verify volatile claims on primary pages |
| Design inspiration | How do relevant flows organize decisions? | Licensed/public reference URL, flow, platform, observation | Learn a pattern; copying assets requires permission |

## Collection and quality contract

Before a run specify geography, language, source eligibility, collection window, maximum items, pagination policy, estimated cost, consent/rights, and expiry. Verify Actor reliability and output fields with a small authorized sample. A broad query can create unbounded spend or a dataset unrelated to the brief.

Deduplicate using source-native IDs when present. Otherwise use normalized canonical URL plus source/date and a content hash. Strip tracking parameters only when their removal preserves identity. Retain duplicate count and exclude crossposted/repeated text from independent evidence counts. Preserve the original local record and mapping to the normalized record.

Record fields as `observed`, `missing`, or `inferred`; do not synthesize absent dates, demographics, locations, device details, reach, or conversion. Do not treat review frequency as prevalence among all users. Label sample selection, market/time gaps, deleted sources, pagination truncation, language imbalance, and retrieval failures.

## Synthesis rubric

- Observation: describe exactly what the records support with count and denominator.
- Counterevidence: show a contrasting example or explain the search for one.
- Interpretation: propose an explanation and its confidence, keeping it separate from quotes.
- Decision: recommend a test or design constraint with an owner and measurable outcome.
- Provenance: link every major claim to a dated source record and run/dataset pointer in local evidence.

An ad swipe file records hook, problem, promise, format, visual device, offer, CTA, landing-page continuity, and claim risk. Do not collect or invent private campaign metrics. A design reference records task sequence, hierarchy, navigation, accessibility, and failure states; screenshots alone do not prove actual interaction behavior.

## Source pointers

Checked 2026-10-03: [Actor runs/builds](https://docs.apify.com/actors/running/runs-and-builds), [usage/resources](https://docs.apify.com/actors/running/usage-and-resources), and [CLI reference](https://docs.apify.com/cli/docs/reference). Recheck prices, schemas, data access, and limits on each collection date.

## Expanded intelligence routes

- Store: Apple and Google Play listings, reviews, chart/search snapshots; keep country and store separate.
- Creators: Instagram niche discovery, TikTok user search and YouTube search feed a known-creator shortlist; cross-platform profile analysis is not keyword discovery.
- Ads: TikTok commercial library, Meta ad library and Google transparency; visibility/persistence cannot establish private ROAS or spend.
- SEO: web SERPs, provider keyword estimates and bounded authorized technical crawls; live indexing requires owner property evidence.

Consult the public `actor-catalog.json` beside this reference, then re-inspect the selected live Actor. Catalog schema summaries are discovery hints, not full validation schemas or runtime proof.
