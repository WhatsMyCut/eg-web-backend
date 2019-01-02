import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import ManagementView from '../shared/ManagementView';
import { maxWidthMediaQuery } from '../../constants/responsive';
import EGTable from '../shared/Table';
import {lib} from '../../lib/Lib';
import ModalContent from '../shared/Modals/ModalContent';
import HeaderWithAddBtn from '../shared/HeaderWithAddBtn';
import {
	Modal,
	Header,
	Button,
	Icon,
	Label,
	Input,
	Segment,
	Dimmer
  } from 'semantic-ui-react';

const category = {
  id: '',
  name: '',
  actions: [],
  createdAt: '',
  updatedAt: ''
}

const action = {
  id: '',
  category: {
    id: '',
    name: '',
    actions: [{title: '',}],
    createdAt: '',
    updatedAt: ''
  },
  order: '',
  title: '',
  body: '',
  primary_image: '',
  active: false,
  short_description: '',
  action_taken_description: '',
  schedule: '',
  video_url: '',
  carbon_dioxide: 0.0,
  water: 0.0,
  waste: 0.0,
  external_url: '',
  isGame: false,
  related_actions: [{title: ''}],
  author: {},
  createdAt: '',
  updatedAt: ''
}

@withRouter
class Actions extends Component {
  state = {
    modal: null,
    modalOpen: false,
	entity: category,
	entityType: 'Category'
  };

  render() {
	const { modal, entity } = this.state;
    return [
      	<ManagementView
			key='actions-management-view'
      		title="Actions" 
      		entityType="Category"
			openModal={() => {this.setState({modalOpen: true, entity: category, entityType: 'Category'})}}
      	>
		  {
			  categories.map(cat => {
				return(
					<Segment key={`${cat.name.replace(/\s/g, '')}-category`}>
						<HeaderWithAddBtn
							title={cat.name}
							clickable={true}
							onClick={() => {this.setState({modalOpen: true, entity: cat, entityType: 'Category'})}}
							entityType="Action" 
							openModal={() => {this.setState({modalOpen: true, entity: action, entityType: 'Action'})}} 
							style={{marginBottom: '10px'}} 
						/>
						{this.getTable(cat)}
					</Segment>
				)
			  })
		  }
	  </ManagementView>,
	  this._renderModal()
		];
  }

	openModal = (entity, entityType) => {
		this.setState({entity: entity, modalOpen: true, entityType: entityType ? entityType : this.state.entityType})
	}

  	_renderModal() {
		const { entity, modalOpen, entityType } = this.state;
		if (!modalOpen) {
		return null;
	}
	
	switch(entityType){
		case 'Category':
			return <ModalContent key="categories-modal" mappings={modalMappings.category} entity={entity} entityType='Category' onClose={this._onCloseModal} />;
		case 'Action':
			return <ModalContent key="actions-modal" mappings={modalMappings.action} entity={entity} entityType='Action' onClose={this._onCloseModal} />;
		case 'Game':
			return <ModalContent key="games-modal" mappings={modalMappings.game} entity={entity} entityType='Game' onClose={this._onCloseModal} />;
		default:
			return null;
	}
  }

  _onCloseModal = () => {
    // this.props.groups.refetch();
    this.setState({ modalOpen: null, entity: category });
  };

