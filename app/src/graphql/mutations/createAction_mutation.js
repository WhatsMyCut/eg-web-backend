import gql from '../../../node_modules/graphql-tag';

export const CreateActionMutation = gql`
  mutation CreateAction(
      $title: String!, 
      $body: String!,
      $primary_image: String,
      $active: Boolean,
      $short_description: String!,
      $action_taken_description: String!,
      $schedule: Schedule,
      $video_url: String,
      $carbon_dioxide: Float,
      $water: Float,
      $waste: Float,
      $external_url: String,
      $isGame: Boolean,
      $related_actions: [Action!],
      $author_id: ID!,
      $category_id: ID!
      ) {
    createAction(data: {
		title: $title, 
		body: $body,
		primary_image: $primary_image,
		active: $active,
		short_description: $short_description,
		action_taken_description: $action_taken_description,
		schedule: $schedule,
		video_url: $video_url,
		carbon_dioxide: $carbon_dioxide,
		water: $water,
		waste: $waste,
		external_url: $external_url,
		isGame: $isGame,
    related_actions: $related_actions,
    author: {
      connect: {
            id: $author_id
        }
    },
		category: {
      connect: {
            id: $category_id
        }
    }
    }) {
        id
        title
    }
  }
`;
