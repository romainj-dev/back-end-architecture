# Shared Package Runtime Strategy

This directory currently serves three different consumers:

1. **Next.js (`apps/web`)** – loads env helpers in `next.config.mjs` before
   the Next build even starts.
2. **Nest GraphQL MS (`apps/graphql-ms`)** – needs the same helpers before
   `ts-node-dev` spins up.
3. **Future CLIs/scripts** – will likely reuse the shared env + Supabase code
   without running a build first.

## Current Setup (JS + DTS)

We check in paired `.js` and `.d.ts` files next to the TypeScript sources (for
example `env/load-root-env.{ts,js,d.ts}`) so Node can execute them immediately
while the rest of the repo is still TypeScript-first.

**Implications**

- No extra build step is required to run `pnpm dev` anywhere in the monorepo.
- Generated files live inside the repo, so lint/format hooks must ignore them
  (`packages/config/eslint/base.mjs` excludes `packages/shared/**/*.d.ts`).
- When a shared helper changes, we must keep the `.ts`, `.js`, and `.d.ts`
  versions in sync. This is tedious but acceptable for the handful of files we
  currently expose.

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
