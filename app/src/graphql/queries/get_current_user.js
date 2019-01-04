import gql from '../../../node_modules/graphql-tag';

export const GET_CURRENT_USER_QUERY = gql`
  {
    me {
      id
      name
      role {
        role_name
      }
    }
  }
`;