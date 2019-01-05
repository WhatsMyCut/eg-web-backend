import React, { Component } from "react";
// import { ADD_GROUP_MUTATION } from '../../../graphql/mutations/add_group';
import graphql from "../../hoc/graphql";
import { lib }from '../../lib/Lib';
import EGModal from "../shared/Modals/Modal";
import EGTextBox from '../shared/Inputs/EGTextBox';
import EGTextArea from '../shared/Inputs/EGTextArea';
import EGCheckbox from '../shared/Inputs/EGCheckbox';
import EGDropdown from '../shared/Inputs/EGDropdown';
import { CreateActionMutation } from '../../graphql/mutations/createAction_mutation';
import { UpdateActionMutation } from '../../graphql/mutations/updateAction_mutation';

@graphql(CreateActionMutation, {
	name: 'createAction'
  })
@graphql(UpdateActionMutation, {
	name: 'updateAction'
  })
class ActionModal extends Component {
	state = {
        entity: this.props.entity,
        initialRelatedActionIds: this.props.entity.related_actions.map(action => { return action.id })
	}
	render() {
		const { entity } = this.state;
		const { entityType, onClose } = this.props;
        const modalContent = this.getContent();
		return <EGModal onClose={onClose} entityType={entityType} entity={entity} modalContent={modalContent} save={this.save}/>;
	}

	save = () =>{
        const {onClose, createAction, updateAction} = this.props;
        const {entity, initialRelatedActionIds} = this.state;
        const variables = entity;
        variables.water = parseFloat(variables.water);
        variables.waste = parseFloat(variables.waste);
        variables.carbon_dioxide = parseFloat(variables.carbon_dioxide);
        variables.points = parseInt(variables.points);
        variables.order = parseInt(variables.order);

        // console.log('Saving Entity: ', entity);
        if(entity.id){
            const selectedIds = variables.related_actions.map(action => {return action.id});
            variables.relatedActionIdsToRemove = initialRelatedActionIds.filter(initialActionId => {
                return !lib.arrayIncludes(selectedIds, initialActionId);
            }).map(actionId => {return {id: actionId}});
            variables.relatedActionIds = variables.related_actions.map(action => {return {id: action.id}});
            updateAction({variables}).then(res => {
                onClose();
            })
        } else{
            createAction({variables}).then(res => {
                onClose();
            })
        }
    }
    
