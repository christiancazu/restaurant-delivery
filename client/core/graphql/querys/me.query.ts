import gql from 'graphql-tag';

export const ME_QUERY = gql`
  query me {
    me {
      user {
        id
        email
        roles {
          name
        }
      }
      token
    }
  }
`;
