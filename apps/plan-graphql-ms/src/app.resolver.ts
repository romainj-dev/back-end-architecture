import { Query, Resolver } from '@nestjs/graphql'
import { Public } from '@shared/auth'

@Resolver()
export class AppResolver {
  @Public()
  @Query(() => String, { name: 'health' })
  healthCheck(): string {
    return 'ok'
  }
}
