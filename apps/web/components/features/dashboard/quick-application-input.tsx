'use client'

import type React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link2, ArrowRight, Lock } from 'lucide-react'

export function QuickApplicationInput({ disabled }: { disabled?: boolean }) {
  const [url, setUrl] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim() && !disabled) {
      // Store the URL in session storage or pass as URL param
      sessionStorage.setItem('jobUrl', url)
      router.push('/dashboard/new-application')
    }
  }

  return (
    <Card className={disabled ? 'opacity-60' : ''}>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex-1 relative">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="url"
              placeholder="Paste LinkedIn job URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={`pl-9 ${disabled ? 'cursor-not-allowed' : ''}`}
              disabled={disabled}
            />
          </div>
          {disabled ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-md text-muted-foreground text-sm">
              <Lock className="h-4 w-4" />
              Complete profile to unlock
            </div>
          ) : (
            <Button type="submit" disabled={!url.trim()}>
              Start New Application
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
