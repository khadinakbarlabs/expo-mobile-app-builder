---
name: "handle-anr-android"
description: "Diagnose and fix ANRs (Application Not Responding) which Play penalizes at above 0.47% threshold. Use when the user says 'fix anr', 'anr android', 'app not responding'."
---

# Handle ANR (Application Not Responding)

ANR = main thread blocked >5 sec. Play threshold: <0.47%.

## What causes ANR

- Synchronous network on main thread
- Heavy computation in render
- Disk I/O on main thread
- Bridge serialization of large data (RN-specific)
- Animation conflicting with layout

## Detect

Play Console → Vitals → ANRs. Lists stack traces of recent ANRs.

Sentry → Performance → "ANR" issue type.

## Fix patterns

### Move heavy work off main thread
```tsx
// Bad: parsing large JSON on main thread
const data = JSON.parse(hugeString);

// Good: use InteractionManager or worklet
import { InteractionManager } from 'react-native';
InteractionManager.runAfterInteractions(() => {
  const data = JSON.parse(hugeString);
});
```

### Use React Native worklets
```tsx
import { runOnJS, runOnUI } from 'react-native-reanimated';

const heavyCompute = () => {
  'worklet';
  // Runs on UI thread, not main JS thread
};
```

### Optimize FlashList
```tsx
<FlashList
  estimatedItemSize={80}  // critical
  getItemType={(item) => item.type}  // reduce re-renders
  removeClippedSubviews  // free memory
/>
```

### Reduce bridge traffic
```tsx
// Bad: passing array of 1000 objects through bridge
<HeavyComponent data={hugeArray} />

// Good: virtualize, only pass visible items
<FlashList data={hugeArray} renderItem={({ item }) => <Row item={item} />} />
```

## Common gotchas
- Setting state during render → re-render storm
- Synchronous bridge calls (RN Pre-Fabric) → ANR
- Image decoding 1000 thumbnails → use expo-image with proper priority

## Pair with
- `add-flashlist`
- `reduce-android-cold-start`
- `add-sentry-rn-android` (ANR tracking)
