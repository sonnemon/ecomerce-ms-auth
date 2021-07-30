import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../models/user';
import { ApolloError } from 'apollo-server-express';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { SignUpInputType } from '../types/signup-types';

@Resolver()
export class SignUnResolver {
  @Mutation(() => String)
  async SignUp(@Arg('input') input: SignUpInputType): Promise<string> {
    const existingUser = await User.findOne({ email: input.email });

    if (existingUser) {
      throw new ApolloError('EMAIL_IN_USE');
    }
    const user = User.build(input);
    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
      },
      config.jwt_key,
      {
        expiresIn: config.expireIn,
      }
    );
    return userJwt;
  }
}
