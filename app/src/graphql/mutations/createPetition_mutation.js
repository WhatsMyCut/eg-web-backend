import gql from "../../../node_modules/graphql-tag";

export const CreatePetitionMutation = gql`
	mutation CreatePetition(
		$title: String!
		$active: Boolean
		$short_description: String!
		$body: String!
		$order: Int
		$primary_image: String
		$video_url: String
		$external_url: String
		$author_id: ID!
	) {
		createPetition(
			data: {
				title: $title
				active: $active
				short_description: $short_description
				body: $body
				order: $order
				primary_image: $primary_image
				video_url: $video_url
				external_url: $external_url
				author: { connect: { id: $author_id } }
			}
		) {
		id
		title
		}
	}
`;
