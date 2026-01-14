import { Field, GraphQLISODateTime, ID, Int, ObjectType } from '@nestjs/graphql'
import { JsonObjectScalar } from '../common/scalars/json-object.scalar'

@ObjectType()
export class ExperienceRoleProjectModel {
  @Field(() => ID)
  id!: string

  @Field()
  roleId!: string

  @Field()
  title!: string

  @Field(() => String, { nullable: true })
  period?: string | null

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => [String])
  achievements!: string[]

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}

@ObjectType()
export class ExperienceRoleModel {
  @Field(() => ID)
  id!: string

  @Field()
  profileId!: string

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
  isCurrent?: boolean | null

  @Field(() => String, { nullable: true })
  periodLabel?: string | null

  @Field(() => String, { nullable: true })
  durationLabel?: string | null

  @Field()
  status!: 'complete' | 'incomplete'

  @Field(() => String, { nullable: true })
  summary?: string | null

  @Field(() => [String])
  techStack!: string[]

  @Field(() => [String])
  methodologies!: string[]

  @Field(() => String, { nullable: true })
  teamStructure?: string | null

  @Field(() => [String])
  keyAchievements!: string[]

  @Field(() => String, { nullable: true })
  missingDetails?: string | null

  @Field(() => JsonObjectScalar, { nullable: true })
  customFields?: Record<string, unknown> | null

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date

  @Field(() => [ExperienceRoleProjectModel])
  projects!: ExperienceRoleProjectModel[]
}

@ObjectType()
export class ExperienceLearningModel {
  @Field(() => ID)
  id!: string

  @Field()
  profileId!: string

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

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}

@ObjectType()
export class ExperienceProfileModel {
  @Field(() => ID)
  id!: string

  @Field()
  userId!: string

  @Field(() => String, { nullable: true })
  headline?: string | null

  @Field(() => String, { nullable: true })
  summary?: string | null

  @Field(() => String, { nullable: true })
  location?: string | null

  @Field(() => Int, { nullable: true })
  yearsOfExperience?: number | null

  @Field(() => [String])
  skills!: string[]

  @Field(() => JsonObjectScalar, { nullable: true })
  customFields?: Record<string, unknown> | null

  @Field(() => JsonObjectScalar, { nullable: true })
  ingestionMetadata?: Record<string, unknown> | null

  @Field(() => JsonObjectScalar, { nullable: true })
  rawPayload?: Record<string, unknown> | null

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}

@ObjectType()
export class ExperienceProfileAggregateModel {
  @Field(() => ExperienceProfileModel)
  profile!: ExperienceProfileModel

  @Field(() => [ExperienceRoleModel])
  roles!: ExperienceRoleModel[]

  @Field(() => [ExperienceLearningModel])
  learning!: ExperienceLearningModel[]
}

@ObjectType()
export class ExperienceMutationResult {
  @Field(() => ID)
  profileId!: string

  @Field()
  rolesCount!: number

  @Field()
  learningCount!: number
}
