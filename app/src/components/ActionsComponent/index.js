import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import ManagementView from '../shared/ManagementView';

@withRouter class Actions extends Component {
    render(){
      return (
        <ManagementView title="Actions" entityType="Category">
            
        </ManagementView>
      )
    }
}

export default Actions;