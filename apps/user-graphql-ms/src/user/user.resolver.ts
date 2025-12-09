import {
  Args,
  Context,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql'
import type { Request } from 'express'
import { UserModel } from './user.model'
import { UserService } from './user.service'
import { CreateUserRequest } from './dto/create-user.input'
import { UpdateUserRequest } from './dto/update-user.input'

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserModel], { name: 'users' })
  users(
    @Args('limit', { type: () => Int, nullable: true }) limit?: number
  ): Promise<UserModel[]> {
    return this.userService.findAll(limit)
  }

  @Query(() => UserModel, { name: 'user' })
  user(@Args('id', { type: () => ID }) id: string): Promise<UserModel> {
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

  @Mutation(() => UserModel)
  createUser(
    @Args('input', { type: () => CreateUserRequest }) input: CreateUserRequest
  ): Promise<UserModel> {
    return this.userService.create(input)
  }

  @Mutation(() => UserModel)
  updateUser(
    @Args('input', { type: () => UpdateUserRequest }) input: UpdateUserRequest
  ): Promise<UserModel> {
    return this.userService.update(input.id, input)
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.userService.delete(id)
  }
}
