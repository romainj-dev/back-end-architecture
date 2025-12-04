# Phase 3 Follow-Up Items

The review of Phase 3 uncovered a few gaps compared to `plan.md` and the
Cosmo Studio reference implementation. Each numbered item below describes
the delta, desired end state, and suggested implementation notes so they
can be addressed individually.

1. **SSR caching parity**
   - _Current_: `apps/web/app/page.tsx` prefetches TanStack Query data but
     never wraps the fetch in `cache()`/`unstable_cache`, so Next.js has no
     visibility into revalidation.
   - _Goal_: Expose a cached server helper (e.g., `getPlansCached =
cache(fetchPlansServer, queryKeys.plans.list())`) and call
     `revalidateTag`/`revalidatePath` in admin flows to mirror the plan’s
     “demonstrate caching” requirement.
   - _Hints_: Cosmo’s landing pages typically wrap `fetch` with cache tags;
     follow the same pattern so SSR and CSR share invalidation knobs.

2. **Auth/session propagation**
   - _Current_: `/api/connect/[...connect]` copies request headers but
     never forwards auth, organization, or tracing headers into
     `listPlans()`/`graphqlRequest`, and the GraphQL helper uses
     `process.env` directly instead of `@shared/env`.
   - _Goal_: Hydrate env once (`loadEnv()`), extract cookies + headers from
     the original `Request`, and pass them through the Connect router so the
     GraphQL MS can enforce RLS and auditing.
   - _Hints_: Cosmo injects session info via Connect interceptors (client)
     and server-side router middleware; mirror that by adding an auth
     interceptor to `planClient` and by forwarding headers in
     `plan-service.ts`.

3. **Structured logging & error surfaces**
   - _Current_: Failures in `plan-service.ts` throw plain `Error`, so the
     client only sees generic messages; the Connect route has no logging.
   - _Goal_: Wrap downstream failures with `ConnectError` + codes, log via
     a shared logger (console in dev, future observability hook in prod),
     and include request metadata similar to Cosmo’s server router.
   - _Hints_: Import `ConnectError`/`Code` from `@connectrpc/connect` and
     centralize logging in `apps/web/lib/connect/server-logger.ts`.

4. **Connect Query integration & key alignment**
   - _Current_: Hooks hand-roll `useQuery` + string keys, while
     `HydrationBoundary` uses a literal `['plans']`, so key drift is
     possible. We also skip `@connectrpc/connect-query`, which Cosmo uses
     for generated hooks.
   - _Goal_: Adopt `createConnectQueryKey`/generated hooks (or at least
     share a single `queryKeys.plans.list()` for both SSR prefetch and the
     client hook) to stay in sync with Cosmo’s router/data layer.
   - _Hints_: Generate Connect Query clients during `connect:codegen` and
     refactor `usePlansQuery` to the generated helper for automatic keys
     and streaming support.

5. **Supabase migration completeness**
   - _Current_: `supabase/migrations/20251203102356_create_plans_table.sql`
     is empty, so contributors cannot reproduce the `plans` table schema.
   - _Goal_: Fill the migration with the documented columns (`id`, `code`
     unique, `price`, timestamps) plus sensible defaults, matching the
     Zod/proto contracts.
   - _Hints_: Use `uuid` PK, `text` code with unique constraint, `integer`
     price, and `timestamptz` columns with `now()` defaults to mirror
     Supabase conventions.

6. **Testing / validation coverage**
   - _Current_: Phase 3 docs describe manual validation, but there are no
     automated checks ensuring `/api/connect/.../ListPlans` stays in sync
     with the GraphQL MS or Supabase schema.
   - _Goal_: Add at least one integration or contract test (e.g., hitting
     the Connect route with a mocked GraphQL MS) and document the workflow
     in `docs/web/bff.md`.
   - _Hints_: Consider a Vitest setup using `createConnectRouter` +
     mocked `graphqlRequest`, or end-to-end Playwright coverage once auth
     flows exist.

Addressing these items will bring Phase 3 fully in line with the plan and
the Cosmo Studio conventions we are mirroring.
