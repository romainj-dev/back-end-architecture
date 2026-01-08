import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql'

@InputType()
export class UpsertUserRequest {
  @Field(() => String)
  provider!: 'google' | 'linkedin' | 'github'

  @Field(() => String)
  providerAccountId!: string

  @Field(() => String)
  email!: string

  @Field(() => String)
  fullName!: string

  @Field(() => String, { nullable: true })
  avatarUrl?: string | null

  @Field(() => String, { nullable: true })
  accessToken?: string | null

  @Field(() => String, { nullable: true })
  refreshToken?: string | null

  @Field(() => GraphQLISODateTime, { nullable: true })
  tokenExpiresAt?: Date | null
}
