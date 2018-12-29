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

class ModalContent extends Component {
	state = {
		entity: this.props.entity
	}
	render() {
		const { entity } = this.state;
		const { entityType, onClose, mappings } = this.props;
		const modalContent = mappings.map(mapping => {
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
		let value = this.getValue(mapping, entity);
		switch(mapping.inputType){
			case 'textbox':
				return (
					<Input
					fluid
					value={value}
					key={`${mapping.props}-input`}
					label={mapping.label}
					placeholder={mapping.label}
					onChange={event => {
						if (event.target.value !== "") {
							let newEntity = Object.assign({}, entity);
							newEntity[mapping.props] = event.target.value;
						this.setState({ entity: newEntity });
					}}}
					style={{marginBottom: '5px'}}
				/>
				);
			case 'checkbox':
				return (
					<div style={{display: 'flex', flexDirection: 'row', marginBottom: '5px'}} key={`${mapping.props}-input`}>
						<strong>{mapping.label}</strong>
						<Checkbox
							checked={value}
							onChange={event => {
									let newEntity = Object.assign({}, entity);
									newEntity[mapping.props] = !newEntity[mapping.props];
								this.setState({ entity: newEntity });}}
							style={{marginLeft: '5px'}}
							label=''
						/>
					</div>
				);
			case 'textarea':
				return (
					<div className="ui fluid labeled input" style={{display: 'flex', flexDirection: 'row', marginBottom: '5px'}} key={`${mapping.props}-input`}>
						<strong className="ui label label">{mapping.label}</strong>
						<TextArea
						value={value}
						key={`${mapping.props}-input`}
						label={mapping.label}
						style={styles.textArea}
						/>
					</div>
				)
			default:
				return <div key={`${mapping.props}-data`}><strong style={{marginRight: '5px'}}>{`${mapping.label}:`}</strong>{`${value}`}</div>;
		}
	}

	getValue = (mapping, entity) => {
		let value;
		const props = mapping.props.split('.');
		if(mapping.inputType === 'list'){
			if(props.length > 1){
				const finalProp = props.pop();
				props.forEach(prop => {
					value = value ? 
						Array.isArray(value) ?
							value.map(item => {return item[prop]}) :
							value[prop] : 
						entity[prop];
				})
				value = value.map(listItem => {
					return listItem[finalProp]
				}).join(', ');
			}else{
				value = entity[props[0]].join(', ');
			}
		} else{
			if(props.length > 1){
				props.forEach(prop => {
					value = value ? value[prop] : entity[prop] ;
				})
			}else{
				value = entity[props[0]];
			}
		}
		

		return value;
	}
}

const styles = {
  textArea: {
    flex: 1,
    border: "1px solid rgba(34,36,38,.15)",
    borderLeftColor: "transparent",
    borderBottomRightRadius: ".28571429rem",
    borderTopRightRadius: ".28571429rem",
    paddingTop: "0.678571em",
    paddingRight: "1em",
    paddingBottom: "0.678571em",
    paddingLeft: "1em"
  }
};

export default ModalContent;