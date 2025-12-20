'use client'

import { useState } from 'react'
import { DashboardHeader } from '@/components/features/dashboard/commons/header'
import { GlassCard } from '@/components/ui/glass-card'
import { Sparkles, Check, Loader2 } from 'lucide-react'
import { ProfileUpload } from '@/components/features/dashboard/profile-upload'
import {
  ProgressSteps,
  type Step,
} from '@/components/features/my-experience/progress-steps'

export default function InitExperiencePage() {
  const [step, setStep] = useState<Step>('input')

  return (
    <div className="max-w-6xl space-y-6">
      <DashboardHeader
        title="Share your experience"
        subtitle="No tedious forms. Just share your experience however you'd like."
      />

      {/* Progress indicator */}
      <ProgressSteps step={step} />

      {/* Input Step */}
      {step === 'input' && (
        <div className="space-y-6">
          {/* Recommended approach callout */}
          <GlassCard variant="info" className="relative overflow-hidden">
            <div className="flex items-start gap-4 sm:gap-5 relative z-10">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100/50 flex items-center justify-center shadow-sm">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">
                  Recommended: Share your experience up-to-date
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Upload your resume or paste your LinkedIn URL for the best
                  results.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Input resume or Linkedin */}
          <ProfileUpload onSubmit={() => setStep('processing')} />
        </div>
      )}

      {/* Processing Step */}
      {step === 'processing' && (
        <div className="flex items-center justify-center py-20">
          <GlassCard className="max-w-lg w-full">
            <div className="pt-8 pb-8 text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  Processing Your Profile
                </h3>
                <p className="text-muted-foreground">
                  Structuring your experience, highlighting achievements, and
                  optimizing for ATS systems...
                </p>
              </div>
              <div className="space-y-3 text-sm text-left max-w-xs mx-auto">
                <div className="flex items-center gap-3 text-green-600">
                  <Check className="h-5 w-5 shrink-0" />
                  <span>Extracted key information</span>
                </div>
                <div className="flex items-center gap-3 text-green-600">
                  <Check className="h-5 w-5 shrink-0" />
                  <span>Identified skills and achievements</span>
                </div>
                <div className="flex items-center gap-3 text-primary">
                  <Loader2 className="h-5 w-5 shrink-0 animate-spin" />
                  <span>Optimizing for job applications</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  )
}
