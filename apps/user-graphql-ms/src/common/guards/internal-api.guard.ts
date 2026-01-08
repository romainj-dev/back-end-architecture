import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ConfigService } from '@nestjs/config'

/**
 * Guard that protects internal-only mutations.
 * Validates the x-internal-api-key header matches the configured INTERNAL_API_KEY.
 */
@Injectable()
export class InternalApiGuard implements CanActivate {
  private readonly expectedKey: string

  constructor(private readonly config: ConfigService) {
    this.expectedKey = this.config.getOrThrow<string>('INTERNAL_API_KEY')
  }

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req

    const headerValue = req.headers['x-internal-api-key']
    const apiKey = Array.isArray(headerValue) ? headerValue[0] : headerValue

    if (!apiKey || apiKey !== this.expectedKey) {
      throw new UnauthorizedException('Invalid or missing internal API key')
    }

    return true
  }
}
