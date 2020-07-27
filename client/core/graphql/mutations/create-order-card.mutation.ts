import gql from 'graphql-tag';

export const CREATE_ORDER_CARD_MUTATION = gql`
mutation createOrderCards(
  $createCardsInput: [CreateOrderCardInput]
  ) {
    createOrderCards(
      createOrderCardsInput: $createOrderCardsInput
    )
  }
`;
