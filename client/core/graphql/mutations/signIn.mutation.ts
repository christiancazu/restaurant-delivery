import gql from 'graphql-tag';

export const SIGN_IN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(
      signInInput: {
        email: $email
        password: $password
      }
    )
    {
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
