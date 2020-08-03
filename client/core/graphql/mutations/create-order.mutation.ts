import gql from 'graphql-tag';

export const CREATE_ORDER_MUTATION = gql`
  mutation createOrder(
    $createOrderInput: CreateOrderInput,
    $createOrderCardsInput: [CreateOrderCardInput]
    ) {
      createOrder(
      createOrderInput: $createOrderInput,
      createOrderCardsInput: $createOrderCardsInput
    ) 
  }
`;
