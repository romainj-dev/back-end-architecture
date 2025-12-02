import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { config as loadEnv } from 'dotenv'

const DEFAULT_ENV_FILES = [
  `.env.${process.env.NODE_ENV ?? 'development'}.local`,
  `.env.${process.env.NODE_ENV ?? 'development'}`,
  '.env.local',
  '.env',
]

const loadedSignatures = new Set()

/**
 * Loads environment variables from the repository root using the
 * same cascading resolution order across every app.
 *
 * @param {{ root?: string, files?: string[], override?: boolean }} options
 */
export function loadRootEnv(options = {}) {
  const root = options.root ?? process.cwd()
  const files = options.files ?? DEFAULT_ENV_FILES
  const signature = `${root}|${files.join(',')}|${options.override === true}`

  if (loadedSignatures.has(signature)) {
    return
  }

  for (const filename of files) {
    const fullPath = resolve(root, filename)
    if (existsSync(fullPath)) {
      loadEnv({ path: fullPath, override: options.override ?? false })
    }
  }

  loadedSignatures.add(signature)
}

export const defaultEnvFiles = DEFAULT_ENV_FILES
