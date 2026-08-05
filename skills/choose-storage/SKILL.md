---
name: "choose-storage"
description: "Decide storage layer for an Expo app: expo-sqlite + drizzle vs MMKV vs SecureStore vs AsyncStorage vs Zustand persist. Use when the user says 'storage', 'database', 'where to save data', 'AsyncStorage vs MMKV', 'expo-sqlite'."
---

# Choose Storage

Pick the right Expo storage primitive.

## Decision tree
- **Tokens, passwords, API keys** → expo-secure-store (Keychain on iOS)
- **Tiny preferences (<10 keys)** → AsyncStorage or Zustand persist
- **Fast key/value (>10 keys, frequent reads)** → MMKV (`react-native-mmkv`)
- **Structured data, complex queries** → expo-sqlite + drizzle-orm
- **Large blobs / images** → expo-file-system
- **Cross-device sync** → CloudKit private DB (requires native bridge or expo-cloud-storage if available)

## expo-secure-store
```ts
import * as SecureStore from 'expo-secure-store';
await SecureStore.setItemAsync('authToken', token);
const token = await SecureStore.getItemAsync('authToken');
```

## MMKV
```bash
npm install react-native-mmkv
```
```ts
import { MMKV } from 'react-native-mmkv';
export const storage = new MMKV();
storage.set('user.id', '123');
const id = storage.getString('user.id');
```
~30x faster than AsyncStorage. Sync API.

## expo-sqlite + drizzle
```bash
npx expo install expo-sqlite
npm install drizzle-orm
npm install -D drizzle-kit
```
```ts
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as SQLite from 'expo-sqlite';

const sqlite = SQLite.openDatabaseSync('app.db');
export const db = drizzle(sqlite);
```

## ABSOLUTE NO
- Never store auth tokens in AsyncStorage or MMKV (no encryption at rest)
- Never put images in expo-sqlite (use expo-file-system)
- Don't pick CoreData via native bridge unless you specifically need NSPersistentCloudKitContainer features
