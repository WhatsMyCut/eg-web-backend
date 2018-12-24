import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { minWidthMediaQuery } from '../../constants/responsive';
import styled from 'styled-components';
import { LoginMutation } from '../../graphql/mutations/login_mutation';
import graphql from '../../hoc/graphql';
import { AUTH_TOKEN_NAME } from '../../consts';

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 10px;

  & > div {
    padding-bottom: 16px;
  }

  div:last-of-type {
    padding-bottom: 0;
  }

  ${minWidthMediaQuery.laptopL`
    flex-direction: row;
    font-size: 250% !important;
  `}
`;

@withRouter class Login extends Component {
  render(){
    console.log('Displaying Login Component');
    return (
      <LoginContainer>
        <div>Poop</div>
      </LoginContainer>
    )
  }
}

export default Login;