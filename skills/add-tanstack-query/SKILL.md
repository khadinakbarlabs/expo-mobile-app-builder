---
name: "add-tanstack-query"
description: "Add TanStack Query (React Query) for server state in an Expo app. Use when the user says 'TanStack Query', 'React Query', 'server state', 'data fetching', 'API calls'."
---

# Add TanStack Query

Server state, caching, refetching, mutations, optimistic UI.

## Install
```bash
npm install @tanstack/react-query
```

## Setup in root
```tsx
// app/_layout.tsx
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';
import { AppState } from 'react-native';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,   // 1 min
      gcTime: 1000 * 60 * 5,  // 5 min
      retry: 2,
    },
  },
});

// refresh on app foreground
AppState.addEventListener('change', (state) => {
  focusManager.setFocused(state === 'active');
});

export default function RootLayout() {
  return <QueryClientProvider client={queryClient}>{/* ... */}</QueryClientProvider>;
}
```

## Query
```tsx
import { useQuery } from '@tanstack/react-query';

function Feed() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => fetch('/api/posts').then(r => r.json()),
  });

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorState onRetry={refetch} />;
  if (!data?.length) return <EmptyState />;
  return <FlashList data={data} renderItem={({ item }) => <Post item={item} />} />;
}
```

## Mutation with optimistic UI
```tsx
const queryClient = useQueryClient();
const like = useMutation({
  mutationFn: (postId: string) => fetch(`/api/posts/${postId}/like`, { method: 'POST' }),
  onMutate: async (postId) => {
    await queryClient.cancelQueries({ queryKey: ['posts'] });
    const prev = queryClient.getQueryData(['posts']);
    queryClient.setQueryData(['posts'], (old: Post[]) =>
      old.map(p => p.id === postId ? { ...p, liked: true } : p)
    );
    return { prev };
  },
  onError: (err, postId, ctx) => queryClient.setQueryData(['posts'], ctx.prev),
});
```

## Reference
`references/01-expo-sdk-54.md`
