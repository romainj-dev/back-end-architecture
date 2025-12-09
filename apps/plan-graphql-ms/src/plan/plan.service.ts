import { Inject, Injectable } from '@nestjs/common'
import { PLAN_REPOSITORY } from './plan.constants'
import type { PlanRepository } from './plan.repository'
import type { Plan } from '@shared/schemas/plan'

@Injectable()
export class PlanService {
  constructor(
    @Inject(PLAN_REPOSITORY)
    private readonly repository: PlanRepository
  ) {}

  async findAll(): Promise<Plan[]> {
    return this.repository.findAll()
  }
}
