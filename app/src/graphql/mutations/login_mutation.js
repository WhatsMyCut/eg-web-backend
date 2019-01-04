import gql from '../../../node_modules/graphql-tag';

export const LoginMutation = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`;
