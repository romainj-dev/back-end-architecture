'use client'

import type React from 'react'

import { useState } from 'react'
import { CardDescription } from '@/components/ui/card'
import {
  GlassCard,
  GlassCardContent,
  GlassCardHeader,
  GlassCardTitle,
} from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import {
  Upload,
  FileText,
  Download,
  CheckCircle2,
  Sparkles,
  Loader2,
  AlertCircle,
  Linkedin,
  ExternalLink,
} from 'lucide-react'

const MAX_FILE_SIZE = 10 // 10MB
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024

interface ProfileUploadProps {
  onSubmit?: () => void
  onResumeUpload?: (file: File) => Promise<void>
  isResumeUploading?: boolean
  resumeError?: string | null
}

export function ProfileUpload({
  onSubmit,
  onResumeUpload,
  isResumeUploading = false,
  resumeError,
}: ProfileUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadMethod, setUploadMethod] = useState<'file' | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setFileError(`File is too large. Max size is ${MAX_FILE_SIZE}MB.`)
        setUploadedFile(null)
        setUploadMethod(null)
        return
      }

      setFileError(null)
      setUploadedFile(file)
      setUploadMethod('file')
    }
  }

  const handleResumeUpload = async () => {
    if (!uploadedFile) {
      return
    }

    if (uploadedFile.size > MAX_FILE_SIZE_BYTES) {
      setFileError(`File is too large. Max size is ${MAX_FILE_SIZE}MB.`)
      return
    }

    if (onResumeUpload) {
      try {
        await onResumeUpload(uploadedFile)
      } catch (error) {
        console.error('Resume upload error:', error)
      }
    } else if (onSubmit) {
      // Fallback to old onSubmit behavior for backwards compatibility
      onSubmit()
    }
  }

  return (
    <GlassCard interactive={false} className="relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -bottom-12 -right-12 h-64 w-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -top-12 -left-12 h-64 w-64 bg-primary/5 rounded-full blur-3xl" />

      <GlassCardHeader className="border-b border-border/50 pb-6 bg-primary/[0.02]">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center shadow-sm shrink-0 border border-primary/20">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <GlassCardTitle className="text-xl sm:text-2xl font-bold tracking-tight">
              Recommended: Share your experience up-to-date
            </GlassCardTitle>
            <CardDescription className="text-sm sm:text-base font-medium">
              This is a necessary step to help ApplyMate tailor your resume and
              cover letter to each job description accurately.
            </CardDescription>
          </div>
        </div>
      </GlassCardHeader>

      <GlassCardContent className="p-6 sm:p-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 relative">
          {/* Vertical Divider with OR Badge */}
          <div className="hidden lg:flex absolute left-1/2 top-0 bottom-0 w-px bg-border/50 -translate-x-1/2 items-center justify-center">
            <div className="bg-background border border-border h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold text-muted-foreground shadow-sm">
              OR
            </div>
          </div>

          {/* Left Column: File Upload (Primary Path) */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">
                  1
                </span>
                <h4 className="font-bold text-foreground">
                  I have a resume file
                </h4>
              </div>
              <p className="text-xs text-muted-foreground ml-8">
                PDF or TXT file | Max size: {MAX_FILE_SIZE}MB
              </p>
            </div>

            <label
              htmlFor="resume-upload"
              className={`block border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer group/upload relative ${
                uploadedFile
                  ? 'border-green-500 bg-green-500/[0.03]'
                  : 'border-primary/30 bg-primary/[0.01] hover:border-primary/60 hover:bg-primary/[0.04]'
              }`}
            >
              <input
                id="resume-upload"
                type="file"
                accept=".pdf,.txt"
                className="hidden"
                onChange={handleFileUpload}
                disabled={isResumeUploading}
              />
              {uploadedFile ? (
                <div className="space-y-4">
                  <div className="h-14 w-14 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto ring-1 ring-green-500/20">
                    <CheckCircle2 className="h-7 w-7 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground truncate max-w-[240px] mx-auto text-lg">
                      {uploadedFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">
                      File verified. Click to change.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto group-hover/upload:scale-110 transition-transform ring-1 ring-primary/20">
                    <Upload className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-lg">
                      Drop your resume here
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">
                      or click to browse your computer
                    </p>
                  </div>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold shadow-md group-hover/upload:bg-primary/90 transition-colors">
                      <FileText className="h-4 w-4" />
                      Select File
                    </span>
                  </div>
                </div>
              )}
            </label>

            {(resumeError || fileError) && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-xs text-red-600 font-medium">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{resumeError || fileError}</span>
              </div>
            )}

            {uploadMethod === 'file' && (
              <Button
                onClick={handleResumeUpload}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25 h-12 text-base font-bold"
                disabled={isResumeUploading || !uploadedFile || !!fileError}
              >
                {isResumeUploading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                    Analyzing Experience...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-3" />
                    Analyze my Experience
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Right Column: Quick Import Guide (Supportive Path) */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-muted-foreground/20 text-muted-foreground flex items-center justify-center text-[10px] font-bold">
                  2
                </span>
                <h4 className="font-bold text-muted-foreground">
                  I don&apos;t have a file yet
                </h4>
              </div>
              <p className="text-xs text-muted-foreground ml-8">
                No problem! We can help you get one in 30 seconds.
              </p>
            </div>

            <div className="space-y-4">
              {/* LinkedIn Tip */}
              <div className="group/tip p-5 rounded-2xl border border-border bg-card/20 hover:bg-card/40 transition-all">
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-10 w-10 shrink-0 rounded-xl bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5] border border-[#0077b5]/20">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-bold flex items-center gap-2">
                        Get LinkedIn PDF
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-black uppercase tracking-tighter">
                          Fastest
                        </span>
                      </h5>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-[10px] font-bold text-primary hover:bg-primary/5"
                        asChild
                      >
                        <a
                          href="https://www.linkedin.com/feed/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Go to LinkedIn{' '}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                      Log in &gt; Your{' '}
                      <span className="text-foreground font-bold italic">
                        Profile
                      </span>{' '}
                      &gt;{' '}
                      <span className="text-foreground font-bold">
                        More / Resources
                      </span>{' '}
                      &gt; Select{' '}
                      <span className="text-primary font-bold">
                        Save to PDF
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </div>

              {/* Indeed Tip */}
              <div className="group/tip p-5 rounded-2xl border border-border bg-card/20 hover:bg-card/40 transition-all">
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-10 w-10 shrink-0 rounded-xl bg-[#2164f3]/10 flex items-center justify-center text-[#2164f3] border border-[#2164f3]/20">
                    <Download className="h-5 w-5" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-bold">Indeed Resume</h5>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-[10px] font-bold text-primary hover:bg-primary/5"
                        asChild
                      >
                        <a
                          href="https://www.indeed.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Go to Indeed <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                      Log in &gt; Your{' '}
                      <span className="text-foreground font-bold italic">
                        Profile
                      </span>{' '}
                      &gt; Find{' '}
                      <span className="text-primary font-bold">
                        Download Resume
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-foreground">Next Step</p>
                <p className="text-[11px] text-muted-foreground leading-snug font-medium italic">
                  &ldquo;Once you have that PDF, just drag it into the box on
                  the left and we&apos;ll handle the rest!&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  )
}
