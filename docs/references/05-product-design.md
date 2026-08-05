# Product design and quality baseline

Design the first release around one repeated outcome. Avoid adding advanced native capabilities just because they are available.

## Workflow

1. Map the primary user journey: first launch, first value, routine use, recovery from error, and exit or account deletion if applicable.
2. Specify loading, empty, offline, permission-denied, error, and retry states before implementation.
3. Use platform conventions where they make the task easier: accessible labels, adequate hit targets, dynamic type/font scaling, keyboard navigation, reduced motion, contrast, and screen-reader semantics.
4. Make iOS and Android differences intentional instead of forcing identical behavior where platform expectations differ.
5. Define unit, integration, and device/simulator checks that prove the core journey works.

## Sensitive product areas

If the app handles health, finance, children, location, user-generated content, or external AI processing, establish a data and safety design before building. Use synthetic or redacted examples for demonstrations; do not paste customer data into an unapproved model or tool.
