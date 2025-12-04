import { z } from 'zod'

export const planIdSchema = z
  .string()
  .min(1, 'Plan id must be provided')
  .max(128, 'Plan id is too long')

export const planCodeSchema = z
  .string()
  .min(1, 'Plan code must be provided')
  .max(64, 'Plan code is too long')

export const planSchema = z.object({
  id: planIdSchema,
  code: planCodeSchema,
  price: z.coerce.number().int().nonnegative(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Plan = z.infer<typeof planSchema>
