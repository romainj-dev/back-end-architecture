import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import type { PostgrestError } from '@supabase/supabase-js'
import {
  type CreateUserInput,
  type UpdateUserInput,
  type User,
  userSchema,
} from '@shared/schemas/user'
import { type SupabaseAdminClient } from '@shared/db/supabase-admin'
import { SUPABASE_ADMIN_CLIENT } from '../supabase/supabase.constants'

interface UserRow {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  job_title: string | null
  metadata: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

export interface UserRepository {
  findAll(limit: number): Promise<User[]>
  findById(id: string): Promise<User | null>
  create(input: CreateUserInput): Promise<User>
  update(id: string, input: UpdateUserInput): Promise<User | null>
  delete(id: string): Promise<boolean>
}

@Injectable()
export class SupabaseUserRepository implements UserRepository {
  private readonly tableName = 'users'
  private readonly logger = new Logger(SupabaseUserRepository.name)

  constructor(
    @Inject(SUPABASE_ADMIN_CLIENT)
    private readonly supabase: SupabaseAdminClient
  ) {}

  async findAll(limit: number): Promise<User[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    this.ensureNoError(error, 'findAll')

    if (!data) {
      return []
    }

    return data.map((row) => this.mapRowToUser(row))
  }

  async findById(id: string): Promise<User | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      this.ensureNoError(error, 'findById')
    }

    return data ? this.mapRowToUser(data) : null
  }

  async create(input: CreateUserInput): Promise<User> {
    const payload = this.mapInputToRow(input)
    if (payload.metadata === undefined) {
      payload.metadata = null
    }

    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(payload)
      .select('*')
      .single()

    this.ensureNoError(error, 'create')

    if (!data) {
      throw new InternalServerErrorException('User creation failed')
    }

    return this.mapRowToUser(data)
  }

  async update(id: string, input: UpdateUserInput): Promise<User | null> {
    const payload = this.mapInputToRow(input)

    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(payload)
      .eq('id', id)
      .select('*')
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      this.ensureNoError(error, 'update')
    }

    return data ? this.mapRowToUser(data) : null
  }

  async delete(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq('id', id)

    this.ensureNoError(error, 'delete')

    return true
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

  private mapRowToUser(row: UserRow): User {
    return userSchema.parse({
      id: row.id,
      email: row.email,
      fullName: row.full_name ?? row.email,
      avatarUrl: row.avatar_url,
      jobTitle: row.job_title,
      metadata: row.metadata ?? null,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    })
  }

  private mapInputToRow(
    input: Partial<CreateUserInput & UpdateUserInput>
  ): Partial<UserRow> {
    return {
      email: input.email ?? undefined,
      full_name: input.fullName ?? undefined,
      avatar_url: input.avatarUrl ?? undefined,
      job_title: input.jobTitle ?? undefined,
      metadata: input.metadata ?? undefined,
    }
  }
}
