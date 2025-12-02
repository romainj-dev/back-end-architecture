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
  jobTitle: z.string().max(160).nullable().optional(),
  metadata: metadataSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const createUserInputSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(1).max(160),
  avatarUrl: z.string().url().nullable().optional(),
  jobTitle: z.string().max(160).nullable().optional(),
  metadata: metadataSchema,
})

export const updateUserInputSchema = createUserInputSchema
  .partial()
  .refine(
    (value) => Object.keys(value).length > 0,
    'At least one field must be provided'
  )

export type User = z.infer<typeof userSchema>
export type CreateUserInput = z.infer<typeof createUserInputSchema>
export type UpdateUserInput = z.infer<typeof updateUserInputSchema>
