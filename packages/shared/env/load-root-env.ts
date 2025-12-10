import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { config as loadEnv } from 'dotenv'

export interface LoadRootEnvOptions {
  root?: string
  files?: readonly string[]
  override?: boolean
}

const DEFAULT_ENV_FILES = [
  `.env.${process.env.NODE_ENV ?? 'development'}.local`,
  `.env.${process.env.NODE_ENV ?? 'development'}`,
  '.env.local',
  '.env',
] as const

const loadedSignatures = new Set<string>()

/**
 * Loads environment variables from the repository root using the
 * same cascading resolution order across every app.
 */
export function loadRootEnv(options: LoadRootEnvOptions = {}): void {
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

export const defaultEnvFiles: readonly string[] = DEFAULT_ENV_FILES
