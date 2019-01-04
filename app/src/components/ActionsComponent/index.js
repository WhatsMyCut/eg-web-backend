import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import ManagementView from '../shared/ManagementView';
import { maxWidthMediaQuery } from '../../constants/responsive';
import EGTable from '../shared/Table';
import {lib} from '../../lib/Lib';
import HeaderWithAddBtn from '../shared/HeaderWithAddBtn';
import ActionModal from './ActionModal';
import CategoryModal from './CategoryModal';
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
import graphql from '../../hoc/graphql';
import { GET_ALL_ACTIONS_CATEGORIES} from '../../graphql/queries/allActions';
const category = {
  id: '',
  name: '',
  primary_image: '',
  video_id: '',
  actions: [],
  createdAt: '',
  updatedAt: ''
}

const action = {
  id: '',
  category: {
    id: '',
    name: '',
    actions: [],
    createdAt: '',
    updatedAt: ''
  },
  order: '',
  primary_image: '',
  active: false,
  short_description: '',
  action_taken_description: '',
  schedule: 'ANYTIME',
  video: '',
  carbon_dioxide: '0.0',
  water: '0.0',
  waste: '0.0',
  points: '0',
  external_url: '',
  isGame: false,
  related_actions: [],
  author: {
	  name: ''
  },
  createdAt: '',
  updatedAt: ''
}

@withRouter
@graphql(GET_ALL_ACTIONS_CATEGORIES, {
	name:"all_actions_by_category"
})
class Actions extends Component {
  state = {
    modal: null,
    modalOpen: false,
	entity: category,
	entityType: 'Category'
  };

  render() {
	const { all_actions_by_category, user } = this.props;
	if(all_actions_by_category.loading){
		return <Segment loading style={{height:'100vh', width:'100vw'}}></Segment>
	}
	// console.log('all categories', all_actions_by_category.actionCategories)
    return [
      	<ManagementView
			key='actions-management-view'
      		title={this.isGameView() ? 'Games' : "Actions"} 
      		entityType="Category"
			openModal={() => {this.setState({modalOpen: true, entity: category, entityType: 'Category'})}}
			style={{overflowY: 'auto'}}
      	>
		  {
			  all_actions_by_category.actionCategories.map(cat => {
					if(this.isGameView()){
						action.isGame = true;
					}
				return(
					<Segment key={`${cat.name.replace(/\s/g, '')}-category`}>
						<HeaderWithAddBtn
							title={cat.name}
							clickable={true}
							onClick={() => {this.setState({modalOpen: true, entity: cat, entityType: 'Category'})}}
							entityType={this.isGameView() ? 'Game' : 'Action'}
							openModal={() => {
								action.category_id = cat.id;
								action.author_id = user.me.id;
								action.category = cat;
								this.setState({modalOpen: true, entity: action, entityType: this.isGameView() ? 'Game' : 'Action', selectedCategory: cat})
							}} 
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

	openModal = (entity, entityType, cat) => {
		console.log('cat', cat);
		entity.category_id = cat.id;
		this.setState({entity: entity, modalOpen: true, entityType: entityType ? entityType : this.state.entityType, selectedCategory: cat})
	}

  	_renderModal() {
		const { entity, modalOpen, entityType, selectedCategory } = this.state;
		if (!modalOpen) { return null }

	switch(entityType){
		case 'Category':
			return <CategoryModal key="category-modal" entity={entity} onClose={this._onCloseModal} />;
		case 'Game':
			return <ActionModal key="game-modal" entity={entity} entityType='Game' onClose={this._onCloseModal} newOrder={selectedCategory.actions.length + 1}/>
		case 'Action':
			const relatedActionsoptions = selectedCategory ? selectedCategory.actions.filter(action => { return action.isGame === true }) : [];
			entity.category_id = selectedCategory.id;
			return <ActionModal key="action-modal" entity={entity} entityType='Action' onClose={this._onCloseModal} relatedActionsOptions={relatedActionsoptions} newOrder={selectedCategory.actions.length + 1} />
		default:
			return null;
	}
  }

  _onCloseModal = () => {
    this.props.all_actions_by_category.refetch();
    this.setState({ modalOpen: null, entity: category });
  };

  getTable = (cat) => {
		// console.log('cat', cat.actions);
	  	function gamesFilter(action){return action.isGame === true;}
		function actionsFilter(action){return action.isGame === false;}
		if(this.isGameView()){
			console.log('data inside of table', cat.actions);
			return (
				<EGTable
					headings={[
						'Short Description',
						'Order',
						'Active',
						'Related Actions',
						'Author',
						'Created At',
						'Updated At'
					]}
					data={cat.actions.filter(gamesFilter).map(data => {
						
						return {
							Id: data.id,
							Category: data.category,
							Order: data.order,
							PrimaryImage: data.primary_image,
							Active: data.active,
							ShortDescription: data.short_description !== '' ? data.short_description : 'No Description',
							ActionTakenDescription: data.action_taken_description,
							Schedule: data.schedule,
							VideoURL: data.video,
							CarbonDioxide: data.carbon_dioxide,
							Water: data.water,
							Waste: data.waste,
							ExternalURL: data.external_url,
							IsGame: data.isGame,
							RelatedActions: data.related_actions ? data.related_actions.map(act => {return act.title}).join(', ') : null,
							Author: data.author.name,
							CreatedAt: data.createdAt,
							UpdatedAt: data.updatedAt
						};
					})}
					leftAlignColumns={[0, 1, 2, 3, 4, 5, 6]}
					hyperlinkColumns={[0]}
					hyperlinkFunctions={[
						{ 
							index: 0, 
							fn: (data) => {
								const entityType = this.isGameView() ? 'Game' : 'Action';
								this.openModal(cat.actions.filter(item => {return item.id === data.Id})[0], entityType)
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
						},
					]}
				/>
			)
		} else{
			// console.log('not games');
			return (
				<EGTable
					headings={[
						'Short Description',
						'Order',
						'Active',
						'Related Actions',
						'Author',
						'Created At',
						'Updated At'
					]}
					data={cat.actions.filter(actionsFilter).map(data => {
						// console.log('data inside of table', cat.actions, data);
						return {
							Id: data.id,
							Category: data.category,
							Order: data.order,
							PrimaryImage: data.primary_image,
							Active: data.active,
							ShortDescription: data.short_description !== '' ? data.short_description : 'No Description',
							ActionTakenDescription: data.action_taken_description,
							Schedule: data.schedule,
							VideoURL: data.video,
							CarbonDioxide: data.carbon_dioxide,
							Water: data.water,
							Waste: data.waste,
							ExternalURL: data.external_url,
							IsGame: data.isGame,
							RelatedActions: data.related_actions ? data.related_actions.map(act => {return act.title}).join(', ') : null,
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
							fn: (data) => {
								const entityType = this.isGameView() ? 'Game' : 'Action';
								this.openModal(cat.actions.filter(item => {return item.id === data.Id})[0], entityType, cat)
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
						},
					]}
				/>
			)
		}
	  }
	  
	  isGameView = () => {
		  return this.props.match.path === '/games';
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
      video: 'faweeioa.com',
      carbon_dioxide: 10.0,
      water: 20.0,
      waste: 30.0,
      external_url: 'asdffsdafjsdf.net',
      isGame: false,
    //   related_actions: [],
      related_actions: [{
		  id: '9',
		  title: 'Water Savings'
	  }],
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
      video: 'asadfsdafasdfdsaf',
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
];