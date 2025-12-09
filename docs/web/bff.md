# Web Architecture – Mesh Gateway (Current)

The web app calls a single public GraphQL endpoint exposed by the Mesh gateway. Browser requests hit the Next.js same-origin proxy at `/api/mesh/graphql`, which forwards to Mesh. Mesh fans out to downstream services over GraphQL (user, plan) and Connect/gRPC (upload), and adapts streaming to GraphQL subscriptions.

## Overview

- Public entrypoint: Mesh gateway (`apps/mesh-gateway`), proxied from `/api/mesh/graphql`.
- Downstream protocols: GraphQL (user, plan) and Connect/gRPC (upload).
- Streaming: Upload progress is streamed from the Connect service and exposed as a GraphQL subscription (`uploadStatus`) over WS/SSE.
- Federation alignment: Mesh sources map 1:1 to future subgraphs (user, plan, upload-adapter). Keep SDL modular to ease router adoption.

## File Structure (relevant parts)

```
apps/web/
├── lib/graphql/client.ts          # Calls Mesh (proxy in browser, direct in SSR)
├── graphql/operations.graphql     # Frontend operations (Mesh schema)
├── graphql/generated/types.ts     # Generated types from Mesh schema
├── hooks/queries/use-plans-query.ts # Uses Mesh GET_PLANS via TanStack Query

apps/mesh-gateway/
├── .meshrc.ts                     # Mesh config (user, plan GraphQL; upload Connect)
├── mesh.resolvers.ts              # Upload subscription adapter (Connect -> GraphQL)

packages/shared/
├── proto/upload/v1/upload.proto   # Connect/gRPC contract for upload
├── connect/gen/upload/v1/         # Generated Connect client (used by Mesh)
└── graphql/                       # Schemas synced from user/plan services
```

## Data Flow

```
Browser → Next.js proxy (/api/mesh/graphql) → Mesh Gateway
  → user/plan over GraphQL
  → upload over Connect/gRPC (stream → GraphQL subscription)
```

## Codegen

- Mesh build: `pnpm mesh:build`
- Frontend GraphQL types: `pnpm graphql:codegen:web` (builds Mesh schema, generates types)
- Connect (upload) codegen: `pnpm connect:codegen` or `pnpm --filter @apply-mate/shared proto:generate`

## Streaming

- Mesh subscription `uploadStatus` is backed by the Connect upload stream and exposed over WS/SSE.

## Federation Notes

- Treat each Mesh source as a future subgraph:
  - `UserService` → `user` subgraph (native GraphQL)
  - `PlanService` → `plan` subgraph (native GraphQL)
  - `UploadService` → adapter subgraph exposing GraphQL over the Connect stream
- Keep contracts (types/boundaries) aligned with intended subgraph ownership to minimize reshaping during router adoption.

# Web Architecture – Legacy BFF (Deprecated) and Current Mesh Gateway

This document captures the earlier Connect RPC + TanStack Query BFF used in `apps/web`. It is kept for reference. The current public entrypoint is the Mesh gateway (GraphQL) and the web app now calls Mesh directly (via the `/api/mesh/graphql` proxy). Remove or refactor BFF pieces as Mesh adoption completes.

## Current (Mesh) overview

- Public GraphQL endpoint: Mesh gateway (`apps/mesh-gateway`), exposed via Next.js proxy at `/api/mesh/graphql`.
- Downstream protocols: GraphQL (user, plan) + Connect/gRPC (upload).
- Streaming: Mesh adapts Connect upload stream to a GraphQL subscription (`uploadStatus`) over WS/SSE.
- Future federation: Mesh source boundaries map 1:1 to future subgraphs (user, plan, upload-adapter).

## Legacy BFF Overview (for reference)

The web app uses a **Backend-for-Frontend (BFF)** pattern where:

