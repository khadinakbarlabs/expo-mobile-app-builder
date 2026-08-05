# Mobile monetization and purchase safety

Add billing only when the product has a clear value exchange and the owner has selected the store, entitlement model, and provider. The plugin is provider-neutral: it can plan RevenueCat or native-store work but does not carry a provider key or make commercial decisions automatically.

## Product and implementation checks

- State the paid capability, price presentation, trial conditions, restoration path, cancellation path, and account-deletion implications clearly.
- Keep entitlement logic server-verified where the risk and product architecture require it; do not trust a mutable client flag as an authorization boundary.
- Include a restore-purchases route and test first purchase, renewal, cancellation, expiration, restore, offline, and account-switch scenarios.
- Ensure the app's privacy disclosures cover every analytics, attribution, payment, and third-party data flow actually enabled.

## Credential boundary

SDK keys and webhook secrets belong in the owner's provider configuration or environment-specific secret store. Do not put them in a public plugin, source control, code samples, or CI logs.

## Release boundary

Store policies, billing SDK versions, price rules, and regulatory requirements change. Use current official Apple, Google Play, and provider documentation before configuring a production product or making compliance claims.
