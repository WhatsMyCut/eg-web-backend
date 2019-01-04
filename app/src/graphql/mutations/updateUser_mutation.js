import gql from '../../../node_modules/graphql-tag';

export const UpdateUserMutation = gql`
    mutation UpdateUser(
        $id: ID!
        $username: String
		$email: String
		$password: String!
		$name: String!
		$phone: String
		$role_id: ID!
      ) {
    updateUser(where: {
        id: $id
    },
        data: {
            username: $username
				email: $email
				password: $password
				name: $name
				phone: $phone
				role: {
					connect: {
						id: $role_id
					}
				}
    }) {
        id
        email
    }
  }
`;
