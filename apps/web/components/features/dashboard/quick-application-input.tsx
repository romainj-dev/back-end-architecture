'use client'

import type React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
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
    <GlassCard
      interactive={!disabled}
      size="sm"
      className={`relative ${disabled ? 'opacity-80' : ''}`}
    >
      <form onSubmit={handleSubmit} className="flex gap-4 p-2">
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-lg bg-white/50 text-muted-foreground">
            <Link2 className="h-4 w-4" />
          </div>
          <Input
            type="url"
            placeholder="Paste LinkedIn job URL here to start..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={`pl-14 h-14 bg-transparent border-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50 ${disabled ? 'cursor-not-allowed' : ''}`}
            disabled={disabled}
          />
        </div>
        {disabled ? (
          <div className="flex items-center gap-2 px-6 bg-muted/50 rounded-xl text-muted-foreground font-medium border border-border/50">
            <Lock className="h-4 w-4" />
            <span>Complete profile to unlock</span>
          </div>
        ) : (
          <Button
            type="submit"
            size="lg"
            disabled={!url.trim()}
            className="h-14 rounded-xl px-8 text-base shadow-primary/25 shadow-lg"
          >
            Start Application
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        )}
      </form>
    </GlassCard>
  )
}
