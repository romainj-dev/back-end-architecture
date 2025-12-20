import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { AlertCircle, ArrowRight } from 'lucide-react'

export function ProfileSetupPrompt() {
  return (
    <GlassCard variant="accent" className="relative overflow-hidden">
      <div className="absolute right-0 top-0 -mt-8 -mr-8 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row gap-5 relative z-10">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-orange-100/10 flex items-center justify-center shadow-sm">
            <AlertCircle className="h-6 w-6 text-orange-600" />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground mb-2">
            Complete Your Profile to Get Started
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl leading-relaxed">
            Before you can start applying to jobs, we need some information to
            help us tailor your resumes and cover letters. Set up your profile
            with your work experience, skills, and preferences.
          </p>
          <Button
            asChild
            size="lg"
            variant="orange"
            className="rounded-xl shadow-lg shadow-orange/20 hover:shadow-orange/30 transition-all"
          >
            <Link href="/dashboard/my-experience">
              Set Up Profile
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </GlassCard>
  )
}
