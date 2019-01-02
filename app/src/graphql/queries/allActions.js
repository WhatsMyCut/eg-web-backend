import gql from 'graphql-tag';

export const GET_ALL_ACTIONS = gql`
  {
    actions {
      id
      category
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
      
    }
  }
`;