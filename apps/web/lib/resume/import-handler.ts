import 'server-only'

import { getSession } from '@/lib/auth'
import { graphqlRequest } from '@/lib/graphql/server-client'
import {
  SaveExperienceDocument,
  type SaveExperienceMutation,
  type SaveExperienceMutationVariables,
} from '@/graphql/generated'
import { z } from 'zod'

import { getResumeParserProvider } from './provider/utils'

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10MB

const fileSchema = z.instanceof(File).refine(
  (file) => {
    const validTypes = ['application/pdf', 'text/plain']
    const validExtensions = ['.pdf', '.txt']
    const fileName = file.name.toLowerCase()
    const isTypeValid =
      validTypes.includes(file.type) ||
      validExtensions.some((ext) => fileName.endsWith(ext))

    const isSizeValid = file.size > 0 && file.size <= MAX_FILE_SIZE_BYTES

    return isTypeValid && isSizeValid
  },
  {
    message: 'Invalid file. Allowed types: PDF, TXT. Max size: 10MB.',
  }
)

export interface UploadResumeResult {
  success: boolean
  profileId?: string
  rolesCount?: number
  learningCount?: number
  skillsCount?: number
  error?: string
  statusCode?: number
}

/**
 * Shared handler for resume upload and parsing
 * Used by server action
 */
export async function handleResumeUpload(
  file: File
): Promise<UploadResumeResult> {
  try {
    // Get authenticated user
    const { user } = await getSession()

    if (!user?.id || !user.email) {
      return {
        success: false,
        error: 'Unauthorized',
        statusCode: 401,
      }
    }

    // Validate file
    const validatedFile = fileSchema.parse(file)

    // Get resume parser provider
    const provider = getResumeParserProvider()

    // Parse resume
    const parsedResume = await provider.parse(validatedFile)

    // Normalize to our format
    const normalized = provider.normalize(parsedResume)

    const variables: SaveExperienceMutationVariables = {
      input: {
        profile: normalized.profile,
        roles: normalized.roles,
        learning: normalized.learning,
        rawPayload: parsedResume as unknown as Record<string, unknown>,
      },
    }

    const response = await graphqlRequest<SaveExperienceMutation>(
      SaveExperienceDocument,
      variables,
      { user: { id: user.id, email: user.email, name: user.name } }
    )

    const result = response.saveExperience

    return {
      success: true,
      profileId: result.profileId,
      rolesCount: result.rolesCount,
      learningCount: result.learningCount,
      skillsCount: normalized.profile.skills.length,
    }
  } catch (error) {
    console.error('Resume upload error:', error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: `Invalid request: ${error.errors.map((e) => e.message).join(', ')}`,
        statusCode: 400,
      }
    }

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        statusCode: 500,
      }
    }

    return {
      success: false,
      error: 'Internal server error',
      statusCode: 500,
    }
  }
}
