import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export interface UserContext {
  id: string
  email: string
  name?: string
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserContext => {
    const context = GqlExecutionContext.create(ctx)
    const request = context.getContext().req
    const user = request.user as UserContext | undefined

    if (!user) {
      throw new Error('User context not found in request')
    }

    return user
  }
)
