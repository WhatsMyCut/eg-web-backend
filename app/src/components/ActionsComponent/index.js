import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import NavBar from '../NavigationComponent';

const ActionsContainer = styled.div`
  width: 100vw;
  height: 95vh;
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
`;

@withRouter class Actions extends Component {
    render(){
      return (
        <ActionsContainer>
            
        </ActionsContainer>
      )
    }
}

export default Actions;