import { AuthForm } from '@/components/features/auth/auth-form'
import Link from 'next/link'

export const metadata = {
  title: 'Sign In | ApplyMate',
  description:
    'Sign in to ApplyMate to create tailored job applications powered by AI.',
}

export default function AuthPage() {
  return (
    <div className="h-screen w-full bg-background relative flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />

      {/* Vibrancy Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold inline-block">
            ApplyMate
          </Link>
        </div>

        <AuthForm />

        <div className="text-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
