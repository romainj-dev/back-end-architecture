import { loadRootEnv } from '@shared/env/load-root-env'
import { resolve } from 'node:path'

const repoRoot = resolve(__dirname, '..', '..', '..', '..')

loadRootEnv({ root: repoRoot })
