# ApplyMate Architecture (Phase 3b Snapshot – Mesh Gateway)

## Services

- **Web (`apps/web`)** – Next.js App Router UI. No longer a BFF; it consumes the public GraphQL Mesh gateway.
- **Mesh Gateway (`apps/mesh-gateway`)** – Public GraphQL endpoint (WS/SSE capable). Sources:
  - GraphQL services: `user` (`apps/user-graphql-ms`), `plan` (`apps/plan-graphql-ms`).
  - Connect/gRPC service: `upload` (via proto descriptors).
  - Bridges backend streams to GraphQL subscriptions.
- **User GraphQL MS (`apps/user-graphql-ms`)** – Nest.js service exposing:
  - GraphQL (`/graphql`) with code-first schema generation (`schema.gql` synced to `packages/shared/graphql/user-schema.gql`).
  - tRPC (`/trpc`) for internal calls if needed.
- **Plan GraphQL MS (`apps/plan-graphql-ms`)** – Nest.js service exposing:
  - GraphQL (`/graphql`) with code-first schema generation (`schema.gql` synced to `packages/shared/graphql/plan-schema.gql`).
- **Upload MS (`apps/upload-ms`)** – Will speak Connect/gRPC using `packages/shared/proto/upload/v1/upload.proto`.
- **Auth MS** – Placeholder; to be integrated later.
- **GraphQL MS (legacy, `apps/graphql-ms`)** – Monolithic GraphQL service kept temporarily for reference; superseded by the split user/plan services.

## Shared Packages

- `packages/shared/env` – Zod schema validation (`envSchema`, `publicEnvSchema`) and shared env file path utilities (`envFilePaths`). All services use this for consistent env loading and validation.
- `packages/shared/schemas` – Source of truth for domain objects (`user`, `plan`, etc.).
- `packages/shared/db` – Supabase client factories (public + admin) with type-safe helpers.
- `packages/shared/proto` – Protobuf contracts (user, upload) used by Nest + Connect handlers.
- `packages/shared/connect/gen` – Buf-generated Connect clients (currently only `upload`), used by Mesh for upload streaming.
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

All environment variables are validated at build/runtime using Zod schemas in `packages/shared/env/env-schema.ts`. Services load env files from the repository root in this order:

1. `.env.${NODE_ENV}.local` (e.g., `.env.development.local`)
2. `.env.${NODE_ENV}` (e.g., `.env.development`)
3. `.env.local`
4. `.env`

### Required Variables

| Key                         | Purpose                                   |
| --------------------------- | ----------------------------------------- |
| `SUPABASE_URL`              | Supabase project URL (server-side only)   |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side key for CRUD                  |
| `NEXT_PUBLIC_APP_URL`       | Allowed origin for GraphQL services CORS  |
| `MESH_GATEWAY_PORT`         | Mesh gateway HTTP port (default `4103`)   |
| `USER_GRAPHQL_MS_PORT`      | User service HTTP port (default `4101`)   |
| `PLAN_GRAPHQL_MS_PORT`      | Plan service HTTP port (default `4102`)   |
| `UPLOAD_MS_PORT`            | Upload service gRPC port (default `4200`) |

### Environment Loading

- **Nest services**: Use `@nestjs/config` with `ConfigModule.forRoot()` configured to load root-level env files and validate via the shared Zod schema.
- **Mesh gateway**: Loads and validates env in `.meshrc.ts` during build/start.
- **Next.js web**: Uses `parsePublicEnv()` from `@shared/env` for public variables.

All services share the same env file location (repo root) and validation schema, ensuring consistency across the monorepo.

## Phase 3b: Mesh Gateway (current)

- Public GraphQL endpoint provided by Mesh; web app consumes it directly with TanStack Query + GraphQL client (browser hits `/api/mesh/graphql` via Next.js proxy to avoid CORS).
- Mesh bridges:
  - GraphQL sources: user, plan.
  - Connect/gRPC source: upload (proto-driven).
- Subscriptions: Mesh adapts service streams (e.g., upload progress) to GraphQL WS/SSE subscriptions.
- Auth/CORS: terminated at Mesh; downstream services can rely on internal credentials or forwarded tokens.
- Downstream protocol mix: HTTP/GraphQL for user/plan; Connect/gRPC for upload.

### Mapping Mesh sources to future federation subgraphs

- `UserService` → future `user` subgraph (native GraphQL).
- `PlanService` → future `plan` subgraph (native GraphQL).
- `UploadService` → future adapter subgraph (Mesh/Yoga wrapper) exposing GraphQL types + subscriptions over the Connect stream.
- Keep Mesh SDL modular so a federated router can compose these subgraphs with minimal reshaping; align types/boundaries with planned subgraph ownership.

### Scripts (Mesh + codegen)

| Command                                           | Purpose                                                |
| ------------------------------------------------- | ------------------------------------------------------ |
| `pnpm dev:mesh`                                   | Run Mesh gateway locally (port 4103)                   |
| `pnpm mesh:build`                                 | Build Mesh gateway config/artifacts                    |
| `pnpm graphql:codegen:web`                        | Build Mesh schema then generate frontend GraphQL types |
| `pnpm connect:codegen`                            | Generate Connect RPC types from proto                  |
| `pnpm --filter @apply-mate/shared proto:generate` | Same, scoped to shared pkg                             |

## Phase 4: Federation Readiness (future)

- Plan to replace Mesh gateway with a federated router (Hive/Apollo/Cosmo) when team boundaries/subgraphs stabilize.
- Non-GraphQL services will be wrapped as subgraphs (potentially using Mesh/Yoga) and composed in the router with schema checks/contracts.

---

Future phases will extend this document with additional entities, federation, and observability notes.

---

Future phases will extend this document with additional entities, federation, and observability notes.
