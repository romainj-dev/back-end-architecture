import { join } from 'node:path'

const NODE_ENV = process.env.NODE_ENV ?? 'development'

export const envFileNames = [
  `.env.${NODE_ENV}.local`,
  `.env.${NODE_ENV}`,
  '.env.local',
  '.env',
] as const

export function envFilePaths(root: string): string[] {
  return envFileNames.map((name) => join(root, name))
}
