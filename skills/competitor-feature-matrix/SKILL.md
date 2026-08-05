---
name: "competitor-feature-matrix"
description: "Build a feature comparison matrix across multiple competitors to find your wedge and feature gaps. Use when the user says 'feature matrix', 'feature comparison', 'compare competitors', 'feature gap analysis', 'positioning grid'."
---

# Competitor Feature Matrix

A grid showing every feature × every competitor. Reveals your wedge fast.

## When to build it
- Pre-MVP scoping (find the smallest set of features that competes)
- Mid-build (when adding a new feature, see if competitors have it)
- Pre-launch (verify your differentiation slot is real)

## How to build it

### Step 1: List features
Brainstorm 30-50 candidate features for the category. Be inclusive — include nice-to-haves and edge cases.

Categories of features to include:
- Core functionality
- Onboarding patterns
- Monetization options
- Personalization
- Sharing / social
- Notifications / engagement
- Data export / portability
- Accessibility
- Offline support
- Sync / multi-device
- Privacy / data control
- Apple ecosystem (Watch, Widgets, Siri, Live Activities, etc.)

### Step 2: Pick competitors
5-10 direct competitors. Get them from `find-niche` or App Store category browse.

### Step 3: Score the matrix

For each (feature, competitor) cell:
- ✅ Has it (and works well)
- 🟡 Has it (but broken / hidden / paywalled)
- ❌ Missing
- ⚠️ Has anti-version (e.g., they ban what you'd allow)

### Step 4: Find the gaps

- **All ❌**: nobody offers this. Either nobody wants it (likely) OR you've found a wedge.
- **All ✅**: table stakes, you must have it
- **Mostly 🟡**: feature exists but is broken everywhere. Easy wedge if you do it well.
- **Most have, you don't**: must-add to your scope
- **You alone have**: your differentiation. Lead with this in marketing.

## Output format

CSV or Markdown table:

```markdown
| Feature | You | CompA | CompB | CompC | CompD | CompE | Gap? |
|---|---|---|---|---|---|---|---|
| Apple Watch app | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | Wedge - 1/5 has |
| Widgets | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | Universal gap! |
| Siri Shortcuts | ❌ | ❌ | 🟡 | ❌ | ❌ | ❌ | Gap |
| Family Sharing | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | 2/5 has |
| Live Activities | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | Wedge |
| Web export | ✅ | ❌ | ❌ | 🟡 | ❌ | ❌ | DIFFERENTIATION |
| Quiz onboarding | 🟡 | ✅ | ✅ | ✅ | ✅ | ❌ | Must add |
| Trial timeline | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | Must add |
| Apple Sign In | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | Win |
| Restore visible | ✅ | 🟡 | 🟡 | ✅ | ❌ | ❌ | Win |
| Affiliate program | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | Wedge |
```

## How to act on it

1. **Sort by "Gap?"** — universal gaps are interesting (either bad market or wedge)
2. **For each must-add: add to MVP scope or punt to v1.1**
3. **For each wedge: validate with 5 user interviews** — gap might be intentional
4. **For each differentiation: lead with it in App Store screenshots #1-2**

## Storage
Save as `research/feature-matrix.md` — update each time you do new competitor research.

## Pair with
- `find-niche` to discover the competitors first
- `position-pitch` to frame your wedge into a one-liner
- `aso-keywords` to map differentiating features to App Store keywords
