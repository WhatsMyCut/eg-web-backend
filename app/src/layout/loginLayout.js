import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../components/LoginComponent';
import styled from 'styled-components';

const LoginLayoutContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

const LoginLayout = ({ routes }) => (
  <LoginLayoutContainer>
    <Route exact path={'/login'} component={Login} />
  </LoginLayoutContainer>
);

export default LoginLayout;