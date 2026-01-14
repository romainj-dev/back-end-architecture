# GraphQL Microservice · Setup Guide (Legacy)

> This document describes the former monolithic GraphQL MS. The codebase now uses `apps/user-graphql-ms` and `apps/plan-graphql-ms` plus Mesh as the public entrypoint. Use this only for historical reference.

## Prerequisites

- Node.js 20+
- `pnpm` (repo enforces `pnpm@9.12.2`)
- Supabase project with a `users` table containing:
  - `id (uuid primary key)`
  - `email (text)`
  - `full_name (text)`
  - `avatar_url (text, nullable)`
  - `metadata (jsonb, nullable)`
  - `created_at / updated_at (timestamptz, default now())`

## Environment Variables

This service is retired; see user/plan service docs and Mesh configuration for current env keys. If you need to spin it up for reference, mirror the old variables locally, but it is not part of the active stack.

## Local Development

Deprecated commands omitted; use the split services instead.

Sections on schema sync, sample operations, and tests are omitted here to avoid confusion. Refer to the user/plan service docs and Mesh gateway for current flows.