1. **Connect RPC** provides type-safe API routes at `/api/connect/[...connect]`
2. **TanStack Query** manages client-side caching, loading states, and refetching
3. **SSR Prefetch** hydrates data server-side for instant page loads
4. **GraphQL MS** is called by Connect services (not Supabase directly)

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser                                  │
│  ┌──────────────┐    ┌─────────────┐    ┌──────────────────┐   │
│  │ pricing.tsx  │───▶│ usePlansQuery│───▶│ TanStack Query   │   │
│  │ (Client)     │    │ (Hook)       │    │ Cache            │   │
│  └──────────────┘    └─────────────┘    └────────┬─────────┘   │
└───────────────────────────────────────────────────┼─────────────┘
                                                    │
                                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Next.js Server                              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ /api/connect/[...connect]/route.ts (ConnectRouter)       │   │
│  │  └─▶ plan-service.ts ─▶ GraphQL MS ─▶ Supabase          │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## File Structure

```
apps/web/
├── app/
│   ├── api/connect/[...connect]/
│   │   └── route.ts           # Connect RPC gateway (ConnectRouter)
│   └── page.tsx               # SSR prefetch with HydrationBoundary
├── components/
│   ├── providers/
│   │   └── query-provider.tsx # TanStack Query + Connect providers
│   └── pricing.tsx            # Client component using usePlansQuery
├── hooks/queries/
│   └── use-plans-query.ts     # connect-query hook (PlanService)
├── lib/
│   ├── connect/
│   │   ├── cached-server.ts   # Next.js unstable_cache helpers
│   │   ├── client.ts          # Browser Connect client (promise)
│   │   ├── context.ts         # Header/auth propagation helpers
│   │   ├── errors.ts          # ConnectError wrappers
│   │   ├── interceptors.ts    # Auth, org, tracing, logging interceptors
│   │   ├── revalidate.ts      # Server actions for cache invalidation
│   │   ├── server-logger.ts   # Structured logging utilities
│   │   └── server.ts          # Re-export of server helpers
│   ├── graphql/
│   │   └── client.ts          # GraphQL MS client
│   └── query-keys.ts          # connect-query + manual query keys
└── server/connect/
    └── plan-service.ts        # Service implementation (calls GraphQL MS)

packages/shared/
├── connect/gen/               # Buf-generated Connect clients (upload only)
│   └── upload/v1/
│       ├── upload_pb.ts
│       └── upload_connect.ts
├── proto/
│   ├── buf.yaml               # Buf module config
│   ├── buf.gen.yaml           # Buf codegen config
│   └── upload/v1/upload.proto # Connect/gRPC (Mesh uses this)
└── schemas/
    └── plan.ts                # Zod schema for validation
```

## Proto & Codegen (Buf-driven)

### Running Codegen

```bash
# From repo root
pnpm connect:codegen

# Or from shared package
cd packages/shared
pnpm proto:generate
```

### Adding a New Service

1. **Create the proto file** at `packages/shared/proto/{service}/v1/{service}.proto`:

```protobuf
syntax = "proto3";

package item.v1;

message ListItemsRequest {}

message Item {
  string id = 1;
  string name = 2;
}

message ListItemsResponse {
  repeated Item items = 1;
}

service ItemService {
  rpc ListItems(ListItemsRequest) returns (ListItemsResponse);
}
```

2. **Run codegen**:

```bash
pnpm connect:codegen
```

3. **Create the service handler** at `apps/web/server/connect/{service}-service.ts`:

```typescript
import { ListItemsResponse, Item } from '@rpc/item/v1/item_pb'
import { graphqlRequest, GET_ITEMS } from '@/lib/graphql/client'
import type { ConnectContext } from '@/lib/connect/context'

export async function listItems(
  ctx?: ConnectContext
): Promise<ListItemsResponse> {
  const data = await graphqlRequest<{ items: Item[] }>(GET_ITEMS, undefined, {
    headers: ctx?.headers,
  })
  return new ListItemsResponse({
    items: data.items.map((item) => new Item(item)),
  })
}
```

4. **Register in the Connect router** (`apps/web/app/api/connect/[...connect]/route.ts`):

```typescript
router.service(ItemService, {
  listItems: async (_req, ctx) => listItems(ctx),
})
```

5. **Add query key factories** to `lib/query-keys.ts`:

