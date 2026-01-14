import { Inject, Injectable } from '@nestjs/common'
import type {
  ExperienceProfileAggregate,
  NormalizedLearning,
  NormalizedProfile,
  NormalizedRole,
} from '@shared/schemas/experience'
import type { SupabaseAdminClient } from '@shared/db/supabase-admin'
import { SUPABASE_ADMIN_CLIENT } from '../supabase/supabase.constants'

export interface SaveExperienceDataInput {
  userId: string
  profile: NormalizedProfile
  roles: NormalizedRole[]
  learning: NormalizedLearning[]
  rawPayload: Record<string, unknown> | null
}

export interface SaveExperienceDataResult {
  profileId: string
  rolesCount: number
  learningCount: number
}

export interface ExperienceRepository {
  saveExperienceData(
    input: SaveExperienceDataInput
  ): Promise<SaveExperienceDataResult>
  getExperienceProfile(
    userId: string
  ): Promise<ExperienceProfileAggregate | null>
}

@Injectable()
export class SupabaseExperienceRepository implements ExperienceRepository {
  constructor(
    @Inject(SUPABASE_ADMIN_CLIENT)
    private readonly supabase: SupabaseAdminClient
  ) {}

  async saveExperienceData({
    userId,
    profile,
    roles,
    learning,
    rawPayload,
  }: SaveExperienceDataInput): Promise<SaveExperienceDataResult> {
    const { data: profileData, error: profileError } = await this.supabase
      .from('user_experience_profiles')
      .upsert(
        {
          user_id: userId,
          headline: profile.headline,
          summary: profile.summary,
          location: profile.location,
          years_of_experience: profile.yearsOfExperience,
          skills: profile.skills,
          custom_fields: profile.customFields ?? null,
          ingestion_metadata: {
            imported_at: new Date().toISOString(),
          },
          raw_payload: rawPayload,
        },
        { onConflict: 'user_id' }
      )
      .select('id')
      .single()

    if (profileError || !profileData) {
      throw new Error(
        `Failed to save profile: ${profileError?.message ?? 'Unknown error'}`
      )
    }

    const profileId = profileData.id as string

    const { data: existingRoles } = await this.supabase
      .from('user_experience_roles')
      .select('id')
      .eq('profile_id', profileId)
    const existingRoleIds = existingRoles?.map((role) => role.id) ?? []

    const { data: existingLearning } = await this.supabase
      .from('user_experience_learning')
      .select('id')
      .eq('profile_id', profileId)
    const existingLearningIds = existingLearning?.map((entry) => entry.id) ?? []

    const rolesToInsert = roles.map((role) => ({
      profile_id: profileId,
      title: role.title,
      company: role.company,
      employment_type: role.employmentType,
      location: role.location,
      start_date: role.startDate,
      end_date: role.endDate,
      is_current: role.isCurrent,
      period_label: role.periodLabel,
      duration_label: role.durationLabel,
      status: role.status,
      summary: role.summary,
      tech_stack: role.techStack,
      methodologies: role.methodologies,
      team_structure: role.teamStructure,
      key_achievements: role.keyAchievements,
      missing_details: role.missingDetails,
      custom_fields: role.customFields ?? null,
    }))

    const learningToInsert = learning.map((entry) => ({
      profile_id: profileId,
      entry_type: entry.entryType,
      institution: entry.institution,
      program: entry.program,
      field_of_study: entry.fieldOfStudy,
      credential_url: entry.credentialUrl,
      start_date: entry.startDate,
      end_date: entry.endDate,
      description: entry.description,
    }))

    let insertedRoleIds: string[] = []
    let insertedRolesCount = 0

    if (rolesToInsert.length > 0) {
      const { data: insertedRoles, error: rolesError } = await this.supabase
        .from('user_experience_roles')
        .insert(rolesToInsert)
        .select('id')

      if (rolesError) {
        throw new Error(`Failed to save roles: ${rolesError.message}`)
      }

      insertedRoleIds = insertedRoles?.map((role) => role.id) ?? []
      insertedRolesCount = insertedRoleIds.length
    }

    let insertedLearningIds: string[] = []
    let insertedLearningCount = 0

    if (learningToInsert.length > 0) {
      const { data: insertedLearning, error: learningError } =
        await this.supabase
          .from('user_experience_learning')
          .insert(learningToInsert)
          .select('id')

      if (learningError) {
        if (insertedRoleIds.length > 0) {
          await this.supabase
            .from('user_experience_roles')
            .delete()
            .in('id', insertedRoleIds)
        }
        throw new Error(`Failed to save learning: ${learningError.message}`)
      }

      insertedLearningIds = insertedLearning?.map((entry) => entry.id) ?? []
      insertedLearningCount = insertedLearningIds.length
    }

    if (existingRoleIds.length > 0) {
      await this.supabase
        .from('user_experience_role_projects')
        .delete()
        .in('role_id', existingRoleIds)
      await this.supabase
        .from('user_experience_roles')
        .delete()
        .in('id', existingRoleIds)
    }

    if (existingLearningIds.length > 0) {
      await this.supabase
        .from('user_experience_learning')
        .delete()
        .in('id', existingLearningIds)
    }

    return {
      profileId,
      rolesCount: insertedRolesCount,
      learningCount: insertedLearningCount,
    }
  }

