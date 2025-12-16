import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getSession } from '@/lib/auth'

export async function HeaderAuth() {
  const { isAuth } = await getSession()

  return (
    <div className="flex items-center gap-4">
      <Button
        size="sm"
        className="bg-primary text-primary-foreground hover:bg-primary/90"
        asChild
      >
        {isAuth ? (
          <Link href="/dashboard">Dashboard</Link>
        ) : (
          <Link href="/auth">Log in</Link>
        )}
      </Button>
    </div>
  )
}
