---
name: "mine-reddit-pain-points"
description: "Mine Reddit for users complaining about competitor apps or describing unmet needs in your category. Use when the user says 'reddit research', 'find user pain', 'mine reddit', 'what do people complain about', 'reddit pain points', 'user research from reddit'."
---

# Mine Reddit Pain Points

Reddit is the highest-signal user research source for indie apps. People are honest, specific, and angry there.

## Why Reddit > App Store reviews
- App Store: 5-line reviews, often emotional / one-line
- Reddit: paragraphs of context, problem framing, alternative-shopping
- App Store: rated by current users
- Reddit: includes ex-users, considerers, and unhappy lurkers

## The mining protocol

### Step 1: Find relevant subreddits
For each candidate niche, find:
- Niche-specific subs (r/Fitness, r/getdisciplined, r/productivity)
- Generic app sub (r/iphone, r/apps, r/iosgaming)
- Workflow subs (r/notion, r/habitica for habit tracker)
- Anti-niche subs (r/antiwork for productivity, r/intermittentfasting for diet)

### Step 2: Search for pain queries
For each sub, search:
```
"[competitor] sucks"
"[competitor] alternative"
"[competitor] doesn't"
"[competitor] missing"
"[competitor] broken"
"[competitor] vs"
"best [category] app"
"why is no [category] app"
"i wish there was a [category] app that"
```

### Step 3: Pull threads (last 12 months)
For each promising thread:
- Top comment + responses
- Number of upvotes (signal of how widespread)
- Date (recent = unsolved problem still)

### Step 4: Categorize
Same buckets as `mine-competitor-reviews`:
- LOVE
- HATE
- BUG
- FEATURE-REQUEST
- PRICING-COMPLAINT
- CHURN-REASON

Plus Reddit-specific:
- ALTERNATIVE-RECOMMENDED (people pointing each other to apps)
- WORKFLOW (people describing their hacky workflow because no app does this)

## What to extract

### Workflow gold (most valuable)
"I currently use Notion + IFTTT + a Google Form to do X" = a product opportunity. Their hacky workflow is your MVP spec.

### Specific feature asks
"Why doesn't [competitor] have [feature]" = build that feature first.

### Competitor weakness specifics
"I left [competitor] because [specific reason]" = your wedge messaging.

### Alternative recommendations (your competitor list)
"Try [appname] instead" = a competitor you may have missed.

## Tools

| Tool | Use case |
|---|---|
| reddit.com search | Manual, free |
| Pushshift / via Apify | Scrape large volumes |
| RedditAPI (via app account) | Programmatic, free, rate-limited |
| Apify Reddit scraper actor | Bulk scrape with one click |

## Output template

```markdown
# Reddit Pain: [Niche]

## Subreddits monitored
- r/X (240k members)
- r/Y (89k)
- r/Z (12k niche)

## Top 10 pain points (by mention frequency in last 12mo)

### 1. "App Y has no Apple Watch app" - 47 mentions
Top thread: [link]
Quote: "I would pay $30/yr for [App Y] if they just had a watch app, switched to [App Z] which is worse but has watch."
**Action**: Add Watch app to MVP.

### 2. "Subscription auto-renews even after uninstall" - 38 mentions
Top thread: [link]
**Action**: Surface cancel link prominently in our UI; market this as "transparent billing".

### 3. ...

## Workflow gold (people doing manual workarounds)

### Workflow 1: Manual streak reset
A user on r/X described: "I keep a Notes file with my streak count, copy-paste daily because [App] auto-resets if I miss one day even by an hour."
**Product idea**: Streak save tokens — earn them by doing the habit; auto-spend on miss days.

### Workflow 2: ...

## Alternatives mentioned (extend competitor list)
- AppA (mentioned 23x as recommended alternative)
- AppB (mentioned 18x)
- AppC (mentioned 12x)
```

## When to do this
- BEFORE writing PRD (`write-prd`)
- AFTER initial idea, BEFORE building MVP
- Quarterly during operating phase (catch new complaints)

## Pair with
- `mine-competitor-reviews` for App Store side
- `interview-users` to validate the loudest 3 pain points
- `find-niche` if patterns reveal new opportunities
- `position-pitch` to turn pain quotes into messaging
