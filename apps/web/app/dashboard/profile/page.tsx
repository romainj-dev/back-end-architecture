import { Button } from '@/components/ui/button'
import { getSession, signOut } from '@/lib/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Profile | ApplyMate',
  description: 'Your ApplyMate profile',
}

export default async function ProfilePage() {
  const { user } = await getSession()

  if (!user) {
    redirect('/auth')
  }

  const handleSignOut = async () => {
    'use server'
    await signOut({ redirectTo: '/' })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Profile</h1>
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome back!</h2>
            <div className="space-y-2">
              {user.image && (
                <Image
                  src={user.image}
                  alt={user.name || 'User avatar'}
                  className="w-16 h-16 rounded-full mb-4"
                  sizes="64px"
                  width={64}
                  height={64}
                />
              )}
              <p>
                <span className="font-medium">Name:</span>{' '}
                {user.name || 'Not provided'}
              </p>
              <p>
                <span className="font-medium">Email:</span> {user.email}
              </p>
              {user.id && (
                <p>
                  <span className="font-medium">User ID:</span> {user.id}
                </p>
              )}
            </div>
            <Button onClick={handleSignOut}>Sign out</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
