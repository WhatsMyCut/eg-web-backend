import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Dashboard from "../components/DashboardComponent";
// import OtherGroupViewComponent from '../components/OtherGroupViewComponent';
// import GroupItemsView from '../components/GroupItemsViewComponent';
// import { Navigation } from '../components/NavigationComponent/index';
import withUser from "../hoc/withUser";
import PageNotFound from "../components/404";
import Login from "../components/LoginComponent";
// import DevicesView from '../components/DeviceComponent';
// import DeviceDetails from '../components/DeviceDetailsComponent';
// import Settings from '../components/SettingsComponent';
// import GroupView from '../components/GroupViewComponent';

// @withUser()
// @withRouter

const MainLayout = (props, { routes }) => {
    if (!props.user.loading && !props.user.me) {
      return <Redirect to={{ pathname: '/login', target: props.location }} />;
    }
  console.log("Displaying MainLayout");
  return [
    // <Navigation {...props} />,
    <div style={{ marginLeft: "19.125rem" }} className="container">
      <Switch>
        <Route exact path={"/"} render={() => <Redirect to="/login" />} />
        <Route exact path={"/login"} render={() => <Login {...props} />} />
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
