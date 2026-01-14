import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import type { Request } from 'express'
import { ExperienceService } from './experience.service'
import {
  ExperienceMutationResult,
  ExperienceProfileAggregateModel,
} from './experience.model'
import { SaveExperienceInput } from './dto/save-experience.input'

@Resolver()
export class ExperienceResolver {
  constructor(private readonly experienceService: ExperienceService) {}

  @Query(() => ExperienceProfileAggregateModel, {
    name: 'experienceProfile',
    nullable: true,
  })
  async experienceProfile(@Context('req') req: Request) {
    const userId = this.getUserId(req)
    return this.experienceService.getExperienceProfile(userId)
  }

  @Mutation(() => ExperienceMutationResult)
  async saveExperience(
    @Args('input', { type: () => SaveExperienceInput })
    input: SaveExperienceInput,
    @Context('req') req: Request
  ): Promise<ExperienceMutationResult> {
    const userId = this.getUserId(req)
    return this.experienceService.saveExperience(userId, input)
  }

  private getUserId(req: Request): string {
    const headerValue = req.headers['x-user-id']
    const userId = Array.isArray(headerValue) ? headerValue[0] : headerValue

    if (!userId) {
      throw new Error('Missing user id context')
    }

    return userId
  }
}
