import gql from 'graphql-tag';

export const GET_ALL_PETITIONS = gql`
  {
    petitions{
      id
      title
      active
      short_description
      body
      order
      primary_image
      video_url
      external_url
      users{
          name
      }
      author{
          id
          name
      }
      createdAt
      updatedAt
    }
  }
`;