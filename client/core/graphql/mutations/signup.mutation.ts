import gql from 'graphql-tag';

export const SIGN_UP_MUTATION = gql`
  mutation signUp($email: String!, $password: String!) {
    signUp(
      signUpInput: {
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
    }
  }
`;
