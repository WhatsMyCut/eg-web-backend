import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../NavigationComponent';

const PetitionsContainer = styled.div`
  width: 100vw;
  height: 95vh;
  margin-top: 5vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: white;
`;

@withRouter class Petitions extends Component {
    render(){
      return (
        <PetitionsContainer>
          
        </PetitionsContainer>
      )
    }
}

export default Petitions;