import gql from 'graphql-tag';

export const GET_USER_BY_ID = gql`
  query($id:ID!){
    user(where:{id : $id}) {
      name
      phone
      username
      email
      role {
        name
      }
    }
  }
`;
