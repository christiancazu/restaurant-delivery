import gql from 'graphql-tag';

export const UPLOAD_MUTATION = gql`
  mutation uploadAvatar($file: Upload!, $avatarType: String!) {
    uploadAvatar(
      file: $file, 
      avatarType: $avatarType
    )
  }
`;
