/*
 * Admin ResetPassword
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, Field } from 'formik';
import Popover from '@material-ui/core/Popover';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ResetPasswordSchema } from '../../../config/validationSchemas';
import { browserRedirect } from '../../../helpers/helpers';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { adminResetPassword } from './actions';
import Button from '@material-ui/core/Button';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectSuccess,
  makeSelectLoading,
  makeSelectError,
} from './selectors';

import './reset-password.css';


const key = 'adminresetpassword';

export function AdminResetPassword({
  loading,
  error,
  success,
  onSubmitForm,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (!localStorage.getItem('email')) {
      browserRedirect('/admin/forgetPassword');
    }
  }, []);

  const [anchorEl, setAnchorEl] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined; 

  const handleResetPassword = (data) => {
    if (newPassword == confirmNewPassword) {
      onSubmitForm(data);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNewPassword = (e) => {
    setNewPassword(e);
  };

  const handleConfirmNewPassword = (e) => {
    setConfirmNewPassword(e);
  };

  return (
    <div className="admin-bg">
      <div className="admin-card">
        <h1 className="heading">Reset Password</h1>
        <hr className="line" />
        <p style={{ textAlign: 'center' }}>
          We have send OTP to your registered <br />
          email address.
        </p>
        <div className="error-message">
          {newPassword != confirmNewPassword ? (
            <p style={{ marginBottom: '30px' }}>Password does not matches.</p>
          ) : null}
          {error ? (
            <p style={{ marginBottom: '30px' }}>
              {error.response &&
                error.response.data &&
                error.response.data.message}
            </p>
          ) : null}
        </div>
        <Formik
          initialValues={{ otp: '', newpassword: '', confirmnewpassword: '' }}
          validationSchema={ResetPasswordSchema}
          onSubmit={values => handleResetPassword(values)}
        >
          {({ errors, touched, handleChange, handleBlur }) => (
            <Form style={{ textAlign: 'center' }}>
              <Grid container>
                <Grid item xs={12} style={{ marginBottom: '20px' }}>
                  <Field validateOnBlur validateOnChange name="otp">
                    {({ field, form }) => (
                      <TextField
                        name={'otp'}
                        label="OTP"
                        variant="outlined"
                        error={Boolean(form.errors.otp && form.touched.otp)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          form.errors.otp &&
                          form.touched.otp &&
                          String(form.errors.otp)
                        }
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} style={{ marginBottom: '20px' }}>
                  <Field validateOnBlur validateOnChange name="newpassword">
                    {({ field, form }) => (
                      <TextField
                        type="password"
                        name={'newpassword'}
                        label="New Password"
                        variant="outlined"
                        error={Boolean(
                          form.errors.newpassword && form.touched.newpassword,
                        )}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onInput={e => handleNewPassword(e.target.value)}
                        helperText={
                          form.errors.newpassword &&
                          form.touched.newpassword &&
                          String(form.errors.newpassword)
                        }
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} style={{ marginBottom: '20px' }}>
                  <Field
                    validateOnBlur
                    validateOnChange
                    name="confirmnewpassword"
                  >
                    {({ field, form }) => (
                      <TextField
                        type="password"
                        name={'confirmnewpassword'}
                        label="Confirm New Password"
                        variant="outlined"
                        error={Boolean(
                          form.errors.confirmnewpassword &&
                            form.touched.confirmnewpassword,
                        )}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onInput={e =>
                          handleConfirmNewPassword(e.target.value)
                        }
                        helperText={
                          form.errors.confirmnewpassword &&
                          form.touched.confirmnewpassword &&
                          String(form.errors.confirmnewpassword)
                        }
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>
              <p style={{ fontSize: '14px', marginTop: 0 }}>
                To know required pattern of passsword, please click{' '}
                <span
                  style={{ textDecoration: 'underline', cursor: 'pointer' }}
                  aria-describedby={id}
                  onClick={handleClick}
                >
                  here
                </span>
              </p>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <div
                  style={{ fontSize: '14px', padding: '10px 10px 0px 10px' }}
                >
                  6-20 characters; a-z, A-Z, 0-9 and special characters
                  allowed <br />
                  expect <b>space</b>. Requires at least one of each of the
                  following:
                  <ul>
                    <li>Capital Letter</li>
                    <li>Small Letter</li>
                    <li>Number</li>
                  </ul>
                </div>
              </Popover>
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

AdminResetPassword.propTypes = {
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
      dispatch(adminResetPassword(evt));
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
)(AdminResetPassword);