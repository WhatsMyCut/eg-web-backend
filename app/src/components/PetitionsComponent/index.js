import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Segment, } from 'semantic-ui-react';
import ManagementView from '../shared/ManagementView';
import { maxWidthMediaQuery } from '../../constants/responsive';
import EGTable from '../shared/Table';
import {lib} from '../../lib/Lib';
import PetitionModal from './PetitionModal';
import graphql from '../../hoc/graphql';
import { GET_ALL_PETITIONS } from '../../graphql/queries/allPetitions';

const petition = {
	id: '',
	order: '',
	title: '',
	active: false,
	short_description: '',
	body: '',
	primary_image: '',
	video_url: '',
	external_url: '',
	users: [],
	author: {
		name: ''
	},
	createdAt: '',
	updatedAt: ''
}

@withRouter
@graphql(GET_ALL_PETITIONS, {
	name:"all_petitions"
})
class Petitions extends Component {
  state = {
    modal: null,
    modalOpen: false,
    entity: petition
  };

  	render() {
		const { all_petitions } = this.props;
		if(all_petitions.loading){
			return <Segment loading style={{height:'100vh', width:'100vw'}}></Segment>
		}
		console.log('data inside of table', all_petitions.petitions);
		return [
		<ManagementView
			key='petitions-management-view'
			title='Petitions'
			entityType='Petition'
			openModal={() => {
			this.setState({ modalOpen: true });
			}}
		>
			<EGTable
			headings={[
				'Title',
				'Order',
				'Active',
				'Short Description',
				'Author',
				'Created At',
				'Updated At'
			]}
			data={all_petitions.petitions.map(data => {
				return {
				Id: data.id,
				Order: data.order,
				Title: data.title,
				Active: data.active,
				ShortDescription: data.short_description,
				Body: data.body,
				PrimaryImage: data.primary_image,
				VideoURL: data.video_url,
				ExternalURL: data.external_url,
				Users: data.users,
				Author: data.author.name,
				CreatedAt: new Date(data.createdAt),
				UpdatedAt: new Date(data.updatedAt)
				};
			})}
			leftAlignColumns={[0, 1, 2, 3, 4, 5, 6]}
			hyperlinkColumns={[0]}
			hyperlinkFunctions={[
				{
					index: 0,
					fn: data => {this.openModal(all_petitions.petitions.filter(item => {return item.id === data.Id;})[0]);}
				}
			]}
			formatColumns={[5, 6]}
			formatFunctions={[
				{
				index: 5,
				fn: value => {
					return lib.formatTime(value);
				}
				},
				{
				index: 6,
				fn: value => {
					return lib.formatTime(value);
				}
				}
			]}
			/>
		</ManagementView>,
		this._renderModal()
		];
  }

  openModal = entity => {
    this.setState({ entity: entity, modalOpen: true });
  };

  _renderModal() {
    const { entity, modalOpen } = this.state;
	const { user } = this.props;
    if (!modalOpen) {
      return null;
    }
	
	entity.author_id = entity.author.name ? entity.author.name : user.me.id;
	entity.order = entity.order !== undefined && entity.order !== '' ? entity.order : items.length + 1;
	return <PetitionModal key='petitions-modal' entity={entity} onClose={this._onCloseModal} />
  }

  _onCloseModal = () => {
    this.props.all_petitions.refetch();
    this.setState({ modalOpen: null, entity: petition });
  };
}

export default Petitions;

const items = [
	{
		id: 1,
		order: 1,
		title: 'Blah',
		active: true,
		short_description: 'This is a blaaaah petition.',
		body: 'mooooooore text about this petition.',
		primary_image: 'primary_image string',
		video_url: 'video url...',
		external_url: 'external url',
		users: [],
		author: {
			name: 'David Garrett'
		},
		createdAt: new Date(),
		updatedAt: new Date()
	}
];