import InitExperiencePage from './_init/page'
import CompleteExperiencePage from './_complete/page'
import { PrefetchHydrationBoundary } from '@/lib/query/prefetch-hydration-boundary'
import { prefetchExperienceProfile } from './_data/experience-profile.server'
import {
  experienceProfileKeys,
  type ExperienceProfileQueryData,
} from './_data/experience-profile.query'

export default async function MyExperiencePage() {
  return (
    <PrefetchHydrationBoundary prefetchers={[prefetchExperienceProfile]}>
      {(queryClient) => {
        const data = queryClient.getQueryData<ExperienceProfileQueryData>(
          experienceProfileKeys.profile()
        )

        const hasExperience = !!data?.experienceProfile?.profile?.id

        return hasExperience ? (
          <CompleteExperiencePage />
        ) : (
          <InitExperiencePage />
        )
      }}
    </PrefetchHydrationBoundary>
  )
}
