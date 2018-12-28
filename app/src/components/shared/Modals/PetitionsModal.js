import React, { Component } from "react";
import {
  Modal,
  Header,
  Button,
  Icon,
  Label,
  Input,
  Segment,
  Dimmer,
  Checkbox,
  TextArea
} from "semantic-ui-react";
// import { ADD_GROUP_MUTATION } from '../../../graphql/mutations/add_group';
import graphql from "../../../hoc/graphql";
import { withRouter } from "react-router-dom";
import EGModal from "./Modal";

class PetitionsModal extends Component {
	state = {
		entity: this.props.entity
	}
	render() {
		const { entity } = this.state;
		const { entityType, onClose } = this.props;
		const modalContent = modalMappings.map(mapping => {
		return this.getInput(mapping, entity)
		});
		return <EGModal onClose={onClose} entityType={entityType} entity={entity} modalContent={modalContent} save={this.save}/>;
	}

	save = () =>{
		const {entity, onClose} = this.props;
		console.log(`Saving entity: ${JSON.stringify(this.state.entity)}`)
		this.setState({entity: entity}, () => {
			onClose();
		});
	}

	getInput = (mapping, entity) => {
		const value = mapping.secondProp ? entity[mapping.prop][mapping.secondProp] : entity[mapping.prop];
		switch(mapping.inputType){
			case 'textbox':
				return (
					<Input
					fluid
					value={value}
					key={`${mapping.prop}-input`}
					label={mapping.label}
					placeholder={mapping.label}
					onChange={event => {
						if (event.target.value !== "") {
							let newEntity = Object.assign({}, entity);
							newEntity[mapping.prop] = event.target.value;
						this.setState({ entity: newEntity });
					}}}
					style={{marginBottom: '5px'}}
				/>
				);
			case 'checkbox':
				return (
					<div style={{display: 'flex', flexDirection: 'row', marginBottom: '5px'}} key={`${mapping.prop}-input`}>
						<strong>{mapping.label}</strong>
						<Checkbox
							// id="rememberMe"
							checked={value}
							onChange={event => {
									let newEntity = Object.assign({}, entity);
									newEntity[mapping.prop] = !newEntity[mapping.prop];
								this.setState({ entity: newEntity });}}
							style={{marginLeft: '5px'}}
							label=''
						/>
					</div>
				);
			case 'textarea':
				return (
					<div className="ui fluid labeled input" style={{display: 'flex', flexDirection: 'row', marginBottom: '5px'}} key={`${mapping.prop}-input`}>
						<strong className="ui label label">{mapping.label}</strong>
						<TextArea
						value={value}
						key={`${mapping.prop}-input`}
						label={mapping.label}
						style={{flex: 1, border: '1px solid rgba(34,36,38,.15)', borderLeftColor: 'transparent', borderBottomRightRadius: '.28571429rem', borderTopRightRadius: '.28571429rem', paddingTop: '0.678571em',
						paddingRight: '1em',
						paddingBottom: '0.678571em',
						paddingLeft: '1em'}}
						/>
					</div>
				)
			default:
				return <div key={`${mapping.prop}-data`}><strong style={{marginRight: '5px'}}>{`${mapping.label}:`}</strong>{`${value}`}</div>;
		}
	}
}

const modalMappings = [
	{prop: 'title', label: 'Title', inputType: 'textbox'},
	{prop: 'short_description', label: 'Short Description', inputType: 'textarea'},
	{prop: 'body', label: 'Body', inputType: 'textarea'},
	{prop: 'primary_image', label: 'Primary Image', inputType: 'textbox'},
	{prop: 'video_url', label: 'Video URL', inputType: 'textbox'},
	{prop: 'external_url', label: 'External URL', inputType: 'textbox'},
	{prop: 'active', label: 'Active', inputType: 'checkbox'},
	{prop: 'users', label: 'Users', inputType: 'list'},
	{prop: 'author', secondProp: 'name', label: 'Author'},
	{prop: 'createdAt', label: 'Created At'},
	{prop: 'updatedAt', label: 'Updated At'},
];

const petition = {
	id: '',
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
	createdAt: new Date(),
	updatedAt: ''
}

export default PetitionsModal;