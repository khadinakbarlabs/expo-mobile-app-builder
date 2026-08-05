---
name: "add-drizzle-sqlite"
description: "Add Drizzle ORM with expo-sqlite for offline-first Android storage. Use when the user says 'add drizzle', 'offline sqlite android', 'local database rn'."
---

# Add Drizzle + expo-sqlite (Offline-First)

Type-safe ORM over SQLite. Perfect for offline-first apps.

## Install
```bash
pnpm add drizzle-orm
pnpm add -D drizzle-kit
npx expo install expo-sqlite
```

## Schema
```ts
// db/schema.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const habits = sqliteTable('habits', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  streak: integer('streak').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});
```

## DB client
```ts
// db/index.ts
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
import * as schema from './schema';

const expoDb = openDatabaseSync('app.db');
export const db = drizzle(expoDb, { schema });
```

## Migrations

```ts
// drizzle.config.ts
import type { Config } from 'drizzle-kit';
export default {
  schema: './db/schema.ts',
  out: './db/migrations',
  dialect: 'sqlite',
  driver: 'expo',
} satisfies Config;
```

Generate:
```bash
npx drizzle-kit generate
```

Apply on app start:
```tsx
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from './db/migrations/migrations';

const { success, error } = useMigrations(db, migrations);
```

## Query
```ts
import { eq } from 'drizzle-orm';

const all = await db.select().from(habits);
const one = await db.select().from(habits).where(eq(habits.id, '123'));
await db.insert(habits).values({ id: '123', name: 'Read', createdAt: new Date() });
await db.update(habits).set({ streak: 5 }).where(eq(habits.id, '123'));
await db.delete(habits).where(eq(habits.id, '123'));
```

## Sync to backend

Pattern:
- Local writes immediate (write to SQLite, mark dirty)
- Background sync to Supabase/backend
- Pull deltas on app open
- Last-write-wins or CRDT for conflicts

Use TanStack Query mutation with `onMutate` for instant UI + background sync.

## Encryption

```bash
pnpm add expo-sqlite/build-utils  # for encryption
```

Use `SQLCipher` via expo config plugin if you need encrypted DB.

## Pair with
- `add-tanstack-query` for sync orchestration
- `add-supabase-auth-android` for backend
