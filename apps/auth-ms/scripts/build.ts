import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildService } from '@config/esbuild/service'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const serviceRoot = path.resolve(__dirname, '..')

await buildService({
  entry: path.join(serviceRoot, 'src', 'main.ts'),
  outfile: path.join(serviceRoot, 'dist', 'main.js'),
  tsconfigPath: path.join(serviceRoot, 'tsconfig.json'),
})
