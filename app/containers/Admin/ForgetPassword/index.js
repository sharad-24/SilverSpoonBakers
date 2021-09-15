/*
 * Admin ForgetPassword
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
import { ForgetPasswordSchema } from '../../../config/validationSchemas';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { adminForgetPassword } from './actions';
import {Link} from 'react-router-dom';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectSuccess,
  makeSelectLoading,
  makeSelectError,
} from './selectors';

import './forget-password.css';

const key = 'adminforgetpassword';

export function AdminForgetPassword({
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
  
  const handleForgetPassword = (data) => {
    onSubmitForm(data);
  }

  return (
    <div className="admin-bg">
      <div className="admin-card">
        <h1 className="heading">Reset Passoword</h1>
        <hr className="line" />
        <p className="text">
          Enter your registered email address to get
          <br />
          instructions for resetting your password
        </p>
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
          initialValues={{ email: '' }}
          validationSchema={ForgetPasswordSchema}
          onSubmit={values => handleForgetPassword(values)}
        >
          {({ errors, touched, handleChange, handleBlur }) => (
            <Form style={{ textAlign: 'center' }}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  style={{ marginBottom: '20px', padding: '0px 100px' }}
                >
                  <Field validateOnBlur validateOnChange name="email">
                    {({ field, form }) => (
                      <TextField
                        name={'email'}
                        label="Email Address"
                        variant="outlined"
                        error={Boolean(
                          form.errors.email && form.touched.email,
                        )}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          form.errors.email &&
                          form.touched.email &&
                          String(form.errors.email)
                        }
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>
              {loading ? (
                <CircularProgress style={{ color: '#09799C' }} size={25} />
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
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

AdminForgetPassword.propTypes = {
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
      dispatch(adminForgetPassword(evt));
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
)(AdminForgetPassword);