import gql from "graphql-tag";

export const GET_ALL_ROLES = gql`
	{
		roles {
			id
			role_name
		}
	}
`;
