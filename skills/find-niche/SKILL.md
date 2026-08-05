---
name: "find-niche"
description: "Find profitable underserved iOS App Store niches by analyzing competitor density, pain signals, and ASO opportunity. Use when the user says 'find an app niche', 'what should I build', 'underserved category', 'app idea'."
---

# Find Niche

Identify profitable, underserved iOS niches. Returns ranked opportunities with TAM, competition density, first-mover assessment.

## Method
1. Pick seed surface: AI wrapper niches | Apple Intelligence-native | indie utility | Apple ecosystem (widgets/Watch) | recently-disrupted-by-Apple
2. Competitor density scan: App Store search top 10-20 apps for keyword. How many have <100 reviews? = low entry barrier.
3. AppFigures / SensorTower public data on category leader revenue + download trend
4. Reviews complaining loudly = pain that incumbents aren't solving
5. Indie wedge filter: ≥1 underserved sub-segment + native iOS-26-only capability + monetization path with prior art

## 2026 working niches
- Vertical AI utilities (food + fitness + photography)
- Apple-Intelligence-native apps (Foundation Models = free + private + Apple loves featuring)
- B2B productivity for specific roles
- Watch/Vision adjuncts

## 2026 saturated avoid
- Dating, fortune/tarot, generic AI chat, basic photo filters, QR scanners, generic habit trackers

## Output format
```
NICHE: [12 words]
TARGET USER: [persona]
EXISTING APPS: [3-5 named + reviews + revenue est]
INDIE WEDGE: [your differentiator]
TAM ESTIMATE: [rough]
COMPETITION SCORE: 1-10 (10 = wide open)
ESTIMATED 6-MONTH REVENUE CEILING: $X/mo at Y subs
```

## Reference
`references/04-discovery-listing.md`, `references/03-monetization.md`
