import gql from 'graphql-tag';

export const CREATE_CARDS_MUTATION = gql`
  mutation createCards(
    $createCardsInput: [CreateCardInput]
    ) {
      createCards(
        createCardsInput: $createCardsInput
      )
    }
`;
