import { Field, InputType } from 'type-graphql';

@InputType()
export class SignUpInputType {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  phoneNumber: string;
}
