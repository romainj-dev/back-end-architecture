import { Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { CreateUserRequest } from './create-user.input'

@InputType()
export class UpdateUserRequest extends PartialType(CreateUserRequest) {
  @Field(() => ID)
  id!: string
}
