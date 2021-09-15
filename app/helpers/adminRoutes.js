import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { checkAuthorization, checkAdmin } from './helpers';
import ErrorBoundary from '../components/ErrorComponent/admin';

const AdminRoute = ({
  component: Component,
  redirect: pathname,
  ...rest
}) => {
  const Routes = props => {
    if (checkAuthorization() === true && checkAdmin() === true) {
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

AdminRoute.defaultProps = { redirect: '/admin/login' };

AdminRoute.propTypes = {
  component: PropTypes.object.isRequired,
  redirect: PropTypes.string,
};

export default AdminRoute;
