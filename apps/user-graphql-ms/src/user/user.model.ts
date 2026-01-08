import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'
import { JsonObjectScalar } from '../common/scalars/json-object.scalar'

@ObjectType('User')
export class UserModel {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  email!: string

  @Field(() => String)
  fullName!: string

  @Field(() => String, { nullable: true })
  avatarUrl?: string | null

  @Field(() => JsonObjectScalar, { nullable: true })
  metadata?: Record<string, unknown> | null

  @Field(() => String)
  provider!: 'google' | 'linkedin' | 'github'

  @Field(() => String)
  providerAccountId!: string

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}
