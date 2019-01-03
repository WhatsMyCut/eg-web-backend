import React, { Component } from "react";
// import { ADD_GROUP_MUTATION } from '../../../graphql/mutations/add_group';
import graphql from "../../hoc/graphql";
import { withRouter } from "react-router-dom";
import { lib }from '../../lib/Lib';
import EGModal from "../shared/Modals/Modal";
import EGTextBox from '../shared/Inputs/EGTextBox';
import EGTextArea from '../shared/Inputs/EGTextArea';
import EGCheckbox from '../shared/Inputs/EGCheckbox';
import EGDropdown from '../shared/Inputs/EGDropdown';
import EGQuill from '../shared/Inputs/EGQuill';

class ActionModal extends Component {
	state = {
		entity: this.props.entity
	}
	render() {
		const { entity } = this.state;
		const { entityType, onClose } = this.props;
        const modalContent = this.getContent();
		return <EGModal onClose={onClose} entityType={entityType} entity={entity} modalContent={modalContent} save={this.save}/>;
	}

	save = () =>{
		const {onClose} = this.props;
        console.log(`Saving entity: ${JSON.stringify(this.state.entity)}`)
        
        //Call mutation here.

		onClose();
    }
    
    getContent = () => {
        const { entity } = this.state;
        const { relatedActionsOptions, entityType } = this.props;
        return entityType === 'Action' ? 
        [
            <EGTextBox  key={'title-input'}          value={entity.title || ''}             label={'Title'}             onChange={(event) => {this.updateEntity(event, 'title')}} />,
            <EGTextBox  key={'order-input'}          value={entity.order || ''}             label={'Order'}             onChange={(event) => {this.updateEntity(event, 'order')}} />,
            <EGDropdown key={'schedule-input'} currentValues={entity.schedule || scheduleOptions[0]} options={scheduleOptions} label={'Schedule'} onChange={(event) => {this.updateSchedule(event)}} />,
            <EGTextBox  key={'carbon_dioxide-input'} value={entity.carbon_dioxide || ''}    label={'Carbon Dioxide'}    onChange={(event) => {this.updateEntity(event, 'carbon_dioxide')}}/>, 
            <EGTextBox  key={'water-input'}          value={entity.water || ''}             label={'Water'}             onChange={(event) => {this.updateEntity(event, 'water')}} />,
            <EGTextBox  key={'waste-input'}          value={entity.waste || ''}             label={'Waste'}             onChange={(event) => {this.updateEntity(event, 'waste')}} />,
            <EGTextArea key={'short-desc-input'}     value={entity.short_description || ''} label={'Short Description'} onChange={(event) => {this.updateEntity(event, 'short_description')}} />, 
            <EGQuill key={'body-input'}              value={entity.body || ''}              label={'Body'}              onChange={(event) => { this.updateEntity(event, 'body')}} />,
            <EGTextArea key={'action-taken-input'}   value={entity.action_taken_description || ''}      label={'Action Taken'}      onChange={(event) => {this.updateEntity(event, 'action_taken_description')}} />,
            <EGTextBox  key={'primary-image-input'}  value={entity.primary_image || ''}     label={'Primary Image'}     onChange={(event) => {this.updateEntity(event, 'primary_image')}} />,
            <EGTextBox  key={'video-input'}          value={entity.video || ''}             label={'Video'}             onChange={(event) => {this.updateEntity(event, 'video')}} />,
            <EGTextBox  key={'external-url-input'}   value={entity.external_url || ''}      label={'External URL'}      onChange={(event) => {this.updateEntity(event, 'external_url')}} />,
            <EGDropdown key={'related-actions-input'} currentValues={entity.related_actions ? entity.related_actions.map(action => {return action.id}) : []} label={'Related Actions'} multiple={true} options={this.toDropdownOptions(relatedActionsOptions, 'title')} onChange={(event) => { this.updateRelatedActions(event);}} />,
            <EGCheckbox key={'isGame-input'}         value={entity.isGame}            label={'Game'}              onChange={(event) => {this.updateEntityBoolean(event, 'isGame')}} />,
            <EGCheckbox key={'active-input'}         value={entity.active}            label={'Active'}            onChange={(event) => {this.updateEntityBoolean(event, 'active')}} />,
            <div key='author'><strong style={{marginRight: '5px'}}>Author:</strong>{entity.author.name || ''}</div>,
            <div key='created-at'><strong style={{marginRight: '5px'}}>Created At:</strong>{`${lib.formatTime(entity.createdAt)}`}</div>,
            <div key='updated-at'><strong style={{marginRight: '5px'}}>Updated At:</strong>{`${lib.formatTime(entity.updatedAt)}`}</div>
        ] :
        [
            <EGTextBox  key={'title-input'}          value={entity.title || ''}             label={'Title'}             onChange={(event) => {this.updateEntity(event, 'title')}} />,
            <EGTextBox  key={'order-input'}          value={entity.order || ''}             label={'Order'}             onChange={(event) => {this.updateEntity(event, 'order')}} />,
            <EGDropdown key={'schedule-input'} currentValues={entity.schedule || scheduleOptions[0]} options={scheduleOptions} label={'Schedule'} onChange={(event) => {this.updateSchedule(event)}} />,
            <EGTextBox  key={'carbon_dioxide-input'} value={entity.carbon_dioxide || ''}    label={'Carbon Dioxide'}    onChange={(event) => {this.updateEntity(event, 'carbon_dioxide')}} />, 
            <EGTextBox  key={'water-input'}          value={entity.water || ''}             label={'Water'}             onChange={(event) => {this.updateEntity(event, 'water')}} />,
            <EGTextBox  key={'waste-input'}          value={entity.waste || ''}             label={'Waste'}             onChange={(event) => {this.updateEntity(event, 'waste')}} />,
            <EGTextArea key={'short-desc-input'}     value={entity.short_description || ''} label={'Short Description'} onChange={(event) => {this.updateEntity(event, 'short_description')}} />, 
            <EGQuill key={'body-input'}              value={entity.body || ''}              label={'Body'}              onChange={(event) => { this.updateEntity(event, 'body')}} />,
            <EGTextArea key={'action-taken-input'}   value={entity.action_taken_description || ''}      label={'Action Taken'}      onChange={(event) => {this.updateEntity(event, 'action_taken_description')}} />,
            <EGTextBox  key={'primary-image-input'}  value={entity.primary_image || ''}     label={'Primary Image'}     onChange={(event) => {this.updateEntity(event, 'primary_image')}} />,
            <EGTextBox  key={'video-input'}          value={entity.video || ''}             label={'Video'}             onChange={(event) => {this.updateEntity(event, 'video')}} />,
            <EGTextBox  key={'external-url-input'}   value={entity.external_url || ''}      label={'External URL'}      onChange={(event) => {this.updateEntity(event, 'external_url')}} />,
            <EGCheckbox key={'active-input'}         value={entity.active}            label={'Active'}            onChange={(event) => {this.updateEntityBoolean(event, 'active')}} />,
            <div key='author'><strong style={{marginRight: '5px'}}>Author:</strong>{entity.author.name || ''    }</div>,
            <div key='created-at'><strong style={{marginRight: '5px'}}>Created At:</strong>{`${lib.formatTime(entity.createdAt)}`}</div>,
            <div key='updated-at'><strong style={{marginRight: '5px'}}>Updated At:</strong>{`${lib.formatTime(entity.updatedAt)}`}</div>
        ]
    }

