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
import { Upload, FileText, Link2, CheckCircle2, Sparkles } from 'lucide-react'

export function ProfileUpload({ onSubmit }: { onSubmit: () => void }) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [uploadMethod, setUploadMethod] = useState<'file' | 'linkedin' | null>(
    null
  )

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
      setUploadMethod('file')
      setLinkedinUrl('')
    }
  }

  const handleLinkedInInput = (value: string) => {
    setLinkedinUrl(value)
    if (value.trim()) {
      setUploadMethod('linkedin')
      setUploadedFile(null)
    } else {
      setUploadMethod(null)
    }
  }

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
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              onChange={handleFileUpload}
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

          {uploadMethod === 'file' && (
            <Button
              onClick={onSubmit}
              className="w-full bg-primary hover:bg-primary/90"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Process Resume
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
                  className={linkedinUrl ? 'border-green-500' : ''}
                />
                <p className="text-xs text-muted-foreground text-center">
                  We&apos;ll extract your experience, skills, and education
                </p>
              </div>
            </div>
          </div>

          {uploadMethod === 'linkedin' && (
            <Button
              onClick={onSubmit}
              className="w-full bg-primary hover:bg-primary/90"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Import from LinkedIn
            </Button>
          )}
        </GlassCardContent>
      </GlassCard>
    </div>
  )
}
