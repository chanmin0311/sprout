Clerk is already installed and connected. Wire it into the Next.js app: provider, auth pages, redirects, route protection, and user menu.

## Design

Override Clerk appearance variables using the app's existing CSS variables. Do not hardcode colors. If it is possible simply just implement Clerk into the existing components.

## Implementation

Wrap the root layout with `ClerkProvider`.

Implement sign-in and sign-out feature using Clerk components into existing components.

Use `proxy.ts` at the protect root, not `middleware.ts`.

Define public routes using the existing sign-in and sign-up env vars. Protect everything else by default.

Update `/`:

- authenticated users redirect to `/dashboard`
- unauthenticated users redirect to `/sign-in`

Add Clerk's built-in `UserButton` to the navbar right section for profile settings and logout.

Keep Clerk's default user menu profile flows intact. Do not rebuild or heavily customize Clerk internals.

Use existing Clerk env vars. Do not rename or invent new ones.

## Dependencies

install: @clerk/ui.

## Check When Done

- `proxy.ts` exists at the root
- all routes are protected except public auth paths.
- auth pages use CSS variables with no hardcoded colors
- `ClerkProvider` wraps the root layout
- `npm run build` passes
