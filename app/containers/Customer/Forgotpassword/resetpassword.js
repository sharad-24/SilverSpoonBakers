import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { FormControlLabel, FormControl, CircularProgress, Chip } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import request from '../../../utils/request';
import { urls } from '../../../config/urls';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';

import { resetPasswordSchema } from '../../../config/validationSchemas';
import { browserRedirect } from '../../../helpers/helpers';
import { makeSelectError } from '../../Admin/Products/selectors';
import { ErrorOutlineOutlined } from '@material-ui/icons';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'black',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ResetPassword(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');
  const [errormessage, setErrorMessage] = useState();
  const [loader, setloader] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleResetPassword = async ({ password, mobile, otp }) => {
    event.preventDefault();
    try {
      setloader(true);
      console.log('reset pass handler called');
      const response = await request(
        'PATCH',
        `${urls.CUSTOMER_URL}`,
        {
          key: 'resetPassword',
          value: mobile,
          otp: otp,
          password: password,
        },
        { header: 0 },
      );
      console.log('response: ', response);
      if (response.status.toString() === '200') {
        setloader(false);
        setMessage('Password reset successful');
        setSeverity('success');
        setOpen(true);
        setTimeout(() => {
          browserRedirect('/login');
        }, 2000);
        
      }
    } catch (err) {
      setloader(false);
      console.log(err.response.data.message);
      setErrorMessage(err.response.data.message);
    }
  };

  return (
    <div>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Formik
          initialValues={{
            mobile: props.mobile,
            otp: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={resetPasswordSchema}
          onSubmit={values => {
            return handleResetPassword(values);
          }}
        >
          {formik => (
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className="error-message">
                    {errormessage ? (
                      <div
                        className="text-center my-3"
                        style={{ textTransform: 'capitalize' }}
                      >
                         <Chip
                              style={{ color: 'red' }}
                              variant="outlined"
                              label={`${errormessage}`}
                              icon={
                                <ErrorOutlineOutlined style={{ color: 'red' }} />
                              }
                              />
                      </div>
                    ) : null}
                  </div>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    type="number"
                    id="mobile"
                    label="Mobile No."
                    name="mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.mobile && Boolean(formik.errors.mobile)
                    }
                    helperText={formik.touched.mobile && formik.errors.mobile}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    type="number"
                    id="otp"
                    label="OTP No."
                    name="otp"
                    value={formik.values.otp}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.mobile && Boolean(formik.errors.mobile)
                    }
                    helperText={formik.touched.mobile && formik.errors.mobile}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    autoComplete="new-password"
                    name="password"
                    label="New Password"
                    type="password"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password &&
                      Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    autoComplete="confirm-new-password"
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                  />
                </Grid>
              </Grid>
              {!loader ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    backgroundColor: '#ffbc2a',
                    boxShadow: 'none',
                    borderRadius: '0',
                  }}
                  className={classes.submit}
                >
                  Reset
                </Button>
              ) : (
                <div className="text-center my-3">
                <CircularProgress style={{ color: 'ffbc2a' }} /></div>
              )}
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>

      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
