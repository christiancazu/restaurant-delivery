import gql from 'graphql-tag';

export const CARDS_UPDATED_SUBSCRIPTION = gql`
  subscription {
    cardsUpdated {
      stock
      id
      price
      plate {
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
  }
`;
