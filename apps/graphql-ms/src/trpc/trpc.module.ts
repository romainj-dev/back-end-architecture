import { Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { UserService } from '../user/user.service'
import { createAppRouter } from './router'
import { TRPC_ROUTER } from './trpc.constants'

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: TRPC_ROUTER,
      useFactory: (userService: UserService) =>
        createAppRouter({ userService }),
      inject: [UserService],
    },
  ],
  exports: [TRPC_ROUTER],
})
export class TrpcModule {}
