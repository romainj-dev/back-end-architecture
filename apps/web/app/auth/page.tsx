import { AuthForm } from '@/components/features/auth/auth-form'
import Link from 'next/link'

export const metadata = {
  title: 'Sign In | ApplyMate',
  description:
    'Sign in to ApplyMate to create tailored job applications powered by AI.',
}

export default function AuthPage() {
  return (
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
  )
}
