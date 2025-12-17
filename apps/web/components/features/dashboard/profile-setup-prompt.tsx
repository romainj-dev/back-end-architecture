import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { AlertCircle, ArrowRight } from 'lucide-react'

export function ProfileSetupPrompt() {
  return (
    <div className="glass rounded-2xl border border-orange-200/50 bg-orange-50/30 p-6 relative overflow-hidden">
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
            <Link href="/dashboard/profile">
              Set Up Profile
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
