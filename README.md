# ApplyMate Monorepo

ApplyMate helps job seekers craft AI-ready applications (resumes, cover letters,
status tracking) powered by custom workflows.

Phase 1 migrates the project into a Turborepo-managed workspace so we can grow
the Next.js BFF, Nest.js microservices, and shared tooling in lockstep.

## Tech Stack (current snapshot)

- **Frontend**: Next.js 16 (App Router, Server Components) in `apps/web`
- **Gateway**: GraphQL Mesh in `apps/mesh-gateway`
- **Services**: Nest.js for `user-graphql-ms`, `plan-graphql-ms`, `auth-ms`, `upload-ms`
- **Shared Code**: TypeScript + Zod helpers in `packages/shared`
- **Tooling**: Turborepo + pnpm, ESLint (flat config), Prettier, TypeScript

## Repository Layout

```
.
├── apps/
│   ├── web/             # Production Next.js application
│   ├── user-graphql-ms/ # User GraphQL Nest.js service
│   ├── plan-graphql-ms/ # Plan GraphQL Nest.js service
│   ├── auth-ms/         # Auth Nest.js service (placeholder)
│   ├── upload-ms/       # Upload Nest.js service (Connect/gRPC)
│   └── mesh-gateway/    # GraphQL Mesh gateway
├── packages/
│   ├── shared/          # Env + Supabase helpers, future shared libs
│   └── config/          # Centralized tsconfig/eslint/prettier presets
├── docs/                # Architecture & workflow docs
├── turbo.json           # Turborepo pipeline
├── tsconfig.base.json   # Root TS config with path aliases
├── pnpm-workspace.yaml  # Workspace definition
└── README.md
```

## Getting Started

1. **Install prerequisites**
   - Node.js ≥ 18.18
   - pnpm ≥ 9

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure environment variables**

   Create `.env` or `.env.local` in the repository root with the required variables:
   - `SUPABASE_URL` - Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
   - `NEXT_PUBLIC_APP_URL` - Frontend app URL (default: `http://localhost:3000`)
   - `MESH_GATEWAY_PORT` - Mesh gateway port (default: `4103`)
   - `USER_GRAPHQL_MS_PORT` - User GraphQL service port (default: `4101`)
   - `PLAN_GRAPHQL_MS_PORT` - Plan GraphQL service port (default: `4102`)
   - `UPLOAD_MS_PORT` - Upload service gRPC port (default: `4200`)

   All variables are validated at build/runtime using Zod schemas. See `docs/architecture.md` for details.

4. **Run targets**

- `pnpm dev:web` — Next.js frontend at http://localhost:3000
- `pnpm dev:mesh` — Mesh gateway at http://localhost:4103/graphql
- `pnpm dev:user-graphql-ms` — User GraphQL service at http://localhost:4101/graphql
- `pnpm dev:plan-graphql-ms` — Plan GraphQL service at http://localhost:4102/graphql
- `pnpm dev:auth-ms` — Auth microservice (placeholder)
- `pnpm dev:upload-ms` — Upload microservice (Connect/gRPC placeholder)

## Workspace Scripts

- `pnpm dev` — Run every `dev` task in parallel (Next + services)
- `pnpm build | lint | test` — Run the respective Turborepo pipelines
- `pnpm format` / `pnpm format:check` — Prettier formatting
- `pnpm dev:<app>` — Filtered dev server for a single workspace (see above)

## Documentation

- `docs/architecture.md` — High-level system overview + roadmap
- `docs/dev-workflow.md` — How to work within the Turborepo workspace

## Next Steps

Current focus: Mesh gateway integration, frontend GraphQL codegen, and service hardening (auth, CORS, streaming).
