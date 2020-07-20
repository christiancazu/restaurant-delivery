import gql from 'graphql-tag';

export const IN_CURRENT_DAY_CARDS_QUERY = gql`
{
  inCurrentDayCards {
    id
    stock
    initialStock
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
}`;
