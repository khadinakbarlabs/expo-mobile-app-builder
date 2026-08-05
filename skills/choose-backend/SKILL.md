---
name: "choose-backend"
description: "Decision matrix for choosing an Expo app backend: Supabase vs Firebase vs Convex vs custom. Use when the user says 'which backend', 'choose backend', 'supabase or firebase', 'backend decision', or 'pick database'."
---

# Choose Backend

The decision tree. No "best" answer — depends on what your app does.

## Decision matrix

| Need | Best pick | Runner-up |
|---|---|---|
| Just auth + Postgres | Supabase | Convex |
| Realtime collaboration (cursors, presence) | Convex | Supabase Realtime |
| Heavy AI app, server-side OpenAI calls | Cloudflare Workers + DO | Vercel + Postgres |
| Complex queries, lots of joins | Supabase | Custom Postgres |
| Want zero ops, push everything | Firebase | Convex |
| Need full SQL access | Supabase | Custom Postgres |
| Solo founder, ship in 2 weeks | Supabase | Firebase |
| Will sell company eventually | Supabase (data portable) | Custom |
| App Clip / lightweight | Cloudflare Workers KV | Firebase |
| Heavy image/video storage | Supabase Storage / R2 | Firebase Storage |

## Detailed pros/cons

### Supabase ⭐ default for indie apps
**Pros:**
- Postgres (real database, SQL access)
- Built-in auth (email, magic link, OAuth, Apple Sign In)
- Realtime via Postgres LISTEN/NOTIFY
- Storage (S3-compatible)
- Edge Functions (Deno-based)
- Self-hostable (you own your data)
- Generous free tier ($0 up to 500MB DB, 1GB storage)

**Cons:**
- Realtime is OK but not Convex-tier
- Scaling beyond ~$200/mo means custom Postgres
- Edge Functions are Deno (not Node) — some libraries don't work

**Best for:** 80% of iOS apps. Default unless you have specific reason otherwise.

### Convex
**Pros:**
- Realtime is the BEST in class (Cursor uses it)
- Functions = code (no SQL needed)
- Built-in optimistic updates
- Schema-as-code (no migrations)

**Cons:**
- Vendor lock-in (data isn't trivially portable)
- Smaller ecosystem
- Pricing more aggressive at scale ($25/mo + usage)

**Best for:** Realtime collab apps, multiplayer games, agentic UIs.

### Firebase (Firestore)
**Pros:**
- Mature, reliable, Google
- Excellent client SDKs (offline-first built in)
- Free tier is generous
- Auth + Storage + Functions all integrated

**Cons:**
- NoSQL (Firestore) — joins are painful, queries limited
- Vendor lock-in (BigQuery export is one-way)
- Functions are slow cold-start
- Pricing can spike unexpectedly with bad query patterns

**Best for:** When you want Google-grade reliability and don't need SQL.

### Cloudflare Workers + D1 + R2
**Pros:**
- Cheapest at scale (free tier covers most apps)
- Edge-deployed for low-latency global workloads
- Hyperdrive for connecting to your own Postgres
- D1 (SQLite) for small data, R2 for files

**Cons:**
- More plumbing (auth needs Lucia / Better Auth)
- D1 has scale limits (~10GB)
- Workers have CPU time limits per request

**Best for:** AI apps with heavy server logic, image processing, edge functions.

### Just BaaS-free (server-side from RN direct to APIs)
For some apps you don't need a backend at all:
- App is offline-first (drizzle-orm + expo-sqlite)
- Auth via Apple Sign In (no email/password storage)
- Subscriptions via RevenueCat (handles backend for you)
- Sync via iCloud (CloudKit via expo-cloudkit)

This is the MINIMUM viable backend: zero servers. Works for journaling, habit tracking, calculators, single-player games.

## Decision flow

```
Is the app multi-user?
├─ No → No backend needed. Use SQLite + iCloud sync.
└─ Yes → Continue

Does it need realtime collab?
├─ Yes → Convex
└─ No → Continue

Will you ever migrate or sell?
├─ Need data portability → Supabase
└─ Don't care → Firebase or Supabase

How much budget?
├─ $0/mo target → Cloudflare Workers + D1
├─ <$100/mo → Supabase or Firebase free tier
└─ Scale-ready → Supabase Pro or custom
```

## A sensible default

Start with the smallest option that fits the product and validate current pricing, regions, limits, data-processing terms, and exit path before creating an account. For many relational Expo apps, Supabase is a reasonable option because it offers Postgres, Auth, and an edge-function boundary for keeping private AI-provider keys off device.

## Pair with
- `add-supabase-auth` (next skill) for auth setup
- `add-trpc` if going custom backend
- `subscription-server-validation` for RC + your backend integration
