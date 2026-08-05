---
name: "figma-to-rn"
description: "Convert Figma designs to React Native code with theme tokens, accessibility, and 4 states (happy/empty/loading/error). Use when the user says 'Figma to React Native', 'design to code', 'implement Figma'."
---

# Figma to RN

Convert Figma frames to React Native code in your project's idiom.

## Recommended workflow (coding agent + Figma MCP)
1. Connect a Figma MCP server to the coding agent you use
2. In chat: "Build this Figma frame as a React Native screen using my theme tokens and Pressable components. Match spacing exactly. Include happy/empty/loading/error states."
3. Iterate on the result

## Manual workflow (no MCP)
1. Open Figma frame in Dev Mode
2. Note: spacing measurements, colors (translate to PlatformColor or theme tokens), typography (semantic Text styles), border radii
3. Identify repeating components — extract into separate files
4. Write the JSX with theme tokens (NOT hardcoded values)

## Honest verdict on AI Figma-to-Code tools
- **Locofy / Anima / Builder.io Visual Copilot** — produce a strong first draft, never a finished commit. Best for one-off marketing pages or when you have no codebase.
- **For an established RN codebase**, an agent with repository context plus Figma MCP is more reliable — it can follow your conventions.

## Code template
```tsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';

export function ProductCard({ product, onPress }) {
  const { color, spacing, radius, type } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, { backgroundColor: color.card, borderRadius: radius.md, padding: spacing.md }]}
      accessibilityRole="button"
      accessibilityLabel={`View ${product.name}`}
    >
      <Text style={[type.headline, { color: color.label }]}>{product.name}</Text>
      <Text style={[type.subhead, { color: color.secondaryLabel }]}>${product.price}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { gap: 4 },
});
```

## Reference
`../../docs/references/05-product-design.md`
