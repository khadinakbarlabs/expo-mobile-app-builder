---
name: "accessibility-audit"
description: "Audit RN/Expo app for VoiceOver, Dynamic Type, 44pt taps, color contrast, Reduce Motion. Use when the user says 'accessibility', 'VoiceOver', 'WCAG', 'a11y audit'."
---

# Accessibility Audit

Audit RN/Expo app against Apple's accessibility minimums.

## Audit checklist

**1. Touch targets** — every interactive element ≥44x44 pt. Common failures: icon-only Pressables, Image with onPress.
```tsx
<Pressable hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}>
```

**2. VoiceOver labels** — every interactive element needs `accessibilityLabel`. Decorative images marked `accessibilityElementsHidden={true}`.

**3. Dynamic Type** — `allowFontScaling` (default true) on Text. No hardcoded heights on text containers. Test at Accessibility XXXL.

**4. Color contrast** — use PlatformColor semantic colors. Test with Increase Contrast on.

**5. Reduce Motion** — gate decorative animations:
```tsx
import { AccessibilityInfo } from 'react-native';
const [reduceMotion, setReduceMotion] = useState(false);
useEffect(() => {
  AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
}, []);
```

**6. Reduce Transparency** — `expo-glass-effect` respects automatically with `reducedTransparencyFallbackColor`.

**7. Headings + Traits** — for sectioned content:
```tsx
<Text accessibilityRole="header">Settings</Text>
```

## Workflow
1. Settings → Accessibility → VoiceOver → On. Swipe through every screen.
2. Settings → Display & Text Size → Larger Text → Accessibility XXXL. Open every screen.
3. Settings → Accessibility → Display & Text Size → Increase Contrast / Reduce Transparency / Reduce Motion → ON. Open every screen.

## Output format
```
ACCESSIBILITY AUDIT

CRITICAL (4.0 / 5.1 reject risk):
- HomeScreen.tsx:42 — heart Pressable has no accessibilityLabel
- PaywallScreen.tsx:88 — Buy button is 32x32 pt
- OnboardingScreen.tsx:15 — text uses fontSize: 14 hardcoded

NON-CRITICAL (fix before featured pitch):
- DetailScreen.tsx:120 — section heading missing accessibilityRole='header'

PASS:
[✓] VoiceOver: all labeled
[✓] Dynamic Type: tested at xSmall + AXXXL
[✓] Contrast: tested with Increase Contrast on
[✓] Reduce Motion: tested
```
