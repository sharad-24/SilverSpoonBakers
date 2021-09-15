import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { checkAuthorization, checkAdmin, checkStaff } from './helpers';
import ErrorBoundary from '../components/ErrorComponent/admin';

const StaffRoute = ({
  component: Component,
  redirect: pathname,
  ...rest
}) => {
  const Routes = props => {
    if (checkAuthorization() === true && (checkAdmin() === true || checkStaff() === true)) {
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

StaffRoute.defaultProps = { redirect: '/admin/login' };

StaffRoute.propTypes = {
  component: PropTypes.object.isRequired,
  redirect: PropTypes.string,
};

export default StaffRoute;
