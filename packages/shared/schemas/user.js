'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.updateUserInputSchema =
  exports.createUserInputSchema =
  exports.userSchema =
  exports.userIdSchema =
    void 0
const zod_1 = require('zod')
exports.userIdSchema = zod_1.z
  .string()
  .min(1, 'User id must be provided')
  .max(128, 'User id is too long')
const metadataSchema = zod_1.z
  .record(zod_1.z.string(), zod_1.z.unknown())
  .nullable()
  .optional()
exports.userSchema = zod_1.z.object({
  id: exports.userIdSchema,
  email: zod_1.z.string().email(),
  fullName: zod_1.z.string().min(1).max(160),
  avatarUrl: zod_1.z.string().url().nullable().optional(),
  jobTitle: zod_1.z.string().max(160).nullable().optional(),
  metadata: metadataSchema,
  createdAt: zod_1.z.coerce.date(),
  updatedAt: zod_1.z.coerce.date(),
})
exports.createUserInputSchema = zod_1.z.object({
  email: zod_1.z.string().email(),
  fullName: zod_1.z.string().min(1).max(160),
  avatarUrl: zod_1.z.string().url().nullable().optional(),
  jobTitle: zod_1.z.string().max(160).nullable().optional(),
  metadata: metadataSchema,
})
exports.updateUserInputSchema = exports.createUserInputSchema
  .partial()
  .refine(
    (value) => Object.keys(value).length > 0,
    'At least one field must be provided'
  )
//# sourceMappingURL=user.js.map
