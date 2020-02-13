import { ApolloServer, gql } from 'apollo-server-express';
import userModel from '../../../models/user';
import { UserInputError, ForbiddenError } from 'apollo-server';
import bcrypt from 'bcrypt-nodejs';

const Mutation = gql`
  extend type Mutation {
    createUser(
      username: String!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User
  }
`;

export const mutationTypes = [Mutation];

export const mutationResolvers = {
  Mutation: {
    createUser: async (
      parent,
      { username, firstName, lastName, email, password }
    ) => {
      const user = await userModel.create({
        username: username,
        name: { first: firstName, last: lastName },
        email: email,
        password: bcrypt.hashSync(password),
      });
      return user;
    },
  },
};
