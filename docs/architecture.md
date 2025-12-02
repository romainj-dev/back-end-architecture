# ApplyMate Architecture (Phase 2 Snapshot)

## Services

- **Web (`apps/web`)** – Next.js App Router UI acting as BFF for browser traffic.
- **GraphQL MS (`apps/graphql-ms`)** – Nest.js service exposing:
  - GraphQL (`/graphql`) with code-first schema generation (`schema.gql` synced to `packages/shared/graphql/`).
  - tRPC (`/trpc`) for type-safe internal calls from Next.js routes.
  - gRPC (`user.UserService` on `GRAPHQL_MS_GRPC_URL`) for cross-language consumers.
- **Auth / Upload MS** – placeholders; will integrate once user-facing primitives are stable.

## Shared Packages

- `packages/shared/env` – Zod runtime validation for every environment plus helpers such as `loadGraphqlServiceEnv`.
- `packages/shared/schemas` – Source of truth for domain objects (currently `user`).
- `packages/shared/db` – Supabase client factories (public + admin) with type-safe helpers.
- `packages/shared/proto` – Protobuf contracts used by Nest + future Python workers.
- `packages/shared/graphql` – Generated schemas for GraphQL client tooling.

## User Entity Contract

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

All protocols (GraphQL/tRPC/gRPC) hydrate from the shared Zod schema, ensuring consistent validation.

## Data Flow (Phase 2)

1. **GraphQL** – `UserResolver` forwards inputs to `UserService`, which validates via Zod and calls the Supabase-backed repository.
2. **tRPC** – Requests hit `/trpc`, share the same `UserService`, and reuse the shared schemas for IO validation.
3. **gRPC** – `UserGrpcController` maps Nest DTOs to protobuf messages defined in `packages/shared/proto/user.proto`.
4. **Supabase** – `SupabaseUserRepository` executes CRUD operations against the `users` table using the service role key.

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

Future phases will extend this document with additional entities, federation, and observability notes.
