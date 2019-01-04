import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import ManagementView from '../shared/ManagementView';
import { maxWidthMediaQuery } from '../../constants/responsive';
import EGTable from '../shared/Table';
import {lib} from '../../lib/Lib';
import graphql from '../../hoc/graphql';
import UserModal from './UserModal';
import { GET_ALL_USERS } from '../../graphql/queries/allUsers';
import { GET_ALL_ROLES } from '../../graphql/queries/allRoles';
import {Segment } from 'semantic-ui-react';

const user = {
	id: '',
	email: '',
	password: '',
	name: '',
	phone: '',
	recent_actions: [
		{
			action: {
				title: '',
			},	
		}
	],
	total_points: 0,
	petitions_signed: [
		{
			title: '',
		}
	],
	createdAt: '',
	updatedAt: ''
}

@graphql(GET_ALL_USERS,{
	name:'all_users'
})
@graphql(GET_ALL_ROLES,{
	name:'all_roles'
})
@withRouter
class Users extends Component {
  state = {
    modal: null,
    modalOpen: false,
    entity: user
  };

  render() {
	const { all_users, all_roles } = this.props;
	if(all_users.loading){
		// console.log('users and roles are loading');
		return <Segment loading style={{height:'100vh', width:"100vw"}}></Segment>
	} else{
		// console.log('all_roles', all_roles.roles);
		console.log('all_users', all_users.users);
	}
    return [
      	<ManagementView
			key='users-management-view'
			title='Users'
			entityType='User'
			openModal={() => {this.setState({modalOpen: true})}}
      	>
			<EGTable
				headings={[
					'Email',
					'Name',
					'Phone',
					'Role',
					'Created At',
					'Updated At'
				]}
				data={all_users.users.map(data => {
					return {
						Id: data.id,
						Email: data.email,
						Password: data.password,
						Name: data.name,
						Phone: data.phone,
						Role: data.role ? data.role.role_name : null,
						RecentActions: data.recent_actions,
						TotalPoints: data.total_points,
						PetitionsSigned: data.petitions_signed ? data.petitions_signed.map(petition => {return petition.title}).join(', ') : null,
						CreatedAt: data.createdAt,
						UpdatedAt: data.updatedAt
					};
				})}
				leftAlignColumns={[0, 1, 2, 3, 4, 5]}
				hyperlinkColumns={[0]}
				hyperlinkFunctions={[{ index: 0, fn: (data) => {this.openModal(all_users.users.filter(user => { return user.id === data.Id})[0])} }]}
				formatColumns={[4, 5]}
				formatFunctions={[
					{
						index: 4,
						fn: value => {
							return lib.formatTime(value);
						}
					},
					{
						index: 5,
						fn: value => {
							return lib.formatTime(value);
						}
					},

				]}
			/>
	  </ManagementView>,
	  this._renderModal()
		];
  	}

	openModal = (entity) => {
		this.setState({entity: entity, modalOpen: true})
	}

  	_renderModal() {
		const { entity, modalOpen } = this.state;
		if (!modalOpen) { return null; }

		const { all_roles } = this.props;
		return <UserModal key='user-modal' entity={entity} onClose={this._onCloseModal} roles={all_roles.roles}/>;
  	}

  _onCloseModal = () => {
    this.props.all_users.refetch();
    this.setState({ modalOpen: null, entity: user });
  };
}

export default Users;

const items = [
	{
		id: 'agoih-gaoigha-aigo',
		email: 'testemail@gmail.com',
		password: 'aaewgedcsgfaefwe',
		name: 'David Garrett',
		phone: '911',
		role: {
			role_name: 'Boss'
		},
		recent_actions: [
			{
				id: 'aosdifdsfiondsf-df',
				action: {
					id: 'adsf8hsdfds9f8',
					category: {},
					title: 'Test Action',
					body: 'lkajsdf iosd fsodiaf nsdiof sdinof '
				},
				user: null,
				took_action: true,
				createdAt: new Date(),
				updatedAt: new Date()	
			}
		],
		total_points: 15,
		petitions_signed: [
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
		],
		createdAt: new Date(),
		updatedAt: new Date()
	}
];