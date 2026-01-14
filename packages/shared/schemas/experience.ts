import { z } from 'zod'

export const experienceProfileSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  headline: z.string().nullable().optional(),
  summary: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  yearsOfExperience: z.number().nullable().optional(),
  skills: z.array(z.string()).default([]),
  customFields: z.record(z.string(), z.unknown()).nullable().optional(),
  ingestionMetadata: z.record(z.string(), z.unknown()).nullable().optional(),
  rawPayload: z.record(z.string(), z.unknown()).nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const experienceRoleSchema = z.object({
  id: z.string().uuid(),
  profileId: z.string().uuid(),
  title: z.string(),
  company: z.string(),
  employmentType: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  isCurrent: z.boolean().default(false),
  periodLabel: z.string().nullable().optional(),
  durationLabel: z.string().nullable().optional(),
  status: z.enum(['complete', 'incomplete']).default('incomplete'),
  summary: z.string().nullable().optional(),
  techStack: z.array(z.string()).default([]),
  methodologies: z.array(z.string()).default([]),
  teamStructure: z.string().nullable().optional(),
  keyAchievements: z.array(z.string()).default([]),
  missingDetails: z.string().nullable().optional(),
  customFields: z.record(z.string(), z.unknown()).nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const experienceRoleProjectSchema = z.object({
  id: z.string().uuid(),
  roleId: z.string().uuid(),
  title: z.string(),
  period: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  achievements: z.array(z.string()).default([]),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const experienceLearningSchema = z.object({
  id: z.string().uuid(),
  profileId: z.string().uuid(),
  entryType: z.enum(['education', 'certification']),
  institution: z.string(),
  program: z.string().nullable().optional(),
  fieldOfStudy: z.string().nullable().optional(),
  credentialUrl: z.string().nullable().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const experienceProfileAggregateSchema = z.object({
  profile: experienceProfileSchema,
  roles: z.array(
    experienceRoleSchema.extend({
      projects: z.array(experienceRoleProjectSchema).default([]),
    })
  ),
  learning: z.array(experienceLearningSchema).default([]),
})

export type ExperienceProfile = z.infer<typeof experienceProfileSchema>
export type ExperienceRole = z.infer<typeof experienceRoleSchema>
export type ExperienceRoleProject = z.infer<typeof experienceRoleProjectSchema>
export type ExperienceLearning = z.infer<typeof experienceLearningSchema>
export type ExperienceProfileAggregate = z.infer<
  typeof experienceProfileAggregateSchema
>

export const createExperienceProfileInputSchema = experienceProfileSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    userId: z.string().uuid(),
  })

export const createExperienceRoleInputSchema = experienceRoleSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    profileId: z.string().uuid(),
  })

export const createExperienceRoleProjectInputSchema =
  experienceRoleProjectSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })

export const createExperienceLearningInputSchema = experienceLearningSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    profileId: z.string().uuid(),
  })

export type CreateExperienceProfileInput = z.infer<
  typeof createExperienceProfileInputSchema
>
export type CreateExperienceRoleInput = z.infer<
  typeof createExperienceRoleInputSchema
>
export type CreateExperienceRoleProjectInput = z.infer<
  typeof createExperienceRoleProjectInputSchema
>
export type CreateExperienceLearningInput = z.infer<
  typeof createExperienceLearningInputSchema
>

export const normalizedExperienceProfileSchema = z.object({
  headline: z.string().nullable().optional(),
  summary: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  yearsOfExperience: z.number().nullable().optional(),
  skills: z.array(z.string()).default([]),
  customFields: z.record(z.string(), z.unknown()).nullable().optional(),
})

export const normalizedExperienceRoleSchema = z.object({
  title: z.string(),
  company: z.string(),
  employmentType: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  isCurrent: z.boolean().default(false),
  periodLabel: z.string().nullable().optional(),
  durationLabel: z.string().nullable().optional(),
  status: z.enum(['complete', 'incomplete']).default('incomplete'),
  summary: z.string().nullable().optional(),
  techStack: z.array(z.string()).default([]),
  methodologies: z.array(z.string()).default([]),
  teamStructure: z.string().nullable().optional(),
  keyAchievements: z.array(z.string()).default([]),
  missingDetails: z.string().nullable().optional(),
  customFields: z.record(z.string(), z.unknown()).nullable().optional(),
})

export const normalizedExperienceLearningSchema = z.object({
  entryType: z.enum(['education', 'certification']),
  institution: z.string(),
  program: z.string().nullable().optional(),
  fieldOfStudy: z.string().nullable().optional(),
  credentialUrl: z.string().nullable().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
})

export type NormalizedProfile = z.infer<
  typeof normalizedExperienceProfileSchema
>
export type NormalizedRole = z.infer<typeof normalizedExperienceRoleSchema>
export type NormalizedLearning = z.infer<
  typeof normalizedExperienceLearningSchema
>
