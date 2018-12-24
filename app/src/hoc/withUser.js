import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'react-apollo';
import { Redirect, withRouter } from 'react-router-dom';

import { GET_CURRENT_USER_QUERY } from '../graphql/queries/get_current_user';

// function hasRole(user, roleName) {
//   return user.roles.some(role => role.name === roleName);
// }

// function isAuthorized(user, auth) {
//   if (user && user.roles.length) {
//     if (isBoolean(auth)) {
//       return auth;
//     }
//     if (isString(auth)) {
//       return hasRole(user, auth);
//     }
//     if (isArray(auth)) {
//       return auth.some(role => hasRole(user, role));
//     }
//   } else {
//     return !auth;
//   }
// }

export default function withUser(options = {}) {
  return function componentWrapper(Component) {
    @graphql(GET_CURRENT_USER_QUERY, { name: 'user' })
    @withRouter
    class WithUser extends React.Component {
      static displayName = `withUser(${Component.displayName ||
        Component.name})`;

      static propTypes = {
        // authenticated: PropTypes.oneOfType([
        //   PropTypes.bool,
        //   PropTypes.oneOf(values(ROLES)),
        //   PropTypes.arrayOf(PropTypes.oneOf(values(ROLES)))
        // ]),
        location: PropTypes.object.isRequired,
        redirect: PropTypes.bool,
        user: PropTypes.shape({
          loading: PropTypes.bool.isRequired,
          user: PropTypes.object
        }).isRequired
      };

      shouldComponentUpdate(nextProps) {
        // Working around an issue where updating the user record clears the
        // user data before setting with new values and results in a login redirect.
        // Probably a more intelligent way to handle this, will need to research
        if (this.props.user.user && !nextProps.user.user) {
          return false;
        }
        return true;
      }

      render() {
        const { location, redirect, user } = this.props;
        if (user.user !== undefined) {
          if (user.loading) {
            return null;
          }

          if (redirect === false) {
            return null;
          }

          const path = user.user ? 'dashboard' : 'login';

          return (
            <Redirect
              to={{
                pathname: `/${path}`,
                state: { from: location }
              }}
            />
          );
        }

        return <Component {...this.props} />;
      }
    }

    return WithUser;
  };
}
