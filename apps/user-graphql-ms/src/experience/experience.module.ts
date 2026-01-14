import { Module } from '@nestjs/common'
import { ExperienceResolver } from './experience.resolver'
import { ExperienceService } from './experience.service'
import { EXPERIENCE_REPOSITORY } from './experience.constants'
import { SupabaseExperienceRepository } from './experience.repository'

@Module({
  providers: [
    ExperienceResolver,
    ExperienceService,
    {
      provide: EXPERIENCE_REPOSITORY,
      useClass: SupabaseExperienceRepository,
    },
  ],
})
export class ExperienceModule {}
