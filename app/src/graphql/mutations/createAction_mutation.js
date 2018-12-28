import gql from '../../../node_modules/graphql-tag';

export const CreateActionMutation = gql`
  mutation CreateAction(
      $title: String!, 
      $body: String!,
      $primary_image: String,
      $active: Boolean,
      $short_description: String!,
      $action_taken_description: String!,
      $schedule: String,
      $video_url: String,
      $carbon_dioxide: Float,
      $water: Float,
      $waste: Float,
      $external_url: String,
      $hasVideo: Boolean,
      $hasGame: Boolean,
      $isGame: Boolean,
      $category: {}
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
		hasVideo: $hasVideo,
		hasGame: $hasGame,
		isGame: $isGame,
		category: $category
    }) {
        id
        title
    }
  }
`;
