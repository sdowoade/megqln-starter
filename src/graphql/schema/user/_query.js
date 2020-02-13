import { ApolloServer, gql, interna } from 'apollo-server-express';
import userModel from '../../../models/user';

const Query = gql`
  extend type Query {
    allUsers(limit: Int): [User]
  }
`;

export const queryTypes = [Query];

export const queryResolvers = {
  Query: {
    allUsers: (parent, args) => {
      const { limit = 51 } = args;
      return userModel.find({}).limit(limit);
    },
  },
};
