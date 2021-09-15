/*
 * Admin Profile
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import RefreshIcon from '@material-ui/icons/Refresh';

import { Formik, Form, Field } from 'formik';
import {
  TextField,
  Grid,
  Card,
  CardContent,
  Fade,
  Backdrop,
  Modal,
  CircularProgress,
  Button,
  Avatar,
  Divider,
  Snackbar,
} from '@material-ui/core';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import AdminSidebar from '../../../components/AdminSideBar';
import TopBar from '../../../components/TopBar/TopBar';
import { AdminChangePasswordSchema } from '../../../config/validationSchemas';
import { browserRedirect } from '../../../helpers/helpers';

import { adminProfileFetch, adminChangePassword, adminProfileRemoveError} from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectProfile,
  makeSelectLoading,
  makeSelectError,
  makeSelectChangePasssword,
} from './selectors';

import MuiAlert from '@material-ui/lab/Alert';
import PageTitle from '../../../components/PageTitle'
import './admin-profile.css';
const logo = require('../../../images/logo.png');

const key = 'adminprofile';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export function AdminProfile({
  loading,
  error,
  profile,
  changePasssword,
  onFetchProfile,
  onUpdateProfile,
  onRemoveError,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    // if (username && username.trim().length > 0) onSubmitForm();
    onFetchProfile();
  }, []);

  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    onRemoveError();
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleUpdateProfile = data => {
    if (newPassword == confirmPassword) {
      onUpdateProfile(data, handleChangePasswordModalClose);
    }
  };

  const handlenewPassword = e => {
    setnewPassword(e);
  };

  const handleconfirmPassword = e => {
    setconfirmPassword(e);
  };

  const handleChangePasswordModalOpen = () => {
    setChangePasswordModal(true);
  };

  const handleChangePasswordModalClose = () => {
    onRemoveError();
    handleClick();
    setChangePasswordModal(false);
  };

  function handleExpireToken() {
    localStorage.clear();
    console.log('clearing old/expired token..');
    browserRedirect('/admin/login');
  }
// a.localeCompare(b)
  return (
    <Grid container direction="row" j>
      {error && 
      error.response &&
      error.response.data &&
      (error.response.data.statusCode === 402 ||
        error.response.data.statusCode === 403)
        ? handleExpireToken()
        : null}
      <Grid item xs={12} style={{ marginBottom: '60px' }}>
        <TopBar />
      </Grid>
      <Grid item xs={4}>
        <AdminSidebar />
      </Grid>
      <Grid item xs={10} sm={6}>
        <br />
        <PageTitle name="Profile" />

        {loading ? (
          <div className="loader">
            <CircularProgress style={{ color: '#09799C' }} />
          </div>
        ) : error &&
          error.response &&
          error.response.data &&
          error.response.data.message ? (
          <div className="error-message">
            <p>{error.response.data.message}</p>
          </div>
        ) : (
          <Card>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div style={{ textAlign: 'right' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ margin: '10px' }}
                    >
                      <RefreshIcon onClick={onFetchProfile} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ padding: '2%' }}>
              {profile ? (
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <div style={{ padding: '0% 5%' }}>
                        <div>
                          <div>
                            <TextField
                              label="Name"
                              value={profile.name}
                              margin="normal"
                              variant="outlined"
                            />
                          </div>
                          <div>
                            <TextField
                              label="Email"
                              value={profile.email}
                              margin="normal"
                              variant="outlined"
                            />
                          </div>
                          <div>
                            <TextField
                              label="PHone Number"
                              value={profile.mobile}
                              margin="normal"
                              variant="outlined"
                            />
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={6} alignContent="right">
                      <Avatar
                        style={{
                          marginLeft: '10px',
                          height: '150px',
                          width: '150px',
                        }}
                        src={logo}
                      />
                      <br />
                      <br />
                      <h6 style={{ marginLeft: '20px' }}>
                        Rights : <b>{profile.isAdmin ? 'Admin' : 'Staff'}</b>
                      </h6>
                    </Grid>
                  </Grid>
                  <br />
                  <Divider />
                </CardContent>
              ) : (
                <h6 className="text-center">No Profile</h6>
              )}
              <br />
              <div style={{ padding: '0% 7%' }}>
                <div style={{ textAlign: 'left' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleChangePasswordModalOpen}
                  >
                    Change Password
                  </Button>
                </div>
              </div>
              <br />
            </div>
          </Card>
        )}
      </Grid>
      <Modal
        open={changePasswordModal}
        onClose={handleChangePasswordModalClose}
        aria-labelledby="add-profile-modal"
        aria-describedby="to-add-profile"
        disableBackdropClick
        disableEscapeKeyDown
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={changePasswordModal}>
          <div className="admin-modal">
            <h1 style={{ fontSize: '24px', marginTop: 0 }}>
              Change Password
            </h1>
            <hr className="line" align="left" />
            <Formik
              initialValues={{
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
              }}
              validationSchema={AdminChangePasswordSchema}
              onSubmit={values => handleUpdateProfile(values)}
            >
              {({ errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <Grid container style={{ width: '300px' }}>
                    <div className="error-message">
                      {newPassword != confirmPassword ? (
                        <p style={{ marginBottom: '30px' }}>
                          Password does not matches.
                        </p>
                      ) : null}
                      {changePasssword &&
                      changePasssword.error &&
                      changePasssword.error.response &&
                      changePasssword.error.response.data &&
                      changePasssword.error.response.data.message ? (
                        <p style={{ marginBottom: '30px' }}>
                          {changePasssword.error.response.data.message}
                        </p>
                      ) : null}
                    </div>
                    <Grid item xs={12} style={{ marginBottom: '20px' }}>
                      <Field
                        validateOnBlur
                        validateOnChange
                        name="oldPassword"
                      >
                        {({ field, form }) => (
                          <TextField
                            fullWidth
                            type="password"
                            name="oldPassword"
                            label="Old Passsword"
                            variant="outlined"
                            error={Boolean(
                              form.errors.oldPassword &&
                                form.touched.oldPassword,
                            )}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              form.errors.oldPassword &&
                              form.touched.oldPassword &&
                              String(form.errors.oldPassword)
                            }
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '20px' }}>
                      <Field
                        validateOnBlur
                        validateOnChange
                        name="newPassword"
                      >
                        {({ field, form }) => (
                          <TextField
                            fullWidth
                            type="password"
                            name="newPassword"
                            label="New Password"
                            variant="outlined"
                            error={Boolean(
                              form.errors.newPassword &&
                                form.touched.newPassword,
                            )}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onInput={e => handlenewPassword(e.target.value)}
                            helperText={
                              form.errors.newPassword &&
                              form.touched.newPassword &&
                              String(form.errors.newPassword)
                            }
                          />
                        )}
                      </Field>
                      <span style={{ fontSize: '14px' }}>
                        6-20 characters; a-z, A-Z, 0-9 and special characters
                        allowed expect <b>space</b>. Requires at least one of
                        each of the following:
                        <ul>
                          <li>Capital Letter</li>
                          <li>Small Letter</li>
                          <li>Number</li>
                        </ul>
                      </span>
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '20px' }}>
                      <Field
                        validateOnBlur
                        validateOnChange
                        name="confirmPassword"
                      >
                        {({ field, form }) => (
                          <TextField
                            fullWidth
                            type="password"
                            name="confirmPassword"
                            label="Confirm New Password"
                            variant="outlined"
                            error={Boolean(
                              form.errors.confirmPassword &&
                                form.touched.confirmPassword,
                            )}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onInput={e =>
                              handleconfirmPassword(e.target.value)
                            }
                            helperText={
                              form.errors.confirmPassword &&
                              form.touched.confirmPassword &&
                              String(form.errors.confirmPassword)
                            }
                          />
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                  {changePasssword && changePasssword.loading ? (
                    <CircularProgress
                      style={{ color: '#09799C' }}
                      size={25}
                    />
                  ) : (
                    <>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        type="button"
                        className="cancel-button"
                        onClick={handleChangePasswordModalClose}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </Fade>
      </Modal>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          Password Update Cancelled!
        </Alert>
      </Snackbar>
    </Grid>
  );
}

AdminProfile.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  changePasssword: PropTypes.object,
  onFetchProfile: PropTypes.func,
  onUpdateProfile: PropTypes.func,
  onRemoveError: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  changePasssword: makeSelectChangePasssword(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchProfile: () => {
      dispatch(adminProfileFetch());
    },
    onUpdateProfile: (evt, closeChangePasswordModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(adminChangePassword(evt, closeChangePasswordModal));
    },

    onRemoveError: () => {
      dispatch(adminProfileRemoveError());
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
)(AdminProfile);
