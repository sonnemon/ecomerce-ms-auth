import { ClassType } from 'type-graphql';

import { SignInResolver } from './signin-resolver';
import { SignUnResolver } from './signup-resolver';
import { MeResolver } from './me-resolver';

type NonEmptyArray<TItem> = readonly [TItem, ...TItem[]] | [TItem, ...TItem[]];

const resolvers: NonEmptyArray<ClassType> = [
  SignInResolver,
  SignUnResolver,
  MeResolver,
];

export default resolvers;
