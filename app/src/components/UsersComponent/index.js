import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import ManagementView from '../shared/ManagementView';

@withRouter class Users extends Component {
    render(){
      return (
        <ManagementView title="Users" entityType="User">
          
        </ManagementView>
      )
    }
}

export default Users;