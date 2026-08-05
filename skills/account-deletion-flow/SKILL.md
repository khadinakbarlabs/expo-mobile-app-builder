---
name: "account-deletion-flow"
description: "Implement in-app account deletion (5.1.1(v) requirement) with server-side hard delete + Sign in with Apple revocation. Use when the user says 'account deletion', '5.1.1(v)', 'delete account in-app', 'revoke Sign in with Apple'."
---

# Account Deletion Flow

REQUIRED in-app since 2022 if your app has accounts (5.1.1(v)). Settings → Account → Delete Account.

## SwiftUI-style React Native flow
```tsx
// app/(tabs)/settings.tsx
function DeleteAccountRow() {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push('/delete-account')}>
      <Text style={{ color: 'red' }}>Delete Account</Text>
    </Pressable>
  );
}

// app/delete-account.tsx
function DeleteAccountScreen() {
  const [confirming, setConfirming] = useState(false);

  const handleDelete = async () => {
    Alert.alert(
      'Delete Account?',
      'This permanently deletes your data, subscriptions, and access. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: confirmDelete },
      ]
    );
  };

  const confirmDelete = async () => {
    setConfirming(true);
    try {
      // 1. Call server to hard-delete user record + revoke tokens
      await fetch('/api/account/delete', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${await SecureStore.getItemAsync('authToken')}` },
      });

      // 2. Revoke Sign in with Apple (server-side)
      // Server calls https://appleid.apple.com/auth/revoke with the user's refresh token

      // 3. Clear all local state
      await SecureStore.deleteItemAsync('authToken');
      await AsyncStorage.clear();
      // queryClient.clear()
      // useApp.persist.clearStorage()

      // 4. Sign out + navigate to auth flow
      router.replace('/sign-in');
    } catch (e) {
      Alert.alert('Failed', e.message);
      setConfirming(false);
    }
  };

  return (
    <View>
      <Text>Deleting your account is permanent and immediate.</Text>
      <Text>You will lose:</Text>
      <Text>• All your data</Text>
      <Text>• Access to your subscription (no refund)</Text>
      <Text>• Sign in with Apple link to this account</Text>
      <Pressable onPress={handleDelete} disabled={confirming}>
        <Text style={{ color: 'red' }}>Delete My Account</Text>
      </Pressable>
    </View>
  );
}
```

## Server-side Sign in with Apple revocation
```
POST https://appleid.apple.com/auth/revoke
Content-Type: application/x-www-form-urlencoded

client_id=com.example.myapp
&client_secret=<your-jwt-signed-with-p8>
&token=<user-refresh-token>
&token_type_hint=refresh_token
```

## ABSOLUTE NO
- Don't link to a website to delete account — must be in-app
- Don't soft-delete and call it deletion — Apple rejects
- Don't keep PII after deletion — must hard-delete

## Reference
`references/06-store-readiness.md`
