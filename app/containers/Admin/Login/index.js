/*
 * Admin Login
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, Field } from 'formik';
import { LoginSchema } from '../../../config/validationSchemas';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { adminLogin } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectSuccess,
  makeSelectLoading,
  makeSelectError,
} from './selectors';

import './admin-login.css';
import { Typography } from '@material-ui/core';
import {
  Error,
  Warning,
  WarningOutlined,
  WarningSharp,
  WarningTwoTone,
} from '@material-ui/icons';

const key = 'adminlogin';

export function AdminLogin({
  loading,
  error,
  success,
  onSubmitForm,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    //if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  const handleLogin = (data) => {
    onSubmitForm(data);
  }

  return (
    <div style={{ height: '100vh' }}>
      <div className="admin-card">
        <div className="text-center">
          <Typography variant="h3">Admin Login</Typography>
          <Typography variant="subtitle2">
            Silverspoon Bakers & Cafe
          </Typography>
        </div>

        <hr className="line" />
        <div className="error-message">
          {error ? (
            <p style={{ marginBottom: '30px' }}>
              {error.response &&
                error.response.data &&
                error.response.data.message}
            </p>
          ) : null}
        </div>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={values => handleLogin(values)}
        >
          {({ errors, touched, handleChange, handleBlur }) => (
            <Form className="text-center">
              <Grid container>
                <Grid item xs={12} style={{ marginBottom: '20px' }}>
                  <Field validateOnBlur validateOnChange name="username">
                    {({ field, form }) => (
                      <TextField
                        name={'username'}
                        label="Email Address"
                        variant="outlined"
                        error={Boolean(
                          form.errors.username && form.touched.username,
                        )}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          form.errors.username &&
                          form.touched.username &&
                          String(form.errors.username)
                        }
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} style={{ marginBottom: '20px' }}>
                  <Field validateOnBlur validateOnChange name="password">
                    {({ field, form }) => (
                      <TextField
                        type="password"
                        name={'password'}
                        label="Password"
                        variant="outlined"
                        error={Boolean(
                          form.errors.password && form.touched.password,
                        )}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          form.errors.password &&
                          form.touched.password &&
                          String(form.errors.password)
                        }
                      />
                    )}
                  </Field>
                  <br />
                  <Link to="/admin/forgetPassword">
                    <span className="fp-link">Forgot Password?</span>
                  </Link>
                </Grid>
              </Grid>
              {loading ? (
                <CircularProgress style={{ color: '#09799C' }} size={25} />
              ) : (
                <div className="text-center">
                  <Button type="submit" variant="contained" color="primary">
                    Login
                  </Button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

AdminLogin.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  success: PropTypes.bool,
  onSubmitForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  success: makeSelectSuccess(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(adminLogin(evt));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AdminLogin);