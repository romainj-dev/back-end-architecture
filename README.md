# ApplyMate

Smarter job applications powered by AI. Generate tailored resumes and cover letters that pass AI recruiter filters. Track all your applications in one place.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Form Validation**: Zod + React Hook Form
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn
- Supabase account and project

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd apply-mate
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (server-side only)

4. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors automatically
- `pnpm type-check` - Run TypeScript type checking

## Project Structure

```
apply-mate/
├── app/              # Next.js app router pages and layouts
├── components/       # Reusable UI components
├── lib/             # Utilities, Supabase clients, shared logic
├── hooks/           # Custom React hooks
├── types/           # TypeScript type definitions
└── public/          # Static assets
```

## Development Guidelines

- Follow TypeScript strict mode
- Use ESLint and Prettier for code formatting
- Pre-commit hooks run linting and formatting automatically
- See `.cursorrules` for AI coding standards and conventions

## License

Private project
