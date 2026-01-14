import { auth } from '@/lib/auth'
import {
  GraphqlRequestError,
  graphqlRequest,
} from '@/lib/graphql/server-client'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  // Get authenticated user at the route handler level where request context
  // is available. Pass to graphqlRequest which does not call auth() internally.
  const session = await auth()
  const user =
    session?.user?.id && session?.user?.email
      ? {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
        }
      : null

  try {
    const data = await graphqlRequest<unknown>(body.query, body.variables, {
      user,
    })
    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    if (error instanceof GraphqlRequestError) {
      return NextResponse.json(
        {
          data: null,
          errors: error.errors ?? [{ message: error.message }],
        },
        { status: error.status, statusText: error.statusText }
      )
    }

    return NextResponse.json(
      {
        data: null,
        errors: [{ message: 'Unexpected error' }],
      },
      { status: 500, statusText: 'Internal Server Error' }
    )
  }
}
