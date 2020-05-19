import gql from 'graphql-tag';

export const SIGN_IN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(
      data: {
        email: $email
        password: $password
      }
    )
    {
      user {
        id,
        name,
        lastname,
        email
      },
      token
    }
  }
`;
