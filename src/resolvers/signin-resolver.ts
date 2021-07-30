import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../models/user';
import { Password } from '../services/password';
import { ApolloError } from 'apollo-server-express';
import { Resolver, Query, Arg } from 'type-graphql';

@Resolver()
export class SignInResolver {
  @Query(() => String)
  async SignIn(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<string> {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new ApolloError('INVALID_CREDENTIALS');
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new ApolloError('INVALID_CREDENTIALS');
    }
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
      },
      config.jwt_key,
      {
        expiresIn: config.expireIn,
      }
    );
    return userJwt;
  }
}
