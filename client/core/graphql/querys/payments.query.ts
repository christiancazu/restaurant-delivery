import gql from 'graphql-tag';

export const PAYMENTS_QUERY = gql`
  {
    payments {
      id
      name
    }
  }
`;
