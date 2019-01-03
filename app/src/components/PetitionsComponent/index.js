import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import ManagementView from '../shared/ManagementView';
import { maxWidthMediaQuery } from '../../constants/responsive';
import EGTable from '../shared/Table';
import {lib} from '../../lib/Lib';
import PetitionModal from './PetitionModal';

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
class Petitions extends Component {
  state = {
    modal: null,
    modalOpen: false,
    entity: petition
  };

  render() {
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
          data={items.map(data => {
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
              CreatedAt: data.createdAt,
              UpdatedAt: data.updatedAt
            };
          })}
          leftAlignColumns={[0, 1, 2, 3, 4, 5]}
          hyperlinkColumns={[0]}
          hyperlinkFunctions={[
            {
              index: 0,
              fn: data => {
                this.openModal(
                  items.filter(item => {
                    return item.id === data.Id;
                  })[0]
                );
              }
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
    if (!modalOpen) {
      return null;
    }
	
	return <PetitionModal key='petitions-modal' entity={entity} onClose={this._onCloseModal} />
  }

  _onCloseModal = () => {
    // this.props.groups.refetch();
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