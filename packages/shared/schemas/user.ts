import { z } from 'zod'

export const userIdSchema = z
  .string()
  .min(1, 'User id must be provided')
  .max(128, 'User id is too long')

const metadataSchema = z.record(z.string(), z.unknown()).nullable().optional()

export const userSchema = z.object({
  id: userIdSchema,
  email: z.string().email(),
  fullName: z.string().min(1).max(160),
  avatarUrl: z.string().url().nullable().optional(),
  metadata: metadataSchema,
  provider: z.enum(['google', 'linkedin', 'github']),
  providerAccountId: z.string().min(1).max(255),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const upsertUserInputSchema = z.object({
  provider: z.enum(['google', 'linkedin', 'github']),
  providerAccountId: z.string().min(1).max(255),
  email: z.string().email(),
  fullName: z.string().min(1).max(160),
  avatarUrl: z.string().url().nullable().optional(),
  accessToken: z.string().nullable().optional(),
  refreshToken: z.string().nullable().optional(),
  tokenExpiresAt: z.coerce.date().nullable().optional(),
})

export type User = z.infer<typeof userSchema>
export type UpsertUserInput = z.infer<typeof upsertUserInputSchema>
