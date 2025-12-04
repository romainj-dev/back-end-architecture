import { Module } from '@nestjs/common'
import { PlanResolver } from './plan.resolver'
import { PlanService } from './plan.service'
import { PLAN_REPOSITORY } from './plan.constants'
import { SupabasePlanRepository } from './plan.repository'
import { SupabaseModule } from '../supabase/supabase.module'

@Module({
  imports: [SupabaseModule],
  providers: [
    PlanResolver,
    PlanService,
    {
      provide: PLAN_REPOSITORY,
      useClass: SupabasePlanRepository,
    },
  ],
  exports: [PlanService],
})
export class PlanModule {}
