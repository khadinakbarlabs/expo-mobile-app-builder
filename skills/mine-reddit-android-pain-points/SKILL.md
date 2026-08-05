---
name: "mine-reddit-android-pain-points"
description: "Mine Reddit for Android users complaining about competitor apps or describing unmet needs. Use when the user says 'reddit research android', 'mine reddit android', 'find user pain reddit android', 'r/android research'."
---

# Mine Reddit for Android Pain Points

Same playbook as iOS `mine-reddit-pain-points`, with Android-relevant subreddits.

## High-signal Android subreddits

| Subreddit | Members | Use |
|---|---|---|
| r/Android | 2.8M | Mainstream Android discussion |
| r/AndroidApps | 240k | App recommendations and complaints |
| r/AndroidQuestions | 200k | Specific pain points |
| r/GooglePixel | 600k | Pixel-specific issues |
| r/oneplus | 320k | OnePlus-specific |
| r/samsung | 1.4M | Samsung user behavior |
| r/Xiaomi | 200k | Xiaomi/MIUI quirks (huge in emerging markets) |
| r/AndroidDev | 180k | Developer-side complaints |
| r/SideProject | 300k | Indie launches |
| r/Indiandeveloper | 50k | India-specific Android dev pain |

## Niche-specific subreddits

For each candidate niche, search:
- r/[Niche] (e.g., r/productivity, r/personalfinance, r/fitness)
- r/[Niche]Apps
- r/getdisciplined for habit-formation niches
- r/digitalminimalism for anti-feature niches

## Search queries (per sub)

```
"[competitor] sucks"
"[competitor] alternative"
"[competitor] doesn't work on android"
"[competitor] battery drain"
"[competitor] subscription"
"best android app for [job]"
"why is no android app"
"I wish there was an android app that"
"switched from [competitor] to"
```

## Categorize

Same buckets as `mine-play-reviews`, plus Android-specific:
- ANDROID-VERSION-ISSUE
- DEVICE-SPECIFIC (manufacturer skin issues)
- BATTERY-OPTIMIZATION-PAIN (MIUI/OneUI kills push notifs)
- ALTERNATIVE-APP-STORE-FRUSTRATION (China users, F-Droid users)

## What's unique to Reddit (vs Play reviews)

- Workflows: people describe manual workflows in detail
- Cross-app comparisons: "I use X + Y because no app does both"
- Feature requests with reasoning
- Developer-side complaints (r/AndroidDev): API issues, restrictions

## Output

`research/reddit-pain-[niche].md`:
- Subreddits monitored + member counts
- Top 10 pain patterns (frequency-weighted)
- Workflow gold (manual workarounds = product opportunities)
- Alternatives mentioned (extends competitor list)
- Quotes for landing page

## Tools

- Reddit search (free, manual)
- Reddit API + script (free, rate-limited)
- Pushshift via Apify actor (paid, fast)
- AppRadar Reddit feature (paid)

## Pair with
- `mine-play-reviews` for Play side
- `find-niche-android` if patterns reveal new opportunities
- `position-pitch-android` to convert pain → messaging
