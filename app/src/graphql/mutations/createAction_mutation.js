import gql from "../../../node_modules/graphql-tag";

export const CreateActionMutation = gql`
  mutation CreateAction(
    $primary_image: String
    $active: Boolean
    $short_description: String!
    $action_taken_description: String!
    $schedule: Schedule
    $video_url: String
    $carbon_dioxide: Float
    $water: Float
    $waste: Float
    $points: Int
    $external_url: String
    $isGame: Boolean
    $author_id: ID!
    $category_id: ID!
  ) {
    createAction(
      data: {
        primary_image: $primary_image
        active: $active
        short_description: $short_description
        action_taken_description: $action_taken_description
        schedule: $schedule
        video_url: $video_url
        carbon_dioxide: $carbon_dioxide
        water: $water
        waste: $waste
        points: $points
        external_url: $external_url
        isGame: $isGame
        author: { connect: { id: $author_id } }
        category: { connect: { id: $category_id } }
      }
    ) {
      id
      short_description
    }
  }
`;
