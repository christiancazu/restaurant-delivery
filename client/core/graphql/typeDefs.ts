import gql from 'graphql-tag';

export default gql`
  type Role {
    id: Int
    name: String
    description: String
  }

  extend type Query {
    foo: String
  }
 
  type User {
    id: Int
    email: String
    roles: [Role]
  } 

  type Session {
    user: User
    isLogged: Boolean
  } 

  input sessionInput {
    user: User
    token: String
  }

  type Mutation {
    setSession(session: Session): Boolean
  }
`;
