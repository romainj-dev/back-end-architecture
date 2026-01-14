#!/usr/bin/env node
/**
 * Syncs a service's GraphQL schema to the shared package.
 * Usage: node sync-schema.mjs <service-name>
 * Example: node sync-schema.mjs user
 *
 * This copies schema.gql from the service root to packages/shared/graphql/<service>-schema.gql
 */
import { mkdir, copyFile, access } from 'node:fs/promises'
import { constants } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Syncs the schema from a service to the shared graphql directory.
 * @param {string} serviceName - The service name prefix (e.g. 'user', 'plan')
 * @param {string} serviceRoot - The absolute path to the service root directory
 */
export async function syncSchema(serviceName, serviceRoot) {
  const schemaPath = resolve(serviceRoot, 'schema.gql')
  const sharedSchemaDir = resolve(__dirname, '..', 'graphql')
  const sharedSchemaPathGql = resolve(sharedSchemaDir, `${serviceName}-schema.gql`)
  const sharedSchemaPathGraphql = resolve(
    sharedSchemaDir,
    `${serviceName}-schema.graphql`
  )

  try {
    await access(schemaPath, constants.F_OK)
  } catch {
    console.warn(
      `[sync-schema] No schema.gql found at ${schemaPath}. Generate it first.`
    )
    return
  }

  await mkdir(sharedSchemaDir, { recursive: true })
  // Copy to both .gql and .graphql for compatibility
  await copyFile(schemaPath, sharedSchemaPathGql)
  await copyFile(schemaPath, sharedSchemaPathGraphql)
  console.log(
    `[sync-schema] Copied ${serviceName} schema to packages/shared/graphql/`
  )
}

// CLI support: node sync-schema.mjs <service-name> <service-root>
const args = process.argv.slice(2)
if (args.length >= 2) {
  const [serviceName, serviceRoot] = args
  syncSchema(serviceName, serviceRoot).catch(error => {
    console.error('[sync-schema] Failed to sync schema', error)
    process.exitCode = 1
  })
}

