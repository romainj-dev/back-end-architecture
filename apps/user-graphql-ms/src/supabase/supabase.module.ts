import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  createSupabaseAdminClient,
  type SupabaseAdminClient,
} from '@shared/db/supabase-admin'
import { SUPABASE_ADMIN_CLIENT } from './supabase.constants'

@Global()
@Module({
  providers: [
    {
      provide: SUPABASE_ADMIN_CLIENT,
      useFactory: (config: ConfigService): SupabaseAdminClient =>
        createSupabaseAdminClient({
          url: config.getOrThrow<string>('SUPABASE_URL'),
          serviceRoleKey: config.getOrThrow<string>(
            'SUPABASE_SERVICE_ROLE_KEY'
          ),
        }),
      inject: [ConfigService],
    },
  ],
  exports: [SUPABASE_ADMIN_CLIENT],
})
export class SupabaseModule {}
