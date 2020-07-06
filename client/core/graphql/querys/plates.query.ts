import gql from 'graphql-tag';

export const PLATES_QUERY = gql`
  query plates {
    plates {
      id
      name
      description
      avatar
      type {
        name
      }
      category {
        name
      }
    }
  }
`;
