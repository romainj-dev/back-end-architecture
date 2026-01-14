import { Field, InputType, Int } from '@nestjs/graphql'
import { JsonObjectScalar } from '../../common/scalars/json-object.scalar'

@InputType()
export class ExperienceProfileInput {
  @Field(() => String, { nullable: true })
  headline?: string | null

  @Field(() => String, { nullable: true })
  summary?: string | null

  @Field(() => String, { nullable: true })
  location?: string | null

  @Field(() => Int, { nullable: true })
  yearsOfExperience?: number | null

  @Field(() => [String], { nullable: true })
  skills?: string[]

  @Field(() => JsonObjectScalar, { nullable: true })
  customFields?: Record<string, unknown> | null
}

@InputType()
export class ExperienceRoleInput {
  @Field()
  title!: string

  @Field()
  company!: string

  @Field(() => String, { nullable: true })
  employmentType?: string | null

  @Field(() => String, { nullable: true })
  location?: string | null

  @Field(() => String, { nullable: true })
  startDate?: string | null

  @Field(() => String, { nullable: true })
  endDate?: string | null

  @Field(() => Boolean, { nullable: true })
  isCurrent?: boolean

  @Field(() => String, { nullable: true })
  periodLabel?: string | null

  @Field(() => String, { nullable: true })
  durationLabel?: string | null

  @Field(() => String, { nullable: true })
  status?: 'complete' | 'incomplete'

  @Field(() => String, { nullable: true })
  summary?: string | null

  @Field(() => [String], { nullable: true })
  techStack?: string[]

  @Field(() => [String], { nullable: true })
  methodologies?: string[]

  @Field(() => String, { nullable: true })
  teamStructure?: string | null

  @Field(() => [String], { nullable: true })
  keyAchievements?: string[]

  @Field(() => String, { nullable: true })
  missingDetails?: string | null

  @Field(() => JsonObjectScalar, { nullable: true })
  customFields?: Record<string, unknown> | null
}

@InputType()
export class ExperienceLearningInput {
  @Field()
  entryType!: 'education' | 'certification'

  @Field()
  institution!: string

  @Field(() => String, { nullable: true })
  program?: string | null

  @Field(() => String, { nullable: true })
  fieldOfStudy?: string | null

  @Field(() => String, { nullable: true })
  credentialUrl?: string | null

  @Field(() => String, { nullable: true })
  startDate?: string | null

  @Field(() => String, { nullable: true })
  endDate?: string | null

  @Field(() => String, { nullable: true })
  description?: string | null
}

@InputType()
export class SaveExperienceInput {
  @Field(() => ExperienceProfileInput)
  profile!: ExperienceProfileInput

  @Field(() => [ExperienceRoleInput], { nullable: true })
  roles?: ExperienceRoleInput[]

  @Field(() => [ExperienceLearningInput], { nullable: true })
  learning?: ExperienceLearningInput[]

  @Field(() => JsonObjectScalar, { nullable: true })
  rawPayload?: Record<string, unknown> | null
}
