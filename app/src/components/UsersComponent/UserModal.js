import React, { Component } from "react";
// import { ADD_GROUP_MUTATION } from '../../../graphql/mutations/add_group';
import graphql from "../../hoc/graphql";
import { withRouter } from "react-router-dom";
import { lib }from '../../lib/Lib';
import EGModal from "../shared/Modals/Modal";
import EGTextBox from '../shared/Inputs/EGTextBox';

class UserModal extends Component {
	state = {
		entity: this.props.entity
	}
	render() {
		const { entity } = this.state;
		const { onClose } = this.props;
        const modalContent = this.getContent();
		return <EGModal onClose={onClose} entityType='User' entity={entity} modalContent={modalContent} save={this.save}/>;
	}

	save = () =>{
		const {onClose} = this.props;
        console.log(`Saving entity: ${JSON.stringify(this.state.entity)}`)
        
        //Call mutation here.

		onClose();
    }

    // const modalMappings = [
    //     {props: 'email', 						label: 'Email', 			inputType: 'textbox'},
    //     {props: 'password', 					label: 'Password', 			inputType: 'textbox'},
    //     {props: 'name', 						label: 'Name', 				inputType: 'textbox'},
    //     {props: 'phone', 						label: 'Phone', 			inputType: 'textbox'},
    //     {props: 'role.role_name', 				label: 'Role', 				inputType: 'textbox'},
    //     {props: 'total_points', 				label: 'Total Points', 		inputType: 'textbox'},
    //     {props: 'recent_actions.action.title', 	label: 'Recent Actions', 	inputType: 'list'},
    //     {props: 'petitions_signed.title', 		label: 'Petitions Signed', 	inputType: 'list'},
    //     {props: 'createdAt', 					label: 'Created At'},
    //     {props: 'updatedAt', 					label: 'Updated At'},
    // ];
    
    getContent = () => {
        const { entity } = this.state;
        return [
            <EGTextBox key={'email-input'} value={entity.email || ''} label={'Email'} onChange={(event) => {this.updateEntity(event, 'email')}} />,
            <EGTextBox key={'password-input'} value={entity.password || ''} label={'Password'} onChange={(event) => {this.updateEntity(event, 'password')}} />,
            <EGTextBox key={'name-input'} value={entity.name || ''} label={'Name'} onChange={(event) => {this.updateEntity(event, 'name')}} />,
            <EGTextBox key={'phone-input'} value={entity.phone || ''} label={'Phone'} onChange={(event) => {this.updateEntity(event, 'phone')}} />,
            <EGTextBox key={'role-input'} value={entity.role.role_name || ''} label={'Role'} onChange={(event) => {this.updateEntity(event, 'role.role_name')}} />,
            <EGTextBox key={'total-points-input'} value={entity.total_points || ''} label={'Total Points'} onChange={(event) => {this.updateEntity(event, 'total_points')}} />,
            <div key='recent-actions'><strong style={{marginRight: '5px'}}>Recent Actions:</strong>{entity.recent_actions ? entity.recent_actions.map(action => {return action.action.title}).join(', ') : []}</div>,
            <div key='petitions-signed'><strong style={{marginRight: '5px'}}>Petitions Signed:</strong>{entity.petitions_signed ? entity.petitions_signed.map(petition => {return petition.title}).join(', ') : []}</div>,
            <div key='created-at'><strong style={{marginRight: '5px'}}>Created At:</strong>{`${lib.formatTime(entity.createdAt)}`}</div>,
            <div key='updated-at'><strong style={{marginRight: '5px'}}>Updated At:</strong>{`${lib.formatTime(entity.updatedAt)}`}</div>
        ]

    }

    updateEntity = (event, propName) => {
        const { entity } = this.state;
        if (event.target.value !== '') {
                let newEntity = Object.assign({}, entity);
            if(propName === 'role.role_name'){
                newEntity.role.role_name = event.target.value;
            } else{
                newEntity[propName] = event.target.value;
            }
            this.setState({ entity: newEntity });
        }
    }
}

export default UserModal;