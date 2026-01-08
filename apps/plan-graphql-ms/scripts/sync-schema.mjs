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
const sharedSchemaPathGql = resolve(sharedSchemaDir, 'plan-schema.gql')
const sharedSchemaPathGraphql = resolve(sharedSchemaDir, 'plan-schema.graphql')

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
  // Copy to both .gql and .graphql for compatibility
  await copyFile(schemaPath, sharedSchemaPathGql)
  await copyFile(schemaPath, sharedSchemaPathGraphql)
  console.log(
    `[sync-schema] Copied schema to ${sharedSchemaPathGql.replace(
      process.cwd(),
      ''
    )} and .graphql`
  )
}

syncSchema().catch(error => {
  console.error('[sync-schema] Failed to sync schema', error)
  process.exitCode = 1
})

