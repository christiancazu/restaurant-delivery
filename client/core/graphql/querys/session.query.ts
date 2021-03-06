import gql from 'graphql-tag';

export const SESSION_QUERY = gql`
  {
    session @client {
      isLogged
      user {
        id
        email
        roles {
          name
        }
      }
    }
  }
`;