  getTable = (cat) => {
	  	function gamesFilter(action){return action.isGame === true;}
		function actionsFilter(action){return action.isGame === false;}
		if(this.props.match.path === '/games'){
			return (
				<EGTable
					headings={[
						'Title',
						'Order',
						'Active',
						'Short Description',
						'Related Actions',
						'Author',
						'Created At',
						'Updated At'
					]}
					data={cat.actions.filter(gamesFilter).map(data => {
						return {
							Id: data.id,
							Category: data.category,
							Title: data.title,
							Order: data.order,
							Body: data.body,
							PrimaryImage: data.primary_image,
							Active: data.active,
							ShortDescription: data.short_description,
							ActionTakenDescription: data.action_taken_description,
							Schedule: data.schedule,
							VideoURL: data.video_url,
							CarbonDioxide: data.carbon_dioxide,
							Water: data.water,
							Waste: data.waste,
							ExternalURL: data.external_url,
							IsGame: data.isGame,
							RelatedActions: data.related_actions.map(act => {return act.title}).join(', '),
							Author: data.author.name,
							CreatedAt: data.createdAt,
							UpdatedAt: data.updatedAt
						};
					})}
					leftAlignColumns={[0, 1, 2, 3, 4, 5, 6, 7]}
					hyperlinkColumns={[0]}
					hyperlinkFunctions={[
						{ 
							index: 0, 
							fn: (data) => {
								const entityType = this.props.match.path === '/games' ? 'Game' : 'Action';
								this.openModal(cat.actions.filter(item => {return item.id === data.Id})[0], entityType)
							} 
						}
					]}
					formatColumns={[6, 7]}
					formatFunctions={[
						{
							index: 6,
							fn: value => {
								return lib.formatTime(value);
							}
						},
						{
							index: 7,
							fn: value => {
								return lib.formatTime(value);
							}
						},
					]}
				/>
			)
		} else{
			return (
				<EGTable
					headings={[
						'Title',
						'Order',
						'Active',
						'Short Description',
						'Related Actions',
						'Author',
						'Created At',
						'Updated At'
					]}
					data={cat.actions.filter(actionsFilter).map(data => {
						return {
							Id: data.id,
							Category: data.category,
							Title: data.title,
							Order: data.order,
							Body: data.body,
							PrimaryImage: data.primary_image,
							Active: data.active,
							ShortDescription: data.short_description,
							ActionTakenDescription: data.action_taken_description,
							Schedule: data.schedule,
							VideoURL: data.video_url,
							CarbonDioxide: data.carbon_dioxide,
							Water: data.water,
							Waste: data.waste,
							ExternalURL: data.external_url,
							IsGame: data.isGame,
							RelatedActions: data.related_actions.map(act => {return act.title}).join(', '),
							Author: data.author.name,
							CreatedAt: data.createdAt,
							UpdatedAt: data.updatedAt
						};
					})}
					leftAlignColumns={[0, 1, 2, 3, 4, 5, 6, 7]}
					hyperlinkColumns={[0]}
					hyperlinkFunctions={[{ index: 0, fn: (data) => {this.openModal(cat.actions.filter(item => {return item.id === data.Id})[0])} }]}
					formatColumns={[6, 7]}
					formatFunctions={[
						{
							index: 6,
							fn: value => {
								return lib.formatTime(value);
							}
						},
						{
							index: 7,
							fn: value => {
								return lib.formatTime(value);
							}
						},
					]}
				/>
			)
		}
  	}
}

export default Actions;

