import gql from 'graphql-tag';

export const CATEGORIES_QUERY = gql`
  query categories {
    categories {
      id
      name
      avatar
      description
    }
  }
`;
