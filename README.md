# ApplyMate Monorepo

ApplyMate helps job seekers craft AI-ready applications (resumes, cover letters,
status tracking) powered by custom workflows.

Phase 1 migrates the project into a Turborepo-managed workspace so we can grow
the Next.js BFF, Nest.js microservices, and shared tooling in lockstep.

## Tech Stack (Phase 1)

- **Frontend**: Next.js 16 (App Router, Server Components) in `apps/web`
- **Services**: Nest.js 10 placeholders for `graphql-ms`, `auth-ms`, `upload-ms`
- **Gateway**: WunderGraph gateway placeholder in `apps/wundergraph`
- **Shared Code**: TypeScript + Zod helpers in `packages/shared`
- **Tooling**: Turborepo + pnpm, ESLint (flat config), Prettier, TypeScript

## Repository Layout

```
.
├── apps/
│   ├── web/             # Production Next.js application
│   ├── graphql-ms/      # GraphQL Nest.js service (placeholder schema)
│   ├── auth-ms/         # Auth Nest.js service (REST placeholder)
│   ├── upload-ms/       # Upload Nest.js service (REST placeholder)
│   └── wundergraph/     # Federated gateway placeholder
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

   ```bash
   cp .env.example .env.local
   ```

   Populate the Supabase keys (URL, anon key, service role key) plus any app
   URL overrides.

4. **Run targets**
   - `pnpm dev:web` — Next.js frontend at http://localhost:3000
   - `pnpm dev:graphql-ms` — GraphQL microservice at http://localhost:4000/graphql
   - `pnpm dev:auth-ms` — Auth microservice at http://localhost:4100/health
   - `pnpm dev:upload-ms` — Upload microservice at http://localhost:4200/health

## Workspace Scripts

- `pnpm dev` — Run every `dev` task in parallel (Next + services)
- `pnpm build | lint | test` — Run the respective Turborepo pipelines
- `pnpm format` / `pnpm format:check` — Prettier formatting
- `pnpm dev:<app>` — Filtered dev server for a single workspace (see above)

## Documentation

- `docs/architecture.md` — High-level system overview + roadmap
- `docs/dev-workflow.md` — How to work within the Turborepo workspace

## Next Steps

Phase 2 will expand the GraphQL microservice with Supabase CRUD resolvers and
integration tests, then Phase 3 will wire the Next.js BFF through Apollo /
WunderGraph with generated types.