  async getExperienceProfile(
    userId: string
  ): Promise<ExperienceProfileAggregate | null> {
    const { data: profileData, error: profileError } = await this.supabase
      .from('user_experience_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (profileError || !profileData) {
      return null
    }

    const profileId = profileData.id as string

    const { data: rolesData, error: rolesError } = await this.supabase
      .from('user_experience_roles')
      .select('*, user_experience_role_projects(*)')
      .eq('profile_id', profileId)
      .order('start_date', { ascending: false })

    if (rolesError) {
      throw new Error(`Failed to fetch roles: ${rolesError.message}`)
    }

    const { data: learningData, error: learningError } = await this.supabase
      .from('user_experience_learning')
      .select('*')
      .eq('profile_id', profileId)
      .order('start_date', { ascending: false })

    if (learningError) {
      throw new Error(`Failed to fetch learning: ${learningError.message}`)
    }

    const profile = {
      id: profileData.id,
      userId: profileData.user_id,
      headline: profileData.headline,
      summary: profileData.summary,
      location: profileData.location,
      yearsOfExperience: profileData.years_of_experience,
      skills: profileData.skills ?? [],
      customFields: profileData.custom_fields,
      ingestionMetadata: profileData.ingestion_metadata,
      rawPayload: profileData.raw_payload,
      createdAt: new Date(profileData.created_at),
      updatedAt: new Date(profileData.updated_at),
    }

    const roles =
      rolesData?.map((role) => ({
        id: role.id,
        profileId: role.profile_id,
        title: role.title,
        company: role.company,
        employmentType: role.employment_type,
        location: role.location,
        startDate: role.start_date,
        endDate: role.end_date,
        isCurrent: role.is_current,
        periodLabel: role.period_label,
        durationLabel: role.duration_label,
        status: role.status,
        summary: role.summary,
        techStack: role.tech_stack ?? [],
        methodologies: role.methodologies ?? [],
        teamStructure: role.team_structure,
        keyAchievements: role.key_achievements ?? [],
        missingDetails: role.missing_details,
        customFields: role.custom_fields,
        createdAt: new Date(role.created_at),
        updatedAt: new Date(role.updated_at),
        projects:
          role.user_experience_role_projects?.map((project: unknown) => {
            const p = project as {
              id: string
              role_id: string
              title: string
              period: string | null
              description: string | null
              achievements: string[] | null
              created_at: string
              updated_at: string
            }
            return {
              id: p.id,
              roleId: p.role_id,
              title: p.title,
              period: p.period,
              description: p.description,
              achievements: p.achievements ?? [],
              createdAt: new Date(p.created_at),
              updatedAt: new Date(p.updated_at),
            }
          }) ?? [],
      })) ?? []

    const learning =
      learningData?.map((entry) => ({
        id: entry.id,
        profileId: entry.profile_id,
        entryType: entry.entry_type,
        institution: entry.institution,
        program: entry.program,
        fieldOfStudy: entry.field_of_study,
        credentialUrl: entry.credential_url,
        startDate: entry.start_date,
        endDate: entry.end_date,
        description: entry.description,
        createdAt: new Date(entry.created_at),
        updatedAt: new Date(entry.updated_at),
      })) ?? []

    return {
      profile,
      roles,
      learning,
    }
  }
}
