import gql from 'graphql-tag';

export const TYPES_QUERY = gql`
  query types {
    types {
      id
      name
      avatar
      description
    }
  }
`;
