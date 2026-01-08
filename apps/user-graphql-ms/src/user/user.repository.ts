import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { PostgrestError } from '@supabase/supabase-js'
import {
  type UpsertUserInput,
  type User,
  userSchema,
  upsertUserInputSchema,
} from '@shared/schemas/user'
import { type SupabaseAdminClient } from '@shared/db/supabase-admin'
import { SUPABASE_ADMIN_CLIENT } from '../supabase/supabase.constants'
import {
  encryptToken,
  decryptToken,
  keyFromBase64,
} from '@shared/crypto/tokens'

interface UserRow {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  metadata: Record<string, unknown> | null
  provider: string
  provider_account_id: string
  access_token: string | null
  refresh_token: string | null
  token_expires_at: string | null
  created_at: string
  updated_at: string
}

export interface UserRepository {
  findById(id: string): Promise<User | null>
  upsertByProvider(input: UpsertUserInput): Promise<User>
}

@Injectable()
export class SupabaseUserRepository implements UserRepository {
  private readonly tableName = 'users'
  private readonly logger = new Logger(SupabaseUserRepository.name)
  private readonly encryptionKey: Buffer

  constructor(
    @Inject(SUPABASE_ADMIN_CLIENT)
    private readonly supabase: SupabaseAdminClient,
    private readonly config: ConfigService
  ) {
    const keyBase64 = this.config.getOrThrow<string>('TOKEN_ENCRYPTION_KEY')
    this.encryptionKey = keyFromBase64(keyBase64)
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

  async upsertByProvider(input: UpsertUserInput): Promise<User> {
    const parsed = upsertUserInputSchema.parse(input)

    // Encrypt tokens if provided
    const encryptedAccessToken = parsed.accessToken
      ? encryptToken(parsed.accessToken, this.encryptionKey)
      : null
    const encryptedRefreshToken = parsed.refreshToken
      ? encryptToken(parsed.refreshToken, this.encryptionKey)
      : null

    const payload = {
      provider: parsed.provider,
      provider_account_id: parsed.providerAccountId,
      email: parsed.email,
      full_name: parsed.fullName,
      avatar_url: parsed.avatarUrl ?? null,
      access_token: encryptedAccessToken,
      refresh_token: encryptedRefreshToken,
      token_expires_at: parsed.tokenExpiresAt
        ? parsed.tokenExpiresAt.toISOString()
        : null,
    }

    const { data, error } = await this.supabase
      .from(this.tableName)
      .upsert(payload, {
        onConflict: 'provider,provider_account_id',
      })
      .select('*')
      .single()

    this.ensureNoError(error, 'upsertByProvider')

    if (!data) {
      throw new InternalServerErrorException('User upsert failed')
    }

    return this.mapRowToUser(data)
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
      metadata: row.metadata ?? null,
      provider: row.provider as 'google' | 'linkedin' | 'github',
      providerAccountId: row.provider_account_id,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    })
  }

  /**
   * Decrypts access token for a user (used when making API calls)
   * @param userId - User ID
   * @returns Decrypted access token or null
   */
  async getDecryptedAccessToken(userId: string): Promise<string | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('access_token')
      .eq('id', userId)
      .single()

    if (error || !data || !data.access_token) {
      return null
    }

    try {
      return decryptToken(data.access_token, this.encryptionKey)
    } catch (error) {
      this.logger.error('Failed to decrypt access token', error)
      return null
    }
  }
}
