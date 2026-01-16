'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Loader2 } from 'lucide-react'

import { DashboardHeader } from '@/components/features/dashboard/commons/header'
import { ProfileUpload } from '@/components/features/dashboard/profile-upload'
import {
  ProgressSteps,
  type Step,
} from '@/components/features/my-experience/progress-steps'
import { GlassCard } from '@/components/ui/glass-card'
import { uploadResume } from './_actions/upload-resume'

export default function InitExperiencePage() {
  const [step, setStep] = useState<Step>('input')
  const [resumeError, setResumeError] = useState<string | null>(null)
  const [isResumePending, startResumeTransition] = useTransition()
  const router = useRouter()

  const handleResumeUpload = async (file: File) => {
    setResumeError(null)
    setStep('processing')

    startResumeTransition(async () => {
      const formData = new FormData()
      formData.append('file', file)

      const result = await uploadResume(formData)

      if (result.success) {
        router.refresh()
      } else {
        setResumeError(result.error ?? 'Failed to upload resume')
        setStep('input')
      }
    })
  }

  return (
    <div className="max-w-6xl space-y-6">
      <DashboardHeader
        title="Share your experience"
        subtitle="No tedious forms. Just share your experience however you'd like."
      />

      <ProgressSteps step={step} />

      {step === 'input' && (
        <div className="space-y-6">
          <ProfileUpload
            onResumeUpload={handleResumeUpload}
            isResumeUploading={isResumePending}
            resumeError={resumeError}
          />
        </div>
      )}

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
