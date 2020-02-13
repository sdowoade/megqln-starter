import fs from 'fs';
import path from 'path';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import { merge } from 'lodash';
import { context } from '../../authentication/auth';
import permissions from '../../authentication/permissions';

const Query = `
 type Query {
   status: String
 }
`;

const Mutation = `
 type Mutation {
   _empty: String
 }
`;

let resolvers = {
  Query: {
    status: () => 'ok',
  },
};

const typeDefs = [Query, Mutation];

// Read the current directory and load types and resolvers automatically
fs.readdirSync(__dirname)
  .filter(dir => dir.indexOf('.') < 0)
  .forEach(dir => {
    const tmp = require(path.join(__dirname, dir)).default; // eslint-disable-line
    resolvers = merge(resolvers, tmp.resolvers);
    typeDefs.push(...tmp.types);
  });

export default new ApolloServer({
  schema: applyMiddleware(
    makeExecutableSchema({
      typeDefs,
      resolvers,
    }),
    permissions
  ),
  context,
  playground: {
    endpoint: '/graphql',
  },
});
