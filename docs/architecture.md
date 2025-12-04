# ApplyMate Architecture (Phase 3 Snapshot)

## Services

- **Web (`apps/web`)** – Next.js App Router UI acting as BFF for browser traffic.
- **GraphQL MS (`apps/graphql-ms`)** – Nest.js service exposing:
  - GraphQL (`/graphql`) with code-first schema generation (`schema.gql` synced to `packages/shared/graphql/`).
  - tRPC (`/trpc`) for type-safe internal calls from Next.js routes.
  - gRPC (`user.UserService` on `GRAPHQL_MS_GRPC_URL`) for cross-language consumers.
- **Auth / Upload MS** – placeholders; will integrate once user-facing primitives are stable.

## Shared Packages

- `packages/shared/env` – Zod runtime validation for every environment plus helpers such as `loadGraphqlServiceEnv`.
- `packages/shared/schemas` – Source of truth for domain objects (`user`, `plan`, etc.).
- `packages/shared/db` – Supabase client factories (public + admin) with type-safe helpers.
- `packages/shared/proto` – Protobuf contracts used by Nest + future Connect RPC handlers.
- `packages/shared/connect/gen` – Buf-generated TypeScript clients (`*_pb.ts`, `*_connect.ts`, `*_connectquery.ts`).
- `packages/shared/graphql` – Generated GraphQL schema for codegen consumers.

## Core Entity Contracts

### User

| Field       | Type                      | Notes                               |
| ----------- | ------------------------- | ----------------------------------- |
| `id`        | `string` (UUID)           | Supabase auth user id               |
| `email`     | `string` (email)          | Primary identifier                  |
| `fullName`  | `string`                  | Display name                        |
| `avatarUrl` | `string \| null`          | Optional CDN URL                    |
| `jobTitle`  | `string \| null`          | Optional headline                   |
| `metadata`  | `Record<string, unknown>` | Free-form JSON, serialized for gRPC |
| `createdAt` | `Date`                    | ISO timestamp                       |
| `updatedAt` | `Date`                    | ISO timestamp                       |

### Plan

| Field       | Type     | Notes                             |
| ----------- | -------- | --------------------------------- |
| `id`        | `string` | UUID from Supabase                |
| `code`      | `string` | Unique identifier (FREE, PREMIUM) |
| `price`     | `number` | Monthly price in USD              |
| `createdAt` | `Date`   | ISO timestamp                     |
| `updatedAt` | `Date`   | ISO timestamp                     |

All protocols (GraphQL/tRPC/gRPC/Connect) hydrate from the shared Zod schemas, ensuring consistent validation.

## Data Flow (GraphQL Services)

1. **GraphQL** – Resolvers (users, plans, etc.) forward inputs to Nest services, which validate via Zod and call Supabase-backed repositories.
2. **tRPC** – Requests hit `/trpc`, share the same services, and reuse shared schemas for IO validation.
3. **gRPC** – Controllers map Nest DTOs to protobuf messages defined in `packages/shared/proto/**`.
4. **Supabase** – Repositories execute CRUD operations using the service role key (RLS-protected tables).

## Environment Variables

| Key                             | Purpose                                    |
| ------------------------------- | ------------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL                       |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public client key                          |
| `SUPABASE_SERVICE_ROLE_KEY`     | Server-side key for CRUD                   |
| `NEXT_PUBLIC_APP_URL`           | Allowed origin for GraphQL MS CORS         |
| `GRAPHQL_MS_PORT`               | HTTP port (default `4000`)                 |
| `GRAPHQL_MS_GRPC_URL`           | gRPC bind target (default `0.0.0.0:50051`) |

Populate these keys via the root `env.example` → `.env` workflow so every service (Next.js, GraphQL MS, future workers) reads from the same canonical source.

## Phase 3: Connect RPC + TanStack Query

Phase 3 introduced a Cosmo-style BFF (Backend-for-Frontend) stack for `apps/web`.

### New Components

- **Connect RPC Gateway** (`apps/web/app/api/connect/[...connect]/route.ts`) – Uses `connectNodeAdapter` with a per-request `createContext` hook to expose Connect services via `/api/connect`.
- **Server Connect services** (`apps/web/server/connect/**`) – Call the GraphQL MS (never Supabase directly), forward auth headers, and convert results to protobuf messages.
- **TanStack Query + connect-query** – `QueryProvider` composes `QueryClientProvider` and `TransportProvider`, while hooks (e.g., `usePlansQuery`) rely on generated `listPlans` descriptors for automatic query keys.
- **Caching helpers** – `lib/connect/cached-server.ts` wraps Connect calls with `unstable_cache`, and `lib/connect/revalidate.ts` exposes server actions for cache invalidation.
- **Connect codegen scripts** – `pnpm connect:codegen` (root) and `pnpm --filter @apply-mate/shared proto:generate` keep generated clients in sync.

### Data Flow (Phase 3)

```
Browser (usePlansQuery via connect-query)
   └─▶ /api/connect/.../ListPlans (ConnectRouter + createContext)
         └─▶ apps/web/server/connect/plan-service.ts
               └─▶ GraphQL MS (PlanResolver → PlanService → Supabase)
                     └─▶ Supabase plans table (RLS-enabled)

SSR Prefetch:
app/page.tsx → QueryClient.prefetchQuery(connectQueryKeys.plans.list)
   └─▶ getPlansResponseCached() → listPlans() → cached ListPlansResponse
   └─▶ HydrationBoundary + React Query cache state
```

### Scripts

| Command                           | Purpose                               |
| --------------------------------- | ------------------------------------- |
| `pnpm connect:codegen`            | Generate Connect RPC types from proto |
| `pnpm --filter web proto:codegen` | Same, scoped to web                   |

See [`docs/web/bff.md`](./web/bff.md) for detailed implementation guide.

---

Future phases will extend this document with additional entities, federation, and observability notes.
