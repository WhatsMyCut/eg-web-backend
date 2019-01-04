import React, { Component } from "react";
// import { ADD_GROUP_MUTATION } from '../../../graphql/mutations/add_group';
import graphql from "../../hoc/graphql";
import { withRouter } from "react-router-dom";
import { lib }from '../../lib/Lib';
import EGModal from "../shared/Modals/Modal";
import EGTextBox from '../shared/Inputs/EGTextBox';
import { CreateCategoryMutation } from '../../graphql/mutations/createCategory_mutation';
import { UpdateCategoryMutation } from '../../graphql/mutations/updateCategory_mutation';

@graphql(CreateCategoryMutation, {
	name: 'createCategory'
  })
@graphql(UpdateCategoryMutation, {
	name: 'updateCategory'
  })
class CategoryModal extends Component {
	state = {
		entity: this.props.entity
	}
	render() {
		const { entity } = this.state;
		const { onClose } = this.props;
        const modalContent = this.getContent();
		return <EGModal onClose={onClose} entityType='Category' entity={entity} modalContent={modalContent} save={this.save}/>;
	}

	save = () =>{
		const {onClose, createCategory, updateCategory} = this.props;
        const {entity} = this.state;
        const variables = entity;
        
        if(entity.id){
            updateCategory({variables});
        } else{
            createCategory({variables});
        }

        onClose();
    }
    
    getContent = () => {
        const { entity } = this.state;
        return [
            <EGTextBox key={'name-input'} value={entity.name} label={'Name'} onChange={(event) => {this.updateEntity(event, 'name')}} />,
            <EGTextBox key={'primary-image-input'} value={entity.primary_image} label={'Primary Image'} onChange={(event) => {this.updateEntity(event, 'primary_image')}} />,
            <EGTextBox key={'video-id-input'} value={entity.video_id} label={'Video Id'} onChange={(event) => {this.updateEntity(event, 'video_id')}} />,
            <div key='actions'><strong style={{marginRight: '5px'}}>Actions:</strong>{entity.actions.filter(action => {return action.isGame === false}).map(action => {return action.title}).join(', ')}</div>,
            <div key='games'><strong style={{marginRight: '5px'}}>Games:</strong>{entity.actions.filter(action => {return action.isGame === true}).map(action => {return action.title}).join(', ')}</div>,
            <div key='created-at'><strong style={{marginRight: '5px'}}>Created At:</strong>{`${lib.formatTime(entity.createdAt)}`}</div>,
            <div key='updated-at'><strong style={{marginRight: '5px'}}>Updated At:</strong>{`${lib.formatTime(entity.updatedAt)}`}</div>
        ]

    }

    updateEntity = (event, propName) => {
        const { entity } = this.state;
        if (event.target.value !== entity[propName]) {
            let newEntity = Object.assign({}, entity);
            newEntity[propName] = event.target.value;
        this.setState({ entity: newEntity });
        }
    }
}

export default CategoryModal;