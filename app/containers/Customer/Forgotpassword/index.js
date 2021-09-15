import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { FormControlLabel, FormControl, Chip } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';

import { ForgotPasswordSchema } from '../../../config/validationSchemas';
import { browserRedirect } from '../../../helpers/helpers';
import { makeSelectError } from '../../Admin/Products/selectors';

import ResetPassword from './resetpassword.js';
import { setLocale } from 'yup';
import { Error, ErrorOutlined, MobileScreenShare } from '@material-ui/icons';

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

export default function ForgotPassword() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');
  const [errormessage, setErrorMessage] = useState();
  const [loader, setloader] = useState(false)
  const [mobile, setMobile] = useState(7060910778)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleForgotPasswordButton = async ({ mobile }) => {
    event.preventDefault();
    try {
      setloader(true)
      const response = await request(
        'PATCH',
        `${urls.CUSTOMER_URL}`,
        {
          key: 'forgotPassword',
          value: mobile,
        },
        { header: 0 },
      );
      console.log('response: ', response);
      if (response.status.toString() === '200') {
        setMessage('Otp sent to mobile');
        setSeverity('success');
        setOpen(true);
        setMobile({number : mobile})
      }
    } catch (err) {
      setloader(false)
      console.log(err.response.data.message);
      setErrorMessage(err.response.data.message);
    }
  };


 
  return (
    <div>
      <Header />
      <Container  >
        <CssBaseline />
        {!mobile ? (
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography gutterBottom component="h1" variant="h5">
              Forgot Password
            </Typography>
            <Typography variant="subtitle2">
              <>Enter mobile number of your existing account below</>
            </Typography>

            <Formik
              initialValues={{
                mobile: '',
              }}
              validationSchema={ForgotPasswordSchema}
              onSubmit={values => {
                return handleForgotPasswordButton(values);
              }}
            >
              {formik => (
                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={3}>
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
                                <ErrorOutlined style={{ color: 'red' }} />
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
                          formik.touched.mobile &&
                          Boolean(formik.errors.mobile)
                        }
                        helperText={
                          formik.touched.mobile && formik.errors.mobile
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
                      startIcon={<MobileScreenShare />}
                    >
                      Send Otp
                    </Button>
                  ) : (
                    <div className="container">
                      <CircularProgress style={{ color: 'ffbc2a' }} />
                    </div>
                  )}
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link
                        to="/login"
                        variant="body2"
                        style={{
                          color: 'darkblue',
                        }}
                      >
                        Remember existing password? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </div>
        ) : (
          <ResetPassword mobile={mobile.number} />
        )}
      </Container>
      <Footer />
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
