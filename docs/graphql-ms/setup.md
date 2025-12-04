# GraphQL Microservice · Setup Guide

## Prerequisites

- Node.js 20+
- `pnpm` (repo enforces `pnpm@9.12.2`)
- Supabase project with a `users` table containing:
  - `id (uuid primary key)`
  - `email (text)`
  - `full_name (text)`
  - `avatar_url (text, nullable)`
  - `job_title (text, nullable)`
  - `metadata (jsonb, nullable)`
  - `created_at / updated_at (timestamptz, default now())`

## Environment Variables

Copy `env.example` at the repo root to `.env` and fill in the values (placeholders shown below):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=public-anon-key
SUPABASE_SERVICE_ROLE_KEY=service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
GRAPHQL_MS_PORT=4000
GRAPHQL_MS_GRPC_URL=0.0.0.0:50051
```

The shared loader (`packages/shared/env`) validates these at runtime. Missing or invalid values will crash the service with a descriptive error.

## Local Development

```bash
# Run only the GraphQL microservice
pnpm --filter graphql-ms dev

# Build / lint / test
pnpm --filter graphql-ms build
pnpm --filter graphql-ms lint
pnpm --filter graphql-ms test
```

The dev server starts:

- GraphQL at `http://localhost:${GRAPHQL_MS_PORT}/graphql`
- tRPC at `http://localhost:${GRAPHQL_MS_PORT}/trpc`
- gRPC on `${GRAPHQL_MS_GRPC_URL}` (default `0.0.0.0:50051`)

## Schema Sync

Whenever the service runs, it regenerates `apps/graphql-ms/schema.gql`. Copy the latest schema into `packages/shared/graphql/schema.gql` (for client type-gen) via:

```bash
pnpm --filter graphql-ms sync-schema
```

This command runs automatically after `pnpm --filter graphql-ms build`.

## Example Operations

### GraphQL

```graphql
query Users {
  users(limit: 10) {
    id
    fullName
    email
    avatarUrl
    metadata
  }
}
```

```graphql
mutation CreateUser($input: CreateUserRequest!) {
  createUser(input: $input) {
    id
    email
  }
}
```

### tRPC

Use `@trpc/client` in Next.js:

```ts
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@/apps/graphql-ms/trpc/router'

const client = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: 'http://localhost:4000/trpc' })],
})

await client.user.create.mutate({
  email: 'jane@example.com',
  fullName: 'Jane Example',
})
```

### gRPC

Proto lives at `packages/shared/proto/user/v1/user.proto`. Example invocation using `grpcurl`:

```bash
grpcurl -plaintext -d '{"id":"user-123"}' \
  -import-path packages/shared/proto \
  -proto user/v1/user.proto \
  localhost:50051 user.UserService/GetUserById
```

## Testing Strategy

- `apps/graphql-ms/src/user/user.service.spec.ts` – unit tests for domain logic.
- Future phases will add integration tests that spin up Supabase Test containers.

Run the suite with `pnpm --filter graphql-ms test`.
