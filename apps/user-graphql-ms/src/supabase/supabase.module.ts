import { Global, Module } from '@nestjs/common'
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
      useFactory: (): SupabaseAdminClient => createSupabaseAdminClient(),
    },
  ],
  exports: [SUPABASE_ADMIN_CLIENT],
})
export class SupabaseModule {}