    updateEntity = (event, propName) => {
        const { entity } = this.state;
        if (event.target.value !== "") {
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

    updateRelatedActions = (event) => {
        const { entity } = this.state;
        const { relatedActionsOptions } = this.props;
        let newEntity = Object.assign({}, entity);
        if(event.action === 'add'){
            const selectedAction = relatedActionsOptions.filter(action => { return action.id === event.value})[0];
            const actionPreviouslySelected = entity.related_actions.some(action => {return action.id === event.value;})
            if(!actionPreviouslySelected){
                newEntity.related_actions.push(selectedAction);
            }
        } else{
            let actionIndex;
            newEntity.related_actions.some((action, i) => {
                if(action.id === event.value){
                    actionIndex = i
                    return true;
                }
            })
            newEntity.related_actions.splice(actionIndex, 1);
        }

        this.setState({ entity: newEntity });
    }

    updateSchedule = (event) => {
        const { entity } = this.state;
        if (event.action && event.value) {
            let newEntity = Object.assign({}, entity);
            newEntity.schedule = event.value;
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
}

export default ActionModal;

const scheduleOptions = [
    'ANYTIME',
    'ONCE',
    'DAILY',
    'BIWEEKLY',
    'WEEKLY',
    'TWOWEEKS',
    'MONTHLY',
    'QUARTERLY',
    'SEMIANNUALLY',
    'ANNUALLY'
]