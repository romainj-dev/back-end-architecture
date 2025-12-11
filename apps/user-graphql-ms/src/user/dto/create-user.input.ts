import { Field, InputType } from '@nestjs/graphql'
import { JsonObjectScalar } from '../../common/scalars/json-object.scalar'

@InputType()
export class CreateUserRequest {
  @Field(() => String)
  email!: string

  @Field(() => String)
  fullName!: string

  @Field(() => String, { nullable: true })
  avatarUrl?: string | null

  @Field(() => String, { nullable: true })
  jobTitle?: string | null

  @Field(() => JsonObjectScalar, { nullable: true })
  metadata?: Record<string, unknown> | null
}