const categories = [
  {
    id: '1',
	name: 'Cat-1',
    actions: [{
      id: '8',
      category: {
        id: '1',
        name: 'Cat-1',
      },
      title: 'Action 1',
	  order: 2,
      body: 'asdfsdaf a asdff dsf sdaf ',
      primary_image: 'asfd f ds afsda',
      active: false,
      short_description: 'fd gsdfgre gsrgs',
      action_taken_description: 'sdfg ergfd gsdf gsdf',
      schedule: 'ANYTIME',
      video_url: 'faweeioa.com',
      carbon_dioxide: 10.0,
      water: 20.0,
      waste: 30.0,
      external_url: 'asdffsdafjsdf.net',
      isGame: false,
      related_actions: [{title: 'dump'}, {title: 'aLump'}],
      author: {
        name: 'David Garrett'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '9',
      category: {
        id: '1',
        name: 'Cat-1',
      },
	  title: 'Water Savings',
	  order: 3,
      body: 'watta watta',
      primary_image: 'adsfas d f',
      active: false,
      short_description: 'adsaf sdf dsf sadfsadf',
      action_taken_description: 'sdafsa dfdsaf asdfdsf',
      schedule: 'DAILY',
      video_url: 'asadfsdafasdfdsaf',
      carbon_dioxide: 20.0,
      water: 30.0,
      waste: 50.0,
      external_url: 'asdfsda fsdaf ds',
      isGame: true,
      related_actions: [{title: ''}],
      author: {
        name: 'David Garrett'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Cat-2',
    actions: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Cat-3',
    actions: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'Cat-4',
    actions: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const modalMappings = {
	category: [
		{props: 'name', 		label: 'Name', 			inputType: 'textbox'},
		{props: 'actions.title', label: 'Actions', 		inputType: 'list'},
		{props: 'createdAt', 	label: 'Created At', 	inputType: 'date'},
		{props: 'updatedAt', 	label: 'Updated At', 	inputType: 'date'},
	],
	action: [
		{props: 'title', 					label: 'Title', 			inputType: 'textbox'},
		{props: 'order', 					label: 'Order', 			inputType: 'textbox'},
		{props: 'schedule', 				label: 'Schedule', 			inputType: 'textbox'},
		{props: 'carbon_dioxide', 			label: 'Carbon Dioxide', 	inputType: 'textbox'},
		{props: 'water', 					label: 'Water', 			inputType: 'textbox'},
		{props: 'waste', 					label: 'Waste', 			inputType: 'textbox'},
		{props: 'short_description', 		label: 'Short Description', inputType: 'textarea'},
		{props: 'body', 					label: 'Body', 				inputType: 'textarea'},
		{props: 'action_taken_description', label: 'Action Taken', 		inputType: 'textarea'},
		{props: 'primary_image', 			label: 'Primary Image', 	inputType: 'textbox'},
		{props: 'video_url', 				label: 'Video URL', 		inputType: 'textbox'},
		{props: 'external_url', 			label: 'External URL', 		inputType: 'textbox'},
		{props: 'isGame', 					label: 'Game', 				inputType: 'checkbox'},
		{props: 'active', 					label: 'Active', 			inputType: 'checkbox'},
		{props: 'related_actions.title', 	label: 'Actions', 			inputType: 'list'},
		{props: 'author.name', 				label: 'Author'},
		{props: 'createdAt', 				label: 'Created At', 		inputType: 'date'},
		{props: 'updatedAt', 				label: 'Updated At', 		inputType: 'date'},
	],
	game: [
		{props: 'title', 					label: 'Title', 			inputType: 'textbox'},
		{props: 'order', 					label: 'Order', 			inputType: 'textbox'},
		{props: 'schedule', 				label: 'Schedule', 			inputType: 'textbox'},
		{props: 'carbon_dioxide', 			label: 'Carbon Dioxide', 	inputType: 'textbox'},
		{props: 'water', 					label: 'Water', 			inputType: 'textbox'},
		{props: 'waste', 					label: 'Waste', 			inputType: 'textbox'},
		{props: 'short_description', 		label: 'Short Description', inputType: 'textarea'},
		{props: 'body', 					label: 'Body', 				inputType: 'textarea'},
		{props: 'action_taken_description', label: 'Action Taken', 		inputType: 'textarea'},
		{props: 'primary_image', 			label: 'Primary Image', 	inputType: 'textbox'},
		{props: 'video_url', 				label: 'Video URL', 		inputType: 'textbox'},
		{props: 'external_url', 			label: 'External URL', 		inputType: 'textbox'},
		{props: 'isGame', 					label: 'Game', 				inputType: 'checkbox'},
		{props: 'active', 					label: 'Active', 			inputType: 'checkbox'},
		{props: 'related_actions.title', 	label: 'Actions', 			inputType: 'list'},
		{props: 'author.name', 				label: 'Author'},
		{props: 'createdAt', 				label: 'Created At', 		inputType: 'date'},
		{props: 'updatedAt', 				label: 'Updated At', 		inputType: 'date'},
	]
}

// enum Schedule {
//   ANYTIME
//   ONCE
//   DAILY
//   BIWEEKLY
//   WEEKLY
//   TWOWEEKS
//   MONTHLY
//   QUARTERLY
//   SEMIANNUALLY
//   ANNUALLY
// }