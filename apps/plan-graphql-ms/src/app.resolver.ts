import { Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class AppResolver {
  @Query(() => String, { name: 'health' })
  healthCheck(): string {
    return 'ok'
  }
}
