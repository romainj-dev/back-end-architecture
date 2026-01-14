import 'server-only'

import {
  resumeParserAppResponseSchema,
  type ResumeParserAppResponse,
} from './schemas'
import { normalizeResumeParserAppResponse } from './normalize'
import {
  NormalizedLearning,
  NormalizedProfile,
  NormalizedRole,
} from '@shared/schemas/experience.js'

export interface ResumeParserProvider {
  parse(file: File): Promise<ResumeParserAppResponse>
  normalize(response: ResumeParserAppResponse): {
    profile: NormalizedProfile
    roles: NormalizedRole[]
    learning: NormalizedLearning[]
  }
}

/**
 * ResumeParser.app API provider
 * https://resumeparser.app
 */
export class ResumeParserAppProvider implements ResumeParserProvider {
  private apiKey: string
  private apiUrl = 'https://resumeparser.app/resume/parse'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async parse(file: File): Promise<ResumeParserAppResponse> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`ResumeParser API error: ${response.status} ${errorText}`)
    }

    const data = await response.json()
    return resumeParserAppResponseSchema.parse(data)
  }

  normalize(response: ResumeParserAppResponse) {
    return normalizeResumeParserAppResponse(response)
  }
}
