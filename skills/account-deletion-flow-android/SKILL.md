---
name: "account-deletion-flow-android"
description: "Implement Google Play required account deletion: in-app AND on website. Use when the user says 'account deletion android', 'delete account play', 'play account deletion requirement'."
---

# Account Deletion Flow (Play Required)

Mandatory since Dec 2023. Both in-app + on website.

## In-app

Settings → Account → Delete Account → confirmation → delete.

```tsx
// Settings screen
<Pressable onPress={confirmDelete}>
  <Text>Delete account</Text>
</Pressable>

// Confirmation
<Alert>
  Title: "Delete account?"
  Body: "This permanently deletes your account and all data. Cannot be undone."
  Buttons: [Cancel, Delete]
</Alert>

// On Delete:
async function deleteAccount() {
  await fetch('/api/delete-account', {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  await SecureStore.deleteItemAsync('auth_token');
  router.replace('/sign-in');
}
```

## Backend delete endpoint

```ts
// /api/delete-account
app.delete('/api/delete-account', async (c) => {
  const userId = c.get('jwtPayload').sub;

  // 1. Soft delete: mark deleted_at, hide from queries
  await db.update(users).set({ deletedAt: new Date() }).where(eq(users.id, userId));

  // 2. Schedule hard delete (30 day grace)
  await scheduleJob('hardDeleteUser', { userId, runAt: addDays(new Date(), 30) });

  // 3. Cancel any active subscriptions
  await revenueCat.subscriber.delete(userId);

  // 4. Log for audit
  await auditLog.create({ event: 'account_deletion_requested', userId });

  return c.json({ ok: true });
});
```

## Website (also required)

Public URL where users can request deletion WITHOUT installing app.

`/account-deletion`:
```html
<form action="/api/delete-request" method="POST">
  <label>Email used to sign in:</label>
  <input type="email" name="email" required />
  <button>Request deletion</button>
</form>
```

Backend verifies via email link, then deletes.

## Play Console declaration

Setup → Data deletion → "Provide URL" → enter your `/account-deletion` URL.

## What MUST be deleted

- User account
- All user-generated content
- Linked records (purchases, settings, etc.)
- Backups (within retention window)

## What you can keep

- Aggregate stats (anonymized)
- Legal hold data (if required by law)
- Audit logs (for fraud / safety)

## Grace period
30 days is industry standard. User can cancel within grace by signing back in.

## Common gotchas
- Forgetting to delete in third-party services (RevenueCat, Sentry user, PostHog person)
- "Account deletion" link goes to email instead of in-app → rejection
- 24-hr delete vs 30-day grace → either works, document clearly
- Hard delete from backup retention (Postgres point-in-time recovery has 30-day default)

## Pair with
- `generate-privacy-policy-android` (link from policy)
- `data-safety-form` (declare deletion mechanism)
