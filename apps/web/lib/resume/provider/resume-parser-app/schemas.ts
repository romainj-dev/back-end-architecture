import { z } from 'zod'

/**
 * ResumeParser API response schema
 * Based on https://resumeparser.app documentation
 */
export const resumeParserAppResponseSchema = z.object({
  parsed: z.object({
    name: z.string().optional(),
    title: z.string().optional(),
    brief: z.string().optional(),
    contact: z
      .object({
        location_city: z.string().nullable().optional(),
        location_state: z.string().nullable().optional(),
        location_country: z.string().nullable().optional(),
        email: z.string().email().nullable().optional(),
        phone: z.string().nullable().optional(),
        linkedin: z.string().url().nullable().optional(),
        github: z.string().url().nullable().optional(),
        twitter: z.string().url().nullable().optional(),
        website: z.string().url().nullable().optional(),
      })
      .optional(),
    employment_history: z
      .array(
        z.object({
          title: z.string(),
          company: z.string(),
          company_website: z.string().url().nullable().optional(),
          location: z.string().nullable().optional(),
          start_date: z.string().nullable().optional(),
          end_date: z.string().nullable().optional(),
          roles: z
            .array(
              z.object({
                role: z.string().optional(),
                responsibilities: z.array(z.string()).optional(),
              })
            )
            .optional(),
          responsibilities: z.array(z.string()).optional(),
        })
      )
      .optional(),
    education: z
      .array(
        z.object({
          degree: z.string().optional(),
          institution_name: z.string(),
          institution_country: z.string().nullable().optional(),
          start_date: z.string().nullable().optional(),
          end_date: z.string().nullable().optional(),
        })
      )
      .optional(),
    skills: z.array(z.string()).optional(),
    courses: z.array(z.string()).optional(),
    languages: z.array(z.string()).optional(),
    derived: z
      .object({
        years_of_experience: z.number().optional(),
        approximate_age: z.number().nullable().optional(),
      })
      .optional(),
  }),
  file_metadata: z.record(z.string(), z.unknown()).optional(),
  meta: z
    .object({
      message: z.string().optional(),
      file_hash: z.string().optional(),
      runtime_ms: z.number().optional(),
      balance: z.number().optional(),
    })
    .optional(),
})

export type ResumeParserAppResponse = z.infer<
  typeof resumeParserAppResponseSchema
>
