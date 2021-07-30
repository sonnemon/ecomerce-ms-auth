import 'reflect-metadata';
import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import resolvers from './resolvers';
import config from './config';
import { Context } from './services/context';

(async () => {
  await mongoose.connect(config.mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: resolvers,
      validate: true,
    }),
    context: ({ req }) => Context.build(req),
  });
  await server.start();

  const app = express();
  server.applyMiddleware({ app, cors: false, path: '/' });

  app.listen(config.port, () => {
    console.log(`Listening: http://localhost:${config.port}`);
  });
})();