    getContent = () => {
        const { entity } = this.state;
        const { relatedActionsOptions, entityType} = this.props;
        return entityType === 'Action' ? 
        [
            <EGTextArea key={'short-desc-input'}     value={entity.short_description || ''} label={'Short Description'} onChange={(event) => {this.updateEntity(event, 'short_description')}} />, 
            <EGTextBox  key={'order-input'}          value={entity.order}                   label={'Order'}             onChange={(event) => {this.updateEntity(event, 'order')}} />,
            <EGDropdown key={'schedule-input'} currentValues={entity.schedule || scheduleOptions[0]} options={scheduleOptions} label={'Schedule'} onChange={(event) => {this.updateSchedule(event)}} />,
            <EGTextBox  key={'carbon_dioxide-input'} value={entity.carbon_dioxide || ''}    label={'Carbon Dioxide'}    onChange={(event) => {this.updateEntity(event, 'carbon_dioxide')}}/>, 
            <EGTextBox  key={'water-input'}          value={entity.water || ''}             label={'Water'}             onChange={(event) => {this.updateEntity(event, 'water')}} />,
            <EGTextBox  key={'waste-input'}          value={entity.waste || ''}             label={'Waste'}             onChange={(event) => {this.updateEntity(event, 'waste')}} />,
            <EGTextBox  key={'points-input'}         value={entity.points || ''}            label={'Points'}            onChange={(event) => {this.updateEntity(event, 'points')}} />,
            <EGTextBox  key={'primary-image-input'}  value={entity.primary_image || ''}     label={'Primary Image'}     onChange={(event) => {this.updateEntity(event, 'primary_image')}} />,
            <EGTextBox  key={'video-input'}          value={entity.video_url || ''}             label={'Video'}             onChange={(event) => {this.updateEntity(event, 'video_url')}} />,
            <EGTextBox  key={'external-url-input'}   value={entity.external_url || ''}      label={'External URL'}      onChange={(event) => {this.updateEntity(event, 'external_url')}} />,
            <EGDropdown key={'related-actions-input'} currentValues={entity.related_actions ? entity.related_actions.map(action => {return action.id}) : []} label={'Games'} multiple={true} options={this.toDropdownOptions(relatedActionsOptions, 'short_description')} onChange={(event) => { this.updateRelatedActions(event);}} />,
            <EGCheckbox key={'isGame-input'}         value={entity.isGame}            label={'Game'}              onChange={(event) => {this.updateEntityBoolean(event, 'isGame')}} />,
            <EGCheckbox key={'active-input'}         value={entity.active}            label={'Active'}            onChange={(event) => {this.updateEntityBoolean(event, 'active')}} />,
            <div key='author'><strong style={{marginRight: '5px'}}>Author:</strong>{entity.author.name || ''}</div>,
            <div key='created-at'><strong style={{marginRight: '5px'}}>Created At:</strong>{`${lib.formatTime(entity.createdAt)}`}</div>,
            <div key='updated-at'><strong style={{marginRight: '5px'}}>Updated At:</strong>{`${lib.formatTime(entity.updatedAt)}`}</div>
        ] :
        [
            <EGTextArea key={'short-desc-input'}     value={entity.short_description || ''} label={'Short Description'} onChange={(event) => {this.updateEntity(event, 'short_description')}} />, 
            <EGTextBox  key={'order-input'}          value={entity.order}                   label={'Order'}             onChange={(event) => {this.updateEntity(event, 'order')}} />,
            <EGDropdown key={'schedule-input'} currentValues={entity.schedule || scheduleOptions[0]} options={scheduleOptions} label={'Schedule'} onChange={(event) => {this.updateSchedule(event)}} />,
            <EGTextBox  key={'carbon_dioxide-input'} value={entity.carbon_dioxide || ''}    label={'Carbon Dioxide'}    onChange={(event) => {this.updateEntity(event, 'carbon_dioxide')}} />, 
            <EGTextBox  key={'water-input'}          value={entity.water || ''}             label={'Water'}             onChange={(event) => {this.updateEntity(event, 'water')}} />,
            <EGTextBox  key={'waste-input'}          value={entity.waste || ''}             label={'Waste'}             onChange={(event) => {this.updateEntity(event, 'waste')}} />,
            <EGTextBox  key={'points-input'}         value={entity.points || ''}            label={'Points'}            onChange={(event) => {this.updateEntity(event, 'points')}} />,
            <EGTextBox  key={'primary-image-input'}  value={entity.primary_image || ''}     label={'Primary Image'}     onChange={(event) => {this.updateEntity(event, 'primary_image')}} />,
            <EGTextBox  key={'video-input'}          value={entity.video_url || ''}             label={'Video'}             onChange={(event) => {this.updateEntity(event, 'video_url')}} />,
            <EGTextBox  key={'external-url-input'}   value={entity.external_url || ''}      label={'External URL'}      onChange={(event) => {this.updateEntity(event, 'external_url')}} />,
            <EGCheckbox key={'isGame-input'}         value={entity.isGame}            label={'Game'}              onChange={(event) => {this.updateEntityBoolean(event, 'isGame')}} />,
            <EGCheckbox key={'active-input'}         value={entity.active}            label={'Active'}            onChange={(event) => {this.updateEntityBoolean(event, 'active')}} />,
            <div key='author'><strong style={{marginRight: '5px'}}>Author:</strong>{entity.author.name || ''    }</div>,
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
            const actionPreviouslySelected = entity.related_actions ? entity.related_actions.some(action => {return action.id === event.value;}) : false;
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