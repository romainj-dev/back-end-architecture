import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ForbiddenException, UseGuards } from '@nestjs/common'
import { Public } from '@shared/auth'
import type { Request } from 'express'
import { UserModel } from './user.model'
import { UserService } from './user.service'
import { UpsertUserRequest } from './dto/upsert-user.input'
import { InternalApiGuard } from '../common/guards/internal-api.guard'

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserModel, { name: 'user' })
  user(
    @Args('id', { type: () => ID }) id: string,
    @Context('req') req: Request
  ): Promise<UserModel> {
    const headerValue = req.headers['x-user-id']
    const requestingUserId = Array.isArray(headerValue)
      ? headerValue[0]
      : headerValue

    // Users can only query their own record (or admins - future)
    if (requestingUserId && requestingUserId !== id) {
      throw new ForbiddenException('Cannot access other users')
    }

    return this.userService.findById(id)
  }

  @Query(() => UserModel, { name: 'currentUser', nullable: true })
  currentUser(@Context('req') req: Request): Promise<UserModel | null> {
    const headerValue = req.headers['x-user-id']
    const userId = Array.isArray(headerValue) ? headerValue[0] : headerValue

    if (!userId) {
      return Promise.resolve(null)
    }

    return this.userService.findById(userId).catch(() => null)
  }

  @Public()
  @Mutation(() => UserModel)
  @UseGuards(InternalApiGuard)
  upsertUser(
    @Args('input', { type: () => UpsertUserRequest }) input: UpsertUserRequest
  ): Promise<UserModel> {
    return this.userService.upsert({
      provider: input.provider,
      providerAccountId: input.providerAccountId,
      email: input.email,
      fullName: input.fullName,
      avatarUrl: input.avatarUrl,
      accessToken: input.accessToken,
      refreshToken: input.refreshToken,
      tokenExpiresAt: input.tokenExpiresAt,
    })
  }
}
