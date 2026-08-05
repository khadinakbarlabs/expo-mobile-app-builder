---
name: "accessibility-audit-android"
description: "Run Android accessibility audit: TalkBack, contrast, touch targets, content descriptions. Use when the user says 'a11y audit android', 'accessibility android', 'talkback', 'screen reader android'."
---

# Accessibility Audit (Android)

Pre-launch a11y check. Google rewards accessible apps with featuring.

## The WCAG 2.1 AA baseline

- Color contrast 4.5:1 (text), 3:1 (large text + icons)
- Touch targets 48×48 dp minimum
- All actionable elements have content description
- Focus order matches visual order
- No critical info conveyed by color alone

## Test with TalkBack

Enable: Settings → Accessibility → TalkBack → ON.

Navigation:
- Swipe right → next element
- Swipe left → previous
- Double-tap → activate
- 2-finger swipe → scroll
- 3-finger swipe → next/prev page

Walk every screen of your app. Listen to what TalkBack reads.

### Common TalkBack failures
- Image with no `accessibilityLabel` → reads "image"
- Custom buttons without role → reads as static text
- Status changes not announced → users miss updates

## RN+Expo accessibility props

```tsx
<Pressable
  accessibilityLabel="Save habit"
  accessibilityHint="Saves your current habit"
  accessibilityRole="button"
  accessibilityState={{ disabled: !canSave }}
  onPress={save}
>
  <Text>Save</Text>
</Pressable>
```

| Prop | Use |
|---|---|
| `accessibilityLabel` | What this element is ("Save button") |
| `accessibilityHint` | What happens on action ("Saves your habit") |
| `accessibilityRole` | Type: button, link, header, image, etc |
| `accessibilityState` | Disabled, selected, expanded |
| `accessibilityValue` | For sliders, etc. |
| `accessible` | Group children as single focus element |
| `importantForAccessibility` | "yes" / "no-hide-descendants" |

## Touch targets

Minimum 48×48 dp. For visually smaller buttons, add hit slop:
```tsx
<Pressable hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
```

## Color contrast

Use these tools:
- `accessible-colors.com` — pick palette with contrast guarantees
- `webaim.org/resources/contrastchecker/`
- Material Color Tool — built-in contrast checker

## Test with Accessibility Scanner (Android)

Install "Accessibility Scanner" from Play Store. Open your app, tap scan button → it audits visible screens and flags issues.

## Common Android a11y gotchas

- Custom switches without state → just say "checkbox unchecked" not "switch on"
- Icons-only buttons missing label
- Image inside button → use single accessibilityLabel on button, mark image `importantForAccessibility="no"`
- Auto-focusing text fields breaks TalkBack flow
- Modal dialogs trap focus → use `accessibilityViewIsModal` (Android only)

## Pair with
- `apply-material3` (M3 has good a11y defaults)
- `accessibility-audit` (cross-platform shared)
