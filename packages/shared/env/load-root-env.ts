import { existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { config as loadEnv } from 'dotenv'
import { fileURLToPath } from 'node:url'

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
 * Finds the repository root by looking for a directory containing .env or package.json
 * Works from both source (src/) and bundled (dist/) locations.
 */
function findRepoRoot(startDir: string, maxDepth = 5): string {
  let current = startDir
  for (let i = 0; i < maxDepth; i++) {
    if (
      existsSync(resolve(current, '.env')) ||
      existsSync(resolve(current, 'pnpm-workspace.yaml'))
    ) {
      return current
    }
    const parent = dirname(current)
    if (parent === current) break
    current = parent
  }
  return startDir
}

/**
 * Initializes environment variables for a service.
 * Auto-detects repo root from the caller's location.
 *
 * @param callerUrl - Pass `import.meta.url` from the calling file
 */
export function initServiceEnv(callerUrl: string): void {
  const callerDir = dirname(fileURLToPath(callerUrl))
  const repoRoot = findRepoRoot(callerDir)
  loadRootEnv({ root: repoRoot })
}

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
