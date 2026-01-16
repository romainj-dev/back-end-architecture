import { type ResumeParserAppResponse } from './schemas'

import {
  type NormalizedProfile,
  type NormalizedRole,
  type NormalizedLearning,
} from '@shared/schemas/experience'

/**
 * Formats a date string (YYYY-MM-DD) to YYYY-MM-DD format
 * Handles various date formats from resume parsers
 */
function formatDate(dateStr: string | null | undefined): string | null {
  if (!dateStr) {
    return null
  }

  // If already in YYYY-MM-DD format, return as-is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr
  }

  // Try to parse and format
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) {
    return null
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

/**
 * Calculates duration between two dates
 * Reused from LinkedIn normalizer pattern
 */
function calculateDuration(
  startDate: string | null,
  endDate: string | null
): string {
  if (!startDate) {
    return ''
  }

  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()

  const years = end.getFullYear() - start.getFullYear()
  const months = end.getMonth() - start.getMonth()

  let totalMonths = years * 12 + months
  if (totalMonths < 0) {
    totalMonths = 0
  }

  const yearsPart = Math.floor(totalMonths / 12)
  const monthsPart = totalMonths % 12

  if (yearsPart === 0) {
    return `${monthsPart} ${monthsPart === 1 ? 'month' : 'months'}`
  }
  if (monthsPart === 0) {
    return `${yearsPart} ${yearsPart === 1 ? 'year' : 'years'}`
  }
  return `${yearsPart}.${monthsPart} years`
}

/**
 * Formats period label (e.g., "Jan 2022 - Present")
 * Reused from LinkedIn normalizer pattern
 */
function formatPeriodLabel(
  startDate: string | null,
  endDate: string | null,
  isCurrent: boolean
): string {
  if (!startDate) {
    return ''
  }

  const start = new Date(startDate)
  const startMonth = start.toLocaleDateString('en-US', { month: 'short' })
  const startYear = start.getFullYear()

  if (isCurrent || !endDate) {
    return `${startMonth} ${startYear} - Present`
  }

  const end = new Date(endDate)
  const endMonth = end.toLocaleDateString('en-US', { month: 'short' })
  const endYear = end.getFullYear()

  return `${startMonth} ${startYear} - ${endMonth} ${endYear}`
}

/**
 * Determines if a role is "complete" based on available data
 */
function determineRoleStatus(
  employment: NonNullable<
    ResumeParserAppResponse['parsed']['employment_history']
  >[number]
): 'complete' | 'incomplete' {
  const hasBasicInfo = employment.title && employment.company
  const hasDescription =
    (employment.responsibilities && employment.responsibilities.length > 0) ||
    (employment.roles && employment.roles.length > 0)

  return hasBasicInfo && hasDescription ? 'complete' : 'incomplete'
}

function roundYearsOfExperience(years: number | undefined): number | null {
  if (!years) return null
  return Math.round(years)
}
/**
 * Normalizes a ResumeParser response to our internal experience format
 */
export function normalizeResumeParserAppResponse(
  response: ResumeParserAppResponse
): {
  profile: NormalizedProfile
  roles: NormalizedRole[]
  learning: NormalizedLearning[]
} {
  const parsed = response.parsed

  // Build location string from contact info
  const locationParts: string[] = []
  if (parsed.contact?.location_city) {
    locationParts.push(parsed.contact.location_city)
  }
  if (parsed.contact?.location_state) {
    locationParts.push(parsed.contact.location_state)
  }
  if (parsed.contact?.location_country) {
    locationParts.push(parsed.contact.location_country)
  }
  const location = locationParts.length > 0 ? locationParts.join(', ') : null

  // Normalize profile
  const profile: NormalizedProfile = {
    headline: parsed.title ?? null,
    summary: parsed.brief ?? null,
    location,
    yearsOfExperience: roundYearsOfExperience(
      parsed.derived?.years_of_experience
    ),
    skills: parsed.skills ?? [],
  }

  // Normalize roles
  const roles: NormalizedRole[] =
    parsed.employment_history?.map((employment) => {
      const startDate = formatDate(employment.start_date)
      const endDate = formatDate(employment.end_date)
      const isCurrent = !endDate

      // Extract key achievements from responsibilities
      const responsibilities = employment.responsibilities ?? []
      const roleResponsibilities =
        employment.roles?.flatMap((r) => r.responsibilities ?? []) ?? []
      const allResponsibilities = [...responsibilities, ...roleResponsibilities]

      return {
        title: employment.title,
        company: employment.company,
        employmentType: null,
        location: employment.location ?? null,
        startDate,
        endDate,
        isCurrent,
        periodLabel: formatPeriodLabel(startDate, endDate, isCurrent),
        durationLabel: calculateDuration(startDate, endDate),
        status: determineRoleStatus(employment),
        summary: allResponsibilities.join('\n') || null,
        techStack: [],
        methodologies: [],
        teamStructure: null,
        keyAchievements: allResponsibilities.slice(0, 5), // Top 5 as achievements
        missingDetails:
          determineRoleStatus(employment) === 'incomplete'
            ? 'Missing projects and details'
            : null,
      }
    }) ?? []

  // Normalize learning (education)
  const learning: NormalizedLearning[] =
    parsed.education?.map((edu) => ({
      entryType: 'education' as const,
      institution: edu.institution_name,
      program: edu.degree ?? null,
      fieldOfStudy: null,
      credentialUrl: null,
      startDate: formatDate(edu.start_date),
      endDate: formatDate(edu.end_date),
      description: null,
    })) ?? []

  // Calculate years of experience from roles if not provided
  if (!profile.yearsOfExperience && roles.length > 0) {
    const earliestStart = roles
      .map((r) => r.startDate)
      .filter(Boolean)
      .sort()[0]

    if (earliestStart) {
      const start = new Date(earliestStart)
      const end = new Date()
      const years =
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365)
      profile.yearsOfExperience = Math.round(years * 10) / 10 // Round to 1 decimal
    }
  }

  return {
    profile,
    roles,
    learning,
  }
}
