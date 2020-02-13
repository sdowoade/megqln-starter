import { ApolloServer, gql } from 'apollo-server-express';
const User = gql`
  type Name {
    first: String
    last: String
  }

  type User {
    _id: Int!
    username: String!
    name: Name
    title: String!
    email: String
  }
`;

export const types = [User];

export const typeResolvers = {};