```typescript
const listItemsDescriptor = listItems // generated connect-query symbol

export const queryKeys = {
  items: {
    all: ['items'] as const,
    list: () => [...queryKeys.items.all, 'list'] as const,
  },
}

export const connectQueryKeys = {
  items: {
    list: () => createConnectQueryKey(listItemsDescriptor, {}),
  },
}
```

6. **Create the query hook** at `apps/web/hooks/queries/use-items-query.ts`:

```typescript
'use client'

import { useQuery } from '@connectrpc/connect-query'
import { listItems } from '@rpc/item/v1/item-ItemService_connectquery'

export function useItemsQuery() {
  return useQuery(listItems, {})
}
```

## Data Flow Chain

The implementation maintains the proper chain:

```
Browser → Connect Client → /api/connect → plan-service → GraphQL MS → Supabase
```

This ensures:

- Auth policies are applied at GraphQL MS
- Validation happens via shared schemas
- Single source of truth for data access

## Interceptors

### Auth Interceptor

```typescript
import { authInterceptor } from '@/lib/connect/interceptors'

const transport = createConnectTransport({
  baseUrl: '/api/connect',
  interceptors: [authInterceptor(() => getAccessToken())],
})
```

### Logging Interceptor

Automatically logs Connect requests in development:

```typescript
import { loggingInterceptor } from '@/lib/connect/interceptors'
```

## Query Keys & connect-query

- `queryKeys` – deterministic string arrays for legacy React Query usage and cache tagging.
- `connectQueryKeys` – generated via `createConnectQueryKey()` so SSR prefetch uses the same keys as `@connectrpc/connect-query`.

```typescript
export const queryKeys = {
  plans: {
    all: ['plans'] as const,
    list: () => [...queryKeys.plans.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.plans.all, 'detail', id] as const,
  },
}

export const connectQueryKeys = {
  plans: {
    list: () => createConnectQueryKey(listPlans, {}),
  },
}
```

## Caching & Revalidation

- `getPlansCached` / `getPlansResponseCached` wrap `listPlans` with `unstable_cache`, tag output (`plans`, `plans-list`), and limit revalidation windows.
- Server actions in `lib/connect/revalidate.ts` expose `revalidatePlans`, `revalidateAllPlans`, `revalidateHomePage`, etc. for admin flows or mutations.
- Use `fetchPlansUncached` only when fresh data is required (e.g., immediately after a mutation before invalidation propagates).

## Context & Logging

- `/api/connect/[...connect]/route.ts` injects a per-request `ConnectContext` via `connectNodeAdapter({ createContext })`, ensuring headers/auth metadata stay isolated even under concurrency.
- `apps/web/lib/connect/context.ts` defines the context shape and header extraction logic (auth, org, tracing, cookies).
- `apps/web/lib/connect/server-logger.ts` consumes the context for structured logs (requestId, userId, orgId) and exposes helpers (`createServiceLogger`, `logRequestStart/Success/Error`).
- Service implementations (e.g., `plan-service.ts`) accept the context and forward `ctx.headers` to `graphqlRequest`, so Supabase RLS policies see the original user/session.

## SSR Prefetch

```typescript
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getPlansResponseCached } from '@/lib/connect/cached-server'
import { connectQueryKeys } from '@/lib/query-keys'

export default async function Page() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: connectQueryKeys.plans.list(),
    queryFn: getPlansResponseCached,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Pricing />
    </HydrationBoundary>
  )
}
```

## Testing

### Manual Validation

1. Start GraphQL MS: `pnpm dev:graphql-ms`
2. Start web: `pnpm dev:web`
3. Visit the pricing section
4. Open DevTools Network tab - verify `/api/connect/...` calls
5. Check TanStack Query Devtools (bottom-left in dev mode)

## Troubleshooting

| Issue                          | Solution                                         |
| ------------------------------ | ------------------------------------------------ |
| "Failed to load plans"         | Check GraphQL MS is running, verify connection   |
| Type errors after proto change | Run `pnpm connect:codegen`                       |
| SSR not working                | Ensure `HydrationBoundary` wraps the component   |
| Query key mismatch             | Use `queryKeys.*` factory, not hardcoded strings |
