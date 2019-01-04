import React, { Component } from "react";
// import { ADD_GROUP_MUTATION } from '../../../graphql/mutations/add_group';
import graphql from "../../hoc/graphql";
import { withRouter } from "react-router-dom";
import { lib }from '../../lib/Lib';
import EGModal from "../shared/Modals/Modal";
import EGTextBox from '../shared/Inputs/EGTextBox';
import EGDropdown from '../shared/Inputs/EGDropdown';
import { CreateUserMutation } from '../../graphql/mutations/createUser_mutation';
import { UpdateUserMutation } from '../../graphql/mutations/updateUser_mutation';

@graphql(CreateUserMutation, {
	name: 'createUser'
  })
@graphql(UpdateUserMutation, {
	name: 'updateUser'
  })
class UserModal extends Component {
	state = {
        entity: this.props.entity,
        initialRoleId: this.props.entity.role.id
	}
	render() {
		const { entity } = this.state;
		const { onClose } = this.props;
        const modalContent = this.getContent();
		return <EGModal onClose={onClose} entityType='User' entity={entity} modalContent={modalContent} save={this.save}/>;
	}

	save = () =>{
		const {onClose, createUser, updateUser, roles} = this.props;
        const {entity, initialRoleId} = this.state;
        const variables = entity;
        
        variables.role_id = variables.role ? variables.role.id : roles[0].id;
        // console.log('Saving Entity: ', entity);
        if(entity.id){
            updateUser({variables}).then(res => {
                onClose();
            });
        } else{
            createUser({variables}).then(res => {
                onClose();
            });
        }

    }
    
    getContent = () => {
        const { entity } = this.state;
        const { roles } = this.props;
        return [
            <EGTextBox key={'email-input'} value={entity.email || ''} label={'Email'} onChange={(event) => {this.updateEntity(event, 'email')}} />,
            <EGTextBox key={'password-input'} value={entity.password || ''} label={'Password'} onChange={(event) => {this.updateEntity(event, 'password')}} />,
            <EGTextBox key={'name-input'} value={entity.name || ''} label={'Name'} onChange={(event) => {this.updateEntity(event, 'name')}} />,
            <EGTextBox key={'phone-input'} value={entity.phone || ''} label={'Phone'} onChange={(event) => {this.updateEntity(event, 'phone')}} />,
            <EGDropdown key={'role-input'} currentValues={entity.role ? entity.role.id : roles[0].id} options={this.toDropdownOptions(roles, 'role_name')} label={'Role'} onChange={(event) => {this.updateRole(event)}} />,
            <div key='recent-actions'><strong style={{marginRight: '5px'}}>Recent Actions:</strong>{entity.recent_actions ? entity.recent_actions.map(action => {return action.action.title}).join(', ') : []}</div>,
            <div key='petitions-signed'><strong style={{marginRight: '5px'}}>Petitions Signed:</strong>{entity.petitions_signed ? entity.petitions_signed.map(petition => {return petition.title}).join(', ') : []}</div>,
            <div key='total-points'><strong style={{marginRight: '5px'}}>Total Points:</strong>{`${entity.total_points || 0}`}</div>,
            <div key='created-at'><strong style={{marginRight: '5px'}}>Created At:</strong>{`${lib.formatTime(entity.createdAt)}`}</div>,
            <div key='updated-at'><strong style={{marginRight: '5px'}}>Updated At:</strong>{`${lib.formatTime(entity.updatedAt)}`}</div>
        ]

    }

    updateEntity = (event, propName) => {
        const { entity } = this.state;
        if (event.target.value !== entity[propName]) {
                let newEntity = Object.assign({}, entity);
            if(propName === 'role.role_name'){
                newEntity.role.role_name = event.target.value;
            } else{
                newEntity[propName] = event.target.value;
            }
            this.setState({ entity: newEntity });
        }
    }

    toDropdownOptions = (list, textProp) =>  {
        return list.map(item => {
            return {
                key: item.id,
                value: item.id,
                text: item[textProp]
            }
        }) || [];
    }

    updateRole = (event) => {
        const { entity } = this.state;
        const { roles } = this.props;
        if (event.action && event.value) {
            let newEntity = Object.assign({}, entity);
            newEntity.role = roles.filter(role => {return role.id === event.value})[0];
        this.setState({ entity: newEntity });
        }
    }
}

export default UserModal;