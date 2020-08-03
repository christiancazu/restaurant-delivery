import gql from 'graphql-tag';

export const ORDER_DETAILS_BY_CLIENT_QUERY = gql`
{
  orderDetailsByClient {
    order {
      id
      destineLatLng
      payment {
        name
      }
      status {
        name
      }
      total
      createdAt
      payed
    }
    orderCards {
      id
      amount
      subtotal
      card {
        id
        price
        plate {
          id
          name
          avatar
        }
      }
    }

  }
}`;
