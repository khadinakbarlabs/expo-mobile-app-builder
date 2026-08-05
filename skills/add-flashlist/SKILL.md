---
name: "add-flashlist"
description: "Replace FlatList with FlashList v2 for high-performance lists. Use when the user says 'FlashList', 'FlatList performance', 'long list', 'scroll performance'."
---

# Add FlashList

FlashList v2 — JS-only rewrite, no estimates needed, supports any-size horizontal items. The 2026 default for any list with >50 items.

## Install
```bash
npx expo install @shopify/flash-list
```

## Replace FlatList
```tsx
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={items}
  renderItem={({ item }) => <Row item={item} />}
  keyExtractor={(item) => item.id}
  // No more estimatedItemSize required in v2
/>
```

## Pull-to-refresh
```tsx
<FlashList
  data={items}
  renderItem={renderItem}
  refreshing={isRefreshing}
  onRefresh={refetch}
/>
```

## Infinite scroll
```tsx
<FlashList
  data={items}
  renderItem={renderItem}
  onEndReached={() => fetchNextPage()}
  onEndReachedThreshold={0.5}
  ListFooterComponent={isFetchingNextPage ? <Spinner /> : null}
/>
```

## Multiple item types (mixed list)
```tsx
<FlashList
  data={mixedItems}
  renderItem={({ item }) => {
    if (item.type === 'header') return <Header />;
    if (item.type === 'product') return <Product item={item} />;
    return <Ad item={item} />;
  }}
  getItemType={(item) => item.type}
/>
```

## Reference
`../../docs/references/01-expo-sdk-54.md`
