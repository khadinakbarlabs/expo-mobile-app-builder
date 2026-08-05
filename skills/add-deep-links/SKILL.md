---
name: "add-deep-links"
description: "Set up Universal Links + custom URL schemes for deep linking into Expo Router screens. Use when the user says 'deep links', 'Universal Links', 'URL scheme', 'open from web'."
---

# Add Deep Links

Universal Links + custom URL schemes. Universal Links preferred (open directly in app from web URL).

## Universal Links setup
**1. Capability**: app.json
```json
{
  "expo": {
    "ios": {
      "associatedDomains": ["applinks:myapp.com"]
    }
  }
}
```

**2. Host AASA** at `https://myapp.com/.well-known/apple-app-site-association`:
```json
{
  "applinks": {
    "details": [{
      "appID": "TEAMID.com.example.myapp",
      "paths": ["/recipe/*", "/share/*", "NOT /admin/*"]
    }]
  }
}
```
Serve as `application/json`. Apple verifies via CDN, may take 24-48h.

**3. Handle in Expo Router** — Expo Router automatically handles deep links to file routes. URL `https://myapp.com/recipe/123` → route `app/recipe/[id].tsx`.

## Custom URL scheme (myapp://)
**1. app.json**: `"scheme": "myapp"`
**2. URL `myapp://recipe/123` opens via** `useURL()` or Expo Router auto-routing.

## Manual handling (when needed)
```tsx
import * as Linking from 'expo-linking';
import { useEffect } from 'react';

useEffect(() => {
  const sub = Linking.addEventListener('url', ({ url }) => {
    // route programmatically
  });
  return () => sub.remove();
}, []);
```

## Testing
```bash
xcrun simctl openurl booted "myapp://recipe/123"
```

## Reference
`../../docs/references/01-expo-sdk-54.md`
