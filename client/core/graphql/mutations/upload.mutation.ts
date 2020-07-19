import gql from 'graphql-tag';

export const UPLOAD_MUTATION = gql`
  mutation uploadAvatar(
    $avatarType: String!
    $plateName: String!,
    $file: Upload!, 
    ) {
    uploadAvatar(
      avatarType: $avatarType
      plateName: $plateName
      file: $file
    )
  }
`;
