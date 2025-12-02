# Master Plan: Next.js + Nest.js Platform

## Phase 1 · Workspace & Tooling Foundation

1. **Bootstrap Turborepo Workspace**

- Run `npx create-turbo@latest` (or manual init) choosing `pnpm`; remove sample apps and commit base `turbo.json` with tasks (`dev`, `build`, `lint`, `test`).
- Configure caching (local + optional remote) and set up CI defaults in `turbo.json`.

2. **Initialize Monorepo Skeleton**

- Create directories: `apps/web`, `apps/graphql-ms`, `apps/auth-ms`, `apps/upload-ms`, `apps/wundergraph`, `packages/shared`, `packages/config`.
- Wire root `package.json` scripts (`pnpm dev:web`, etc.) and workspace dependencies; ensure path aliases resolve via `tsconfig.base.json`.

3. **Baseline App Scaffolds**

- Scaffold Next 14 app in `apps/web` (strict TS, App Router) and minimal Nest apps for each microservice with empty modules.
- Share Supabase client placeholder via `packages/shared/db` but keep env usage abstracted.

4. **Shared Tooling & Config**

- Move tsconfig/eslint/prettier/jest presets into `packages/config`; set strict mode, path aliases (`@/`, `@ms/`, `@shared/`).
- Add lint/test tasks to Turborepo pipeline; optionally configure Husky + lint-staged.

5. **Environment & Documentation Setup**

- Build `packages/shared/env` with Zod schema + helpers for Next/Nest runtimes.
- Author `.env.example`, `docs/architecture.md` (skeleton), and `docs/dev-workflow.md` documenting workspace bootstrapping.

## Phase 2 · GraphQL Microservice Baseline

- Scaffold `apps/graphql-ms` Nest app with GraphQL module, Supabase client, and Zod-based DTO validation.
- Implement initial CRUD resolvers for a core entity (e.g., Projects) and confirm Supabase RLS alignment.
- Add integration tests hitting the GraphQL endpoint plus lint/test CI job for this service.

## Phase 3 · Next.js BFF & GraphQL Client Integration

- Update `apps/web` to use Apollo (or WunderGraph client) in server components/BFF routes, consuming the GraphQL MS.
- Add SSR data fetching patterns, caching policy, and shared TypeScript types generated from the GraphQL schema (`packages/shared/graphql-types`).
- Document how Next proxies auth headers/session context to backend calls.

## Phase 4 · Federation via WunderGraph

- Introduce WunderGraph gateway (inside `apps/wundergraph`) federating the GraphQL MS plus placeholder schemas for auth/upload.
- Configure schema stitching, persisted queries, and CI checks for schema composition.
- Update Next.js client to hit the WunderGraph endpoint and regenerate types.

## Phase 5 · Additional Microservices & Protocols

- Scaffold `apps/auth-ms` and `apps/upload-ms` (Nest) with REST/GraphQL adapters disabled by default but structure ready.
- Define protobuf contracts in `packages/shared/proto` and enable Nest gRPC transport; add a sample Python worker consuming the same proto.
- Introduce selective tRPC routers (either in Next or Nest) for internal ops/admin features and share Zod schemas from `packages/shared/schemas`.

## Phase 6 · Cross-Cutting Concerns & Documentation

- Implement observability stack (OpenTelemetry traces across Next, Nest, Python) and centralized logging.
- Finalize authentication strategy (JWT, Supabase Auth, or custom service) and propagate context through GraphQL/tRPC/gRPC calls.
- Write architecture docs covering request flows, service boundaries, dev scripts, and deployment guidelines (e.g., `docs/architecture.md`).

## Phase 7 · Hardening & Rollout

- Add contract tests for GraphQL schema, tRPC routers, and protobuf services.
- Set up CI/CD pipelines per app plus dependency caching.
- Plan incremental rollout + feature flags, capture TODOs for future optimizations (e.g., GraphQL cost limits, upload virus scanning).
