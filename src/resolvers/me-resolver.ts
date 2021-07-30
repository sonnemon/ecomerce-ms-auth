import { User } from '../models/user';
import { ApolloError } from 'apollo-server-express';
import { ContextType } from '../types/context-type';
import { Resolver, Query, Ctx, ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class MeObjectType {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  firstname: string;

  @Field({ nullable: true })
  lastname: string;

  @Field({ nullable: true })
  phoneNumber: string;
}

@Resolver()
export class MeResolver {
  @Query(() => MeObjectType)
  async Me(@Ctx() ctx: ContextType): Promise<MeObjectType> {
    if (!ctx.user) {
      throw new ApolloError('NOT_AUTHENTICATE');
    }
    const currentUser = await User.findById(ctx.user.id);
    if (!currentUser) {
      throw new ApolloError('NOT_AUTHENTICATE');
    }
    return currentUser;
  }
}
