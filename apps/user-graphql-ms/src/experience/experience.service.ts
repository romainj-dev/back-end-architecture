import { Inject, Injectable } from '@nestjs/common'
import {
  normalizedExperienceLearningSchema,
  normalizedExperienceProfileSchema,
  normalizedExperienceRoleSchema,
  type ExperienceProfileAggregate,
} from '@shared/schemas/experience'
import { EXPERIENCE_REPOSITORY } from './experience.constants'
import type { ExperienceRepository } from './experience.repository'
import type { SaveExperienceInput } from './dto/save-experience.input'

@Injectable()
export class ExperienceService {
  constructor(
    @Inject(EXPERIENCE_REPOSITORY)
    private readonly repository: ExperienceRepository
  ) {}

  async saveExperience(
    userId: string,
    input: SaveExperienceInput
  ): Promise<Awaited<ReturnType<ExperienceRepository['saveExperienceData']>>> {
    const profile = normalizedExperienceProfileSchema.parse(input.profile)
    const roles = normalizedExperienceRoleSchema
      .array()
      .parse(input.roles ?? [])
    const learning = normalizedExperienceLearningSchema
      .array()
      .parse(input.learning ?? [])

    return this.repository.saveExperienceData({
      userId,
      profile,
      roles,
      learning,
      rawPayload: input.rawPayload ?? null,
    })
  }

  async getExperienceProfile(
    userId: string
  ): Promise<ExperienceProfileAggregate | null> {
    return this.repository.getExperienceProfile(userId)
  }
}
