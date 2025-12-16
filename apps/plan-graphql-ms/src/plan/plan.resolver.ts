import { Query, Resolver } from '@nestjs/graphql'
import { PlanService } from './plan.service'
import { PlanModel } from './plan.model'
import { Public } from '@shared/auth'

@Resolver(() => PlanModel)
export class PlanResolver {
  constructor(private readonly planService: PlanService) {}

  @Public()
  @Query(() => [PlanModel], { name: 'plans' })
  async getPlans(): Promise<PlanModel[]> {
    return this.planService.findAll()
  }
}
