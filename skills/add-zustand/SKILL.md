---
name: "add-zustand"
description: "Add Zustand state management to an Expo app for UI state. Use when the user says 'add Zustand', 'state management', 'global state', 'app store'."
---

# Add Zustand

Lightweight, hook-based state for UI / client state. Pair with TanStack Query for server state.

## Install
```bash
npm install zustand
```

## Basic store
```ts
// state/auth.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: { id: string; email: string } | null;
  setUser: (user: AuthState['user']) => void;
  signOut: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      signOut: () => set({ user: null }),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

## Usage
```tsx
const user = useAuth((s) => s.user);
const signOut = useAuth((s) => s.signOut);
```

## Slices pattern (when store grows)
```ts
import { StateCreator } from 'zustand';

const createAuthSlice: StateCreator<AppStore, [], [], AuthSlice> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
});

const createCartSlice: StateCreator<AppStore, [], [], CartSlice> = (set) => ({
  items: [],
  addItem: (item) => set((s) => ({ items: [...s.items, item] })),
});

export const useApp = create<AppStore>()((...a) => ({
  ...createAuthSlice(...a),
  ...createCartSlice(...a),
}));
```

## ABSOLUTE NO
- Don't put server data in Zustand. Use TanStack Query.
- Don't use AsyncStorage for sensitive tokens. Use expo-secure-store.
- Don't subscribe to whole store; select specific slices.
