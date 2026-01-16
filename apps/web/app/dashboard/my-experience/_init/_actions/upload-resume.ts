'use server'

import {
  handleResumeUpload,
  type UploadResumeResult,
} from '@/lib/resume/import-handler'

/**
 * Server action to upload and parse resume
 * Delegates to shared handler for consistency
 */
export async function uploadResume(
  formData: FormData
): Promise<UploadResumeResult> {
  const file = formData.get('file')

  if (!file || !(file instanceof File)) {
    return {
      success: false,
      error: 'No file provided',
      statusCode: 400,
    }
  }

  return handleResumeUpload(file)
}
