import gql from 'graphql-tag';

export const GET_ALL_ACTIONS_CATEGORIES = gql`
  {
    actionCategories{
      id
      name
      video_id
      actions {
        id
        title
        body
        primary_image
        active
        short_description
        action_taken_description
        schedule
        video_url
        carbon_dioxide
        water
        waste
        external_url
        author {
          name
        }
        isGame
        createdAt
        updatedAt
      }
    }
    
  }
`;