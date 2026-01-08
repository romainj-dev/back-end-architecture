import 'server-only'

import { parseBffEnv } from '@shared/env/env-schema'

const env = parseBffEnv()

interface UpsertUserInput {
  provider: 'google' | 'linkedin' | 'github'
  providerAccountId: string
  email: string
  fullName: string
  avatarUrl?: string | null
  accessToken?: string | null
  refreshToken?: string | null
  tokenExpiresAt?: Date | null
}

interface UpsertUserResponse {
  data?: {
    upsertUser: {
      id: string
      email: string
      fullName: string
      avatarUrl?: string | null
      provider: string
      providerAccountId: string
    }
  }
  errors?: Array<{ message: string }>
}

/**
 * Upserts a user in the database during OAuth sign-in.
 *
 * Why we bypass the mesh gateway:
 * - This runs inside NextAuth's jwt callback, BEFORE the JWT token exists
 * - The mesh gateway requires a valid JWT to authenticate requests
 * - We need the database UUID to put INTO the JWT being created
 *
 * Security:
 * - Protected by INTERNAL_API_KEY (x-internal-api-key header)
 * - user-graphql-ms validates this key before allowing upsert
 */
export async function upsertUser(
  input: UpsertUserInput
): Promise<{ id: string }> {
  const userMsUrl = `http://localhost:${env.USER_GRAPHQL_MS_PORT}/graphql`

  const mutation = `
    mutation UpsertUser($input: UpsertUserRequest!) {
      upsertUser(input: $input) {
        id
        email
        fullName
        avatarUrl
        provider
        providerAccountId
      }
    }
  `

  const variables = {
    input: {
      provider: input.provider,
      providerAccountId: input.providerAccountId,
      email: input.email,
      fullName: input.fullName,
      avatarUrl: input.avatarUrl,
      accessToken: input.accessToken,
      refreshToken: input.refreshToken,
      tokenExpiresAt: input.tokenExpiresAt
        ? input.tokenExpiresAt.toISOString()
        : null,
    },
  }

  const response = await fetch(userMsUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-internal-api-key': env.INTERNAL_API_KEY,
    },
    body: JSON.stringify({
      query: mutation,
      variables,
    }),
  })

  if (!response.ok) {
    throw new Error(
      `Failed to upsert user: ${response.status} ${response.statusText}`
    )
  }

  const result: UpsertUserResponse = await response.json()

  if (result.errors && result.errors.length > 0) {
    throw new Error(
      `GraphQL errors: ${result.errors.map((e) => e.message).join(', ')}`
    )
  }

  if (!result.data?.upsertUser) {
    throw new Error('No user data returned from upsertUser mutation')
  }

  return { id: result.data.upsertUser.id }
}
