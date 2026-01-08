import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { parseBffEnv } from '@shared/env'
import { SignJWT } from 'jose'

const env = parseBffEnv()

export async function POST(request: Request) {
  const session = await auth()
  const body = await request.json()

  // Forward request to mesh gateway with auth token
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  // Extract user from session and create a JWT for the gateway
  if (session?.user) {
    const secret = new TextEncoder().encode(env.AUTH_SECRET)
    const token = await new SignJWT({
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(secret)

    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(
    `${env.API_URL}:${env.MESH_GATEWAY_PORT}/graphql`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    }
  )

  const data = await response.json()
  return NextResponse.json(data, { status: response.status })
}
