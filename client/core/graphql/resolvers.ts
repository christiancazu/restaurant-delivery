/* eslint-disable @typescript-eslint/no-unsafe-call */
import { SET_SESSION_MUTATION } from './mutations/session.mutation';

export default {
  Mutation: {
    setSession (_, { session }, { cache }) {
      cache.writeQuery({
        query: SET_SESSION_MUTATION,
        data: {
          session
        }
      });
    }
  }
};
