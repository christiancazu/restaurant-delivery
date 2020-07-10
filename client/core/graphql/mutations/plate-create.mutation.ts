import gql from 'graphql-tag';

export const PLATE_CREATE_MUTATION = gql`
  mutation createPlate(
    $name: String!, 
    $description: String!,
    $avatar: String!,
    $categoryId: Int
    $typeId: Int,
    ) {
    createPlate(
      createPlateInput: {
        name: $name
        description: $description
        avatar: $avatar
        categoryId: $categoryId
        typeId: $typeId
      }
    ) 
    {
      name
    }
  }
`;
