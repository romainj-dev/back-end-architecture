# Supabase Database

This folder contains database migrations and configuration for ApplyMate.

## Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli) installed (`brew install supabase/tap/supabase`)
- Supabase account with access to the project

## Running Migrations

### 1. Login to Supabase

```bash
supabase login
```

This opens your browser for authentication.

### 2. Link to the Project

```bash
cd /path/to/apply-mate
supabase link --project-ref kbrooabfhmfulsmqvxym
```

You'll be prompted for the database password.

### 3. Push Migrations

```bash
supabase db push
```

This applies all pending migrations in `supabase/migrations/` to the remote database.

## Creating New Migrations

```bash
supabase migration new <migration_name>
```

This creates a new `.sql` file in `supabase/migrations/` with a timestamp prefix.

Example:

```bash
supabase migration new add_users_table
# Creates: supabase/migrations/20251203120000_add_users_table.sql
```

## Useful Commands

| Command                   | Description                        |
| ------------------------- | ---------------------------------- |
| `supabase db push`        | Apply migrations to remote DB      |
| `supabase db pull`        | Pull remote schema changes         |
| `supabase db diff`        | Show diff between local and remote |
| `supabase migration list` | List all migrations                |
| `supabase db reset`       | Reset local DB (requires Docker)   |

## Local Development (Optional)

For local development with Docker:

```bash
# Start local Supabase (requires Docker)
supabase start

# Stop local Supabase
supabase stop
```

The `config.toml` file configures the local development environment.

## Current Tables

- **plans** - Subscription pricing plans (free, premium)
