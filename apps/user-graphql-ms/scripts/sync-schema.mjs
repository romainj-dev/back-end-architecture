#!/usr/bin/env node
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { syncSchema } from '../../../packages/shared/scripts/sync-schema.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const serviceRoot = resolve(__dirname, '..')

syncSchema('user', serviceRoot).catch(error => {
  console.error('[sync-schema] Failed to sync schema', error)
  process.exitCode = 1
})
