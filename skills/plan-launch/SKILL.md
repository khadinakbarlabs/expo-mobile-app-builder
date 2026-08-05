---
name: "plan-launch"
description: "Plan a 4-week launch sequence: BetaList to IndieHackers to Reddit to ProductHunt + X build-in-public + podcast tour. Use when the user says 'plan launch', 'ProductHunt launch', 'launch strategy', 'go-to-market'."
---

# Plan Launch

Sequence the 4-week launch window for a new iOS app.

## External action gate

This skill creates a launch plan. It must not submit an app for review, create a public TestFlight link, schedule or post social content, invite testers, submit a directory listing, contact people, or activate paid promotion without explicit owner confirmation for that exact external action.

## 4-week pre-launch sequence

### Week -2: Pre-launch buildup
- **Twitter/X build-in-public thread** — daily progress, screenshots, GIFs
- **Draft public TestFlight link placement** for owner review
- **Email list / waitlist** — landing page collects emails
- **Reach out to 30 friends/family/colleagues** — soft launch testers
- **Pre-write 10 launch-day tweets**
- **Reach out to 3-5 indie podcast hosts** — Under the Radar (back catalog only), The iOS Dev Podcast, Indie Hackers Podcast, My First Million

### Week -1: Final polish
- **Prepare App Store review submission** (do not submit without owner approval)
- **iOS App Preview video** for App Store
- **Finalize 10 screenshots** (run `design-screenshots`)
- **Day-1 launch tweet** with: GIF, value prop, App Store link, 1 ask
- **Schedule social posts** for launch day across timezones

### Day 0: Launch day

**ProductHunt** (plan timing with the owner)
- Prepare a candidate listing the day before; submit only after approval
- Ship at 12:01am PT for max voting window
- Prepared "Maker comment" within first hour
- Pre-line 10 friends to upvote + comment with substance
- Reply to every comment within 30 min for first 4 hours
- Goal: top 5 of the day (not necessarily #1)

**Twitter/X**
- Launch tweet at 9am ET: GIF demo, App Store link, 1 ask
- Reply to every comment + RT supportive replies
- Quote-tweet creators who post about the app
- DM 5-10 builders in your niche personally

**Reddit**
- r/iOSProgramming (if dev-relevant), r/IndieDev, r/SideProject, r/AppHookup
- Niche subreddits relevant to category (only with organic standing)
- Honest "I built this for [niche], here's what's free / paid" framing

**IndieHackers**
- "How I built [app] in [time]" framing
- Include real revenue numbers if launching paid

### Week +1: Sustain
- **Daily X updates**: "Day 1: 47 installs, 3 paying. Day 2: 132, 8 paying."
- **Reply to every App Store review** (run `respond-to-reviews`)
- **Submit to BetaList** if doing TestFlight beta growth
- **Pitch 2-3 small podcasts** in your niche

### Week +2 to +4: Iterate
- **Weekly metrics post on X** — "Week 1: $X MRR, Y installs, Z trials"
- **Apple "Featured" pitch** — submit at developer.apple.com/contact/app-store/promote/
- **Prepare hot-fix paths** (EAS Update or App Store phased release); publish only after owner approval
- **Run `aso-pass`** with first weeks of ASA conversion data
- **First A/B test on paywall** in RevenueCat Experiments

## Channels ranked by indie ROI (May 2026)
1. **Twitter/X build-in-public** — slow burn, compounds (Marc Lou, Pieter Levels)
2. **Apple Search Ads** — best paid acquisition (March 2026 multi-placement expansion)
3. **ProductHunt** — single-day spike, useful for backlinks + initial reviews
4. **r/SideProject + niche subreddits** — high-quality if posted with genuine framing
5. **IndieHackers** — for revenue-transparent posts attracting other builders + investors
6. **YouTube reviews** — slow but durable (10K-100K sub niche reviewers)
7. **Podcast tour** — credibility + niche reach, low conversion volume

## Reference
`../../docs/references/04-discovery-listing.md`
