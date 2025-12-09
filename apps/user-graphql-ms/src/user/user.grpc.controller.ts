import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import type { User } from '@shared/schemas/user'
import { UserService } from './user.service'

interface GetUserByIdRequest {
  id: string
}

interface ListUsersRequest {
  limit?: number
}

interface GrpcUser {
  id: string
  email: string
  full_name: string
  avatar_url?: string | null
  job_title?: string | null
  created_at: string
  updated_at: string
  metadata: Record<string, string>
}

interface GrpcUserList {
  users: GrpcUser[]
}

@Controller()
export class UserGrpcController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'GetUserById')
  async getUserById(request: GetUserByIdRequest): Promise<GrpcUser> {
    const user = await this.userService.findById(request.id)
    return serializeUser(user)
  }

  @GrpcMethod('UserService', 'ListUsers')
  async listUsers(request: ListUsersRequest): Promise<GrpcUserList> {
    const users = await this.userService.findAll(request.limit)
    return {
      users: users.map((user) => serializeUser(user)),
    }
  }
}

function serializeUser(user: User): GrpcUser {
  return {
    id: user.id,
    email: user.email,
    full_name: user.fullName,
    avatar_url: user.avatarUrl ?? null,
    job_title: user.jobTitle ?? null,
    created_at: user.createdAt.toISOString(),
    updated_at: user.updatedAt.toISOString(),
    metadata: normalizeMetadata(user.metadata),
  }
}

function normalizeMetadata(
  metadata: Record<string, unknown> | null | undefined
): Record<string, string> {
  if (!metadata) {
    return {}
  }

  return Object.entries(metadata).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      acc[key] = serializeMetadataValue(value)
      return acc
    },
    {}
  )
}

function serializeMetadataValue(value: unknown): string {
  if (value === null || value === undefined) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  return JSON.stringify(value)
}
