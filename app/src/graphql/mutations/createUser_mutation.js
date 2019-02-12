import gql from '../../../node_modules/graphql-tag';

export const CreateUserMutation = gql`
	mutation CreateUser(
		$username: String
		$email: String
		$password: String!
		$name: String!
		$phone: String
		$role_id: ID!
	) {
		createUser(
			data: {
				username: $username
				email: $email
				password: $password
				name: $name
				phone: $phone
				role: { connect: { id: $role_id } }
			}
		) {
			id
			email
		}
	}
`;
