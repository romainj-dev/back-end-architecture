# Shared Package Runtime Strategy

This directory currently serves three different consumers:

1. **Next.js (`apps/web`)** – loads env helpers in `next.config.mjs` before
   the Next build even starts.
2. **Nest GraphQL MS (`apps/graphql-ms`)** – needs the same helpers before
   `ts-node-dev` spins up.
3. **Future CLIs/scripts** – will likely reuse the shared env + Supabase code
   without running a build first.

## Current Setup (TS-only)

Shared env helpers now ship as plain TypeScript sources; consumers load them via
ts-node/tsx or normal transpilation without committed JS/DTS artifacts.

## Long-Term Direction

Once Phase 2 stabilises we plan to treat `packages/shared` like a proper
package:

1. Add a dedicated `tsconfig.json` with `"composite": true` and build targets.
2. Run `tsc -b packages/shared` (via Turborepo) to emit `.js` and `.d.ts`
   artifacts into `dist/`.
3. Update consumers to import from the compiled output instead of the source
   files (optionally using TS project references for type safety).
4. Drop the committed artifacts from source control so only the `.ts` files
   remain.

This adds a build/ watch step but removes the manual sync burden and lets ESLint
operate solely on authored TypeScript. We'll switch to this approach once we
introduce more shared modules or need to publish the package externally.
