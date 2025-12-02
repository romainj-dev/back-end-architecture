import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import {
  createUserInputSchema,
  updateUserInputSchema,
  userIdSchema,
} from '@shared/schemas/user'
import { type UserService } from '../user/user.service'
import { type TrpcContext } from './context'

const t = initTRPC.context<TrpcContext>().create()

const listInputSchema = z
  .object({
    limit: z.number().int().min(1).max(200).optional(),
  })
  .optional()

export function createAppRouter(deps: { userService: UserService }) {
  return t.router({
    health: t.procedure.query(() => ({ status: 'ok' })),
    user: t.router({
      list: t.procedure
        .input(listInputSchema)
        .query(({ input }) =>
          deps.userService.findAll(input?.limit ?? undefined)
        ),
      byId: t.procedure
        .input(z.object({ id: userIdSchema }))
        .query(({ input }) => deps.userService.findById(input.id)),
      create: t.procedure
        .input(createUserInputSchema)
        .mutation(({ input }) => deps.userService.create(input)),
      update: t.procedure
        .input(
          z.object({
            id: userIdSchema,
            changes: updateUserInputSchema,
          })
        )
        .mutation(({ input }) =>
          deps.userService.update(input.id, input.changes)
        ),
      delete: t.procedure
        .input(z.object({ id: userIdSchema }))
        .mutation(({ input }) => deps.userService.delete(input.id)),
    }),
  })
}

export type AppRouter = ReturnType<typeof createAppRouter>
