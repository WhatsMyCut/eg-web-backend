import gql from '../../../node_modules/graphql-tag';

export const CreateCategoryMutation = gql`
  mutation CreateCategory(
      $name: String!
      $primary_image: String,
      $video_id: String,
      ) {
    createActionCategory(data: {
        name: $name,
		primary_image: $primary_image,
        video_id: $video_id
    }) {
        id
        name
    }
  }
`;
