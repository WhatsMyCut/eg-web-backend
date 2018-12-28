import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
// import { Navigation } from '../components/NavigationComponent/index';
import withUser from "../hoc/withUser";
import PageNotFound from "../components/404";
import Login from "../components/LoginComponent";
import Home from "../components/HomeComponent";
import NavBar from "../components/NavigationComponent";
import Actions from "../components/ActionsComponent";
import Petitions from "../components/PetitionsComponent";
import GameItems from "../components/GameItemsComponent";
// import Settings from '../components/SettingsComponent';

// @withUser()
// @withRouter

const MainLayout = (props, { routes }) => {
    // if (!props.user.loading && !props.user.me) {
    //   return <Redirect to={{ pathname: '/login', target: props.location }} />;
    // }
  return [
    // <Navigation {...props} />,
    <div style={{ overflow: 'hidden', height: '100vh', backgroundColor: 'lightgreen' }} className="container">
      <NavBar {...props} />
      <Switch style={{height: '95vh'}}>
        <Route exact path={"/"} render={() => <Redirect to="/home" />} />
        <Route exact path={"/home"} render={() => <Home {...props} />} />
        <Route exact path={"/login"} render={() => <Login {...props} />} />
        <Route exact path={"/actions"} render={() => <Actions {...props} />} />
        <Route exact path={"/petitions"} render={() => <Petitions {...props} />} />
        <Route exact path={"/game-items"} render={() => <GameItems {...props} />} />
        {/* <Route
          exact
          path={'/dashboard/group/:id'}
          render={() => <GroupItemsView {...props} />}
        />
        <Route
          exact
          path={'/dashboard/item/:id'}
          render={() => <DeviceDetails {...props} />}
        />
        <Route
          exact
          path="/devices"
          render={() => <DevicesView {...props} />}
        />
        <Route
          exact
          path="/devices/:id"
          render={() => <DeviceDetails {...props} />}
        />
        <Route exact path="/groups" render={() => <GroupView {...props} />} />
        <Route exact path="/search" render={() => <PageNotFound />} />
        <Route
          path="/settings"
          render={({ location, match }) => (
            <Settings location={location} match={match} />
          )}
        /> */}
        <Route component={PageNotFound} />
      </Switch>
    </div>
  ];
};
export default withUser()(MainLayout);
