import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  checkAuthorization,
  checkCustomer,
  checkAdmin,
  checkStaff,
  checkAuthorizationFromCookie,
} from './helpers';
import ErrorBoundary from '../components/ErrorComponent';

const CustomerRoute = ({
  component: Component,
  redirect: pathname,
  ...rest
}) => {
  const Routes = props => {
    if (checkAuthorizationFromCookie() === true && checkCustomer() === true) {
      return (
        <Route
          {...rest}
          render={props => (
            <ErrorBoundary>
              <Component {...rest} {...props} />
            </ErrorBoundary>
          )}
        />
      );
    }
    return (
      <Redirect
        to={{
          pathname,
          state: { from: props.location },
        }}
      />
    );
  };
  return <Routes />;
};

CustomerRoute.defaultProps = { redirect: '/login' };

CustomerRoute.propTypes = {
  component: PropTypes.object.isRequired,
  redirect: PropTypes.string,
};

export default CustomerRoute;
