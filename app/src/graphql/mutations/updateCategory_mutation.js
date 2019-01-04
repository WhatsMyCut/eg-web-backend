import gql from '../../../node_modules/graphql-tag';

export const UpdateCategoryMutation = gql`
  mutation UpdateCategory(
      $id: ID!,
      $name: String!
      $primary_image: String,
      $video_id: String,
      ) {
    updateActionCategory(where: {
        id: $id
    },
        data: {
        name: $name,
		primary_image: $primary_image,
        video_id: $video_id
    }) {
        id
        name
    }
  }
`;
