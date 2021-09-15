import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { checkAuthorization } from './helpers';

const AuthRoute = ({
  component: Component,
  redirect: pathname,
  ...rest
}) => {
  const Routes = props => {
    if (checkAuthorization() === false) {
      return (
        <Route
          {...rest}
          render={props => (
            <Component {...rest} {...props} />
          )}
        />
      );
    }
    return (
      <Route>
        <Redirect
          to={{
            pathname,
            state: { from: props.location },
          }}
        />
      </Route>
    );
  };
  return <Routes />;
};

AuthRoute.defaultProps = { redirect: '/admin/profile' };

AuthRoute.propTypes = {
  component: PropTypes.object.isRequired,
  redirect: PropTypes.string,
};

export default AuthRoute;
