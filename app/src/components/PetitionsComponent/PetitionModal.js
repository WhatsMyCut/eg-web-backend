import React, { Component } from "react";
// import { ADD_GROUP_MUTATION } from '../../../graphql/mutations/add_group';
import graphql from "../../hoc/graphql";
import { withRouter } from "react-router-dom";
import { lib }from '../../lib/Lib';
import EGModal from "../shared/Modals/Modal";
import EGTextBox from '../shared/Inputs/EGTextBox';
import EGTextArea from '../shared/Inputs/EGTextArea';
import EGCheckbox from '../shared/Inputs/EGCheckbox';
import EGQuill from '../shared/Inputs/EGQuill';
import { CreatePetitionMutation } from '../../graphql/mutations/createPetition_mutation';
import { UpdatePetitionMutation } from '../../graphql/mutations/updatePetition_mutation';

@graphql(CreatePetitionMutation, {
	name: 'createPetition'
  })
@graphql(UpdatePetitionMutation, {
	name: 'updatePetition'
  })
class PetitionModal extends Component {
	state = {
		entity: this.props.entity
	}
	render() {
		const { entity } = this.state;
		const { onClose } = this.props;
        const modalContent = this.getContent();
		return <EGModal onClose={onClose} entityType='Petition' entity={entity} modalContent={modalContent} save={this.save}/>;
	}

	save = () =>{
		const {onClose, createPetition, updatePetition} = this.props;
        const {entity} = this.state;
        const variables = entity;
        
        // console.log('Saving Entity: ', entity);
        if(entity.id){
            updatePetition({variables});
        } else{
            createPetition({variables});
        }

        onClose();
    }
    
    getContent = () => {
        const { entity } = this.state;
        return [
            <EGTextBox  key={'title-input'}          value={entity.title || ''}             label={'Title'}             onChange={(event) => {this.updateEntity(event, 'title')}} />,
            <EGTextBox  key={'order-input'}          value={entity.order}                   label={'Order'}             onChange={(event) => {this.updateEntity(event, 'order')}} />,
            <EGTextArea key={'short-desc-input'}     value={entity.short_description || ''} label={'Short Description'} onChange={(event) => {this.updateEntity(event, 'short_description')}} />, 
            <EGQuill key={'body-input'}              value={entity.body || ''}              label={'Body'}              onChange={(event) => { this.updateEntity(event, 'body')}} />,
            <EGTextBox  key={'primary-image-input'}  value={entity.primary_image || ''}     label={'Primary Image'}     onChange={(event) => {this.updateEntity(event, 'primary_image')}} />,
            <EGTextBox  key={'video-input'}          value={entity.video || ''}             label={'Video'}             onChange={(event) => {this.updateEntity(event, 'video')}} />,
            <EGTextBox  key={'external-url-input'}   value={entity.external_url || ''}      label={'External URL'}      onChange={(event) => {this.updateEntity(event, 'external_url')}} />,
            <EGCheckbox key={'active-input'}         value={entity.active}                  label={'Active'}            onChange={(event) => {this.updateEntityBoolean(event, 'active')}} />,
            <div key='users'><strong style={{marginRight: '5px'}}>Users:</strong>{entity.users ? entity.users.map(user => {return user.name}).join(', ') : []}</div>,
            <div key='author'><strong style={{marginRight: '5px'}}>Author:</strong>{entity.author.name || ''}</div>,
            <div key='created-at'><strong style={{marginRight: '5px'}}>Created At:</strong>{`${lib.formatTime(entity.createdAt)}`}</div>,
            <div key='updated-at'><strong style={{marginRight: '5px'}}>Updated At:</strong>{`${lib.formatTime(entity.updatedAt)}`}</div>
        ];
    }

    updateEntity = (event, propName) => {
        const { entity } = this.state;
        if (event.target.value !== entity[propName]) {
            let newEntity = Object.assign({}, entity);
            newEntity[propName] = event.target.value;
            this.setState({ entity: newEntity });
        }
    }

    updateEntityBoolean = (event, propName) => {
        const { entity } = this.state;
        let newEntity = Object.assign({}, entity);
		newEntity[propName] = !newEntity[propName];
		this.setState({ entity: newEntity });
    }
}

export default PetitionModal;