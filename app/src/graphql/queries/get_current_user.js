import gql from '../../../node_modules/graphql-tag';

export const GET_CURRENT_USER_QUERY = gql`
  {
    me {
      name
      company {
        id
        name
        nickname
      }
      role {
        name
      }
    }
  }
`;
