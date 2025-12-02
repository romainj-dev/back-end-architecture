import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
  type CreateUserInput,
  type UpdateUserInput,
  type User,
  createUserInputSchema,
  updateUserInputSchema,
  userIdSchema,
} from '@shared/schemas/user'
import { type UserRepository } from './user.repository'
import { USER_REPOSITORY } from './user.constants'

const DEFAULT_USER_LIMIT = 50

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepository
  ) {}

  async findAll(limit = DEFAULT_USER_LIMIT): Promise<User[]> {
    const parsedLimit = Math.min(Math.max(limit, 1), 200)
    return this.repository.findAll(parsedLimit)
  }

  async findById(id: string): Promise<User> {
    const parsedId = userIdSchema.parse(id)
    const user = await this.repository.findById(parsedId)

    if (!user) {
      throw new NotFoundException(`User ${parsedId} not found`)
    }

    return user
  }

  async create(input: CreateUserInput): Promise<User> {
    const parsed = createUserInputSchema.parse(input)
    return this.repository.create(parsed)
  }

  async update(id: string, input: UpdateUserInput): Promise<User> {
    const parsedId = userIdSchema.parse(id)
    const parsed = updateUserInputSchema.parse(input)

    const updated = await this.repository.update(parsedId, parsed)
    if (!updated) {
      throw new NotFoundException(`User ${parsedId} not found`)
    }

    return updated
  }

  async delete(id: string): Promise<boolean> {
    const parsedId = userIdSchema.parse(id)

    const existing = await this.repository.findById(parsedId)
    if (!existing) {
      throw new NotFoundException(`User ${parsedId} not found`)
    }

    await this.repository.delete(parsedId)
    return true
  }
}
