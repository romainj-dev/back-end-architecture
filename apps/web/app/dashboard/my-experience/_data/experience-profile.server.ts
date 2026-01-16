import 'server-only'

import { QueryClient } from '@tanstack/react-query'
import { getSession } from '@/lib/auth'
import { graphqlRequest } from '@/lib/graphql/server-client'
import {
  GetExperienceProfileDocument,
  type GetExperienceProfileQuery,
} from '@/graphql/generated'
import { experienceProfileKeys } from './experience-profile.query'

export async function fetchExperienceProfile(): Promise<GetExperienceProfileQuery> {
  const { user } = await getSession()

  if (!user?.id || !user.email) {
    return { experienceProfile: null }
  }

  const data = await graphqlRequest<GetExperienceProfileQuery>(
    GetExperienceProfileDocument,
    undefined,
    { user: { id: user.id, email: user.email, name: user.name } }
  )

  return data
}

export async function prefetchExperienceProfile(
  queryClient: QueryClient
): Promise<void> {
  await queryClient.prefetchQuery({
    queryKey: experienceProfileKeys.profile(),
    queryFn: fetchExperienceProfile,
  })
}
