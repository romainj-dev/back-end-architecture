import path from 'node:path'

const GENERATED_PREFIXES = [
  'apps/mesh-gateway/.mesh/',
  'apps/web/graphql/generated/',
  'packages/shared/connect/gen/',
]

const toRelative = (filePath) =>
  path.relative(process.cwd(), filePath).split(path.sep).join('/')

const isGeneratedFile = (filePath) => {
  const relativePath = toRelative(filePath)
  return GENERATED_PREFIXES.some((prefix) => relativePath.startsWith(prefix))
}

const quoteFiles = (files) =>
  files.map((file) => `"${file.replace(/"/g, '\\"')}"`).join(' ')

/** @type {import('lint-staged').Config} */
const config = {
  '*.{ts,tsx,js,jsx}': (files) => {
    const filtered = files.filter((file) => !isGeneratedFile(file))
    if (filtered.length === 0) return []
    const quoted = quoteFiles(filtered)
    return [`eslint --fix ${quoted}`, `prettier --write ${quoted}`]
  },
  '*.{json,md,mdx,css,html,yml,yaml,scss}': (files) => {
    const filtered = files.filter((file) => !isGeneratedFile(file))
    if (filtered.length === 0) return []
    const quoted = quoteFiles(filtered)
    return [`prettier --write ${quoted}`]
  },
}

export default config
