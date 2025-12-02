#!/usr/bin/env node
import { mkdir, copyFile, access } from 'node:fs/promises'
import { constants } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const serviceRoot = resolve(__dirname, '..')
const schemaPath = resolve(serviceRoot, 'schema.gql')
const sharedSchemaDir = resolve(
  serviceRoot,
  '..',
  '..',
  'packages',
  'shared',
  'graphql'
)
const sharedSchemaPath = resolve(sharedSchemaDir, 'schema.gql')

async function syncSchema() {
  try {
    await access(schemaPath, constants.F_OK)
  } catch {
    console.warn(
      '[sync-schema] No schema.gql found yet. Start the service to generate it.'
    )
    return
  }

  await mkdir(sharedSchemaDir, { recursive: true })
  await copyFile(schemaPath, sharedSchemaPath)
  console.log(
    `[sync-schema] Copied schema to ${sharedSchemaPath.replace(
      process.cwd(),
      ''
    )}`
  )
}

syncSchema().catch(error => {
  console.error('[sync-schema] Failed to sync schema', error)
  process.exitCode = 1
})

