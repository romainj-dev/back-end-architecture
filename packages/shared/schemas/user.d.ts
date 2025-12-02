import { z } from 'zod'
export declare const userIdSchema: z.ZodString
export declare const userSchema: z.ZodObject<
  {
    id: z.ZodString
    email: z.ZodString
    fullName: z.ZodString
    avatarUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>
    jobTitle: z.ZodOptional<z.ZodNullable<z.ZodString>>
    metadata: z.ZodOptional<
      z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>
    >
    createdAt: z.ZodDate
    updatedAt: z.ZodDate
  },
  'strip',
  z.ZodTypeAny,
  {
    id: string
    email: string
    fullName: string
    createdAt: Date
    updatedAt: Date
    avatarUrl?: string | null | undefined
    jobTitle?: string | null | undefined
    metadata?: Record<string, unknown> | null | undefined
  },
  {
    id: string
    email: string
    fullName: string
    createdAt: Date
    updatedAt: Date
    avatarUrl?: string | null | undefined
    jobTitle?: string | null | undefined
    metadata?: Record<string, unknown> | null | undefined
  }
>
export declare const createUserInputSchema: z.ZodObject<
  {
    email: z.ZodString
    fullName: z.ZodString
    avatarUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>
    jobTitle: z.ZodOptional<z.ZodNullable<z.ZodString>>
    metadata: z.ZodOptional<
      z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>
    >
  },
  'strip',
  z.ZodTypeAny,
  {
    email: string
    fullName: string
    avatarUrl?: string | null | undefined
    jobTitle?: string | null | undefined
    metadata?: Record<string, unknown> | null | undefined
  },
  {
    email: string
    fullName: string
    avatarUrl?: string | null | undefined
    jobTitle?: string | null | undefined
    metadata?: Record<string, unknown> | null | undefined
  }
>
export declare const updateUserInputSchema: z.ZodEffects<
  z.ZodObject<
    {
      email: z.ZodOptional<z.ZodString>
      fullName: z.ZodOptional<z.ZodString>
      avatarUrl: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>
      jobTitle: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>
      metadata: z.ZodOptional<
        z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>
      >
    },
    'strip',
    z.ZodTypeAny,
    {
      email?: string | undefined
      fullName?: string | undefined
      avatarUrl?: string | null | undefined
      jobTitle?: string | null | undefined
      metadata?: Record<string, unknown> | null | undefined
    },
    {
      email?: string | undefined
      fullName?: string | undefined
      avatarUrl?: string | null | undefined
      jobTitle?: string | null | undefined
      metadata?: Record<string, unknown> | null | undefined
    }
  >,
  {
    email?: string | undefined
    fullName?: string | undefined
    avatarUrl?: string | null | undefined
    jobTitle?: string | null | undefined
    metadata?: Record<string, unknown> | null | undefined
  },
  {
    email?: string | undefined
    fullName?: string | undefined
    avatarUrl?: string | null | undefined
    jobTitle?: string | null | undefined
    metadata?: Record<string, unknown> | null | undefined
  }
>
export type User = z.infer<typeof userSchema>
export type CreateUserInput = z.infer<typeof createUserInputSchema>
export type UpdateUserInput = z.infer<typeof updateUserInputSchema>
