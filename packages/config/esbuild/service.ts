import { readFileSync } from 'node:fs'
import path from 'node:path'
import { build, type BuildOptions } from 'esbuild'
import { esbuildDecorators } from '@anatine/esbuild-decorators'
import { TsconfigPathsPlugin } from '@esbuild-plugins/tsconfig-paths'

type ServicePackageJson = {
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}

export type ServiceBuildConfig = {
  entry: string
  outfile: string
  tsconfigPath: string
  external?: string[]
}

const readServicePackage = (tsconfigPath: string): ServicePackageJson => {
  const serviceRoot = path.dirname(tsconfigPath)
  const packageJsonPath = path.join(serviceRoot, 'package.json')

  try {
    const contents = readFileSync(packageJsonPath, 'utf8')
    return JSON.parse(contents) as ServicePackageJson
  } catch {
    return {}
  }
}

const collectExternalDeps = (
  tsconfigPath: string,
  extraExternal?: string[]
): string[] => {
  const { dependencies, peerDependencies } = readServicePackage(tsconfigPath)
  const externals = [
    ...(dependencies ? Object.keys(dependencies) : []),
    ...(peerDependencies ? Object.keys(peerDependencies) : []),
    ...(extraExternal ?? []),
  ]

  return Array.from(new Set(externals))
}

export const createServiceBuildOptions = (
  config: ServiceBuildConfig
): BuildOptions => {
  const tsconfig = path.resolve(config.tsconfigPath)
  const entry = path.resolve(config.entry)
  const outfile = path.resolve(config.outfile)

  return {
    platform: 'node',
    format: 'esm',
    target: 'node20',
    bundle: true,
    sourcemap: true,
    entryPoints: [entry],
    outfile,
    tsconfig,
    plugins: [
      esbuildDecorators({
        tsconfig,
      }),
      TsconfigPathsPlugin({
        tsconfig,
      }),
    ],
    packages: 'external',
    external: collectExternalDeps(tsconfig, config.external),
  }
}

export const buildService = async (
  config: ServiceBuildConfig
): Promise<void> => {
  await build(createServiceBuildOptions(config))
}
