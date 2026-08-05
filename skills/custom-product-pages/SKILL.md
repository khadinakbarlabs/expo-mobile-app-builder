---
name: "custom-product-pages"
description: "Build Custom Product Pages (CPPs) for use cases, ad sources, and search-intent clusters. Use when the user says 'CPP', 'Custom Product Page', or 'ASC product page'."
---

# Custom Product Pages

Apple raised CPP cap from 35 to **70 per app** in October 2025. Each CPP = its own URL + screenshots + app preview videos + promotional text.

## AppTweak data
- **+5.9% CVR** vs default product page on average
- **+8.6% CVR** when paired with paid Search Ads traffic
- Top apps use 30+ CPPs

## What a CPP is
You assign keywords from your main keyword field to specific CPPs. When user searches one of those terms, the CPP renders instead of default.

## CPP playbook for indies
Build CPPs for:
1. **Each top use case** — "for students," "for moms," "for runners" — screenshots match
2. **Each ad source** — TikTok creator's CPP matches creator's content style
3. **Each search intent cluster** — "calorie counter" CPP shows camera scan; "macro tracker" CPP shows dashboard
4. **Seasonal moments** — New Year (fitness), back-to-school (productivity), Black Friday (paywall)

## Setup in App Store Connect
1. ASC → app → App Store → Custom Product Pages → +
2. Name (internal): "For Runners"
3. Localizations: pick which locales this CPP serves
4. Upload variant screenshots + app preview video + promotional text
5. Save → ASC generates a CPP URL like `apps.apple.com/app/...?ppid=xxx`
6. Assign up to 35 keywords from your main keyword field to this CPP

## Build CPPs for your top-converting ASA keywords first
Pull weekly from ASA → identify top converters → create CPP variant matching that intent.

## Reference
`references/04-discovery-listing.md`
