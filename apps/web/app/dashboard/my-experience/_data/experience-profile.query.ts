import { graphqlFetcher } from '@/lib/graphql/fetcher'
import {
  GetExperienceProfileDocument,
  type GetExperienceProfileQuery,
  type GetExperienceProfileQueryVariables,
} from '@/graphql/generated'

export type ExperienceProfileQueryData = GetExperienceProfileQuery

export const experienceProfileKeys = {
  all: ['my-experience', 'experienceProfile'] as const,
  profile: () => [...experienceProfileKeys.all, 'profile'] as const,
}

export const getExperienceProfileClient = graphqlFetcher<
  GetExperienceProfileQuery,
  GetExperienceProfileQueryVariables
>(GetExperienceProfileDocument)
