import { NotFoundException } from '@nestjs/common'
import {
  type CreateUserInput,
  type UpdateUserInput,
  type User,
  userSchema,
} from '@shared/schemas/user'
import { type UserRepository } from './user.repository'
import { UserService } from './user.service'

const sampleUser: User = userSchema.parse({
  id: 'user-123',
  email: 'jane@example.com',
  fullName: 'Jane Example',
  avatarUrl: null,
  jobTitle: null,
  metadata: null,
  createdAt: new Date(),
  updatedAt: new Date(),
})

function createRepositoryMock(): jest.Mocked<UserRepository> {
  return {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
}

describe('UserService', () => {
  let service: UserService
  let repository: jest.Mocked<UserRepository>

  beforeEach(() => {
    repository = createRepositoryMock()
    service = new UserService(repository)
  })

  it('clamps list limit between 1 and 200', async () => {
    repository.findAll.mockResolvedValue([sampleUser])
    await service.findAll(500)
    expect(repository.findAll).toHaveBeenCalledWith(200)
  })

  it('returns user by id', async () => {
    repository.findById.mockResolvedValue(sampleUser)
    const result = await service.findById(sampleUser.id)
    expect(result).toEqual(sampleUser)
  })

  it('throws when user not found', async () => {
    repository.findById.mockResolvedValue(null)
    await expect(service.findById('missing')).rejects.toBeInstanceOf(
      NotFoundException
    )
  })

  it('creates user after validation', async () => {
    const input: CreateUserInput = {
      email: 'john@example.com',
      fullName: 'John Example',
    }
    const created = { ...sampleUser, id: 'new-user', email: input.email }
    repository.create.mockResolvedValue(created)

    const result = await service.create(input)

    expect(repository.create).toHaveBeenCalledWith(input)
    expect(result).toEqual(created)
  })

  it('updates user when repository returns record', async () => {
    const patch: UpdateUserInput = { fullName: 'Updated' }
    const updated = { ...sampleUser, fullName: 'Updated' }
    repository.update.mockResolvedValue(updated)

    const result = await service.update(sampleUser.id, patch)

    expect(repository.update).toHaveBeenCalledWith(sampleUser.id, patch)
    expect(result).toEqual(updated)
  })

  it('throws on update when user missing', async () => {
    repository.update.mockResolvedValue(null)
    await expect(
      service.update(sampleUser.id, { fullName: 'Nope' })
    ).rejects.toBeInstanceOf(NotFoundException)
  })

  it('deletes an existing user', async () => {
    repository.findById.mockResolvedValue(sampleUser)
    repository.delete.mockResolvedValue(true)

    const result = await service.delete(sampleUser.id)

    expect(repository.delete).toHaveBeenCalledWith(sampleUser.id)
    expect(result).toBe(true)
  })

  it('throws on delete when user missing', async () => {
    repository.findById.mockResolvedValue(null)
    await expect(service.delete(sampleUser.id)).rejects.toBeInstanceOf(
      NotFoundException
    )
  })
})
