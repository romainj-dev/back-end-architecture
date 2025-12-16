import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { IS_PUBLIC_KEY } from './public.decorator'
import type { UserContext } from './user.decorator'

@Injectable()
export class GatewayAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Check if endpoint is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }

    // Extract user context from gateway headers
    const gqlContext = GqlExecutionContext.create(context)
    const request = gqlContext.getContext().req
    const userId = request.headers['x-user-id']
    const userEmail = request.headers['x-user-email']

    if (!userId || !userEmail) {
      throw new UnauthorizedException('Authentication required')
    }

    // Attach user to request context
    request.user = {
      id: userId,
      email: userEmail,
      name: request.headers['x-user-name'],
    } satisfies UserContext

    return true
  }
}
