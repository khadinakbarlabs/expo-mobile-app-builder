---
name: "add-android-foldable-tablet"
description: "Optimize Android layout for foldables (Pixel Fold, Galaxy Fold) and tablets using window size classes. Use when the user says 'foldable android', 'tablet layout android', 'large screen android'."
---

# Optimize for Foldables + Tablets

Pixel Fold and Galaxy Fold series have inner + outer screens. Tablets have larger UIs. Play features foldable-optimized apps.

## Window size classes

Android groups screens into:
- **Compact** — phones (<600dp wide)
- **Medium** — small tablets, large phones folded (600-840dp)
- **Expanded** — tablets, foldables unfolded (>840dp)

## In RN/Expo

```tsx
import { useWindowDimensions } from 'react-native';

const { width } = useWindowDimensions();
const sizeClass = width < 600 ? 'compact' : width < 840 ? 'medium' : 'expanded';
```

## Layout adaptations

### Compact (phone)
- Bottom navigation (3-5 items)
- Single column

### Medium (tablet portrait)
- Navigation rail (side)
- Single column OR 2-pane (list + detail)

### Expanded (tablet landscape, foldable open)
- Navigation drawer (permanent)
- Multi-pane (list-detail-detail)

```tsx
{sizeClass === 'expanded' ? <DrawerLayout /> : <BottomNavLayout />}
```

## Foldable hinge handling

```bash
pnpm add react-native-window-size-class  # community lib
```

Or detect foldable state via Posture API (Android 11+):

```tsx
// Native code required — drop down via expo-modules-core
// Or use react-native-folding-feature
```

## Layout for Pixel Fold specifically

- Outer screen: 5.8" 1080×2092
- Inner screen: 7.6" 2208×1840
- Aspect changes drastically when unfolding
- Save user input across hinge state changes (don't dump form state)

## Test

- Pixel Tablet emulator
- Pixel Fold emulator (Android Studio bundles)
- Test ALL screens: rotate + unfold

## Play featuring

Apps with foldable optimization get bonus points in Play featuring. Make sure:
- No fixed-orientation lock unless game
- Layouts adapt smoothly
- App restores state across orientation/posture change

## Pair with
- `apply-material3` (M3 includes responsive guidelines)
- `set-up-emulator` (create Fold + Tablet AVDs)
