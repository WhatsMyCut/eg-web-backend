import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import LoginLayout from '../layout/loginLayout';
import MainLayout from '../layout/mainLayout';

import Login from '../components/LoginComponent';
// import Dashboard from '../components/DashboardComponent';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path={'/login'} component={LoginLayout} />
            <Route path={'/'} component={MainLayout} />
          </Switch>
        </div>
      </Router>
    );
  }
}
