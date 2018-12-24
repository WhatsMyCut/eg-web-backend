import gql from '../../../node_modules/graphql-tag';

export const LoginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        name
        company {
          name
        }
        role {
          name
        }
      }
    }
  }
`;
