import { rule, shield, and, or, not } from 'graphql-shield';

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return Boolean(ctx.currentUser);
  }
);

// Permissions

export default shield({
  Query: {
    //...
  },
  Mutation: {
    createUser: not(isAuthenticated),
  },
});
