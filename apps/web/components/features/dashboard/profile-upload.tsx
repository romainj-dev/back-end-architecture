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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Upload,
  FileText,
  Link2,
  CheckCircle2,
  Sparkles,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { useSession } from '@/hooks/use-session'

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10MB

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
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [uploadMethod, setUploadMethod] = useState<'file' | 'linkedin' | null>(
    null
  )
  const [urlError, setUrlError] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [linkedInStatus, setLinkedInStatus] = useState<string | null>(null)

  const { data: session } = useSession()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setFileError('File is too large. Max size is 10MB.')
        setUploadedFile(null)
        setUploadMethod(null)
        return
      }

      setFileError(null)
      setUploadedFile(file)
      setUploadMethod('file')
      setLinkedinUrl('')
    }
  }

  const handleLinkedInInput = (value: string) => {
    setLinkedinUrl(value)
    setUrlError(null)
    setLinkedInStatus(null)

    if (value.trim()) {
      // Basic validation
      const isValid =
        /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/.test(value) ||
        /^linkedin\.com\/in\/[\w-]+\/?$/.test(value)

      if (isValid) {
        setUploadMethod('linkedin')
        setUploadedFile(null)
      } else {
        setUrlError('Please enter a valid LinkedIn profile URL')
        setUploadMethod(null)
      }
    } else {
      setUploadMethod(null)
    }
  }

  const handleResumeUpload = async () => {
    if (!uploadedFile) {
      return
    }

    if (uploadedFile.size > MAX_FILE_SIZE_BYTES) {
      setFileError('File is too large. Max size is 10MB.')
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

  const isLinkedInSessionUser = session?.user?.provider === 'linkedin'

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* File Upload Card */}
      <GlassCard interactive={true} className="relative group">
        <GlassCardHeader>
          <GlassCardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload Resume
          </GlassCardTitle>
          <CardDescription>PDF, DOCX, or TXT file</CardDescription>
        </GlassCardHeader>
        <GlassCardContent className="space-y-4">
          <label
            htmlFor="resume-upload"
            className={`block border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
              uploadedFile
                ? 'border-green-500 bg-green-50/50'
                : 'border-border hover:border-primary/50 hover:bg-primary/5'
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
              <div className="space-y-2">
                <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto" />
                <p className="font-medium text-foreground">
                  {uploadedFile.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Click to change file
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <FileText className="h-10 w-10 text-muted-foreground mx-auto" />
                <p className="font-medium text-foreground">
                  Drop your resume here
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse
                </p>
              </div>
            )}
          </label>

          {resumeError && (
            <div className="flex items-center gap-2 text-xs text-red-600">
              <AlertCircle className="h-3 w-3" />
              <span>{resumeError}</span>
            </div>
          )}
          {fileError && (
            <div className="flex items-center gap-2 text-xs text-red-600">
              <AlertCircle className="h-3 w-3" />
              <span>{fileError}</span>
            </div>
          )}

          {uploadMethod === 'file' && (
            <Button
              onClick={handleResumeUpload}
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isResumeUploading || !uploadedFile || !!fileError}
            >
              {isResumeUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Process Resume
                </>
              )}
            </Button>
          )}
        </GlassCardContent>
      </GlassCard>

      {/* LinkedIn URL Card */}
      <GlassCard interactive={true} className="relative group">
        <GlassCardHeader>
          <GlassCardTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-primary" />
            Import from LinkedIn
          </GlassCardTitle>
          <CardDescription>Paste your LinkedIn profile URL</CardDescription>
        </GlassCardHeader>
        <GlassCardContent className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-8 transition-all ${
              linkedinUrl
                ? 'border-green-500 bg-green-50/50'
                : 'border-border group-hover:border-primary/50 group-hover:bg-primary/5'
            }`}
          >
            <div className="space-y-4">
              <div className="flex justify-center">
                {linkedinUrl ? (
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    in
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin-url" className="sr-only">
                  LinkedIn URL
                </Label>
                <Input
                  id="linkedin-url"
                  placeholder="linkedin.com/in/yourprofile"
                  value={linkedinUrl}
                  onChange={(e) => handleLinkedInInput(e.target.value)}
                  className={
                    linkedinUrl && !urlError
                      ? 'border-green-500'
                      : urlError
                        ? 'border-red-500'
                        : ''
                  }
                />
                {!urlError && !linkedInStatus && (
                  <p className="text-xs text-muted-foreground text-center">
                    We&apos;ll extract your experience, skills, and education
                  </p>
                )}
                {linkedInStatus && (
                  <div className="flex items-center gap-2 text-xs text-green-600 justify-center">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>{linkedInStatus}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {uploadMethod === 'linkedin' &&
            (isLinkedInSessionUser ? (
              <Button
                onClick={() => {}}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={!!urlError}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Import from LinkedIn
              </Button>
            ) : (
              <Button
                onClick={() => {}}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={!!urlError}
              >
                <Link2 className="h-4 w-4 mr-2" />
                Connect LinkedIn & Import
              </Button>
            ))}
        </GlassCardContent>
      </GlassCard>
    </div>
  )
}
