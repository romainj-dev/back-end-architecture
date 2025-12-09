import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'
import { JsonObjectScalar } from '../common/scalars/json-object.scalar'

@ObjectType('User')
export class UserModel {
  @Field(() => ID)
  id!: string

  @Field()
  email!: string

  @Field()
  fullName!: string

  @Field(() => String, { nullable: true })
  avatarUrl?: string | null

  @Field(() => String, { nullable: true })
  jobTitle?: string | null

  @Field(() => JsonObjectScalar, { nullable: true })
  metadata?: Record<string, unknown> | null

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}
