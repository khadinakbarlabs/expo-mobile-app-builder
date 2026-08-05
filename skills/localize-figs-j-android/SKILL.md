---
name: "localize-figs-j-android"
description: "Localize Play Store listing + in-app content to FIGS + Hindi + Brazilian Portuguese + Indonesian. Use when the user says 'localize android', 'figs localization', 'translate to hindi', 'play store localization'."
---

# Localize FIGS+IDR+BRA+IDN (Android)

Android emerging markets matter more than iOS. Different tier list.

## Tier 1 Android target languages

| Language | Tier | Why |
|---|---|---|
| Hindi (hi) | T1 | India = 96% Android share |
| Brazilian Portuguese (pt-BR) | T1 | 81% Android, growing market |
| Indonesian (id) | T1 | 88% Android, huge population |
| Spanish (es) | T1 | LATAM + Spain |
| English (en) | T1 | US, UK, AU, IN |
| German (de) | T2 | EU paying market |
| French (fr) | T2 | EU + Africa |
| Japanese (ja) | T2 | High ARPU |
| Korean (ko) | T2 | High engagement |
| Russian (ru) | T3 | Less now post-2022 |
| Arabic (ar) | T3 | RTL, MENA |
| Turkish (tr) | T3 | Emerging |

## Where to localize

### Play Store listing
Play Console → Store presence → Main store listing → Add language → translate all fields.

### In-app
RN i18n libraries: `i18next` + `react-i18next` or `i18n-js`.

```bash
pnpm add i18next react-i18next
```

```tsx
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { hello: 'Hello' } },
    hi: { translation: { hello: 'नमस्ते' } },
    'pt-BR': { translation: { hello: 'Olá' } },
  },
  lng: 'en',
  fallbackLng: 'en',
});
```

## Translation services

### Free
- DeepL (good for FIGS, weak for Hindi)
- Google Translate via API (cheap but lower quality)
- Manual via Fiverr ($20-50 per language for short text)

### Paid
- Lokalise / Phrase / Crowdin (~$50/mo)
- Native speaker reviewers ($0.10/word)

## Cultural adaptation

### Hindi (India)
- Use Devanagari script (not romanized)
- UPI references resonate
- Family/community framing > individual
- Cricket > football references

### Portuguese-BR (Brazil)
- Use BR not PT (different vocab)
- WhatsApp deeply integrated
- Pix payment system
- Local Brazilian humor (gentle, optimistic)

### Indonesian (Indonesia)
- Bahasa Indonesia (not Javanese unless niche)
- Mobile-first audience
- Religious holidays (Idul Fitri)
- Friend/community framing

## Gemini-assisted translation (2026)

Play Console offers Gemini-translated listings for ~20 languages. Use as starting point, hire reviewer for accuracy.

## Pair with
- `aso-keywords-play` (per-language keywords)
- `custom-store-listings` (per-region variants)
- `design-screenshots-play` (localized screenshots)
