# Master Plan: Next.js + Nest.js Platform

## Phase 1 · Workspace & Tooling Foundation

1. **Bootstrap Turborepo Workspace**

- Run `npx create-turbo@latest` (or manual init) choosing `pnpm`; remove sample apps and commit base `turbo.json` with tasks (`dev`, `build`, `lint`, `test`).
- Configure caching (local + optional remote) and set up CI defaults in `turbo.json`.

2. **Initialize Monorepo Skeleton**

- Create directories: `apps/web`, `apps/mesh-gateway`, `apps/user-graphql-ms`, `apps/plan-graphql-ms`, `apps/auth-ms`, `apps/upload-ms`, `packages/shared`, `packages/config`.
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

- Scaffold GraphQL Nest apps (`apps/user-graphql-ms`, `apps/plan-graphql-ms`) with GraphQL modules, Supabase client, and Zod-based DTO validation.
- Implement initial CRUD resolvers for core entities and confirm Supabase RLS alignment.
- Add integration tests hitting the GraphQL endpoints plus lint/test CI jobs for these services.

## Phase 3 · Next.js BFF & GraphQL Client Integration (IMPLEMENTED · CANCELLED/TO BE REPLACED)

- Was: Next.js BFF using Apollo/WunderGraph client against GraphQL MS, SSR patterns, shared types, auth proxying.
- Status: superseded by Mesh gateway plan below; kept for historical reference (no WunderGraph in current flow).

## Phase 3b · Public GraphQL via Mesh Gateway (current plan)

- Expose a single public GraphQL endpoint using GraphQL Mesh.
- Mesh sources: `user` and `plan` GraphQL services (`apps/user-graphql-ms`, `apps/plan-graphql-ms`); `upload` Connect/gRPC service via proto descriptors.
- Implement subscription handlers bridging backend streams (upload progress, project/dashboard events) to GraphQL subscriptions (WS/SSE).
- Point `apps/web` GraphQL client + TanStack Query to the Mesh endpoint; keep operation documents aligned with a future federation-friendly schema.
- Remove legacy WunderGraph/BFF remnants; rely on Mesh + Next.js proxy for CORS-free browser calls.
- Frontend GraphQL codegen: `pnpm graphql:codegen:web` (builds Mesh schema, then generates types from `apps/web/graphql/*.graphql`).
- Proto/Connect codegen: `pnpm connect:codegen` (root) or `pnpm --filter @apply-mate/shared proto:generate`.

## Phase 4 · Federation Readiness (future)

- Keep Mesh schema modular to map cleanly to future subgraph boundaries.
- Plan migration to a federated router (Hive/Apollo/Cosmo) with Mesh- or Yoga-built subgraphs for non-GraphQL services.
- Add composition/checks in CI when the router is introduced; keep contracts/breaking-change checks on the roadmap.

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
