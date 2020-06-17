import gql from 'graphql-tag';

export const SET_SESSION_MUTATION = gql`
  mutation ($session: Session) {
    setSession(session: $session) @client {
      session {
        user {
        id
        email
        roles {
          name
        }
      }
      }
    }
  }
`;
