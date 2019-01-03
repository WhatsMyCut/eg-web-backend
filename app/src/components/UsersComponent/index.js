import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import ManagementView from '../shared/ManagementView';
import { maxWidthMediaQuery } from '../../constants/responsive';
import EGTable from '../shared/Table';
import {lib} from '../../lib/Lib';
import UserModal from './UserModal';

const user = {
	id: '',
	email: '',
	password: '',
	name: '',
	phone: '',
	role: {
		role_name: ''
	},
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

@withRouter
class Users extends Component {
  state = {
    modal: null,
    modalOpen: false,
    entity: user
  };

  render() {
    const { modal, entity } = this.state;
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
				data={items.map(data => {
					return {
						Id: data.id,
						Email: data.email,
						Password: data.password,
						Name: data.name,
						Phone: data.phone,
						Role: data.role.role_name,
						RecentActions: data.recent_actions,
						TotalPoints: data.total_points,
						PetitionsSigned: data.petitions_signed.map(petition => {return petition.title}).join(', '),
						CreatedAt: data.createdAt,
						UpdatedAt: data.updatedAt
					};
				})}
				leftAlignColumns={[0, 1, 2, 3, 4, 5]}
				hyperlinkColumns={[0]}
				hyperlinkFunctions={[{ index: 0, fn: (data) => {this.openModal(items.filter(item => {return item.id === data.Id})[0])} }]}
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
		if (!modalOpen) {
		return null;
    }

	return <UserModal key='user-moda' entity={entity} onClose={this._onCloseModal} />;
  }

  _onCloseModal = () => {
    // this.props.groups.refetch();
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