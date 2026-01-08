import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
  type UpsertUserInput,
  type User,
  upsertUserInputSchema,
  userIdSchema,
} from '@shared/schemas/user'
import { type UserRepository } from './user.repository'
import { USER_REPOSITORY } from './user.constants'

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepository
  ) {}

  async findById(id: string): Promise<User> {
    const parsedId = userIdSchema.parse(id)
    const user = await this.repository.findById(parsedId)

    if (!user) {
      throw new NotFoundException(`User ${parsedId} not found`)
    }

    return user
  }

  async upsert(input: UpsertUserInput): Promise<User> {
    const parsed = upsertUserInputSchema.parse(input)
    return this.repository.upsertByProvider(parsed)
  }
}
