import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {FormControlLabel, FormControl} from '@material-ui/core';
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
import {Formik,Form, Field, ErrorMessage, useField  } from 'formik'

import { CustomerSignupSchema } from '../../../config/validationSchemas';
import { browserRedirect } from '../../../helpers/helpers';
import { makeSelectError } from '../../Admin/Products/selectors';

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

export default function SignUp() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');
  const [errormessage, setErrorMessage] = useState();
 
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleSignup = async ({email, password, name, mobile}) => {
    event.preventDefault();
    try{
      const response = await request(
      'PUT',
      `${urls.CUSTOMER_URL}`,
      {
        email: email,
        password: password,
        mobile: mobile,
        name: name,
      },
      { header: 0 },
    );
    console.log('response: ', response);
    if (response.status.toString() === '200') {
      setMessage('Account created !');
      setSeverity('success');
      setOpen(true);
      browserRedirect('/login');
    }}catch(err){
      console.log(err.response.data.message)
      setErrorMessage(err.response.data.message)
    }
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };
  const handleNameChange = event => {
    setName(event.target.value);
  };
  const handleMobileChange = event => {
    setMobile(event.target.value);
  };
  const handlePasswordChange = event => {
    setpassword(event.target.value);
  };
  const preventDefault = (event) => event.preventDefault();
  return (
    <div>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
            initialValues={{ name: 'sdvsdv', mobile: '9461651653', password: '', email: '' }}
            validationSchema={CustomerSignupSchema}
            onSubmit= {(values) => {
              return handleSignup(values)
            }}
          >
            {formik => (
            <form onSubmit={formik.handleSubmit}>
              <Grid  container spacing={2}>
                <Grid item xs={12}>
                  <div className="error-message">
                    {errormessage ? (
                        <div className="text-center my-3" style={{textTransform: "capitalize"}}>
                          <p>
                            Error: {errormessage}
                          </p>
                        </div>
                      ) : null}
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="name"
                    id="name"
                    variant="outlined"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    label="Full Name"
                    autoFocus
                    required
                    fullWidth
                  />
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
                    error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                    helperText={formik.touched.mobile && formik.errors.mobile}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
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
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </Grid>
                <Grid container row>
                  <Grid item xs={8} className="text-left">
                          <div>
                            <Checkbox required id="terms" color="primary" />
                            <label for="terms">I accept the terms and conditions.</label>
                          </div>
                  </Grid>
                  <Grid item xs={4} className="text-center py-2">
                          <Link onClick={()=>{ return browserRedirect('/terms')}} >(Click here to view)</Link>
                  </Grid>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: '#ffbc2a' }}
                className={classes.submit}
              >
                Sign Up
              </Button>
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



            {/* <Formik
              initialValues={{ email: '', password: '', mobile: '', name: '' }}
              validationSchema={CustomerSignupSchema}
              // validate={values => {
              //   const errors = {};
              //   if (!values.email) {
              //     errors.email = 'Required';
              //   } else if (
              //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              //   ) {
              //     errors.email = 'Invalid email address';
              //   }
              //   return errors;
              // }}
              onSubmit={(values, { setSubmitting }) => {
                console.log("hsv")
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {(
               formik
              ) => (
                <form
                  onSubmit={handleSignup}
                  className={classes.form}
                >
                  {console.log("e",errors)}
                  {console.log("t",touched)}
                  <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                      {touched.firstName && errors.firstName ? (
                          <div>{errors.firstName}</div>
                        ) : null}
                        <TextField
                          name="name"
                          id="name"
                          variant="outlined"
                          required
                          onChange={handleNameChange}
                          fullWidth
                          error={Boolean(
                            errors.name && touched.name,
                          )}
                          label="Full Name"
                          autoFocus
                          helperText={
                              errors.name &&
                            touched.name &&
                            String(errors.name)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          type="number"
                          onChange={handleMobileChange}
                          id="mobile"
                          label="Mobile No."
                          name="mobile"
                        />
                      </Grid>
                      <Grid item xs={12}>
                      {errors.email && touched.email && errors.email}
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="email"
                          onChange={handleEmailChange}
                          label="Email Address"
                          name="email"
                        />
                      </Grid>
                      <Grid item xs={12}>
                      {errors.password && touched.password && errors.password}
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          onChange={handlePasswordChange}
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                        />
                      </Grid>
                      <Grid container row>
                        <Grid item xs={8} className="text-left">
                                <div>
                                  <Checkbox required id="terms" color="primary" />
                                  <label for="terms">I accept the terms and conditions.</label>
                                </div>
                        </Grid>
                        <Grid item xs={4} className="text-center py-2">
                                <Link onClick={()=>{ return browserRedirect('/terms')}} >(Click here to view)</Link>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      style={{ backgroundColor: '#ffbc2a' }}
                      className={classes.submit}
                    >
                      Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                      <Grid item>
                        <Link href="/login" variant="body2">
                          Already have an account? Sign in
                        </Link>
                      </Grid>
                    </Grid>
              </form>
              )}
            </Formik> */}
          
        </div>
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
