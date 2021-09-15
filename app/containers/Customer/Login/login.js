import React, { useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {
  FormControlLabel,
  FormControl,
  Divider,
  Chip,
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
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
import { useCookies } from 'react-cookie';
import { CircularProgress } from '@material-ui/core';
import  './customerLogin.css'
import { CustomerSignupSchema } from '../../../config/validationSchemas';
import { browserRedirect } from '../../../helpers/helpers';
import { makeSelectError } from '../../Admin/Products/selectors';
import { Error, PersonAdd, VpnKey } from '@material-ui/icons';

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

export default function Login(props) {
  
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');
  const [errormessage, setErrorMessage] = useState();
  const [cookies, setCookie] = useCookies(['token']);
  const [loading, setloading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
 
  const handleLogin = async ({ email, password }) => {
    setloading(true);
    try {
      event.preventDefault();
      const response = await request(
        'POST',
        `${urls.CUSTOMER_URL}`,
        {
          email: email,
          password: password,
        },
        { header: 0 },
      );
      if (response.status.toString() === '200') {
        await setMessage('Log in success !');
        await setSeverity('success');
        await setOpen(true);
        setErrorMessage('');
        setCookie('customertoken', response.data.data.AccessToken, {
          path: '/',
        });
        setCookie('type', 'customer', {
          path: '/',
        });
        const data = response.data.data.customerData;
        //console.log('stringigfy data : ', data);
        setCookie('name', encodeURIComponent(data.name), {
          path: '/',
        });
        setCookie('mobile', data.mobile, {
          path: '/',
        });
        if (props.data === 'checkout') {
          browserRedirect('/checkout');
        } else if (props.data === 'customorder') {
          browserRedirect('/customorder');
        } else {
          browserRedirect('/');
        }
      } else if (response.status.toString() !== '200') {
        setMessage('Log in failed !');
        setSeverity('error');
        setOpen(true);
        setloading(false);
        setErrorMessage(err.response.data.message);
      }
    } catch (err) {
      console.log(err.response.data.message);
      setloading(false);
      setErrorMessage(err.response.data.message);
    }
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOpenOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Formik
            initialValues={{
              password: '',
              email: '',
            }}
            onSubmit={values => {
              return handleLogin(values);
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
                          // style={{ textTransform: 'capitalize' }}
                        >
                          {/* <p>Error: {errormessage}</p> */}
                          <Chip
                            style={{ color: 'red' }}
                            variant="outlined"
                            label={`${errormessage}`}
                            icon={<Error style={{ color: 'red' }} />}
                          />
                        </div>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      autoFocus
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
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
                  <Grid container row>
                    <Grid item xs={12} className="text-left">
                      <div>
                        <Checkbox id="rememberme" color="primary" />
                        <label for="terms">Remember me</label>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                {loading ? (
                  <CircularProgress className="spinner" />
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{
                      backgroundColor: '#ffbc2a',
                      boxShadow: 'none',
                      borderRadius: '0',
                      textDecoration: 'none',
                    }}
                    className={classes.submit}
                    startIcon={<VpnKey />}
                  >
                    Sign In
                  </Button>
                )}
                <Grid row container>
                  <Grid item xs={6}>
                    <Link
                      to="/verify"
                      style={{
                        color: 'darkblue',
                      }}
                      variant="body2"
                    >
                      Verify mobile number
                    </Link>
                  </Grid>
                  <Grid item xs={6} className="text-right">
                    <Link
                      to="/forgotpassword"
                      style={{
                        color: 'darkblue',
                      }}
                      variant="body2"
                    >
                      Forgot password
                    </Link>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </div>
        <div className="m-5 text-center">
          <hr class="hr-text" data-content="OR" />
          {/* <Divider   /> */}
        </div>
        <div>
          <Button
            onClick={() => props.handleNav()}
            fullWidth
            variant="contained"
            color="primary"
            style={{
              boxShadow: 'none',
              borderRadius: '0',
            }}
            startIcon={<PersonAdd />}
          >
            Create new account
          </Button>
        </div>
      </Container>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
