import React, { Component } from 'react';
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
// import { ADD_GROUP_MUTATION } from '../../../graphql/mutations/add_group';
import graphql from '../../../hoc/graphql';
import { withRouter } from 'react-router-dom';

@withRouter
// @graphql(ADD_GROUP_MUTATION, {
//   name: 'add_group'
// })
class EGModal extends Component {
  state = {
    loading: false,
    value: ''
  };
  
  render() {
    const { value } = this.state;
    const { entityType, entity, modalContent } = this.props;
    return <Modal open closeIcon onClose={this._onClose}>
        <Header icon="archive" content={`Add/Edit ${entityType}`} />
        <Modal.Content>
            {modalContent}
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={this._onClose}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="green" onClick={() => {
              this._saveMutation();
            }}>
            <Icon name="remove" /> Save
          </Button>
        </Modal.Actions>
      </Modal>;
  }

  _saveMutation(newValue) {
    const { save } = this.props;
    this.setState({ loading: true });
    // const variables = {
    //   value: newValue
    // };
    // save({ variables }).then(result => {
    //   if (result) {
    //     this._onClose();
    //   }
    // });

    save();
  }

  _onClose = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };
}

export default EGModal;