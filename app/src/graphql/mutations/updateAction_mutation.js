import gql from "../../../node_modules/graphql-tag";

export const UpdateActionMutation = gql`
    mutation UpdateAction(
        $id: ID!
        $primary_image: String
        $active: Boolean
        $short_description: String!
        $action_taken_description: String!
        $schedule: Schedule
        $video_url: String
        $carbon_dioxide: Float
        $game_title:String
        $order: Int
        $water: Float
        $waste: Float
        $points: Int
        $external_url: String
        $isGame: Boolean
        $relatedActionIds: [ActionWhereUniqueInput!]
        $relatedActionIdsToRemove: [ActionWhereUniqueInput!]
    ) {
    updateAction(
        where: {
            id: $id
        },
        data: {
            primary_image: $primary_image
            active: $active
            short_description: $short_description
            action_taken_description: $action_taken_description
            schedule: $schedule
            video_url: $video_url
            carbon_dioxide: $carbon_dioxide
            order: $order
            water: $water
            waste: $waste
            points: $points
            game_title :$game_title
            external_url: $external_url
            isGame: $isGame
            related_actions: {
                connect: $relatedActionIds
                disconnect: $relatedActionIdsToRemove
            }
        }
    ) {
      id
      short_description
    }
  }
`;
