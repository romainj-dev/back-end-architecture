import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PlanModel {
  @Field(() => String)
  id!: string

  @Field(() => String)
  code!: string

  @Field(() => Number)
  price!: number

  @Field(() => Date)
  createdAt!: Date

  @Field(() => Date)
  updatedAt!: Date
}
