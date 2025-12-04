import { Query, Resolver } from '@nestjs/graphql'
import { PlanService } from './plan.service'
import { PlanModel } from './plan.model'

@Resolver(() => PlanModel)
export class PlanResolver {
  constructor(private readonly planService: PlanService) {}

  @Query(() => [PlanModel], { name: 'plans' })
  async getPlans(): Promise<PlanModel[]> {
    return this.planService.findAll()
  }
}
