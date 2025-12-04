import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import type { PostgrestError } from '@supabase/supabase-js'
import type { Plan } from '@shared/schemas/plan'
import { planSchema } from '@shared/schemas/plan'
import { type SupabaseAdminClient } from '@shared/db/supabase-admin'
import { SUPABASE_ADMIN_CLIENT } from '../supabase/supabase.constants'

interface PlanRow {
  id: string
  code: string
  price: number
  created_at: string
  updated_at: string
}

export interface PlanRepository {
  findAll(): Promise<Plan[]>
}

@Injectable()
export class SupabasePlanRepository implements PlanRepository {
  private readonly tableName = 'plans'
  private readonly logger = new Logger(SupabasePlanRepository.name)

  constructor(
    @Inject(SUPABASE_ADMIN_CLIENT)
    private readonly supabase: SupabaseAdminClient
  ) {}

  async findAll(): Promise<Plan[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .order('price', { ascending: true })

    this.ensureNoError(error, 'findAll')

    if (!data) {
      return []
    }

    return data.map((row) => this.mapRowToPlan(row))
  }

  private ensureNoError(error: PostgrestError | null, operation: string): void {
    if (!error) {
      return
    }

    this.logger.error(`${operation} failed`, error)
    throw new InternalServerErrorException(
      `Supabase ${operation} operation failed`
    )
  }

  private mapRowToPlan(row: PlanRow): Plan {
    return planSchema.parse({
      id: row.id,
      code: row.code,
      price: row.price,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    })
  }
}
