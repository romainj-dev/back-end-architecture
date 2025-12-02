export interface LoadRootEnvOptions {
  root?: string
  files?: string[]
  override?: boolean
}

export function loadRootEnv(options?: LoadRootEnvOptions): void
export const defaultEnvFiles: readonly string[]
