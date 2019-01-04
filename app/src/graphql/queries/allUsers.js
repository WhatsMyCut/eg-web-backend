import gql from 'graphql-tag';

export const GET_ALL_USERS = gql`
  {
    users {
      id
      name
      password
      phone
      username
      email
      total_points
      createdAt
      updatedAt
      role {
        id
        role_name
      }
    }
  }
`;