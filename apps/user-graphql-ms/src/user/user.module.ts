import { Module } from '@nestjs/common'
import { SupabaseModule } from '../supabase/supabase.module'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { SupabaseUserRepository } from './user.repository'
import { USER_REPOSITORY } from './user.constants'
import { JsonObjectScalar } from '../common/scalars/json-object.scalar'

@Module({
  imports: [SupabaseModule],
  providers: [
    UserResolver,
    UserService,
    JsonObjectScalar,
    {
      provide: USER_REPOSITORY,
      useClass: SupabaseUserRepository,
    },
  ],
  exports: [UserService, USER_REPOSITORY],
})
export class UserModule {}
