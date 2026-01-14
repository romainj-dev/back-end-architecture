import 'server-only'

import { ResumeParserAppProvider } from './resume-parser-app'

import { parseBffEnv } from '@shared/env/env-schema'
const env = parseBffEnv()

/**
 * Get the appropriate resume parser provider based on env vars
 * Priority: RESUME_PARSER_KEY >
 */
export function getResumeParserProvider(): ResumeParserAppProvider {
  if (env.RESUME_PARSER_KEY) {
    return new ResumeParserAppProvider(env.RESUME_PARSER_KEY)
  }
  throw new Error('Resume parser provider not found')
}
