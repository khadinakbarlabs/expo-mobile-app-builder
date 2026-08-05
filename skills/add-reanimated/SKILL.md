---
name: "add-reanimated"
description: "Add Reanimated 4 for spring animations, gestures, shared element transitions. Use when the user says 'animations', 'Reanimated', 'spring animation', 'gesture handler', 'shared element'."
---

# Add Reanimated

React Native Reanimated 4 (stable July 2025, New Architecture only). CSS-style declarative animations + worklets.

## Install
```bash
npx expo install react-native-reanimated react-native-gesture-handler react-native-worklets
```

Add to `babel.config.js`:
```js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-worklets/plugin'],  // MUST be last
  };
};
```

## Spring animation
```tsx
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

function HeartButton() {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(1.4, { damping: 8 }, () => {
      scale.value = withSpring(1);
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={animatedStyle}>
        <Image source={require('./heart.png')} />
      </Animated.View>
    </Pressable>
  );
}
```

## Gesture
```tsx
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const drag = Gesture.Pan().onUpdate((e) => {
  translateX.value = e.translationX;
}).onEnd(() => {
  translateX.value = withSpring(0);
});

<GestureDetector gesture={drag}>
  <Animated.View style={[styles.card, animatedStyle]} />
</GestureDetector>
```

## Reduce Motion respect
```tsx
import { AccessibilityInfo } from 'react-native';
const reduceMotion = await AccessibilityInfo.isReduceMotionEnabled();
scale.value = reduceMotion ? withTiming(1.4, { duration: 0 }) : withSpring(1.4);
```

## Reference
`../../docs/references/01-expo-sdk-54.md`
