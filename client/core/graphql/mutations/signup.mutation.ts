import gql from 'graphql-tag';

export const SIGN_UP_MUTATION = gql`
  mutation signUp(
    $email: String!, 
    $password: String!,
    $document: String!,
    $firstname: String!,
    $lastname: String!,
    $phone: String!,
    $address: String
    ) {
    signUp(
      signUpInput: {
        email: $email
        password: $password
        document: $document
        firstname: $firstname
        lastname: $lastname
        phone: $phone
        address: $address
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
