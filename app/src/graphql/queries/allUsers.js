import gql from 'graphql-tag';

export const GET_ALL_USERS = gql`
  {
    users {
      name
      phone
      username
      email
      role {
        role_name
      }
    }
  }
`;